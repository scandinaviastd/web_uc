<?php
if ( ! class_exists( 'UCKitWP_Gutenberg' ) ) {

    if(!defined('_VER')) define('_VER',wp_get_theme()->get( 'Version' ));

    /**
     * Class UCKitWP_Gutenberg
     */
    class UCKitWP_Gutenberg {

        public static function theme_url($path, $file) {
            // Normalizamos las rutas
            $dir = wp_normalize_path(dirname($file));
            $abspath = wp_normalize_path(ABSPATH);

            // Eliminamos ABSPATH de la ruta
            $dir = str_replace($abspath, '', $dir);

            // Construimos la URL correctamente
            return get_home_url() . '/' . ltrim($dir . '/' . $path, '/');
        }

        public static function init(){
            error_log('UCKitWP_Gutenberg::init called');
            $dir = dirname( __FILE__ );

            register_post_meta('page', '_uc_local_menu_enabled', [
                'type'         => 'boolean',
                'description'  => 'Toggle Menu Local',
                'single'       => true,
                'default'      => true,
                'show_in_rest' => true,
                'auth_callback' => function() {
                    return current_user_can('edit_posts');
                },
            ]);

            $script_asset_path = "$dir/build/index.asset.php";
            if ( ! file_exists( $script_asset_path ) ) {
                /** @noinspection PhpUnhandledExceptionInspection, PhpUndefinedClassInspection */
                throw new Error(
                    'You need to run `npm start` or `npm run build` for the "create-block/starter-block" block first.'
                );
            }
            $index_js     = 'build/index.js';

            /** @noinspection PhpIncludeInspection */
            $script_asset = require( $script_asset_path );

            $dependencies = isset($script_asset['dependencies']) && is_array($script_asset['dependencies'])
            ? array_merge($script_asset['dependencies'],[
                'wp-element',
                'wp-components',
                'wp-block-editor',
                'wp-editor',
                'wp-blocks',
                'kit-uc-components',
                'kit-uc-blocks',
                'wp-plugins',
                'wp-edit-post',
                'wp-data',
                'wp-i18n',
            ])
            : [
                'wp-element',
                'wp-components',
                'wp-block-editor',
                'wp-editor',
                'wp-blocks',
                'kit-uc-components',
                'kit-uc-blocks',
                'wp-plugins',
                'wp-edit-post',
                'wp-data',
                'wp-i18n',
            ];
            error_log('UCKitWP_Gutenberg::init called 2');

            // Handle sin src: solo transporta los globales que antes servía
            // /wp-json/uc-kit/1/components.js. Se mantiene el handle porque
            // 'kit-uc-blocks-editor' y 'kit-uc-blocks' lo declaran como dependencia.
            wp_register_script(
                'kit-uc-components',
                false,
                [],
                _VER
            );
            wp_add_inline_script('kit-uc-components', uc_kit_globals_js());
            error_log('UCKitWP_Gutenberg::init called 3');

            wp_register_script(
                'kit-uc-blocks',
                UCKitWP_Gutenberg::theme_url( '../uc-kit-blocks.js', __FILE__ ),
                [],
                mt_rand(0,999999)
            );
            error_log('../uc-kit-blocks.js, __FILE__');

            wp_register_script(
                'kit-uc-blocks-editor',
                UCKitWP_Gutenberg::theme_url( $index_js, __FILE__ ),
                $dependencies,
                $script_asset['version']
            );
            error_log('Script index_js kit-uc-blocks-editor registered');

            // wp_set_script_translations( 'kit-uc-blocks-editor', 'starter-block' );

            $editor_css = 'build/index.css';
            wp_register_style(
                'kit-uc-blocks-editor',
                UCKitWP_Gutenberg::theme_url( $editor_css, __FILE__ ),
                array(),
                filemtime( "$dir/$editor_css" )
            );

            $style_css = 'build/style-index.css';
            wp_register_style(
                'kit-uc-blocks',
                UCKitWP_Gutenberg::theme_url( $style_css, __FILE__ ),
                array(),
                filemtime( "$dir/$style_css" )
            );

            register_block_type( 'uc-kit/items', array(
                'editor_script' => 'kit-uc-blocks-editor',
                'editor_style'  => 'kit-uc-blocks-editor',
                'style'         => 'kit-uc-blocks',
            ) );
            error_log('Block uc-kit/items registered');


            register_block_type( 'uc-kit/section', array(
                'editor_script' => 'kit-uc-blocks-editor',
                'editor_style'  => 'kit-uc-blocks-editor',
                'style'         => 'kit-uc-blocks',
            ) );
            error_log('Block uc-kit/section registered');

            register_block_type( 'uc-kit/table', array(
                'editor_script' => 'kit-uc-blocks-editor',
                'editor_style'  => 'kit-uc-blocks-editor',
                'style'         => 'kit-uc-blocks',
            ) );

            register_block_type( 'uc-kit/accordion', array(
                'editor_script' => 'kit-uc-blocks-editor',
                'editor_style'  => 'kit-uc-blocks-editor',
                'style'         => 'kit-uc-blocks',
                'attributes'    => array(
                    'type' => array('type' => 'string', 'default' => 'accordion'),
                    'title' => array('type' => 'string', 'default' => ''),
                    'titleTag' => array('type' => 'string', 'default' => 'h2'),
                    'itemTitleTag' => array('type' => 'string', 'default' => 'h3'),
                )
            ));

            register_block_type( 'uc-kit/accordion-item', array(
                'editor_script' => 'kit-uc-blocks-editor',
                'editor_style'  => 'kit-uc-blocks-editor',
                'style'         => 'kit-uc-blocks',
                'attributes'    => array(
                    'title' => array('type' => 'string', 'default' => ''),
                )
            ) );

            register_block_type( 'uc-kit/carousel', array(
                'editor_script' => 'kit-uc-blocks-editor',
                'editor_style'  => 'kit-uc-blocks-editor',
                'style'         => 'kit-uc-blocks',
            ) );
            // register_block_type( 'uc-kit/schedule', array(
            //     'editor_script' => 'kit-uc-blocks-editor',
            //     'editor_style'  => 'kit-uc-blocks-editor',
            //     'style'         => 'kit-uc-blocks',
            // ) );
            register_block_type( 'uc-kit/alert', array(
                'editor_script' => 'kit-uc-blocks-editor',
                'editor_style'  => 'kit-uc-blocks-editor',
                'style'         => 'kit-uc-blocks',
            ) );

            register_block_type( 'uc-kit/divider', array(
                'editor_script' => 'kit-uc-blocks-editor',
                'editor_style'  => 'kit-uc-blocks-editor',
                'style'         => 'kit-uc-blocks',
            ) );
        }
    }
}