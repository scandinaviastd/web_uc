<?php
if(empty($args)) $args = ['url'=>''];
$facebook = 'https://www.facebook.com/sharer/sharer.php?u='.urlencode($args['url']);
$twitter = 'https://twitter.com/home?status='.urlencode($args['url']);
$email = 'mailto:?&subject=&body='.urlencode($args['url']);
?>
<div class="d-flex flex-row align-items-center pt-40 pb-40">
    <p class="m-0">Comparte esta publicación</p>
    <a class="ml-40" href="<?php echo $twitter ?>" target="_blank">
        <i class="uc-icon icon-shape--rounded d-flex align-items-center justify-content-center" style="width: 33px; height: 33px">
            <img src="https://kit-digital-uc-prod.s3.amazonaws.com/assets/social-icon-twitter.svg" style="width: 16px; height: 16px" alt="Twitter">
        </i>
    </a>
    <a class="ml-24" href="<?php echo $facebook ?>" target="_blank">
        <i class="uc-icon icon-shape--rounded d-flex align-items-center justify-content-center" style="width: 33px; height: 33px">
            <img src="https://kit-digital-uc-prod.s3.amazonaws.com/assets/social-icon-facebook.svg" style="width: 16px; height: 16px" alt="Facebook">
        </i>
    </a>
    <a class="ml-24" href="<?php echo $email ?>" target="_blank">
        <i class="uc-icon icon-shape--rounded d-flex align-items-center justify-content-center" style="width: 33px; height: 33px">email</i>
    </a>
</div>
