<?php
global $post;

// 1) Obtenemos los bloques con parsePost
$blocks = UCKitWP::parsePost($post->post_content);

// 2) Recolectamos “pestañas” a partir de los headings
$pages = [];
foreach ($blocks as $index => &$block) {
    if ($block['blockName'] === 'core/heading') {
        // Generamos un anchor único
        $block['attrs']['anchor'] = 'tab-' . $index;
        // Agregamos al array $pages
        $pages[] = $block['attrs']; // 'text' => ..., 'anchor' => ...
    }
}
?>

<section>
    <div class="container my-80">
        <div class="row">
            <div class="col-12">
                <!-- Breadcrumb y título principal -->
                <?php get_template_part('views/breadcrumb', null, ['post' => $post]); ?>
                <h1 class="mt-60 mb-40"><?php echo esc_html($post->post_title); ?></h1>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <!-- Estructura general del tabpanel -->
                <div class="uc-tabpanel" data-tabpanel>
                    <div class="row">
                        <div class="col-lg-4">
                            <!-- Versión mobile: Select -->
                            <div class="uc-card card-bg--gray card-radius--none card-border--none d-block d-lg-none mb-32">
                                <div class="uc-card_body">
                                    <label for="tabSelect"><strong>Seleccione tab</strong></label>
                                    <select name="tabSelect" id="tabSelect" class="uc-input-style" data-tabselect>
                                        <?php
                                        foreach ($pages as $page) {
                                            // $page['text'] y $page['anchor']
                                            ?>
                                            <option value="<?php echo esc_attr($page['anchor']); ?>">
                                                <?php echo strip_tags($page['text']); ?>
                                            </option>
                                            <?php
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                            <!-- Versión desktop: lista vertical de pestañas -->
                            <ul class="uc-vertical-tabs d-none d-lg-flex">
                                <?php
                                foreach ($pages as $index => $page) {
                                    ?>
                                    <li class="uc-vertical-tabs_item">
                                        <a href="javascript:void(0);"
                                           class="uc-vertical-tabs_item-link"
                                           data-tabtarget="<?php echo esc_attr($page['anchor']); ?>"
                                           <?php echo ($index === 0) ? 'data-tabactive' : ''; ?>>
                                            <?php echo strip_tags($page['text']); ?>
                                        </a>
                                    </li>
                                    <?php
                                }
                                ?>
                            </ul>
                        </div><!-- .col-lg-4 -->

                        <div class="col-lg-8">
                            <div class="uc-tab-body">
                                <?php
                                // 3) Recorremos de nuevo los bloques para pintar el contenido:
                                //    Cada vez que encontremos un core/heading, cerramos y abrimos un nuevo <div data-tab="...">
                                // Variable para saber si estamos dentro de un <div> que hay que cerrar
                                $isTabOpen = false;
                                foreach ($blocks as $index => &$block) {

                                    // Si es core/heading, significa que empieza una "pestaña"
                                    if ($block['blockName'] === 'core/heading') {
                                        // Cerramos el <div> anterior (si estaba abierto)
                                        if ($isTabOpen) {
                                            echo '</div>';
                                        } else {
                                            $isTabOpen = true;
                                        }

                                        // Abrimos nuevo contenedor data-tab
                                        echo '<div data-tab="' . esc_attr($block['attrs']['anchor']) . '">';
                                        ?>
                                        <div class="mt-0 mb-20 d-flex align-items-center">
                                            <h2 class="wp-block-heading"><?php echo strip_tags($block['attrs']['text']); ?></h2>
                                            <div class="uc-heading-decoration"></div>
                                        </div>
                                        <?php
                                    }
                                    // Si es otro tipo de bloque (uc-kit/... o core/...)
                                    else {
                                        // Llamamos a kitPageDraw para que se encargue
                                        // de tag-cloud, paragraphs, images, lists, etc.
                                        UCKitWP::kitPageDraw($block, 'tabbed');
                                    }
                                }

                                // Al finalizar el loop, si $isTabOpen está true,
                                // cerramos el último <div> abierto
                                if ($isTabOpen) {
                                    echo '</div>';
                                }
                                ?>
                            </div><!-- .uc-tab-body -->
                        </div><!-- .col-lg-8 -->

                    </div><!-- .row -->
                </div><!-- .uc-tabpanel -->

            </div><!-- .col-12 -->
        </div><!-- .row -->
    </div><!-- .container.my-80 -->
</section>
