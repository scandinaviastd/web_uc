<?php
global $post;
$_cats = wp_get_post_categories($post->ID);
$cats = [];
foreach($_cats as $_cat){
    $cat = get_category($_cat);
    $cats[] = [
        'id' => $_cat,
        'name' => $cat->name,
        'slug' => $cat->slug
    ];
}
$item = UCKitWP::parseBasicPost((array)$post);
?>
<section id="uc-new">
    <div class="container my-80">
        <div class="row">
            <div class="col-12">
                <ol class="uc-breadcrumb">
                    <li class="uc-breadcrumb_item">
                        <a href="<?php echo get_home_url().'/' ?>">Inicio</a>
                        <i class="uc-icon">keyboard_arrow_right</i>
                    </li>
                    <li class="uc-breadcrumb_item">
                        <a href="<?php echo get_home_url().'/noticias/' ?>">Noticias</a>
                        <i class="uc-icon">keyboard_arrow_right</i>
                    </li>
                    <li class="uc-breadcrumb_item current">
                        <?php echo $post->post_title ?>
                    </li>
                </ol>
                <h1 class="mt-60 mb-20"><?php echo $post->post_title ?></h1>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8">
                <div class="row">
                    <div class="col-12 d-flex flex-row align-items-center">
                        <p class="m-0"><?php echo UCKitWP::parseDate($post->post_date); ?></p>
                        <hr class="ml-60 uc-hr flex-fill" style="width: auto">
                    </div>
                </div>
                <div class="row mt-40">
                    <div class="col-1"></div>
                    <div class="col-12 col-md-11 d-flex flex-column">
                        <?php
                        $blocks = UCKitWP::parsePost($post->post_content);
                        foreach($blocks as &$block){
                            UCKitWP::kitPageDraw($block);
                        }
                        ?>
                        <hr class="uc-hr mt-60">
                        <?php
                        get_template_part('views/social-share',null,['url'=>get_the_permalink($post->ID)]);
                        ?>
                    </div>
                </div>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-3">
                <div class="container-fluid uc-card mt-8 p-24 d-flex flex-column">
                    <p class="m-0">Tema</p>
                    <hr class="uc-hr mt-6 mb-12">
                    <div class="d-block mt-12 mb-40 mb-12 d-flex flex-wrap">
                        <?php
                        foreach($item['cats'] as &$cat){
                            ?>
                            <a href="<?php echo $cat['url'] ?>" class="mr-12 mb-12 uc-tag tag-fixed"><?php echo $cat['name'] ?></a>
                            <?php
                        }
                        $author = get_userdata($post->post_author);
                        $author_name = $author->data->display_name;
                        $author_mail = $author->data->user_email;
                        ?>
                    </div>
                    <p class="m-0">Información periodística</p>
                    <hr class="uc-hr mt-6 mb-12">
                    <div class="mt-20 d-flex flex-row align-items-center">
                        <i class="uc-icon text-color--gray">person</i>
                        &nbsp;
                        <b class="ml-12">Periodista</b>
                    </div>
                    <span class="d-block ml-40"><?php echo $author_name ?></span>
                    <div class="mt-20 mb-32 d-flex flex-row align-items-center">
                        <i class="uc-icon text-color--gray">mail</i>
                        &nbsp;
                        <a href="mailto:<?php echo $author_mail ?>" class="link-inline ml-12"><?php echo $author_mail ?></a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>
