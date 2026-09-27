<?php
if ( ! class_exists( 'UCKitWPAdmin' ) ) {
    /**
     * Class UCKitWP
     */
    class UCKitWPAdmin {

        /**
         * init
         */
        public static function init(){
            $activated = get_option('uckit_init');
            if(empty($activated)){
                update_option('uckit_init',true);
                ?>
                <script>window.location.href = '<?php echo get_home_url().'/wp-admin/admin.php?page=kit-uc' ?>'</script>
                <?php
            }
        }

        /**
         * menus
         */
        public static function menus(){
            $menus = [
                'kit-uc' => [
                    'title' => 'Kit UC',
                    'icon' => get_template_directory_uri().'/admin/assets/img/icon.png" style="padding:5px 0 0 0',
                    //'position' => 81,
                    'capability' => 'manage_options'
                ],
            ];
            UCKitWPAdmin::addMenus($menus);
        }

        /**
         * admin
         */
        public static function admin(){
            //  wp_enqueue_style('uc-kitdigital', 'https://kit-digital-uc-prod.s3.amazonaws.com/uc-kitdigital%40v1.23.15-beta.1/uc-kitdigital.css', [], '1.23.15-beta.1' );
            include __DIR__.'/../views/index.php';
        }

        /**
         * add menus
         * @param $menus
         */
        public static function addMenus($menus){
            foreach($menus as $key => $value){
                $position = null;
                if(!empty($value['position'])) $position = $value['position'];
                /*
				2 – Dashboard
				4 – Separator
				5 – Posts
				10 – Media
				15 – Links
				20 – Pages
				25 – Comments
				59 – Separator
				60 – Appearance
				65 – Plugins
				70 – Users
				75 – Tools
				80 – Settings
				99 – Separator
				*/
                add_menu_page($value['title'],$value['title'],$value['capability'],''.$key,'UCKitWPAdmin::admin',$value['icon'],$position);
            }
        }
    }
}
