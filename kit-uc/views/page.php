<?php
global $post;

// 1) Obtenemos y parseamos los bloques
$blocks = UCKitWP::parsePost($post->post_content);

// 2) Preprocesamos: asignamos anclas y almacenamos “títulos” para un índice lateral
$pages = [];
foreach ($blocks as $index => &$block) {
    // Creamos un anchor único, p. ej. "page_0", "page_1", etc.
    $block['attrs']['anchor'] = 'page_' . $index;

    // Dependiendo del bloque, tomamos su texto para el índice:
    if ($block['blockName'] === 'core/heading') {
        // 'core/heading' tiene 'text' en $block['attrs']['text']
        $pages[] = [
            'text'   => $block['attrs']['text'],
            'anchor' => $block['attrs']['anchor'],
        ];
    } 
    // Si es un bloque de UC-Kit que traiga 'title' (p. ej. uc-kit/section)
    else if (strpos($block['blockName'], 'uc-kit/') !== false) {
        // Podríamos tener algo como: $block['attrs']['title']
        if (!empty($block['attrs']['title'])) {
            $pages[] = [
                'text'   => $block['attrs']['title'],
                'anchor' => $block['attrs']['anchor'],
            ];
        }
    }
}
?>

<section>
  <div class="container my-80">
    <div class="row">
      <div class="col-12">
        <!-- Título de la página y breadcrumb -->
        <?php get_template_part('views/breadcrumb', null, ['post' => $post]); ?>
        <h1 class="mt-60 mb-20"><?php echo $post->post_title; ?></h1>
      </div>
    </div>

    <div class="row">
      <!-- Columna principal (contenido) -->
      <?php
      $raw_meta = get_post_meta($post->ID, '_uc_local_menu_enabled', false);
      $show_local_menu = count($raw_meta) > 0 ? (bool) $raw_meta[0] : true;
      ?>
      <div class="<?php echo $show_local_menu ? 'col-md-9' : 'col-12'; ?>">
        <?php
        // Control para el "primer párrafo" e inicio de secciones
        $firstParagraph = true;
        $sectionOpen = false;

        // 3) Recorremos e imprimimos los bloques
        foreach ($blocks as &$block) {
            // a) Si es un párrafo y sigue siendo el “primero”, lo imprimimos tal cual
            if ($block['blockName'] === 'core/paragraph' && $firstParagraph) {
                echo '<div class="mb-16">';
                echo $block['innerHTML'];
                echo '</div>';
                $firstParagraph = false;
                continue;
            }

            // b) Lógica de agrupación por secciones (Heading H1-H3)
            // Evaluamos si es un encabezado que debe iniciar sección
            $isHeadingSection = false;
            if ($block['blockName'] === 'core/heading') {
                $level = $block['attrs']['level'] ?? 2;
                if ($level <= 3) {
                    $isHeadingSection = true;
                }
            }

            if ($isHeadingSection) {
                if ($sectionOpen) {
                    echo '</section>';
                }
                echo '<section>';
                $sectionOpen = true;
            }

            // c) Renderizamos el bloque
            UCKitWP::kitPageDraw($block, 'page');
        }

        // Cerramos la última sección si quedó abierta
        if ($sectionOpen) {
            echo '</section>';
        }
        ?>
      </div>

      <?php if ($show_local_menu && !empty($pages)): ?>
      <!-- Columna lateral para el índice (anclas) -->
      <div class="col-md-3">
        <div class="uc-in-page-nav-container">
            <nav class="uc-in-page-nav" aria-label="Navegación dentro de la página">
                <h2 class="uc-in-page-nav_title h6 text-color--gray">EN ESTA SECCIÓN:</h2>
                <ul class="uc-in-page-nav_list">
                <?php
                foreach ($pages as $page) {
                    $anchor = $page['anchor'] ?? '';
                    $text   = $page['text'] ?? '';
                    if (!$anchor || !$text) continue;
                    ?>
                    <li class="uc-in-page-nav_item">
                        <a class="uc-in-page-nav_link scrollLink"
                        href="#<?php echo esc_attr($anchor); ?>">
                        <?php echo strip_tags($text); ?>
                        </a>
                    </li>
                <?php } ?>
                </ul>
            </nav>
        </div>
      </div><!-- .col-md-3 -->
      <?php endif; ?>
    </div><!-- .row -->
  </div><!-- .container.my-80 -->
</section>