<div class="container d-none d-lg-block">

  <div class="row">

    <div class="col-3">

      <img src="<?php echo $marca_logo_submarca ?>" alt="Pontificia Universidad Católica de Chile" class="img-fluid" />

    </div>

    <?php

    if (!empty($blogdescription)) { ?>

      <div class="col-9 mt-24 d-flex justify-content-end <?php echo !empty($is_dark) ? 'color-white' : 'text-color--gray' ?>">

        <?php echo $blogdescription ?>

      </div>

    <?php } ?>

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