<?php
$defaults = array(
    'titleTag' => 'h2',
    'itemTitleTag' => 'h3',
    'titleTagEnabled' => false,
    'type' => 'slider',
    'withLink'=> false,
    'items' => [],
);
$args = wp_parse_args($args, $defaults);
// echo "<pre>";
// var_dump($args);
// echo "</pre>";
if (!empty($args['type'])) {
    switch ($args['type']) {
        case 'slider':
            get_template_part('views/block-items-slider', null, $args);
            break;
        case 'banners':
            get_template_part('views/block-items-banners', null, $args);
            break;
        case 'archive':
            get_template_part('views/block-items-archive', null, $args);
            break;
        case 'contact':
            get_template_part('views/block-items-contact', null, $args);
            break;
        case 'about':
            get_template_part('views/block-items-about', null, $args);
            break;
        case 'cardHeaderFooter':
            get_template_part('views/block-items-header-footer', null, $args);
            break;
        case 'cardHorizontal':
            get_template_part('views/block-items-horizontal', null, $args);
            break;
        case 'backgroundImage':
            get_template_part('views/block-items-background-image', null, $args);
            break;
        case 'withImage':
            get_template_part('views/block-items-with-image', null, $args);
            break;
        case 'nestedHover':
            get_template_part('views/block-items-nested-hover', null, $args);
            break;
    }
}
