<?php
global $post;
?>
<section>
    <div class="container my-80">
        <div class="row">
            <div class="col-12">
                <?php get_template_part('views/breadcrumb',null,['post'=>$post]) ?>
                <h1 class="mt-60 mb-20"><?php echo $post->post_title ?></h1>
            </div>
        </div>

        <div class="row mt-60">
            <?php
            $posts = [];
            $postslist = new WP_Query( [
                //'posts_per_page' => 3,
                //'paged' => 1,
                'post_type' => 'page',
//                'post_parent' => $post->ID
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
            foreach($posts as &$item){
                ?>
                <div class="col-md-4 mb-40">
                    <div class="uc-card card-height--same">
                        <div class="uc-card_body">
                            <h4><?php echo $item['title'] ?></h4>
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
</section>
