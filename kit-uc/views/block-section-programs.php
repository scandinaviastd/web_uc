<?php
if(empty($args)) $args = [];
$page = UCKitWP::getPostBySlug('programas');
$posts = [];
$postslist = new WP_Query( [
    'posts_per_page' => 3,
    'paged' => 1,
    'post_type' => 'estudios',
    'post_parent' => $page['ID']
] );
if ( $postslist->have_posts() ){
    while ( $postslist->have_posts() ) {
        $postslist->the_post();
        $post = (array) get_post();
        $_post = [
            'title' => $post['post_title'],
            'desc' => get_the_excerpt($post['ID']),
            'url' => get_permalink($post['ID']),
        ];
        $posts[] = $_post;
    }
}
?>
<!-- Sección 3: Programas de estudio -->
<section>
    <div class="container">
        <div class="row align-items-center mb-36">
            <div class="col-lg-6">
                <div class="heading-container">
                    <h2<?php echo isset($args['anchor']) ? " id=\"{$args['anchor']}\"" : '' ?>><?php echo $args['title'] ?></h2>
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
            <?php
            foreach($posts as &$item){
                ?>
                <div class="col-md-4 mb-32">
                    <div class="uc-card card-height--same">
                        <div class="uc-card_body">
                            <a href="<?php echo $item['url'] ?>" class="h4 color-black decoration-none"><?php echo $item['title'] ?></a>
                            <div class="uc-text-divider divider-primary my-12"></div>
                            <p><?php echo $item['desc'] ?></p>
                            <div class="text-right mt-auto">
                                <a href="<?php echo $item['url'] ?>" class="uc-btn btn-inline">
                                    Ver más
                                    <i class="uc-icon">keyboard_arrow_right</i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <?php
            }
            ?>
        </div>
    </div>
</section><!-- Fin sección 3: Programas de estudio -->
