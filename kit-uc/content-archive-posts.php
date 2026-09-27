<?php


$query = get_query_var('query'); // Obtener la consulta pasada desde functions.php

if ($query->have_posts()): ?>
    <div id="posts-container" class="uc-news-content row mb-40" data-limit="12">
        <?php while ($query->have_posts()):
            $query->the_post(); ?>
            <div class="col-md-4 mb-32">
                <div class="uc-card card-height--same">
                    <?php if (has_post_thumbnail()): ?>
                        <div class="uc-bg-card">
                            <img src="<?php echo wp_get_attachment_url(get_post_thumbnail_id($post->ID)); ?>"
                                class="card-img uc-bg-img"
                                alt="<?php echo get_post_meta(get_post_thumbnail_id(), '_wp_attachment_image_alt', true); ?>">
                        </div>
                    <?php else: ?>
                        <div class="uc-bg-card">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/picture.jpg"
                                class="card-img uc-bg-img" alt="Sin imagen destacada">
                        </div>
                    <?php endif; ?>
                    <?php
                    $terms = wp_get_post_terms(get_the_ID(), 'category');
                    if ($terms && !is_wp_error($terms)) {
                        $out = array();
                        foreach ($terms as $term) {
                            $out[] = '<a class="uc-tag tag-fixed" href="' . esc_url(get_term_link($term)) . '">' . esc_html($term->name) . '</a>';
                            break;
                        }
                        echo join(' ', $out);
                    }
                    ?>
                    <div class="uc-card_body">
                        <p class="small gray condensed"><?php echo get_the_date('j F, Y'); ?></p>
                        <h2 class="h4">
                            <a class="color-black decoration-none" href="<?php the_permalink(); ?>">
                                <?php the_title(); ?>
                            </a>
                        </h2>
                        <p>&nbsp;</p>
                        <div class="text-right mt-auto">
                            <a href="<?php the_permalink(); ?>" class="uc-btn btn-inline">
                                Ver más
                                <i class="uc-icon">keyboard_arrow_right</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        <?php endwhile; ?>
    </div>
    <div class="pagination">
        <?php
        echo paginate_links(array(
            'total' => $query->max_num_pages,
            'prev_text' => __('Previous', 'kit-uc'),
            'next_text' => __('Next', 'kit-uc'),
            'current' => $query->query_vars['paged']
        ));
        ?>
    </div>
<?php else: ?>
    <p>No se encontraron publicaciones.</p>
<?php endif; ?>
<?php wp_reset_postdata(); ?>