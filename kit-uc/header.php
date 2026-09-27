<?php
include __DIR__ . '/classes/uc-kit.php';
$extraClass = [];
if(!is_home() && !is_front_page()) $extraClass[] = 'page_'.basename(get_permalink());
$idTagManager = get_theme_mod('uckit_id_tagManager');
?><!DOCTYPE html>
<html class="no-js" <?php language_attributes(); ?>>
<head>
    <script>
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),
        dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','<?= $idTagManager ?>');</script>

    <link data-n-head="ssr" rel="icon" type="image/png" href="https://kitdigital.uc.cl/favicon.png">
    <?php
    $header_html = get_theme_mod('uckit_header_html');
    if(!empty($header_html)) echo $header_html;
    ?>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta id="vp" name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php wp_head(); ?>
</head>
<body <?php body_class($extraClass); ?>>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?= $idTagManager ?>"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<?php
if (is_front_page()) {
    $site_title = get_bloginfo('name');
    echo '<h1 class="uc-sr-only">' . esc_html($site_title) . '</h1>';
}
?>
<?php
$body_html = get_theme_mod('uckit_body_html');
if(!empty($body_html)) echo $body_html;
?>
<?php wp_body_open(); ?>
