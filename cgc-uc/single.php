<?php

/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Tema_UC
 */

get_header();
get_template_part('views/header');
?>
<?php
global $post;
$_cats = wp_get_post_categories($post->ID);
$cats = [];
foreach ($_cats as $_cat) {
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
                <?php get_template_part('views/breadcrumb', null, ['post' => $post]) ?>
                <!-- <ol class="uc-breadcrumb">
                    <li class="uc-breadcrumb_item">
                        <a href="<--?php echo get_home_url() . '/' ?>">Inicio</a>
                        <i class="uc-icon">keyboard_arrow_right</i>
                    </li>
                    <li class="uc-breadcrumb_item">
                        <a href="<--?php echo get_home_url() . '/noticias/' ?>">Noticias</a>
                        <i class="uc-icon">keyboard_arrow_right</i>
                    </li>
                    <li class="uc-breadcrumb_item current">
                        <--?php echo $post->post_title ?>
                    </li>
                </ol> -->
                <h1 class="mt-60 mb-20"><?php echo esc_html($post->post_title) ?></h1>
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
                        $sectionOpen = false;
                        foreach ($blocks as $block){
                            
                            $isHeadingSection = false;
                            if ($block['blockName'] === 'core/heading') {
                                $level = $block['attrs']['level'] ?? 2;
                                if ($level <= 3) {
                                    $isHeadingSection = true;
                                }
                            }
                            if ($isHeadingSection) {
                                if ($sectionOpen) {
                                    echo '</section>';
                                }
                                $anchor = $block['attrs']['anchor'] ?? 'sec-'.mt_rand(0,999);
                                echo '<section id="' . esc_attr($anchor) . '" class="mt-40">';
                                $sectionOpen = true;
                            }
                            
                        }
                        if ($sectionOpen) {
                            echo '</section>';    
                        }
                        ?>
                        <hr class="uc-hr mt-60">
                        <?php
                        get_template_part('views/social-share', null, ['url' => get_the_permalink($post->ID)]);
                        ?>
                    </div>
                </div>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-3">
                <div class="container-fluid uc-card mt-8 p-24 d-flex flex-column">
                    <h2 class="h6 uppercase">Información</h2>
                    <div class="uc-text-divider divider-secondary my-16"></div>



                    <div class="mt-20 d-flex flex-row align-items-center">
                        <i class="uc-icon text-color--gray">local_offer</i>
                        &nbsp;
                        <b class="ml-8">Tema</b>
                    </div>
                    <div class="mt-20 mb-32 d-flex flex-row align-items-center">
                        <div class="uc-tags">
                            <?php
                            foreach ($item['cats'] as &$cat) {
                                $term = get_term_by('slug', $cat['slug'], 'category');

                                if ($term && !is_wp_error($term)) {
                                    $category_url = get_term_link($term);
                            ?>
                                    <a href="<?php echo esc_url($category_url); ?>" class="uc-tag">
                                        <?php echo esc_html($cat['name']); ?>
                                    </a>
                            <?php
                                }
                            }
                            $author = get_userdata($post->post_author);
                            $author_name = $author->data->display_name;
                            $author_mail = $author->data->user_email;
                            ?>
                        </div>
                    </div>


                    <?php if (get_post_meta($post->ID, 'nombre_periodista', true)) { ?>
                        <div>
                            <hr class="uc-hr mb-12">

                            <div class="mt-20 d-flex flex-row align-items-center">
                                <i class="uc-icon text-color--gray">face</i>
                                &nbsp;
                                <b class="ml-8">Información periodística</b>
                            </div>
                            <div class="mt-20 d-flex flex-row align-items-center">
                                &nbsp;

                                <span class="d-block"><?php echo get_post_meta($post->ID, 'nombre_periodista', true); ?></span>
                            </div>
                            <div class="mb-32 d-flex flex-row align-items-center">
                                &nbsp;
                                <a href="mailto:<?php echo get_post_meta($post->ID, 'correo_periodista', true); ?>" class="link-inline "><?php echo get_post_meta($post->ID, 'correo_periodista', true); ?></a>
                            </div>
                        </div>
                    <?php } ?>


                </div>
            </div>
        </div>

    </div>

</section>

<?php
get_template_part('views/footer');
get_footer();