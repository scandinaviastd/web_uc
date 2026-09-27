<?php
global $is_dark;
$is_dark = !empty(get_theme_mod('uckit_menu_dark')) ? 'navbar-dark' : '';
$alert_id = get_option('uckit_alert_id', 'default_id');
$menu_tipo = get_theme_mod('uckit_menu_type');
$tipo_alerta = get_theme_mod('uckit_alert');
$alert_text = get_theme_mod('uckit_alert_text');
$alert_text_sanitized = wp_kses_post($alert_text);
$alert_text_without_p = strip_tags($alert_text_sanitized, '<span><em><strong><a>');
$marca_logo_submarca = get_theme_mod('uckit_menu_image');
if (empty($marca_logo)) {
    if ($is_dark) $marca_logo = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-chile-blanco.svg';
    else $marca_logo = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-chile-azul.svg';
}

$menu_items = UCKitWPMenu::getMenuItems('uc-kit-navbar_nav');
$blogname = get_option('blogname');
$blogdescription = get_option('blogdescription');
$classTopBarAlpha = '';
?>
<header id="uc-header" class="uc-header">
    <?php
    switch ($menu_tipo) {
        case 'denominacion_internacional':
            $classDiv = 'uc-global-topbar-ucchile';
            break;
        case 'header_denominacion_alpha':
            $classDiv = 'uc-global-topbar';
            $classTopBarAlpha = 'uc-top-bar--bg-primary';
            if (is_front_page()) {
                $otraClassDiv = 'navbar-transparent navbar--absolute';
            }
            break;
        case 'denominacion_internacional_alpha':
        case 'submarca_con_slogan_alpha':
            $classDiv = 'uc-global-topbar-ucchile';
            $classTopBarAlpha = 'uc-top-bar--bg-primary';
            if (is_front_page()) {
                $otraClassDiv = 'navbar-transparent navbar--absolute';
            }
            break;
        default:
            if ((defined('ICL_LANGUAGE_CODE') && 'en' == ICL_LANGUAGE_CODE) /*(wp-lang)*/ || (function_exists('pll_current_language') && pll_current_language() == 'en')) /*(polylang)*/
                $classDiv = 'uc-global-topbar-en';
            else
                $classDiv = 'uc-global-topbar';
            break;
    }

    if ($tipo_alerta != 'none' && $tipo_alerta != false) {
        ?>
            <div id="alerta-tie-<?php echo $alert_id; ?>" style="padding-bottom: 42px; display: none;">
                <div id="tie" class="tie-border-<?= $tipo_alerta ?>">
                    <div class="container">
                        <div class="uc-alert tie-<?= $tipo_alerta ?>" style="border: 0">
                            <div class="uc-alert_content"><i class="uc-icon icon-size--sm"><?= ($tipo_alerta == 'info') ? 'info' : (($tipo_alerta == 'success') ? 'check_circle' : (($tipo_alerta == 'warning') ? 'warning' : 'cancel' )) ?></i> <span class="p p-size--sm bold my-8"><?= $alert_text_without_p !== 'Máximo 130 carácteres' ? $alert_text_without_p : '' ; ?></span></div>
                            <div class="uc-alert_close ml-12" style="cursor: pointer; align-self: flex-start;"><i class="uc-icon">close</i></div>
                        </div>
                    </div>
                </div>
            </div>
        <?php
        }
    ?>
    <div id="<?php echo $classDiv ?>" <?php echo ($classTopBarAlpha != null && is_front_page()) ? "class='$classTopBarAlpha'" : ''; ?>></div>
  
    <nav class="uc-navbar <?php echo !empty($is_dark) ? 'navbar-dark' : '';
                            echo !empty($otraClassDiv) ? ' ' . $otraClassDiv : ''; ?>">
        <!-- Menú para versión Escritorio -->
        <?php
        ($classTopBarAlpha != null || $classTopBarAlpha != '') ? "class='$classTopBarAlpha'" : '';
        switch ($menu_tipo) {
            case 'denominacion_internacional':
                if ($is_dark) {
                    $marca_logo = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-chile-blanco.svg';
                } else {
                    $marca_logo = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-chile-azul.svg';
                }
                include __DIR__ . '/header-denominacion_marca_internacional_desplegable.php';
                break;
                //            case 'denominacion':
                //                include __DIR__ . '/header-denominacion.php';
                //                break;
            case 'submarca':
                if($marca_logo_submarca == "") $marca_logo_submarca = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-chile-azul.svg';
                include __DIR__ . '/header-submarca.php';
                break;
            case 'submarca_con_slogan':
                if($marca_logo_submarca == "") $marca_logo_submarca = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-chile-azul.svg';
                include __DIR__ . '/header-submarca_con_slogan.php';
                break;
            case 'submarca_con_slogan_alpha':
                if (is_front_page()) {
                    $is_dark = true;
                    if($marca_logo_submarca == "") $marca_logo_submarca ='https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-chile-blanco.svg';
                    include __DIR__ . '/header-submarca_con_slogan-alpha.php';
                } else {
                    include __DIR__ . '/header-submarca_con_slogan.php';
                }
                break;
            case 'header_denominacion_alpha':
                if (is_front_page()) {
                    $marca_logo = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-blanco.svg';
                    $is_dark = true;
                    include __DIR__ . '/header-denominacion-alpha.php';
                } else {
                    ($is_dark == true) ? $marca_logo = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-blanco.svg' : $marca_logo = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-azul.svg';
                    //$marca_logo = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-azul.svg';

                    include __DIR__ . '/header-denominacion.php';
                }
                break;
            case 'denominacion_internacional_alpha':
                if (is_front_page()) {
                    $is_dark = true;
                    $marca_logo = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-chile-blanco.svg';
                    include __DIR__ . '/header-denominacion_internacional-alpha.php';
                } else {
                    include __DIR__ . '/header-denominacion_marca_internacional_desplegable.php';
                }
                break;
            default:
                if ($is_dark) {
                    $marca_logo = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-blanco.svg';
                } else {
                    $marca_logo = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-azul.svg';
                }
                include __DIR__ . '/header-denominacion.php';
                break;
        }
        ?>
        <!-- Menú para versión Móvil -->
        <div class="uc-navbar_mobile navbar_mobile-slide d-block d-lg-none">
            <div class="uc-navbar_mobile-bar navbar-brand">
                <div class="uc-navbar_mobile-logo navbar-light">
                    <?php
                    if (in_array($menu_tipo, ['submarca', 'submarca_con_slogan'])) {
                    ?>
                        <img src="<?php echo $marca_logo_submarca ?>" alt="Logo" class="img-fluid">
                    <?php
                    } else {
                    ?>
                        <div class="h2 text-font--serif <?php echo !empty($is_dark) ? 'color-white' : 'text-color--blue' ?>"><?php echo $blogname ?></div>
                        <?php
                        if (!empty($blogdescription)) {
                        ?>
                            <div class="p-size--lg <?php echo !empty($is_dark) ? 'color-white' : 'text-color--gray' ?>"><?php echo $blogdescription ?></div><?php
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                            ?>
                </div>
                <a href="javascript:void(0);" class="uc-navbar_mobile-button">
                    <span class="uc-icon">
                    </span>
                    Menú
                </a>
            </div>
            <div class="uc-navbar_mobile-content">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'uc-kit-navbar_nav',
                    'container' => false,
                    'menu_class' => 'uc-navbar_mobile-list',
                    'walker' => new Mobile_Nav(),
                    'fallback_cb' => array('UCKitWPMenu', 'menuFallback'),
                ));
                ?>
            </div>
        </div>
    </nav>
</header>
<script>
    document.addEventListener('DOMContentLoaded', (event) => {
        var alertElement = document.querySelector('[id^="alerta-tie"]');
        if (!alertElement) return;

        // Obtiene el ID actual de la alerta
        var currentAlertId = alertElement.getAttribute('id');
        var lastAlertId = localStorage.getItem('lastAlertId');

        // Mostrar la alerta solo si el ID actual es distinto al último cerrado
        if (currentAlertId !== lastAlertId) {
            alertElement.style.display = 'block';
        }

        var closeButton = alertElement.querySelector('.uc-alert_close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                // Ocultar la alerta
                alertElement.style.display = 'none';

                // Guardar el ID de la alerta cerrada en localStorage
                localStorage.setItem('lastAlertId', currentAlertId);
            });
        }
    });
</script>

