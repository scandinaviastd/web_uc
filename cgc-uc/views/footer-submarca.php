<?php
$show_sello = get_theme_mod('uckit_show_acreditacion', false);
$tipo_marca = get_theme_mod('uckit_menu_type', 'none');
$marca_logo = get_theme_mod('uckit_footer_image', 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-submarca.svg');

// Mostrar footer especial si es submarca y sello desactivado
if (in_array($tipo_marca, ['submarca', 'submarca_con_slogan', 'submarca_con_slogan_alpha']) && !$show_sello) : ?>
    <footer class="uc-footer">
        <div class="container pb-80">
            <div class="row align-items-center justify-content-between">
                <div class=" col-6 col-md-5 col-lg-4 col-xl-3 mb-32">
                    <a href="<?php echo get_home_url(); ?>">
                        <img
                            src="<?php echo esc_url($marca_logo); ?>"
                            alt="Logo UC"
                            class="img-fluid my-12"/>
                    </a>
                </div>
                <div class="col-lg-4 text-left text-lg-right">
                    <div class="uc-subtitle color-white mb-16"><?php echo get_option('blogname'); ?></div>
                    <div class="mb-16"><?php echo get_theme_mod('uckit_address', 'El Comendador 1916, Providencia.'); ?></div>
                    <div class="mb-16"><i class="uc-icon">phone</i> <?php echo get_theme_mod('uckit_phone', '(56)23545534'); ?></div>
                    <div class="mb-32">
                        <?php include __DIR__ . '/footer-social-media.php'; ?>
                    </div>
                </div>
            </div>
        </div>
        <div id="uc-global-footer"></div>
    </footer>
<?php
    return;
endif;
?>

<?php
$show_sello = get_theme_mod('uckit_show_acreditacion', false);
$tipo_sello = get_theme_mod('uckit_tipo_sello_acreditacion', 'horizontal');
$sello_url = '';
$is_vertical = false;

$verticales = [
    'vertical',
    '7_vertical_areas',
    '7_vertical_sin_areas',
];

$horizontales = [
    'horizontal',
    '7_horizontal_areas',
    '7_horizontal_sin_areas',
];

//Imagenes sellos
if ($show_sello) {
    switch ($tipo_sello) {
        case 'horizontal':
            $sello_url = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/acreditaciones/acreditacion-01.svg';
            break;
        case 'vertical':
            $sello_url = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/acreditaciones/acreditacion-02.svg';
            $is_vertical = true;
            break;
        case '7_horizontal_areas':
            $sello_url = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/acreditaciones/acreditacion_7_grande_areas_v3.svg';
            break;
        case '7_horizontal_sin_areas':
            $sello_url = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/acreditaciones/acreditacion_7_grande_sin-areas_v9.svg';
            break;
        case '7_vertical_areas':
            $sello_url = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/acreditaciones/acreditacion_7_grande_areas_v6.svg';
            $is_vertical = true;
            break;
        case '7_vertical_sin_areas':
            $sello_url = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/acreditaciones/acreditacion_7_grande_sin-areas_v11.svg';
            $is_vertical = true;
            break;
    }
}


// ALT sellos
$alt_img = 'Sello de acreditación';

// Según el tipo de sello
if (in_array($tipo_sello, $verticales)) {
    switch ($tipo_sello) {
        case '7_vertical_sin_areas':
            $alt_img = 'Logotipo del proceso de Acreditación Institucional con el número 7 prominente, el texto Máxima Acreditación en todas las áreas, y la fecha de finalización.';
            break;
        case '7_vertical_areas':
            $alt_img = 'Logotipo del proceso de Acreditación Institucional con el número 7 destacado, el texto Máxima Acreditación en todas las áreas, incluyendo áreas de docencia de pregrado, gestión institucional, docencia de postgrado, investigación y vinculación, y la fecha de finalización.';
            break;
        case 'vertical':
            $alt_img = 'Logotipo del proceso de Acreditación Institucional';
            break;
    }
} elseif (in_array($tipo_sello, $horizontales)) {
    switch ($tipo_sello) {
        case '7_horizontal_sin_areas':
            $alt_img = 'Logotipo del proceso de Acreditación Institucional con el número 7 prominente, el texto Máxima Acreditación en todas las áreas, y la fecha de finalización.';
            break;
        case '7_horizontal_areas':
            $alt_img = 'Logotipo del proceso de Acreditación Institucional con el número 7 destacado, el texto Máxima Acreditación en todas las áreas, incluyendo áreas de docencia de pregrado, gestión institucional, docencia de postgrado, investigación y vinculación, y la fecha de finalización.';
            break;
        case 'horizontal':
            $alt_img = 'Logotipo del proceso de Acreditación Institucional';
            break;
    }
}

?>

<footer class="uc-footer">
    <div class="container pb-60">
        <div class="row">
			<div class="<?php echo $is_vertical ? 'col-sm-6 col-md-8 col-lg-8 col-xl-9 mb-32' : 'col-sm-6 col-md-8 col-lg-8 col-xl-9 mb-32'; ?>">
				<div class="row">
					<!-- Logo UC -->
					<div class="<?php echo $is_vertical ? 'col-6 col-sm-11 col-md-6 col-lg-5 col-xl-4 mb-8' : 'col-6 col-sm-11 col-md-6 col-lg-5 col-xl-4 mb-32'; ?>">
						<a href="<?php echo get_home_url(); ?>">
							<img src="<?php echo $marca_logo ?>" alt="Logo UC" class="img-fluid my-12">
						</a>
					</div>
					<!-- Titulo y contacto -->
					<div class="<?php echo $is_vertical ? 'col-12 col-md-8 col-lg-8 col-xl-7 offset-xl-1 mt-20' : 'col-12 col-md-8 col-lg-8 col-xl-7 offset-xl-1 mt-20'; ?>">
						<div class="<?php echo $is_vertical ? 'uc-subtitle color-white mb-16 text-start' : 'uc-subtitle color-white mb-16 text-start' ; ?>"?><?php echo get_option('blogname')?></div>
						<div class="<?php echo $is_vertical ? 'mb-16 text-start' : 'mb-16 text-start' ; ?>"><?php echo get_theme_mod('uckit_address', 'El Comendador 1916, Providencia.') ?></div>
						<div class="<?php echo $is_vertical ? 'mb-16 text-start' : 'mb-16 text-start' ; ?>"><i class="uc-icon">phone</i> <?php echo get_theme_mod('uckit_phone', '(56)23545534') ?></div>
						<div class="mb-32">
							<?php include __DIR__ . '/footer-social-media.php'; ?>
						</div>
					</div>
				</div>
			</div>
            <!-- Sello de acreditacion -->
            <?php if ($show_sello && $sello_url): ?>
                <div class="<?php echo $is_vertical ? 'col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-20 text-sm-right' : 'col-sm-12 col-md-4 col-lg-4 col-xl-3 mt-20 text-md-right text-lg-right text-xl-right'; ?>">
                    <div class="uc-sello-footer <?php echo $is_vertical ? 'sello-vertical' : 'sello-horizontal'; ?>">
                        <img src="<?php echo esc_url($sello_url); ?>"
                            alt="<?php echo esc_attr($alt_img); ?>"
                            class="img-fluid"
                            style="<?php
                                    echo $tipo_sello === '7_vertical_sin_areas'
                                        ? 'max-width:100px;'
                                        : ($tipo_sello === '7_horizontal_sin_areas'
                                            ? 'max-width:200px;'
                                            : ($is_vertical
                                                ? 'max-height:260px;'
                                                : 'max-width:220px;'));
                                    ?>">
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <div id="uc-global-footer"></div>
    <div class="uc-dev-footer">
        <div class="container">
            <ul class="uc-footer-dev_content">
                <?php echo $auxFooter ?>
                <li>Utilizando el <a href="https://kitdigital.uc.cl/" class="external" style="color: #0176de">Kit Digital</a> y la <a href="https://plantilla.kitdigital.uc.cl/" class="external" style="color: #0176de">Plantilla Kit Wordpress</a></li>
            </ul>
        </div>
    </div>
</footer>