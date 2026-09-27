<?php
$defaults = array(
    'titleTag' => 'h2',
    'itemTitleTag' => 'h3',
    'items'=>[],
    'type'=>''
);
$args = wp_parse_args($args, $defaults);
if(!empty($args['type'])){
    switch($args['type']){
        case 'table':
            get_template_part('views/block-table-table',null,$args);
            break;
        case 'accordion':
            get_template_part('views/block-table-accordion',null,$args);
            break;
    }
}
