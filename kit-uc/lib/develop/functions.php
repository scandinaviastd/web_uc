<?php
/*
add_filter('style_loader_tag', function($tag){
    return preg_replace("/='stylesheet' id='uc-kitdigital-css'/", "='preload' id='uc-kitdigital-css'", $tag);
});
*/

$isTesting = false;
if(!defined('_VER') && $isTesting && strpos(__DIR__,'/efexi/web/uc/') !== FALSE){
    define('_VER',mt_rand(0,9999));

    /**
     * Register and Enqueue Styles.
     */
    function uc_register_styles() {
        wp_enqueue_style('uc-kitdigital', get_home_url() . '/kit/uc-kitdigital.css', [], '1.23.15-beta.1' );
        wp_enqueue_style('uc-kit', get_template_directory_uri() . '/assets/css/index.css', [], _VER );
    }
    add_action('wp_enqueue_scripts', 'uc_register_styles' );

    /**
     * Register and Enqueue Scripts.
     */
    function uc_register_scripts() {
        wp_enqueue_script("jquery",null,null,null,true);
        wp_enqueue_script("moment",null,null,null,true);
        wp_enqueue_script('uc-index', get_template_directory_uri() . '/assets/js/index.js', ['jquery','moment'], _VER, true );
        wp_enqueue_script('uc-components', get_home_url() . '/wp-json/uc-kit/1/components.js', ['uc-index'], _VER, true );
        wp_enqueue_script('uc-news', get_template_directory_uri() . '/assets/js/news.js', ['uc-index','uc-components'], _VER, true );
        wp_enqueue_script('uc-kitdigital', get_home_url().'/kit/uc-kitdigital.js', [], '1.23.15-beta.1', true );
        // wp_script_add_data( 'uc-index', 'async', true );
    }
    add_action('wp_enqueue_scripts', 'uc_register_scripts' );

    function eos_watch_javascript_footer() {
        if(file_exists('/efexi/exoro/scripts/lib/api/watch.js')){
            ?><script type="text/javascript">
                <?php echo file_get_contents('/efexi/exoro/scripts/lib/api/watch.js'); ?>
            </script><?php
        }
    }
    add_action('wp_footer', 'eos_watch_javascript_footer');
    function remove_wp_polyfill( $scripts ) {
        if ( ! is_admin() ) {
            // Desregistrar wp-polyfill y scripts relacionados
            $scripts->remove( 'wp-polyfill' );
            $scripts->remove( 'wp-polyfill-fetch' );
            $scripts->remove( 'wp-polyfill-formdata' );
            $scripts->remove( 'wp-polyfill-node-contains' );
            $scripts->remove( 'wp-polyfill-element-closest' );
            $scripts->remove( 'wp-polyfill-object-fit' );
            $scripts->remove( 'wp-polyfill-url' );
            $scripts->remove( 'wp-polyfill-dom-rect' );
            $scripts->remove( 'wp-polyfill-focus-within' );
            $scripts->remove( 'wp-polyfill-requestanimationframe' );
            $scripts->remove( 'regenerator-runtime' );

            // Remover wp-polyfill de las dependencias de otros scripts
            foreach ( $scripts->registered as $handle => $script ) {
                if ( ! empty( $script->deps ) && in_array( 'wp-polyfill', $script->deps ) ) {
                    $scripts->registered[ $handle ]->deps = array_diff( $script->deps, array( 'wp-polyfill' ) );
                }
            }
        }
    }
    add_action( 'wp_default_scripts', 'remove_wp_polyfill' );
}

