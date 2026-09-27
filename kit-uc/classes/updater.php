<?php

// Prevent loading this file directly and/or if the class is already defined
if (!defined('ABSPATH') || class_exists('WPGitHubUpdater') || class_exists('WP_GitHub_Updater'))
    return;

/**
 *
 *
 * @version 1.6
 * @author Joachim Kudish <info@jkudish.com>
 * @link http://jkudish.com
 * @package WP_GitHub_Updater
 * @license http://www.gnu.org/copyleft/gpl.html GNU Public License
 * @copyright Copyright (c) 2011-2013, Joachim Kudish
 *
 * GNU General Public License, Free Software Foundation
 * <http://creativecommons.org/licenses/GPL/2.0/>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */
class WP_GitHub_Updater
{

    /**
     * GitHub Updater version
     */
    const VERSION = 1.6;

    /**
     * @var $config the config for the updater
     * @access public
     */
    var $config;

    /**
     * @var $missing_config any config that is missing from the initialization of this instance
     * @access public
     */
    var $missing_config;

    /**
     * @var $github_data temporiraly store the data fetched from GitHub, allows us to only load the data once per class instance
     * @access private
     */
    private $github_data;


    /**
     * Class Constructor
     *
     * @param array $config the configuration required for the updater to work
     * @return void
     * @see has_minimum_config()
     * @since 1.0
     */
    public function __construct($config = array())
    {
        $defaults = array(
            'slug' => plugin_basename($config['slug']),
            'proper_folder_name' => dirname(plugin_basename($config['slug'])),
            'sslverify' => true,
            'access_token' => '',
        );

        $this->config = wp_parse_args($config, $defaults);

        $this->config['slug'] = (strtoupper(substr(PHP_OS, 0, 3)) !== 'WIN' ? '/' : '') . $this->config['slug'];

        //// error_log('WP_GitHub_Updater2: ' . print_r($this->config, true));
        // if the minimum config isn't set, issue a warning and bail
        if (!$this->has_minimum_config()) {
            $message = 'The GitHub Updater was initialized without the minimum required configuration, please check the config in your plugin. The following params are missing: ';
            $message .= implode(',', $this->missing_config);
            _doing_it_wrong(__CLASS__, $message, self::VERSION);
            return;
        }

        $this->set_defaults();
        //// error_log('valor this: ' . print_r($this, true));

        // Solo agregar filtros si el tema activo es el objetivo
        $active_theme = wp_get_theme();
        $is_my_theme = false;
        if (
            isset($this->config['proper_folder_name']) &&
            (
                $active_theme->get_stylesheet() === $this->config['proper_folder_name'] ||
                $active_theme->get_template() === $this->config['proper_folder_name']
            )
        ) {
            $is_my_theme = true;
        }

        if ($is_my_theme) {
            add_filter('pre_set_site_transient_update_themes', array($this, 'api_check'));

            // Hook into the plugin details screen
            add_filter('themes_api', array($this, 'get_plugin_info'), 10, 3);
            add_filter('upgrader_post_install', array($this, 'upgrader_post_install'), 10, 3);
            add_filter('upgrader_source_selection', array($this, 'rename_github_folder'), 10, 3);

            // set timeout
            add_filter('http_request_timeout', array($this, 'http_request_timeout'));

            // set sslverify for zip download
            add_filter('http_request_args', array($this, 'http_request_sslverify'), 10, 2);

            // set sslverify for zip download
            add_filter('upgrader_pre_download', array($this, 'download_upgrade'), 10, 2);
        }
    }

    public function has_minimum_config()
    {

        $this->missing_config = array();

        $required_config_params = array(
            'api_url',
            'raw_url',
            'github_url',
            'zip_url',
            'requires',
            'tested',
            'readme',
        );

        foreach ($required_config_params as $required_param) {
            if (empty($this->config[$required_param]))
                $this->missing_config[] = $required_param;
        }

        return (empty($this->missing_config));
    }


    /**
     * Check wether or not the transients need to be overruled and API needs to be called for every single page load
     *
     * @return bool overrule or not
     */
    public function overrule_transients()
    {
        return (defined('WP_GITHUB_FORCE_UPDATE') && WP_GITHUB_FORCE_UPDATE);
    }


    /**
     * Set defaults
     *
     * @return void
     * @since 1.2
     */
    public function set_defaults()
    {
        if (!empty($this->config['access_token'])) {

            extract(parse_url($this->config['zip_url'])); // $scheme, $host, $path

            $zip_url = $scheme . '://api.github.com/repos' . $path;
            $zip_url = add_query_arg(array('access_token' => $this->config['access_token']), $zip_url);
        }


        if (!isset($this->config['new_version']))
            $this->config['new_version'] = $this->get_new_version();

        if (!isset($this->config['last_updated']))
            $this->config['last_updated'] = $this->get_date();

        if (!isset($this->config['description']))
            $this->config['description'] = $this->get_description();

        $dataTheme = $this->get_theme_data();

        if (!isset($this->config['plugin_name']))
            $this->config['plugin_name'] = $dataTheme['Name'];

        if (!isset($this->config['version']))
            $this->config['version'] = $dataTheme['Version'];

        if (!isset($this->config['author']))
            $this->config['author'] = $dataTheme['Author'];

        if (!isset($this->config['homepage']))
            $this->config['homepage'] = $dataTheme->get('ThemeURI');

        if (!isset($this->config['readme']))
            $this->config['readme'] = 'README.md';
    }

