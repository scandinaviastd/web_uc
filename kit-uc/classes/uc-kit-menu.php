<?php
if ( ! class_exists( 'UCKitWPMenu' ) ) {
    /**
     * Class UCKitWPMenu
     */
    class UCKitWPMenu {

        /**
         * init
         */
        public static function init(){
            register_nav_menus(array(
                // 'uc-kit-top-bar_links' => __( 'UC Kit Menú Superior' ),
                'uc-kit-navbar_nav'  => __( 'UC Kit Menú Principal' ),
                'uc-kit-footer_social'  => __( 'UC Kit Redes Sociales' ),
            ));
        }

        /**
         * get items
         *
         * @param $menu_slug
         *
         * @return array|false
         */
        public static function getItems($menu_slug){
            $menu_items = array();
            if ( ($locations = get_nav_menu_locations()) && isset($locations[$menu_slug]) ) {
                $menu = get_term($locations[$menu_slug]);
                // Verificar si $menu no es un objeto WP_Error
                if ($menu && !is_wp_error($menu)) {
                    $menu_items = wp_get_nav_menu_items($menu->term_id);
                }
            }
            return $menu_items;
        }

        /**
         * get menu items
         *
         * @param $menu_slug
         *
         * @return array
         */
        public static function getMenuItems($menu_slug){
            global $post;
            $ids = [$post->ID];
            if(!empty($post->post_parent)){
                $parent = get_post($post->post_parent);
                $ids[] = $parent->ID;
            }
            else if($post->post_type == 'post'){
                $pid = UCKitWP::getNewsPostId();
                if(!empty($pid)) $ids[] = intval($pid);
            }
            // $kitPage = $GLOBALS['uc-kit-page'];
            $items = [];
            $menu_items = UCKitWPMenu::getItems($menu_slug);
            if(is_array($menu_items)){
                foreach($menu_items as &$item){
                    $item = (array) $item;
                    if(in_array($item['object_id'],$ids)) $item['active'] = true;
                    else $item['active'] = false;

                    if($item['menu_item_parent'] < 1){
                        $items[] = $item;
                    }
                    // TODO: else
                }
            }
            return $items;
        }

        /**
         * Fallback para cuando no hay menú asignado
         * Muestra un aviso solo a administradores.
         */
        public static function menuFallback() {
            if ( current_user_can( 'manage_options' ) ) {
                echo '<div style="background-color: #f8dedc; color: #b32d2e; padding: 12px; border: 1px solid #ebccd1; border-radius: 4px; margin: 10px 0; font-size: 14px;">';
                echo '<strong>Kit UC:</strong> No se ha asignado un menú a la ubicación "UC Kit Menú Principal" (<code>uc-kit-navbar_nav</code>).<br>';
                echo 'Por favor ve a <a href="' . admin_url('nav-menus.php?action=locations') . '">Apariencia > Menús > Gestionar ubicaciones</a> y asigna un menú.';
                echo '</div>';
            }
        }
    }
}
