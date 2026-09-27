<?php

$uckit_twitter = get_theme_mod('uckit_twitter');
$uckit_facebook = get_theme_mod('uckit_facebook');
$uckit_youtube = get_theme_mod('uckit_youtube');
$uckit_instagram = get_theme_mod('uckit_instagram');
$uckit_linkedin = get_theme_mod('uckit_linkedin');
$uckit_flickr = get_theme_mod('uckit_flickr');
?>
<ul class="uc-footer_social">
    <?php if (!empty($uckit_twitter)): ?>
    <li>
        <a href="<?php echo $uckit_twitter ?>">
            <img src="https://kit-digital-uc-prod.s3.amazonaws.com/assets/social-icon-twitter.svg" alt="Twitter">
        </a>
    </li>
    <?php endif; ?>
    <?php if (!empty($uckit_facebook)): ?>
    <li>
        <a href="<?php echo $uckit_facebook ?>">
            <img src="https://kit-digital-uc-prod.s3.amazonaws.com/assets/social-icon-facebook.svg" alt="Facebook">
        </a>
    </li>
    <?php endif; ?>
    <?php if (!empty($uckit_instagram)): ?>
    <li>
        <a href="<?php echo $uckit_instagram ?>">
            <img src="https://kit-digital-uc-prod.s3.amazonaws.com/assets/social-icon-instagram.svg" alt="Instagram">
        </a>
    </li>
    <?php endif; ?>
    <?php if (!empty($uckit_linkedin)): ?>
    <li>
        <a href="<?php echo $uckit_linkedin ?>">
            <img src="https://kit-digital-uc-prod.s3.amazonaws.com/assets/social-icon-linkedin.svg" alt="Linkedin">
        </a>
    </li>
    <?php endif; ?>
    <?php if (!empty($uckit_youtube)): ?>
    <li>
        <a href="<?php echo $uckit_youtube ?>">
            <img src="https://kit-digital-uc-prod.s3.amazonaws.com/assets/social-icon-youtube.svg" alt="Youtube">
        </a>
    </li>
    <?php endif; ?>
    <?php if (!empty($uckit_flickr)): ?>
    <li>
        <a href="<?php echo $uckit_flickr ?>">
            <img src="https://kit-digital-uc-prod.s3.amazonaws.com/assets/social-icon-flickr.svg" alt="Flickr">
        </a>
    </li>
    <?php endif; ?>
</ul>
