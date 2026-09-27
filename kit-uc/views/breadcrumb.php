<ol class="uc-breadcrumb">
    <li class="uc-breadcrumb_item">
        <a href="<?php echo get_home_url(); ?>/">Inicio</a>
        <i class="uc-icon">keyboard_arrow_right</i>
    </li>

    <?php
    // Verifica si estás en una página de categoría
    if (is_category()) {
        // Obtener la categoría actual
        $category = get_queried_object();

        // Si la categoría tiene padre, mostrar la jerarquía
        if ($category->parent != 0) {
            $parent_category = get_category($category->parent);
            ?>
            <li class="uc-breadcrumb_item">
                <a href="<?php echo get_category_link($parent_category->term_id); ?>"><?php echo esc_html($parent_category->name); ?></a>
                <i class="uc-icon">keyboard_arrow_right</i>
            </li>
            <?php
        }
        ?>
        <li class="uc-breadcrumb_item current">
            <?php echo esc_html($category->name); // Muestra el nombre de la categoría actual ?>
        </li>
        <?php
    }

// Breadcrumb para la página de entradas (home.php)
if (is_home() && !is_front_page()) {
    $posts_page_id = get_option('page_for_posts');

    if ($posts_page_id) {
        ?>
        <li class="uc-breadcrumb_item current">
            <?php echo esc_html(get_the_title($posts_page_id)); ?>
        </li>
        <?php
    }
}



// Si estás dentro de un post individual
elseif (is_singular('post')) {

    // Obtener la página definida como "Página de entradas"
    $posts_page_id = get_option('page_for_posts');

    if ($posts_page_id) {
        ?>
        <li class="uc-breadcrumb_item">
            <a href="<?php echo get_permalink($posts_page_id); ?>">
                <?php echo esc_html(get_the_title($posts_page_id)); ?>
            </a>
            <i class="uc-icon">keyboard_arrow_right</i>
        </li>
        <?php
    }
    ?>

    <li class="uc-breadcrumb_item current">
        <?php the_title(); ?>
    </li>

    <?php
}


    // Si estás en una página (sin categorías)
    elseif (is_page()) {
        if ($post->post_parent) {
            $parent_id = $post->post_parent;
            $parents = array();

            while ($parent_id) {
                $parent = get_post($parent_id);
                $parents[] = '<li class="uc-breadcrumb_item"><a href="' . get_permalink($parent->ID) . '">' . get_the_title($parent->ID) . '</a></li>';
                $parent_id = $parent->post_parent;
            }

            $parents = array_reverse($parents);

            foreach ($parents as $parent) {
                echo $parent . '<i class="uc-icon">keyboard_arrow_right</i>';
            }
        }
        ?>
        <li class="uc-breadcrumb_item current">
            <?php the_title(); ?>
        </li>
        <?php
    }
    ?>
</ol>
