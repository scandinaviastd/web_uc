<div class="container d-none d-lg-block">
    <div class="row align-items-center">
        <div class="col-lg-3">
            <img style="max-height:80px" src="<?php echo $marca_logo_submarca ?>" alt="Logo" class="img-fluid">
        </div>
        <div class="col-lg-9 text-right">
            <div class="p-text--condensed <?php echo !empty($is_dark) ? 'color-white' : 'p-color--gray' ?>">
                <?php echo $blogdescription ?>
            </div>
        </div>
    </div>
    <?php

    wp_nav_menu(array(
        'theme_location' => 'uc-kit-navbar_nav',
        'container' => false,
        'menu_class' => 'uc-navbar_nav',
        'walker' => new Desplegable_Nav(),
        'fallback_cb' => array('UCKitWPMenu', 'menuFallback'),
    ));
    ?>
</div>
