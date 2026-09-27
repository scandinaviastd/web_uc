<?php
$withAdmin = false;
if($withAdmin && is_admin()){
    include __DIR__.'/clases/uc-kit-admin.php';
    add_action( 'admin_init', 'UCKitWPAdmin::init' );
    add_action( 'admin_menu', 'UCKitWPAdmin::menus' );
}
