<?php
$defaults = array(
    'titleTag' => 'h2',
    'itemTitleTag' => 'h3',
    'type' => 'news',
    'host' => 'https://api.agenda.uc.cl/api',
    'token' => '3bbaa0a2588684a4188c8233b3e0c2b316e453d2dca253cae7d9d79cf594a44bb10da9078e07a1eeca43927097d8f732e7e8acf3d2426e46ef671758c12781825e1cfe1147fcd1586935f7ee6836dd8de977fc56f61b8332594cc8f2970810b3dae9241b6c2fd3c3b74faa0f324045f8a71378ae59481e9819dfab973b67cd8e',
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
