<div class="container d-none d-lg-block">
    <div class="row align-items-center">
        <div class="col-lg-3">
            <img style="max-height:80px;" src="<?php echo $marca_logo_submarca ?>" alt="Logo" class="img-fluid">
        </div>
        <div class="col-lg-9">
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
    </div>
</div>
