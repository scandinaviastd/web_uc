<?php
// Suponiendo que estás generando el carrusel en algún lugar como este:
$carouselId = UCKitWP::getNextCarouselId();
$carouselAttr = "uc-carousel-{$carouselId}";
$dataCarousel = "uc-carousel-cards_content-{$carouselId}";
$prevButtonAttr = "carousel-controls-{$carouselId}";
$nextButtonAttr = "carousel-controls-{$carouselId}";
$prev = "prev-{$carouselId}";
$defaults = array(
    'titleTag' => 'h2',
    'itemTitleTag' => 'h3',
    'type' => 'news',
);
$args = wp_parse_args($args, $defaults);
// echo '<pre>';
// var_dump($args);
// echo '</pre>';
if(empty($args)) $args = [];
$news = UCKitWP::getPosts(4);
$base_url = get_site_url();
?>
<!-- Sección 1: Noticias -->
<section>
    <div class="container">
        <div class="row align-items-center mb-12">

            <div class="col-lg-6">
                <div class="heading-container">
                <?php echo "<" . $args["titleTag"] . (isset($args['anchor']) ? " id=\"{$args['anchor']}\"" : '') . ">"; ?><?php echo $args['title'] ?><?php echo "</" . $args["titleTag"] . ">"; ?>
                    <div class="uc-heading-decoration">
                    </div>
                </div>
            </div>
            <div class="col-lg-6 d-none d-lg-block">
                <div class="text-right">
                    <a href="<?php echo $args['url'] ?>" class="uc-btn btn-inline">
                        <?php echo $args['button'] ?>  <i class="uc-icon icon-shape--rounded">arrow_forward</i>
                    </a>
                </div>
            </div>
        </div>
        <div class="row">

            <div class="col-lg-12">
                <div class="uc-carousel-cards"
                    data-carousel="<?=$dataCarousel?>"
                    data-type="cards"
                    data-items="3"
                    data-sm-items="2"
                    data-slideby="1"
                    data-loop="false"
                    data-controls="true"
                    data-speed="500"
                    data-autoplay-text="true"
                    data-prev-button=".carousel-controls.carusel-content .<?=$prev?>"
                    data-next-button=".carousel-controls.carusel-content .next-<?=$carouselId?>"
                    data-counter="true">
                    <div class="<?=$dataCarousel?>">
                        <?php
                            foreach($news as $item){
                                $src = $item['pic'];
                                if(empty($src)) $src = get_template_directory_uri().'/assets/img/picture.jpg';
                                ?>
                                <div class="item">
                                    <div class="uc-card card-bg--image card-gradient--bottom-blue" style="max-width: 380px">
                                        <a href="<?php echo $item['url'] ?>">
                                            <img
                                                class="uc-card-img"
                                                src="<?php echo $src ?>"
                                                alt="<?php echo $item['alternative']??'Imagen' ?>"
                                            />
                                            <div class="uc-card_body uc-card_body--absolute">
                                                <div class="uc-card card-bg--white mt-auto">
                                                    <div class="uc-card_body">
                                                        <p class="p-size--sm p-color--gray p-text--condensed mb-12"><?php echo $item['date'] ?></p>
                                                        <?php echo "<" . $args["itemTitleTag"] . " class='h4 color-black' >"; ?><?php echo $item['title'] ?><?php echo "</" . $args["itemTitleTag"] . ">"; ?>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <?php
                                            foreach ($item['cats'] as $cat) {
                                                $term = get_term_by('slug', $cat['slug'], 'category');

                                                if ($term && !is_wp_error($term)) {
                                                    $url = get_term_link($term);
                                                    ?>
                                                    <a href="<?php echo esc_url($url); ?>" class="uc-tag tag-fixed">
                                                    <?php echo esc_html($cat['title']); ?>
                                                        </a>
                                                    <?php
                                                    break;
                                                }
                                            }
                                        ?>
                                    </div>
                                </div>
                                <?php
                                // romper cualquier posible referencia remanente
                                unset($item, $cat);
                            }
                        ?>
                    </div>
                    <div class="carousel-track d-block d-lg-none">
                        <div class="carousel-progress-indicator"></div>
                    </div>
                    <div class="carousel-controls carusel-content d-none d-lg-flex">
                        <div class="<?=$prev?> backforward" >
                            <svg width="48px" height="16px" viewBox="0 0 48 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g
                                        transform="translate(-272.000000, 0.000000)" fill="#0176DE">
                                        <path d="M319.999999,7.99862356 C320,7.9990823 320,7.99954111 320,8 C320,8.00045889 320,8.0009177 319.999999,8.00137644 C319.999683,8.23695673 319.918232,8.47244231 319.755645,8.65920128 L313.646473,15.6766505 C313.296166,16.0790401 312.698312,16.1101069 312.311129,15.7460401 C311.923947,15.3819733 311.894054,14.7606376 312.244362,14.3582479 L316.909085,9 L273.088579,9 C272.487374,9 272,8.55228475 272,8 C272,7.44771525 272.487374,7 273.088579,7 L316.909085,7 L312.244362,1.64175206 C311.894054,1.23936242 311.923947,0.618026698 312.311129,0.253959882 C312.698312,-0.110106935 313.296166,-0.0790401485 313.646473,0.323349491 L319.755645,7.34079872 C319.918232,7.52755769 319.999683,7.76304327 319.999999,7.99862356 Z" id="arrow-forward"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div class="uc-carousel_index">
                            <span class="index-current current"></span> / <span class="index-total"></span>
                        </div>
                        <div class="next-<?=$carouselId?>">
                            <svg width="48px" height="16px" viewBox="0 0 48 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g
                                        transform="translate(-272.000000, 0.000000)" fill="#0176DE">
                                        <path d="M319.999999,7.99862356 C320,7.9990823 320,7.99954111 320,8 C320,8.00045889 320,8.0009177 319.999999,8.00137644 C319.999683,8.23695673 319.918232,8.47244231 319.755645,8.65920128 L313.646473,15.6766505 C313.296166,16.0790401 312.698312,16.1101069 312.311129,15.7460401 C311.923947,15.3819733 311.894054,14.7606376 312.244362,14.3582479 L316.909085,9 L273.088579,9 C272.487374,9 272,8.55228475 272,8 C272,7.44771525 272.487374,7 273.088579,7 L316.909085,7 L312.244362,1.64175206 C311.894054,1.23936242 311.923947,0.618026698 312.311129,0.253959882 C312.698312,-0.110106935 313.296166,-0.0790401485 313.646473,0.323349491 L319.755645,7.34079872 C319.918232,7.52755769 319.999683,7.76304327 319.999999,7.99862356 Z" id="arrow-forward"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section><!-- Fin sección 1: Noticias -->
