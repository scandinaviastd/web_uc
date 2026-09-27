<?php
$defaults = array(
    'url' => '',
    'size' => 'medium',
    'caption' => '',
);

$args = wp_parse_args($args, $defaults);

$url = $args['url'];
$size = $args['size'];
$caption = $args['caption'];

if (empty($url)) {
    return;
}

$allowed_sizes = array('small', 'medium', 'large', 'full');
if (!in_array($size, $allowed_sizes, true)) {
    $size = 'medium';
}

$embed_url = $url;
if (strpos($url, 'youtube.com') !== false || strpos($url, 'youtu.be') !== false) {
    if (preg_match('#youtu\.be/([a-zA-Z0-9\-_]+)#', $url, $matches)) {
        $embed_url = '//www.youtube.com/embed/' . $matches[1];
    } elseif (preg_match('#youtube\.com/watch\?v=([a-zA-Z0-9\-_]+)#', $url, $matches)) {
        $embed_url = '//www.youtube.com/embed/' . $matches[1];
    }
}
?>
<figure class="uc-media-frame uc-video uc-video--<?php echo esc_attr($size) ?> mt-12">
    <div class="uc-video__ratio">
        <iframe src="<?php echo esc_url($embed_url) ?>" allowfullscreen></iframe>
    </div>
    <?php if (!empty($caption)) { ?>
        <div class="caption d-flex flex-row mt-12 align-items-center">
            <span><?php echo esc_html($caption) ?></span>
            &nbsp;&nbsp;
            <a target="_blank" href="<?php echo esc_url($url) ?>" class="uc-btn text-weight--bold">
                Ver más
                &nbsp;
                <i class="uc-icon icon-size--sm">launch</i>
            </a>
        </div>
    <?php } ?>
</figure>