<?php
$defaults = array(
    'titleTag' => 'h2',
    'titleTagEnabled' => false,
    'type' => 'info',
    'alertMode' => 'simple',
    'withImage' => false,
    'withClose' => false,
);

$args = wp_parse_args($args, $defaults);

$type = $args['type'];
$mode = $args['alertMode'];
 //echo '<pre>';
 //var_dump($args);
 //echo '<br>';
// var_dump($mode);
 //echo '</pre>';

if (!empty($args['alertMode'])) {
    switch ($args['alertMode']) {
        case 'simple':
            get_template_part('views/block-alert-simple', null, $args);
            break;
        case 'card':
            get_template_part('views/block-alert-card', null, $args);
            break;
        case 'modal':
            get_template_part('views/block-alert-modal', null, $args);
            break;
    }
}