    public function rename_github_folder($source, $remote_source, $wp_upgrader)
    {
        global $wp_filesystem;
        if (isset($this->config['proper_folder_name']) && !empty($this->config['proper_folder_name'])) {
            $proper_folder_name = $this->config['proper_folder_name'];
            $new_source = trailingslashit(dirname($source)) . $proper_folder_name;

            $wp_filesystem->move($source, $new_source, false);
            return rtrim($new_source, '/') . '/';
        }

        return $source;
    }


    /**
     * Callback fn for the http_request_timeout filter
     *
     * @return int timeout value
     * @since 1.0
     */
    public function http_request_timeout()
    {
        if (!isset($this->config['slug']) || $this->config['slug'] !== basename($this->config['slug'])) {
            return 2;
        }
        return 2;
    }

    /**
     * Callback fn for the http_request_args filter
     *
     * @param $args
     * @param $url
     *
     * @return mixed
     */
    public function http_request_sslverify($args, $url)
    {
        if ($this->config['zip_url'] == $url)
            $args['sslverify'] = $this->config['sslverify'];

        return $args;
    }

    public function download_upgrade($bool, $url)
    {
        try {
            $tmpfname = wp_tempnam(basename(parse_url($url, PHP_URL_PATH)));
            $arguments = array(
                'timeout' => 300,
                'stream' => true,
                'filename' => $tmpfname,
            );
            if (!empty($this->config['access_token'])) {
                $arguments['headers'] = [];
                $arguments['headers']['Authorization'] = "Bearer {$this->config['access_token']}";
            }
            $response = wp_safe_remote_get(
                $url,
                $arguments
            );
            $content_disposition = wp_remote_retrieve_header($response, 'Content-Disposition');

            if ($content_disposition) {
                $content_disposition = strtolower($content_disposition);

                if (0 === strpos($content_disposition, 'attachment; filename=')) {
                    $tmpfname_disposition = sanitize_file_name(substr($content_disposition, 21));
                } else {
                    $tmpfname_disposition = '';
                }

                // Potential file name must be valid string.
                if ($tmpfname_disposition && is_string($tmpfname_disposition)
                    && (0 === validate_file($tmpfname_disposition))
                ) {
                    $tmpfname_disposition = dirname($tmpfname) . '/' . $tmpfname_disposition;

                    if (rename($tmpfname, $tmpfname_disposition)) {
                        $tmpfname = $tmpfname_disposition;
                    }

                    if (($tmpfname !== $tmpfname_disposition) && file_exists($tmpfname_disposition)) {
                        unlink($tmpfname_disposition);
                    }
                }
            }

            $content_md5 = wp_remote_retrieve_header($response, 'Content-MD5');

            if ($content_md5) {
                $md5_check = verify_file_md5($tmpfname, $content_md5);

                if (is_wp_error($md5_check)) {
                    unlink($tmpfname);
                    return $md5_check;
                }
            }

            return $tmpfname;

        } catch (Exception $e) {
            return false;
        }
    }


    /**
     * Get New Version from GitHub
     *
     * @return int $version the version number
     * @since 1.0
     */
    public function get_new_version()
    {
        $version = get_site_transient(md5($this->config['slug']) . '_new_version');

        if ($this->overrule_transients() || (!isset($version) || !$version || '' == $version)) {

            $raw_response = $this->remote_get(trailingslashit($this->config['raw_url']) . basename($this->config['slug']));

            if (is_wp_error($raw_response))
                $version = false;

            if (is_array($raw_response)) {
                if (!empty($raw_response['body']))
                    preg_match('/.*Version\:\s*(.*)$/mi', $raw_response['body'], $matches);
            }

            if (empty($matches[1]))
                $version = false;
            else
                $version = $matches[1];

            // back compat for older readme version handling
            // only done when there is no version found in file name
            if (false === $version) {
                $readme = trailingslashit($this->config['raw_url']) . $this->config['readme'];
                if (!empty($this->config['access_token']))
                    $readme = str_replace('https://', "https://{$this->config['access_token']}@", $readme);
                $raw_response = $this->remote_get($readme);
                if (is_wp_error($raw_response))
                    return $version;

                preg_match('#^\s*`*~Current Version\:\s*([^~]*)~#im', $raw_response['body'], $__version);

                if (isset($__version[1])) {
                    $version_readme = $__version[1];
                    if (-1 == version_compare($version, $version_readme))
                        $version = $version_readme;
                }
            }
            // refresh every 6 hours
            if (false !== $version)
                set_site_transient(md5($this->config['slug']) . '_new_version', $version, 60 * 60 * 6);
        }
        return $version;
    }


