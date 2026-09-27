<div class="container d-none d-lg-block">
    <div class="row">
        <div class="col-lg-6">
            <img style="width:700px;height:100px" src="<?php echo $marca_logo ?>" alt="Logo de Facultad" class="img-fluid">
        </div>
    </div>
    <?php

    wp_nav_menu(array(
		'theme_location' => 'uc-kit-navbar_nav',
		'container' => false,
		'menu_class' => 'uc-navbar_nav',
		'walker' => new Desplegable_Nav(),
		'is_alpha' => !empty($is_dark),
        'fallback_cb' => array('UCKitWPMenu', 'menuFallback'),
	));
    ?>
</div>
