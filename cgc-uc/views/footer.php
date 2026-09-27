<?php

$menu_tipo = get_theme_mod('uckit_menu_type', 'denominacion');
$marca_logo = get_theme_mod('uckit_footer_image');
$designed = get_theme_mod('uckit_designed_by', 'Dirección de Visibilidad Digital');
$designerUrl = get_theme_mod('uckit_url_designer', 'http://digital.uc.cl/');
$both = get_theme_mod('uckit_both_design_and_development', false);
$developed = get_theme_mod('uckit_developed_by', 'Dirección de Visibilidad Digital');
$developerUrl = get_theme_mod('uckit_url_developer', 'http://digital.uc.cl/');
$adminBy = get_theme_mod('uckit_administrated_by', 'Dirección de Visibilidad Digital');
$adminUrl = get_theme_mod('uckit_url_administrated_by', 'http://digital.uc.cl/');
if (empty($designerUrl))
    $designerUrl = 'http://digital.uc.cl/';
if (empty($designed))
    $designed = 'Dirección de Visibilidad Digital';
if (empty($developerUrl))
    $developerUrl = 'http://digital.uc.cl/';
if (empty($developed))
    $developed = 'Dirección de Visibilidad Digital';
if ($both) {
    $auxFooter = '<li>Diseñado y Desarrollado por: <a href="' . $designerUrl . '" target="_blank" class="external text-primary" style="color: #0176de">' . $designed . '</a></li>';
} else {
    $auxFooter = '<li>Diseñado por: <a href="' . $designerUrl . '" target="_blank" class="external text-primary" style="color: #0176de">' . $designed . '</a></li>
    <li>Desarrollado por: <a href="' . $developerUrl . '" target="_blank" class="external text-primary" style="color: #0176de">' . $developed . '</a></li>';
}
$auxFooter = $auxFooter . '<li>Sitio administrado por: <a href="' . $adminUrl . '" target="_blank" class="external text-primary" style="color: #0176de">' . $adminBy . '</a></li>';

switch ($menu_tipo) {
    case 'denominacion_internacional_alpha':
    case 'denominacion_internacional':
        $marca_logo = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-chile-blanco.svg';
        include __DIR__ . '/footer-uc-denominacion-internacional.php';
        break;
    case 'header_denominacion_alpha':
    case 'denominacion':
        $marca_logo = 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-blanco.svg';
        include __DIR__ . '/footer-uc-denominacion.php';
        break;
    case 'submarca':
    case 'submarca_con_slogan':
    case 'submarca_con_slogan_alpha':
        $marca_logo = !empty($marca_logo) ? $marca_logo : 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-submarca.svg';
        include __DIR__ . '/footer-submarca.php';
        break;
    default:
        $marca_logo = !empty($marca_logo) ? $marca_logo : 'https://kit-digital-uc-prod.s3.amazonaws.com/assets/logo-uc-submarca.svg';
        include __DIR__ . '/footer-submarca.php';
        break;
}