    /**
     * Interact with GitHub
     *
     * @param string $query
     *
     * @return mixed
     * @since 1.6
     */
    public function remote_get($query)
    {
        $arguments = [
            'sslverify' => $this->config['sslverify'],
        ];
        if (!empty($this->config['access_token'])) {
            $query = add_query_arg(array('access_token' => $this->config['access_token']), $query);
            $arguments['headers'] = [];
            $arguments['headers']['Authorization'] = "Bearer {$this->config['access_token']}";
        }
        return wp_remote_get($query, $arguments);
    }


    /**
     * Get GitHub Data from the specified repository
     *
     * @return array $github_data the data
     * @since 1.0
     */
    public function get_github_data()
    {
        if (isset($this->github_data) && !empty($this->github_data)) {
            $github_data = $this->github_data;
        } else {
            $github_data = get_site_transient(md5($this->config['slug']) . '_github_data');

            if ($this->overrule_transients() || (!isset($github_data) || !$github_data || '' == $github_data)) {
                $github_data = $this->remote_get($this->config['api_url']);
                if (is_wp_error($github_data))
                    return false;

                $github_data = json_decode($github_data['body']);

                // refresh every 6 hours
                set_site_transient(md5($this->config['slug']) . '_github_data', $github_data, 60 * 60 * 6);
            }

            // Store the data in this class instance for future calls
            $this->github_data = $github_data;
        }
        return $github_data;
    }


    /**
     * Get update date
     *
     * @return string $date the date
     * @since 1.0
     */
    public function get_date()
    {
        $_date = $this->get_github_data();
        return (!empty($_date->updated_at)) ? date('Y-m-d', strtotime($_date->updated_at)) : false;
    }


    /**
     * Get plugin description
     *
     * @return string $description the description
     * @since 1.0
     */
    public function get_description()
    {
        $_description = $this->get_github_data();
        return (!empty($_description->description)) ? $_description->description : false;
    }


    /**
     * Get Plugin data
     *
     * @return object $data the data
     * @since 1.0
     */
    public function get_theme_data()
    {
        include_once ABSPATH . '/wp-admin/includes/plugin.php';
        $data = wp_get_theme(get_template());
        return $data;
    }


    /**
     * Hook into the plugin update check and connect to GitHub
     *
     * @param object $transient the plugin data transient
     * @return object $transient updated plugin data transient
     * @since 1.0
     */
    public function api_check($transient)
    {

        // Check if the transient contains the 'checked' information
        // If not, just return its value without hacking it
        if (empty($transient->checked))
            return $transient;

        // check the version and decide if it's new
        $update = version_compare($this->config['new_version'], $this->config['version']);
        //// error_log('versiones: ' . print_r($update, true));
        $update = apply_filters('wp_github_update_check', $update, $this->config['new_version'], $this->config['version']);

        if (1 === $update) {
            $response = new stdClass;
            $response->new_version = $this->config['new_version'];
            $response->slug = $this->config['proper_folder_name'];
            $response->url = add_query_arg(array('access_token' => $this->config['access_token']), $this->config['github_url']);
            $response->package = $this->config['zip_url'];
            // If response is false, don't alter the transient
            if (false !== $response)
                $transient->response[$this->config['proper_folder_name']] = (array)$response;
        }

        return $transient;
    }


    /**
     * Get Plugin info
     *
     * @param bool $false always false
     * @param string $action the API function being performed
     * @param object $args plugin arguments
     * @return object $response the plugin info
     * @since 1.0
     */
    public function get_plugin_info($false, $action, $response)
    {
        // Check if this call API is for the right plugin
        if (!isset($response->slug) || $response->slug != $this->config['slug'])
            return false;

        $response->slug = $this->config['slug'];
        $response->plugin_name = $this->config['plugin_name'];
        $response->version = $this->config['new_version'];
        $response->author = $this->config['author'];
        $response->homepage = $this->config['homepage'];
        $response->requires = $this->config['requires'];
        $response->tested = $this->config['tested'];
        $response->downloaded = 0;
        $response->last_updated = $this->config['last_updated'];
        $response->sections = array('description' => $this->config['description']);
        $response->download_link = $this->config['zip_url'];

        return $response;
    }


    /**
     * Upgrader/Updater
     * Move & activate the plugin, echo the update message
     *
     * @param boolean $true always true
     * @param mixed $hook_extra not used
     * @param array $result the result of the move
     * @return array $result the result of the move
     * @since 1.0
     */
    public function upgrader_post_install($true, $hook_extra, $result)
    {
        global $wp_filesystem;
        // Move & Activate
        $wp_filesystem->move($result['destination'], $this->config['slug']);
        $result['destination'] = $this->config['slug'];
        $wp_filesystem->delete(WP_CONTENT_DIR . '/upgrade', true);
        $wp_filesystem->delete(WP_CONTENT_DIR . '/upgrade-temp-backup', true);
        return $result;

    }
}
