<?php
get_header();
get_template_part('views/header');

// Obtener categorías para el filtro
$cats = get_categories();
?>

<style>
    .ui-datepicker table{
        display: none;
    }
</style>

<section id="uc-news">
    <div class="container my-80">
        <div class="row justify-content-between">
            <div class="col-lg-8">
                <h1 class="mb-32">
                    <?php
                    if (isset($_GET['cat']) && !empty($_GET['cat'])) {
                        $cat_slug = sanitize_text_field($_GET['cat']);
                        $category = get_category_by_slug($cat_slug);
                        if ($category) {
                            echo esc_html($category->name);
                        } else {
                            echo get_the_title(get_option('page_for_posts', true));
                        }
                    } else {
                        
                        $page_for_posts_id = get_option('page_for_posts', true);
                        if($page_for_posts_id) {
                            echo get_the_title($page_for_posts_id);
                        } else {
                            echo 'Noticias';
                        }
                    }
                    ?>
                </h1>
            </div>
            <div class="col-lg-3 d-none d-lg-block"></div>
        </div>
        <!-- Breadcrumb -->
        <div class="row">
            <div class="col-12">
                <?php get_template_part('views/breadcrumb', null, ['post' => $post]) ?>
            </div>
        </div>

        <!-- FILTROS -->
        <div class="row mb-40">
            <div class="col-12">
                <form id="categoryFilter" class="container uc-card"
                    style="background: #F6F6F6; box-shadow: none; border:none" method="GET">

                    <div class="row ml-4 mr-4 mt-20 mb-20">

                        <!-- BUSCADOR -->
                        <div class="col-md-3 mb-8">
                            <label class="h6 mb-8">Filtrar por palabra clave</label>
                            <div class="uc-form-group-icon uc-form-group m-0">
                                <input id="search" name="s" type="text" class="uc-input-style"
                                    placeholder="Buscar por palabra clave"
                                    value="<?php echo isset($_GET['s']) ? esc_attr($_GET['s']) : ''; ?>">
                                <i class="uc-icon">search</i>
                            </div>
                        </div>

                        <!-- CATEGORÍA (SLUG EN VEZ DE ID) -->
                        <div class="col-md-3 mb-8">
                            <label class="h6 mb-8">Filtrar por tema</label>
                            <div class="uc-form-group m-0 d-flex flex-row align-items-center">
                                <select id="category" name="cat" style="min-width: 0; width: 50%"
                                    class="flex-fill uc-input-style" title="Filtrar por tema">
                                    <option value="">Ver todos</option>

                                    <?php foreach ($cats as $cat): ?>
                                        <option value="<?php echo esc_attr($cat->slug); ?>"
                                            <?php echo (isset($_GET['cat']) && $_GET['cat'] === $cat->slug) ? 'selected' : ''; ?>>
                                            <?php echo esc_html($cat->name); ?>
                                        </option>
                                    <?php endforeach; ?>

                                </select>
                            </div>
                        </div>

                        <!-- FECHA -->
                        <div class="col-md-3 mb-8">
                            <label class="h6 mb-8">Filtrar por fecha</label>
                            <div class="uc-form-group-icon uc-form-group m-0 d-flex align-items-center"
                                style="gap: 4px; position: relative;">
                                
                                <input id="date" name="date" type="text" class="uc-input-style datepicker"
                                    placeholder="Selecciona (MM/YYYY)"
                                    value="<?php echo isset($_GET['date']) ? esc_attr($_GET['date']) : ''; ?>"
                                    style="flex:1; min-width:0; padding-right: 32px;">
                                <i class="uc-icon"
                                    style="position: absolute; right: 38px; top: 50%; transform: translateY(-50%); color: #0055A4; pointer-events: none;">
                                    calendar_today
                                </i>
                            </div>
                        </div>

                        <div class="col-md-3 col-6 d-flex align-items-end col-6 mb-8">
                            <button type="submit" class="uc-btn btn-secondary" style="justify-content:center; width:100%;">Buscar</button>
                        </div>

                    </div>

                
                </form>
            </div>
        </div>

        <!-- POSTS -->
        <div id="posts-container" class="uc-news-content row mb-40">

            <?php
            // Paginación
            $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

            // Filtros base
            $args = [
                'post_type' => 'post',
                'post_status' => 'publish',
                'paged' => $paged,
            ];

            // Filtro por categoría usando SLUG
            if (!empty($_GET['cat'])) {
                $args['category_name'] = sanitize_text_field($_GET['cat']);
            }

            // Búsqueda
            if (!empty($_GET['s'])) {
                $args['s'] = sanitize_text_field($_GET['s']);
            }

            // Fecha MM/YYYY
            if (!empty($_GET['date'])) {
                $date = sanitize_text_field($_GET['date']);
                if (preg_match('/^(\d{2})\/(\d{4})$/', $date, $matches)) {
                    $args['monthnum'] = intval($matches[1]);
                    $args['year'] = intval($matches[2]);
                }
            }

            $query = new WP_Query($args);
            ?>

            <?php if ($query->have_posts()): ?>
                <?php while ($query->have_posts()): $query->the_post(); ?>

                    <div class="col-md-4 mb-32">
                        <div class="uc-card card-height--same">

                            <!-- Imagen -->
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

                            <!-- Categoría -->
                            <?php
                            $terms = wp_get_post_terms(get_the_ID(), 'category');
                            if ($terms):
                                $term = $terms[0];
                                echo '<a class="uc-tag tag-fixed" href="' . esc_url(get_term_link($term)) . '">' . esc_html($term->name) . '</a>';
                            endif;
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

            <?php else: ?>

                <div class="col-12 text-center py-80">
                    <p class="h4" style="opacity: .6;">No se encontraron resultados para tu búsqueda.</p>
                </div>

            <?php endif; ?>

        </div>

        <!-- PAGINACIÓN -->
        <?php
        $links = paginate_links([
            'total'      => $query->max_num_pages,
            'current'    => $paged,
            'type'       => 'array',
            'prev_next'  => false,
            'end_size'   => 1,
            'mid_size'   => 1,
        ]);
        ?>

        <?php if ($query->max_num_pages > 1) : ?>
            <nav class="uc-pagination">

                <!-- PREV -->
                <button
                    class="uc-pagination_prev mr-12"
                    <?php if ($paged <= 1) echo 'disabled'; ?>
                    onclick="location.href='<?php echo esc_url(get_pagenum_link($paged - 1)); ?>'">
                    <i class="uc-icon">keyboard_arrow_left</i>
                </button>

                <ul class="uc-pagination_pages">
                    <?php if ($links): ?>
                        <?php foreach ($links as $link): ?>

                            <?php
                            preg_match('/href=["\']([^"\']+)["\']/', $link, $match);
                            $href = $match[1] ?? '#';
                            $label = wp_strip_all_tags($link);
                            $active = strpos($link, 'current') !== false ? 'active' : '';
                            ?>

                            <li class="page-item <?php echo $active; ?>">
                                <a class="page-link" href="<?php echo esc_url($href); ?>">
                                    <?php echo esc_html($label); ?>
                                </a>
                            </li>

                        <?php endforeach; ?>
                    <?php endif; ?>
                </ul>

                <!-- NEXT -->
                <button
                    class="uc-pagination_next ml-12"
                    <?php if ($paged >= $query->max_num_pages) echo 'disabled'; ?>
                    onclick="location.href='<?php echo esc_url(get_pagenum_link($paged + 1)); ?>'">
                    <i class="uc-icon">keyboard_arrow_right</i>
                </button>

            </nav>
        <?php endif; ?>


    </div>
</section>

<?php
get_template_part('views/footer');
get_footer();
?>