<?php
$id = mt_rand(0, 999999);
$slides = $args['items'];
$newsURL = get_permalink(UCKitWP::getNewsPostId());
$menu_tipo = get_theme_mod('uckit_menu_type');
// echo "<pre>";
// var_dump($args);
// echo "</pre>";z
?>
<section<?php echo (isset($args['anchor']) && empty($args['titleTagEnabled'])) ? " id=\"{$args['anchor']}\"" : '' ?>>
    <?php
    if (!empty($args['titleTagEnabled'])) {
    ?>
        <div class="row">
            <div class="col-12">

                <div class="mt-40 mb-20 d-flex align-items-center">
                    <?php echo '<' . $args['titleTag'] . (isset($args['anchor']) ? " id=\"{$args['anchor']}\"" : '') . '>' . $args['title'] . '</' . $args['titleTag'] . '>'; ?>
                    <div class="uc-heading-decoration"></div>
                </div>
            </div>
        </div>
    <?php
    }
    ?>
    <div class="uc-carousel" data-carousel="uc-primary-carousel" data-type="carousel" data-items="1" data-slideby="1" data-loop="true" data-nav="true" data-autoplay="true" data-controls="false" data-navcontainer="#carousel-nav-<?php echo $id ?>" data-autoplaybutton="#carousel-autoplay-<?php echo $id ?>" data-autoplay-text="true">
        <div class="uc-primary-carousel uc-primary-carousel--hero">
            <?php
            foreach ($slides as &$post) {
                $post['cats'] = [];
                $src = $post['src'];
                $customHeight = false;
                if (in_array($post['type'], ['page', 'post']) && !empty($post['post'])) {
                    $_post = (array) get_post($post['post']);
                    if (!empty($_post)) {
                        $_post = UCKitWP::parseBasicPost((array)$_post);
                        foreach ($_post as $key => &$value) {
                            $post[$key] = $value;
                        }
                        if (empty($post['src'])) $post['src'] = $src;
                        if (empty($post['src'])) $post['src'] = get_template_directory_uri() . '/assets/img/picture.jpg';
                    }
                }
                $customHeight = (strpos($menu_tipo, 'alpha') !== false && is_front_page()) ? "uc-hero--md-660" : "";
            ?>
                <div class="primary-carousel_item primary-carousel_item--md-660">
                    <div class="uc-hero <?php echo $customHeight; ?>">
                        <img class="uc-hero__bg-img" src="<?php echo $src ?>" alt="<?php echo $post['alternative'] ?? '' ?>" loading="lazy" />
                        <div class="uc-hero__dark-gradient--bottom"></div>
                        <div class="uc-hero__content uc-hero__content--bottom container uc-hero__content--no-padding">
                            <div class="col-md-8 uc-hero__low-wide-container">
                                <?php
                                if (!empty($post['cats'])) {
                                    foreach ($post['cats'] as $cat) {

                                        $term = get_term_by('slug', $cat['slug'], 'category');

                                        if ($term && !is_wp_error($term)) {
                                            $category_url = get_term_link($term);
                                ?>
                                            <a href="<?php echo esc_url($category_url); ?>" class="uc-tag">
                                                <?php echo esc_html($cat['name']); ?>
                                            </a>
                                <?php
                                        }

                                        break; // solo mostrar la primera categor��a
                                    }
                                }
                                ?>

                                <?php echo "<" . $args["itemTitleTag"] . ">"; ?><a href="<?php echo $post['url'] ?>" class="color-white my-24 decoration-none"><?php echo $post['title'] ?></a><?php echo "</" . $args["itemTitleTag"] . ">"; ?>
                                <?php
                                if (!empty($post['url'])) {
                                ?>
                                    <a href="<?php echo $post['url'] ?>" class="uc-btn btn-inline btn-inline--bold">
                                        <span class="color-white">Más información</span>
                                        <i class="uc-icon icon-shape--rounded">arrow_forward</i>
                                    </a>
                                <?php
                                }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            <?php
            }
            ?>
        </div>
        <div class="uc-carousel-nav <?php echo (strpos($menu_tipo, 'alpha') !== false && is_front_page()) ? 'primary-carousel-nav' : ''; ?>">
            <div class="container">
                <div class="carousel-nav-container">
                    <ul class="carousel-nav-list" id="carousel-nav-<?php echo $id ?>">
                        <?php
                        foreach ($slides as $index => &$slide) {
                        ?>
                            <li class="carousel-nav-item">
                                <div class="number"><?php echo str_pad(($index + 1) . '', 2, '0', STR_PAD_LEFT) ?></div>
                                <div class="indicator"></div>
                            </li>
                        <?php
                        }
                        ?>
                    </ul>
                    <div class="autoplay-buttons" id="carousel-autoplay-<?php echo $id ?>"></div>
                </div>
            </div>
        </div>
    </div>

</section>