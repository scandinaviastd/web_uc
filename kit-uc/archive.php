<?php
$cats = get_categories();
get_header();
get_template_part('views/header');
?>

<section id="uc-news">
    <div class="container my-80">
        <div class="row justify-content-between">
            <div class="col-lg-8">
                <h1 class="mb-32">
                    <?php single_cat_title(); ?>
                </h1>
            </div>
            <div class="col-lg-3 d-none d-lg-block"></div>
        </div>
        <div class="row">
            <div class="col-12">
                <?php get_template_part('views/breadcrumb', null, ['post' => $post]) ?>
            </div>
        </div>
        <div class="row mb-40">
            <div class="col-12">
                <form id="categoryFilter" class="container uc-card"
                    style="background: #F6F6F6; box-shadow: none; border:none">
                    <div class="row ml-4 mr-4 mt-20 mb-20">
                        <div class="col-md-4">
                            <div class="uc-form-group-icon uc-form-group m-0">
                                <input id="search" type="text" class="uc-input-style"
                                    placeholder="Buscar por palabra clave">
                                <i class="uc-icon">search</i>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="uc-form-group m-0 d-flex flex-row align-items-center">
                                <label for="category" class="m-0">Filtrar por tema</label>
                                <select id="category" name="cat" style="min-width: 0; width: 50%"
                                    class="ml-24 flex-fill uc-input-style" title="Filtrar por tema">
                                    <option selected value="">Ver todos</option>
                                    <?php
                                    foreach ($cats as $cat) {
                                        echo '<option value="' . get_category_link($cat->term_id) . '">' . $cat->name . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>
                        </div>


                        <!-- <div class="col-md-4">
                            <div class="uc-form-group-icon uc-form-group m-0">
                                <input id="date" type="text" class="uc-input-style datepicker"
                                    placeholder="Filtrar por fecha">
                                <i class="uc-icon">calendar_today</i>
                            </div>
                        </div> -->
                        <div class="col-md-4">
                            <div class="uc-form-group-icon uc-form-group m-0 d-flex align-items-center"
                                style="gap: 4px; position: relative;">
                                <input id="date" type="text" class="uc-input-style datepicker"
                                    placeholder="Filtrar por fecha" style="flex:1; min-width:0; padding-right: 32px;">
                                <i class="uc-icon"
                                    style="position: absolute; right: 38px; top: 50%; transform: translateY(-50%); color: #0055A4; pointer-events: none;">
                                    calendar_today
                                </i>
                                <button type="button" id="reset-date" class="uc-btn btn-inline"
                                    style="padding: 2px 10px; background: transparent; border: none; color: #888; font-size: 20px; line-height: 1; cursor:pointer;">
                                    &#10005;
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div id="posts-container" class="uc-news-content row mb-40" data-limit="12">
            <?php
            $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

            // Verificar si se está filtrando por categoría
            $filtered_category = isset($_GET['cat']) ? intval($_GET['cat']) : 0;

            // Construir los argumentos de la consulta
            $args = array(
                'post_type' => 'post',
                'posts_per_page' => 12,
                'post_status' => 'publish',
                'paged' => $paged,
            );

            // Si hay una categoría seleccionada, agregarla a la consulta
            if ($filtered_category) {
                $args['cat'] = $filtered_category;
            }
              

            // NUEVO: Si hay búsqueda, agregarla a la consulta
            if (!empty($_GET['s'])) {
                $args['s'] = sanitize_text_field($_GET['s']);
            }

            if (!empty($_GET['date'])) {
                $date = sanitize_text_field($_GET['date']); // formato MM/YYYY
                if (preg_match('/^(\d{2})\/(\d{4})$/', $date, $matches)) {
                    $args['monthnum'] = intval($matches[1]);
                    $args['year'] = intval($matches[2]);
                }
            }

            $query = new WP_Query($args);
            ?>
            <?php if ($query->have_posts()): ?>
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
            <?php endif; ?>
            <div class="pagination">
                <?php
                echo paginate_links(array(
                    'total' => $query->max_num_pages,
                    'prev_text' => __('Previous', 'kit-uc'),
                    'next_text' => __('Next', 'kit-uc'),
                    'current' => $paged
                ));
                ?>
            </div>
        </div>

        <div class="uc-news-paginator row mb-40">
        </div>

        <script>



            document.getElementById('category').addEventListener('change', function () {
                const categoryUrl = this.value;
                if (categoryUrl) {
                    // Cambiar la URL sin recargar la página y cargar contenido filtrado
                    history.pushState(null, '', categoryUrl);
                    loadCategoryContent(categoryUrl);
                } else {

                    window.location.href = window.location.pathname; // Recarga la página sin parámetros

                }
            });

            async function loadCategoryContent(url) {
                try {

                    // Mostrar un loader mientras se carga el contenido
                    document.getElementById('posts-container').innerHTML = '<div class="loading">Cargando...</div>';

                    // Hacer la solicitud AJAX
                    const response = await fetch(`${url}?ajax=1`);
                    const html = await response.text();

                    // Parsear el HTML resultante
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');

                    // Actualizar el contenido de los posts y la paginación
                    updateElementContent('#posts-container', doc);
                    updateElementContent('.pagination', doc);

                    // Actualizar la URL en el navegador
                    history.pushState(null, '', url);
                } catch (error) {
                    console.error('Error al cargar contenido:', error);
                    document.getElementById('posts-container').innerHTML = '<p>Error al cargar el contenido</p>';
                }
            }

            // NUEVO: Filtro por búsqueda de texto
            document.getElementById('search').addEventListener('input', function () {
                const searchTerm = this.value.trim();
                loadSearchContent(searchTerm);
            });

            async function loadSearchContent(searchTerm) {
                try {
                    document.getElementById('posts-container').innerHTML = '<div class="loading">Cargando...</div>';
                    // Construye la URL con el parámetro de búsqueda
                    const url = `${window.location.pathname}?ajax=1&s=${encodeURIComponent(searchTerm)}`;
                    const response = await fetch(url);
                    const html = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    updateElementContent('#posts-container', doc);
                    updateElementContent('.pagination', doc);
                } catch (error) {
                    console.error('Error al cargar contenido:', error);
                    document.getElementById('posts-container').innerHTML = '<p>Error al cargar el contenido</p>';
                }
            }


            const dateInput = document.getElementById('date');
            dateInput.addEventListener('input', function () {
                const dateValue = this.value.trim();
                // Solo dispara si el formato es MM/YYYY
                if (/^\d{2}\/\d{4}$/.test(dateValue)) {
                    loadDateContent(dateValue);
                }
            });
            dateInput.addEventListener('blur', function () {
                const dateValue = this.value.trim();
                // Si el usuario sale del campo y el formato es válido, dispara también
                if (/^\d{2}\/\d{4}$/.test(dateValue)) {
                    loadDateContent(dateValue);
                }
            });

            async function loadDateContent(dateValue) {
                try {
                    document.getElementById('posts-container').innerHTML = '<div class="loading">Cargando...</div>';
                    const url = `${window.location.pathname}?ajax=1&date=${encodeURIComponent(dateValue)}`;
                    const response = await fetchAndConsoleLog(url);
                    const html = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    updateElementContent('#posts-container', doc);
                    updateElementContent('.pagination', doc);
                } catch (error) {
                    console.error('Error al cargar contenido:', error);
                    document.getElementById('posts-container').innerHTML = '<p>Error al cargar el contenido</p>';
                }
            }

            document.getElementById('reset-date').addEventListener('click', function () {
                document.getElementById('date').value = '';
                // Recarga los posts sin el filtro de fecha
                window.location.href = window.location.pathname;
            });

            async function fetchAndConsoleLog(url) {
                try {
                    const response = await fetch(url);
                    console.log("Raw response:", response);
                    return response; // ✅ devuelve el objeto Response
                } catch (error) {
                    console.error("Fetch error:", error);
                    throw error; // re-lanza el error para que loadDateContent lo capture
                }
            }


            function updateElementContent(selector, doc) {
                const newContent = doc.querySelector(selector);
                const targetElement = document.querySelector(selector);
                if (newContent && targetElement) {
                    targetElement.innerHTML = newContent.innerHTML;
                } else {
                    console.error(`No se encontró el elemento para el selector: ${selector}`);
                }
            }


        </script>
    </div>
</section>


<?php
get_template_part('views/footer');
get_footer();
?>