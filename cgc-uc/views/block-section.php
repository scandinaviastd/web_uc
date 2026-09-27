<?php
$defaults = array(
    'titleTag' => 'h2',
    'itemTitleTag' => 'h3',
    'type' => 'news',
    'host' => 'https://api.agenda.uc.cl/api',
    'token' => '',
);

$args = wp_parse_args($args, $defaults);

if(!empty($args['type'])){
    switch($args['type']){
        case 'news':
            get_template_part('views/block-section-news',null,$args);
            break;
        case 'programs':
            get_template_part('views/block-section-programs',null,$args);
            break;
        case 'agenda':
        default:
            get_template_part('views/block-section-agenda',null,$args);
            break;
    }
}
