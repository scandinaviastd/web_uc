<?php
$tag = get_query_var('tag'); // Obtener el nombre del tag desde la URL
$posts = UCKitWP::getPostsByTag($tag);
$tags = get_tags();
get_header();
get_template_part('views/header');

// Desactivar el loop principal
remove_action('loop_start', 'wp_reset_query');
?>

<section id="uc-news">
    <div class="container my-80">
        <div class="row">
            <div class="col-12">
                <ol class="uc-breadcrumb">
                    <li class="uc-breadcrumb_item">
                        <a href="<?php echo get_home_url() . '/' ?>">Inicio</a>
                        <i class="uc-icon">keyboard_arrow_right</i>
                    </li>
                    <li class="uc-breadcrumb_item current">
                        <?php single_tag_title(); ?>
                    </li>
                </ol>
                <h1 class="mt-60 mb-20"><?php single_tag_title(); ?></h1>
            </div>
        </div>

        <div class="row mb-40">
            <div class="col-12">
                <form method="get" action="<?php echo esc_url(home_url('/')); ?>" class="uc-news-search container uc-card" style="background: #F6F6F6;box-shadow: none;border:none">
                    <div class="row ml-4 mr-4 mt-20 mb-20">
                        <div class="col-md-4">
                            <div class="uc-form-group-icon uc-form-group m-0">
                                <input id="search" name="s" type="text" class="uc-input-style" placeholder="Buscar por palabra clave">
                                <i class="uc-icon">search</i>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="uc-form-group m-0 d-flex flex-row align-items-center">
                                <label for="tag" class="m-0">Filtrar por etiqueta</label>
                                <select id="tag" name="tag" style="min-width: 0; width: 50%" class="ml-24 flex-fill uc-input-style" title="Filtrar por etiqueta" onchange="window.location.href='<?php echo get_home_url(); ?>/tag/' + this.value">
                                    <option selected value="">Ver todos</option>
                                    <?php
                                    foreach ($tags as $tag_item) {
                                    ?>
                                        <option value="<?php echo $tag_item->slug ?>" <?php selected($tag_item->slug, get_query_var('tag')) ?>>
                                            <?php echo $tag_item->name ?>
                                        </option>
                                    <?php } ?>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="uc-form-group-icon uc-form-group m-0">
                                <input id="date" type="text" class="uc-input-style datepicker" placeholder="Filtrar por fecha">
                                <i class="uc-icon">calendar_today</i>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="mb-40">
            <?php if (!empty($posts)) : ?>
                <!-- <header class="archive-header">
                    <h1 class="archive-title">
                        <?php /*single_tag_title();*/ ?>
                    </h1>
                    <div class="archive-description"><?php /* echo tag_description();*/ ?></div>
                </header> -->

                <div class="row">
                    
                    <?php
                    
                    $current_tag = get_queried_object();
                    foreach ($posts as $post) : setup_postdata($post);
                        // echo "<pre>";
                        // var_dump($post);
                        // echo "</pre>";
                    ?>
                        <div class="col-md-3">
                            <div class="uc-card card-height--same" id="post-<?php the_ID(); ?>" style="max-width: 300px">
                                <?php
                                    if (has_post_thumbnail()) {
                                        the_post_thumbnail('medium', ['class' => 'uc-card-img']);
                                    } else {
                                        echo '<img src="https://dummyimage.com/280x210/edeaed/0076de.png" alt="" class="uc-card-img">';
                                    }
                                ?>
                                <!-- MOSTRAR SOLO EL TAG ACTUAL (NO todos los tags) -->
                                <?php if ($current_tag && has_tag($current_tag->term_id)) : ?>
                                    <a href="<?php echo get_tag_link($current_tag->term_id); ?>" class="uc-tag tag-fixed">
                                        <?php echo esc_html($current_tag->name); ?>
                                    </a>
                                <?php endif; ?>
                                
                                <div class="uc-card_body">
                                    <p class="text-size--sm text-color--gray text--condensed">
                                        <?php echo get_the_date(); ?>
                                    </p>
                                    <div class="uc-h4"><?php the_title(); ?></div>
                                    <div class="text-right mt-auto">
                                        <a href="<?php the_permalink(); ?>" class="uc-btn btn-inline">
                                            <span>Ver más</span> 
                                            <i class="uc-icon">keyboard_arrow_right</i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php
                    endforeach;
                    wp_reset_postdata();
                    ?>
                </div>

                <div class="pagination">
                    <?php
                    // Agregar la paginación si es necesario
                    ?>
                </div>
            <?php else : ?>
                <p><?php _e('No posts found.', 'kit-uc'); ?></p>
            <?php endif; ?>
        </div>
    </div>
</section>

<?php
get_template_part('views/footer');
get_footer();
?>