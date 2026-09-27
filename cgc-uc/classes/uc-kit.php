<?php
if (!class_exists('UCKitWP')) {
    /**
     * Class UCKitWP
     */
    class UCKitWP
    {
        static $days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        static $months = ['', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        static $longmonths = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        /**
         * parse post
         *
         * @param $content
         *
         * @return mixed
         */

        // Contador estático para ID únicos de carruseles
        protected static $carouselCounter = 0;

        // Método para obtener el próximo ID único
        public static function getNextCarouselId()
        {
            self::$carouselCounter++;
            return self::$carouselCounter;
        }
        public static function parsePost($content)
        {
            $blocks = parse_blocks($content);
            foreach ($blocks as &$block) {
                UCKitWP::parseBlock($block);
            }
            return $blocks;
        }

        /**
         * parse block
         * @param $block
         */
        public static function parseBlock(&$block)
        {
            $bs = "\/";
            switch ($block['blockName']) {
                case 'core/columns':
                    foreach ($block['innerBlocks'] as &$column) {
                        foreach ($column['innerBlocks'] as &$sub) {
                            UCKitWP::parseBlock($sub);
                        }
                    }
                    break;
                case 'core/buttons':
                    foreach ($block['innerBlocks'] as &$button) {
                        UCKitWP::parseBlock($button);
                    }
                    break;
                case 'core/button':
                    $matches = [];
                    preg_match_all('/href="([^"]*?)"/ms', $block['innerHTML'], $matches);
                    if (!empty($matches) && !empty($matches[1]))
                        $block['attrs']['url'] = $matches[1][0];
                    preg_match_all("/<a[^>]*?>(.*?)<{$bs}a>/ms", $block['innerHTML'], $matches);
                    if (!empty($matches) && !empty($matches[1]))
                        $block['attrs']['text'] = $matches[1][0];
                    break;
                case 'core/heading':
                    $block['attrs']['text'] = strip_tags($block['innerHTML']);
                    break;
                case 'core/image':
                    $matches = [];
                    preg_match_all('/src="([^"]*?)"/ms', $block['innerHTML'], $matches);
                    if (!empty($matches) && !empty($matches[1]))
                        $block['attrs']['src'] = $matches[1][0];
                    preg_match_all("/<figcaption>(.*?)<{$bs}figcaption>/ms", $block['innerHTML'], $matches);
                    if (!empty($matches) && !empty($matches[1]))
                        $block['attrs']['caption'] = $matches[1][0];
                    break;
                case 'core/quote':
                    $matches = [];
                    preg_match_all("/<p>(.*?)<{$bs}p>/ms", $block['innerHTML'], $matches);
                    if (!empty($matches) && !empty($matches[1]))
                        $block['attrs']['quote'] = $matches[1][0];
                    preg_match_all("/<cite>(.*?)<{$bs}cite>/ms", $block['innerHTML'], $matches);
                    if (!empty($matches) && !empty($matches[1]))
                        $block['attrs']['cite'] = $matches[1][0];
                    break;
                // case 'core/tag-cloud':
                //     error_log(print_r([$block], true));
                //     error_log(print_r("TEST1", true));
                //     if (!empty($block['innerHTML'])) {
                //         error_log(print_r("TEST2", true));
                //         $block['innerHTML'] = UCKitWP::customizeTagCloud($block['innerHTML']);
                //     }
                //     break;
                case 'uc-kit/accordion':
                case 'uc-kit/accordion-item':
                    if ( ! empty( $block['innerBlocks'] ) ) {
                        foreach ( $block['innerBlocks'] as &$sub ) {
                            UCKitWP::parseBlock( $sub );
                        }
                    }
                    break;

                default:
                    if (strpos($block['blockName'], 'core/embed') !== FALSE) {
                        $matches = [];
                        preg_match_all("/<figcaption>(.*?)<{$bs}figcaption>/ms", $block['innerHTML'], $matches);
                        if (!empty($matches) && !empty($matches[1])) {
                            $block['attrs']['caption'] = $matches[1][0];
                        }
                    }
                    break;

            }
        }

        // public static function customizeTagCloud($html)
        // {
        //     error_log(print_r("TEST3", true));
        //     if (empty($html)) {
        //         return '';
        //     }
        //     error_log(print_r("TEST4", true));

        //     $doc = new DOMDocument();
        //     libxml_use_internal_errors(true);
        //     $doc->loadHTML('<?xml encoding="utf-8" ' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        //     libxml_clear_errors();

        //     $links = $doc->getElementsByTagName('a');

        //     foreach ($links as $link) {
        //         $link->setAttribute('class', 'uc-tag');
        //         $link->removeAttribute('style');
        //     }

        //     return $doc->saveHTML();
        // }


        /**
         * get plink
         * @return array
         */
        public static function getPlink()
        {
            $http = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443 ? 'https' : 'http';
            $port = "";
            if (!in_array($_SERVER['SERVER_PORT'], [80, 443]))
                $port = ":" . $_SERVER['SERVER_PORT'];
            $url = $http . '://' . $_SERVER['SERVER_NAME'] . '' . $port . '' . $_SERVER['REQUEST_URI'];
            $slug = str_replace(get_home_url(), '', $url);
            if (substr($slug, 0, 1) == '/')
                $slug = substr($slug, 1);
            if (strpos($slug, '?') !== FALSE)
                $slug = explode('?', $slug)[0];
            if (strpos($slug, '/') !== FALSE)
                return explode('/', $slug);
            return [$slug];
        }

        /**
         * get post by slug
         *
         * @param $slug
         *
         * @param string $type
         *
         * @return array
         */
        public static function getPostBySlug($slug = null, $type = 'post')
        {
            if (empty($slug))
                $slug = UCKitWP::getPlink()[0];
            error_log(print_r($slug, true));
            $posts = get_posts(
                array(
                    'name' => $slug,
                    'post_type' => $type,
                    'post_status' => 'publish',
                    'numberposts' => 1
                )
            );
            if (!empty($posts))
                return (array) $posts[0];
            return [];
        }

        public static function getPostsByTag($tag = null, $type = 'post')
        {
            if (empty($tag)) {
                // Si no se proporciona una etiqueta, intenta obtenerla desde la URL o algún otro método personalizado
                $tag = UCKitWP::getPlink()[0];
                error_log(print_r($tag, true));
            }

            $posts = get_posts(
                array(
                    'tag' => $tag,
                    'post_type' => $type,
                    'post_status' => 'publish',
                    'numberposts' => -1 // -1 para obtener todas las publicaciones
                )
            );

            return $posts;
        }




        /**
         * get posts
         *
         * @param $limit
         *
         * @return array
         */
        public static function getPosts($limit)
        {
            $newsURL = get_permalink(UCKitWP::getNewsPostId());
            $posts = [];
            $postslist = new WP_Query([
                'posts_per_page' => $limit ? $limit : 4,
                'paged' => 1,
                'post_type' => 'post',
            ]);
            if ($postslist->have_posts()) {
                while ($postslist->have_posts()) {
                    $postslist->the_post();
                    $post = (array) get_post();
                    $cats = wp_get_post_categories($post['ID']);
                    $_cats = [];
                    foreach ($cats as $cat) {
                        $_cat = get_category($cat);
                        $_cats[] = [
                            'id' => $cat,
                            'title' => $_cat->name,
                            'name' => $_cat->name,
                            'slug' => $_cat->slug,
                            'url' => $newsURL . '?category=' . $_cat->slug,
                        ];
                    }
                    $image_id = get_post_thumbnail_id($post['ID']);
                    $_post = [
                        'title' => $post['post_title'],
                        'date' => UCKitWP::parseDate($post['post_date']),
                        'pic' => get_the_post_thumbnail_url($post['ID']),
                        'cats' => $_cats,
                        'url' => get_permalink($post['ID']),
                        'alternative' => get_post_meta($image_id, '_wp_attachment_image_alt', TRUE),
                    ];
                    $posts[] = $_post;
                }
            }
            wp_reset_postdata();
            return $posts;
        }

        /**
         * parse date
         *
         * @param $post_date
         *
         * @return string
         */
        public static function parseDate($post_date)
        {
            $time = strtotime($post_date);
            return date('j', $time) . ' de ' . UCKitWP::$longmonths[intval(date('n', $time))] . ', ' . date('Y', $time);
        }

        /**
         * get news post
         */
        public static function getNewsPostId()
        {
            if (!empty($GLOBALS['uc-kit-news-post-id'])) {
                return $GLOBALS['uc-kit-news-post-id'];
            }
            global $wpdb;
            $postmeta_table = $wpdb->postmeta;
            $results = $wpdb->get_results($wpdb->prepare("SELECT" . " post_id FROM $postmeta_table WHERE meta_key = '_wp_page_template' AND meta_value = 'home.php'"), ARRAY_A);
            $pid = 0;
            if (!empty($results) && !empty($results[0]) && !empty($results[0]['post_id'])) {
                $pid = $results[0]['post_id'];
            }
            $GLOBALS['uc-kit-news-post-id'] = $pid;
            return $pid;
        }

        /**
         * parse basic post
         *
         * @param $post
         *
         * @return array
         */
        public static function parseBasicPost($post)
        {
            $newsURL = get_permalink(UCKitWP::getNewsPostId());
            $cats = wp_get_post_categories($post["ID"]);
            $_cats = [];
            foreach ($cats as $cat) {
                $_cat = get_category($cat);
                $_cats[] = [
                    'id' => $cat,
                    'title' => $cat->name,
                    'name' => $_cat->name,
                    'slug' => $_cat->slug,
                    'url' => $newsURL . '?category=' . $_cat->slug,
                ];
            }
            $pic = get_the_post_thumbnail($post['ID']);
            $alt = '';
            preg_match_all('/alt="([^"]*?)"/ms', $pic, $matches);
            if (!empty($matches) && !empty($matches[1]))
                $alt = $matches[1][0];
            $_post = [
                'title' => $post['post_title'],
                'date' => $post['post_date'],
                'url' => get_permalink($post['ID']),
                'src' => get_the_post_thumbnail_url($post['ID']),
                'alt' => $alt,
                'cats' => $_cats,
            ];
            return $_post;
        }

        public static function drawBlocks(array $blocks, $context = 'default')
        {
            // Recorremos cada bloque del array
            foreach ($blocks as $block) {
                // Saltar bloques vacíos/nulos generados por WP
                if (empty($block['blockName'])) {
                    continue;
                }
                if (isset($block['blockName']) && $block['blockName'] === 'uc-kit/carousel') {
                    // Para el bloque carousel, lo renderizamos sin contenedor especial
                    UCKitWP::kitPageDraw($block, $context);
                } else {
                    // Para otros bloques, se envuelven en un contenedor especial
                    echo '<div class="container">';
                    UCKitWP::kitPageDraw($block, $context);
                    echo '</div>';
                }
            }
        }

        /**
         * Determina la clase de margen inferior según el contexto de la plantilla.
         * - 'home' => mb-80
         * - cualquier otro (page, about, default, etc.) => mb-40
         */
        private static function getSpacingClass($context = 'default', $blockName = '')
        {
            if (in_array($blockName, ['core/heading', 'core/paragraph'], true)) {
                return 'mb-16';
            }
            return ($context === 'home') ? 'mb-80' : 'mb-40';
        }

        /**
         * kit page draw
         * @param $context string 'home' | 'page' | 'default' etc.
         * @param $applySpacing bool Si es true, envuelve el bloque en un div con margen dinámico.
         *                           Pasar false en llamadas recursivas (sub-bloques internos).
         */
        public static function kitPageDraw(&$block, $context = 'default', $applySpacing = true)
        {
            // $blockName, para simplificar:
            $blockName = $block['blockName'];
            // Saltar bloques vacíos/nulos (espacios en blanco generados por WP parse_blocks)
            if (empty($blockName)) {
                return;
            }
            $blockType = $block['attrs']['type'] ?? null;
            $block['attrs']['has-container'] = ($blockType == 'banners') ? true : ($block['attrs']['has-container'] ?? false);

            if ($applySpacing) {
                echo '<div class="' . esc_attr(self::getSpacingClass($context, $blockName)) . '">';
            }
            
            // Según el nombre del bloque, hacemos un switch:
            switch ($blockName) {
                // Bloques UC-Kit
                case 'uc-kit/alert':
                    get_template_part('views/block-alert', null, $block['attrs']);
                    break;

                case 'uc-kit/items':
                case 'uc-kit/carousel':
                    // Si en 'home' era diferente que en 'mixed', 
                    // podrías evaluar $context aquí
                    get_template_part('views/block-items', null, $block['attrs']);
                    break;

                case 'uc-kit/section':
                    // Otro ejemplo
                    if ($context === 'home') {
                        // Ejemplo: en home se llama 'block-section' en lugar de 'block-section-news'
                        get_template_part('views/block-section', null, $block['attrs']);
                    } else {
                        // Por defecto
                        get_template_part('views/block-section-news', null, $block['attrs']);
                    }
                    break;

                // Más bloques UC-Kit:
                case 'uc-kit/accordion':
                    $block['attrs']['innerBlocks'] = $block['innerBlocks'];
                    if(empty($block['attrs']['type'])) $block['attrs']['type'] = 'accordion';
                    get_template_part('views/block-table', null, $block['attrs']);
                    break;

                case 'uc-kit/accordion-item':
                    $block['attrs']['innerBlocks'] = $block['innerBlocks'];
                    get_template_part('views/block-accordion-item', null, $block['attrs']);
                    break;
                case 'uc-kit/table':
                    get_template_part('views/block-table', null, $block['attrs']);
                    break;

                // Bloques core que simplemente imprimimos innerHTML
                case 'core/html':
                case 'core/code':
                    echo $block['innerHTML'];
                    break;

                case 'core/button':
                    // Ejemplo: tu HTML unificado
                    ?>
                    <a target="_blank" href="<?php echo $block['attrs']['url'] ?>" class="mt-12 uc-btn btn-primary">
                        <?php echo $block['attrs']['text'] ?>
                        <i class="uc-icon icon-shape--rounded">arrow_forward</i>
                    </a>
                    <?php
                    break;

                case 'core/buttons':
                    // Proceso recursivo SIN aplicar espaciado a los sub-bloques
                    foreach ($block['innerBlocks'] as &$button) {
                        self::kitPageDraw($button, $context, false);
                    }
                    break;

                case 'core/columns':
                    // Lógica para las columnas
                    $num = count($block['innerBlocks']);
                    $col = 'col-12';
                    if ($num == 2)
                        $col = 'col-md-6';
                    else if ($num == 3)
                        $col = 'col-md-4';
                    else if ($num == 4)
                        $col = 'col-md-3';
                    else if ($num == 6)
                        $col = 'col-md-2';
                    ?>
                    <div class="row">
                        <?php
                        foreach ($block['innerBlocks'] as &$column) {
                            ?>
                            <div class="<?php echo $col ?> d-flex flex-column">
                                <?php
                                // Sub-bloques internos SIN wrapper de espaciado
                                foreach ($column['innerBlocks'] as &$sub) {
                                    self::kitPageDraw($sub, $context, false);
                                }
                                ?>
                            </div>
                            <?php
                        }
                        ?>
                    </div>
                    <?php
                    break;

                case 'uc-kit/divider':
                    // Bloque divisor UC Kit: renderiza línea divisoria con espaciado contextual
                    $spacing = self::getSpacingClass($context);
                    ?>
                    <hr class="uc-hr <?= esc_attr($spacing) ?>">
                    <?php
                    break;

                case 'uc-kit/video':
                    get_template_part('views/block-video', null, $block['attrs']);
                    break;

                case 'core/heading':
                    $content = $block['innerHTML'];
                    if (!empty($block['attrs']['anchor'])) {
                        $anchor = ' id="' . esc_attr($block['attrs']['anchor']) . '"';
                        // Inyectar el ID en el primer tag <h1...h6> que se encuentre
                        $content = preg_replace('/<h([1-6])(.*?)>/i', '<h$1' . $anchor . '$2>', $content, 1);
                    }
                    echo '<div class="d-flex align-items-center">';
                    echo $content;
                    echo '<div class="uc-heading-decoration"></div>';
                    echo '</div>';
                    break;

                case 'core/paragraph':
                    echo $block['innerHTML'];
                    break;

                case 'core/image':
                    // Ejemplo con caption
                    $alt = $block['attrs']["caption"];
                    if (empty($alt) && !empty($block['attrs']["id"])) {
                        $alt = get_post_meta($block['attrs']['id'], '_wp_attachment_image_alt', true);
                    }
                    if (empty($alt))
                        $alt = '';
                    ?>
                    <div class="d-flex flex-column">
                        <img class="uc-media-frame" src="<?php echo $block['attrs']['src'] ?>"
                            alt="<?php echo $alt ?>" />
                        <?php
                        if (!empty($block['attrs']['caption'])) {
                            ?>
                            <div class="caption d-flex flex-row mt-20 align-items-center">
                                <i class="text-color--gray uc-icon mr-12">camera_alt</i>
                                <b><?php echo $block['attrs']['caption'] ?></b>
                            </div>
                            <?php
                        }
                        ?>
                    </div>
                    <?php
                    break;

                case 'core/quote':
                    ?>
                    <div class="uc-card card-type--horizontal card-border--left">
                        <div class="uc-card_body--xl">
                            <div class="h3 text-weight--medium my-16">
                                <?php echo $block['attrs']['quote'] ?>
                            </div>
                            <?php if (!empty($block['attrs']['cite'])) { ?>
                                <b><?php echo $block['attrs']['cite'] ?></b>
                            <?php } ?>
                        </div>
                    </div>
                    <?php
                    break;

                case 'core/table':
                    ?>
                    <div class="table-responsive">
                        <?php
                        // Añadir clase .table de Bootstrap, etc.
                        $tableHTML = str_replace('<table>', '<table class="table table-bordered table-hover">', $block['innerHTML']);
                        echo $tableHTML;
                        ?>
                    </div>
                    <?php
                    break;

                case 'core/media-text':
                    //var_dump($block);
                    // Lógica unificada para media-text.
                    // (Puedes reusar la que ya tienes en tus plantillas).
                    self::drawCoreMediaText($block);
                    break;

                case 'core/list':
                    // Ejemplo: Lista
                    $isOrdered = !empty($block['attrs']['ordered']) && $block['attrs']['ordered'];
                    echo $isOrdered ? '<ol class="uc-list">' : '<ul class="uc-list">';
                    foreach ($block['innerBlocks'] as $childBlock) {
                        // $childBlock['innerHTML'] ya trae <li>...</li>
                        echo $childBlock['innerHTML'];
                    }
                    echo $isOrdered ? '</ol>' : '</ul>';
                    break;
                case 'core/tag-cloud':
                    // Aplicar el estilo del Kit Digital UC a las etiquetas
                    $content = apply_filters('the_content', render_block($block));
                    echo self::customizeTagCloudHTML($content);
                    break;
                case 'wpcf7/contact-form-7':
                    // Renderiza el bloque usando render_block para que ejecute el shortcode y los hooks
                    echo apply_filters('the_content', render_block($block));
                    break;               
                // Bloques de embed (youtube, etc.)
                case 'contact-form-7/contact-form-selector':
                    if (!empty($block['innerHTML'])) {
                        echo apply_filters('the_content', do_shortcode($block['innerHTML']));
                    }
                    break;
                default:
                    if (strpos($blockName, 'core/embed') !== false) {
                        $url = $block['attrs']['url'];
                        // Ajuste para distintos formatos de YouTube
                        if (strpos($url, 'youtube.com') !== false || strpos($url, 'youtu.be') !== false) {
                            // Si es youtu.be/xxxx
                            if (preg_match('#youtu\.be/([a-zA-Z0-9\-_]+)#', $url, $matches)) {
                                $videoId = $matches[1];
                                $url = "//www.youtube.com/embed/$videoId";
                            }
                            // Si es youtube.com/watch?v=xxxx
                            elseif (preg_match('#youtube\.com/watch\?v=([a-zA-Z0-9\-_]+)#', $url, $matches)) {
                                $videoId = $matches[1];
                                $url = "//www.youtube.com/embed/$videoId";
                            }
                            // Si es youtube.com/embed/xxxx ya está bien
                        }
                        $size = 'default';
                        if (!empty($block['attrs']['align'])) {
                            $align = $block['attrs']['align'];
                            if ($align === 'wide') {
                                $size = 'large';
                            } elseif ($align === 'full') {
                                $size = 'full';
                            }
                        }
                        ?>
                        <figure class="uc-media-frame uc-video uc-video--<?php echo esc_attr($size) ?> mt-12">
                            <div class="uc-video__ratio">
                                <iframe src="<?php echo esc_url($url) ?>" allowfullscreen></iframe>
                            </div>
                            <?php if (!empty($block['attrs']['caption'])) { ?>
                                <div class="caption d-flex flex-row mt-12 align-items-center">
                                    <span><?php echo esc_html($block['attrs']['caption']) ?></span>
                                    &nbsp;&nbsp;
                                    <a target="_blank" href="<?php echo esc_url($block['attrs']['url']) ?>" class="uc-btn text-weight--bold">
                                        Ver más
                                        &nbsp;
                                        <i class="uc-icon icon-size--sm">launch</i>
                                    </a>
                                </div>
                            <?php } ?>
                        </figure>
                        <?php
                    }
                    // Si el bloque es 'core/tag-cloud'
                    else if ($blockName === 'core/tag-cloud') {
                        // Renderizar usando la función de WP y luego personalizar
                        $content = apply_filters('the_content', render_block($block));
                        echo self::customizeTagCloudHTML($content);
                    }
                    // Caso final: sin personalización
                    break;
            }

            // Cerramos el wrapper de margen dinámico solo si se abrio
            if ($applySpacing) {
                echo '</div>';
            }
        }

        /**
         * parse item data
         *
         * @param $item
         *
         * @return mixed
         */
        public static function parseItemData(&$item)
        {

            if (in_array($item['type'], ['page', 'post']) && (!empty($item['post']) || !empty($item['page']))) {
                // echo "<>";
                // var_dump($item);
                // echo "<hr>";
                // echo "</pre>";
                $postId = !empty($item['post']) ? $item['post'] : (!empty($item['page']) ? $item['page'] : null);

                if ($postId) {
                    $item['src'] = get_the_post_thumbnail_url($postId);
                    $item['url'] = get_permalink($postId);
                    $item['title'] = get_the_title($postId);
                    $item['desc'] = ($item['desc'] == '') ? get_the_excerpt($postId) : $item['desc'];
                }
            }
            $src = $item['src'];
            if (empty($src))
                $src = get_template_directory_uri() . '/assets/img/picture.jpg';
            $item['src'] = $src;
            // echo "<>";
            // var_dump($item);
            // echo "<hr>";
            // echo "</pre>";
            return $item;
        }

        public static function customizeTagCloudHTML($html)
        {
            if (empty($html))
                return '';

            $doc = new DOMDocument();
            libxml_use_internal_errors(true);
            $doc->loadHTML('<?xml encoding="utf-8" ?>' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
            libxml_clear_errors();

            // Buscar el contenedor de la nube de etiquetas y agregar clase wrapper
            $xpath = new DOMXPath($doc);
            $tagClouds = $xpath->query('//p[contains(@class, "wp-block-tag-cloud")]');
            
            foreach ($tagClouds as $tagCloud) {
                $existingClasses = $tagCloud->getAttribute('class');
                $tagCloud->setAttribute('class', $existingClasses . ' uc-tag-cloud-wrapper');
            }
            // Procesar todos los enlaces de etiquetas
            $links = $doc->getElementsByTagName('a');
            foreach ($links as $link) {
                $existingClasses = $link->getAttribute('class');
                if (strpos($existingClasses, 'uc-tag') === false) {
                    $link->setAttribute('class', trim($existingClasses . ' uc-tag'));
                }
                $link->removeAttribute('style');
            }

            return $doc->saveHTML();
        }

        public static function drawCoreMediaText($block)
        {
            $attrs = $block['attrs'];
            $mediaUrl = !empty($attrs['mediaUrl']) ? $attrs['mediaUrl'] : (!empty($attrs['mediaLink']) ? $attrs['mediaLink'] : '');
            $mediaAlt = isset($attrs['mediaAlt']) ? $attrs['mediaAlt'] : '';
            $mediaPosition = isset($attrs['mediaPosition']) ? $attrs['mediaPosition'] : 'left';
            $isStacked = !empty($attrs['isStackedOnMobile']) ? 'flex-column' : 'flex-row';

            $verticalAlignment = isset($attrs['verticalAlignment']) ? $attrs['verticalAlignment'] : 'top';
            switch ($verticalAlignment) {
                case 'center':
                    $alignClass = 'align-items-center';
                    break;
                case 'bottom':
                    $alignClass = 'align-items-end';
                    break;
                case 'top':
                default:
                    $alignClass = 'align-items-start';
                    break;
            }
            // Si el usuario quiere usar imagen destacada
            if (!empty($attrs['useFeaturedImage'])) {
                if (has_post_thumbnail()) {
                    $mediaUrl = get_the_post_thumbnail_url(null, 'full');
                    $mediaAlt = get_post_meta(get_post_thumbnail_id(), '_wp_attachment_image_alt', true);
                }
            }

            // Contenido de texto
            $textContent = '';
            if (!empty($block['innerBlocks'])) {
                foreach ($block['innerBlocks'] as $inner) {
                    $innerHTML = str_replace('<p>', '<p class="mt-16">', $inner['innerHTML']);
                    $textContent .= $innerHTML;
                }
            }


            ?>
            <div class="uc-media-text d-flex flex-column 
                <?php echo ($mediaPosition === 'right') ? 'flex-md-row-reverse' : 'flex-md-row'; ?> 
                <?php echo $alignClass; ?> mt-20 mb-20">
                
                <?php if ($mediaUrl): ?>
                    <div class="uc-media-text__media col-12 col-md-6 p-16 order-1">
                        <!-- Imagen siempre primero en móvil (order-1), posición controlada por flex-direction en escritorio -->
                        <img class="img-fluid" src="<?php echo esc_url($mediaUrl); ?>" alt="<?php echo esc_attr($mediaAlt); ?>">
                    </div>
                <?php endif; ?>
                
                <div class="uc-media-text__content col-12 col-md-6 p-16 order-2">
                    <!-- Texto siempre segundo en móvil (order-2), posición controlada por flex-direction en escritorio -->
                    <?php echo $textContent; ?>
                </div>
            </div>
            <?php
        }
    }
}
