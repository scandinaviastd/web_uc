<div class="container d-none d-lg-block">

        <div class="row">

          <div class="col-lg-4 col-xl-3 pr-40">

            <img src="<?php echo $marca_logo ?>" alt="Pontificia Universidad Católica de Chile" class="img-fluid" />

          </div>

          <div class="col-lg-7 col-xl-9 pl-44">

            <div class="h2 text-font--serif mt-24 <?php echo !empty($is_dark) ? 'color-white' : 'text-color--blue' ?>"><?php echo $blogname ?></div>

            <?php

              if(!empty($blogdescription)){

                ?><div class="p-size--lg <?php echo !empty($is_dark) ? 'color-white' : 'text-color--gray' ?>">

              <?php echo $blogdescription ?></div><?php

            }

            ?>

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

