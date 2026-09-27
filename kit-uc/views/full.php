<?php
global $post;
?>
<section>
    <div class="container my-80">
        <div class="row">
            <div class="col-12">
                <?php get_template_part('views/breadcrumb', null, ['post' => $post]) ?>
                <h1 class="mt-60 mb-20"><?php echo $post->post_title ?></h1>
            </div>
        </div>
        <?php
        $first = true;
        //        $blocks=parse_blocks($post->post_content);
        $blocks = UCKitWP::parsePost($post->post_content);
        $pages = [];
        foreach ($blocks as $index => &$block) {
            if ($block['blockName'] == 'core/heading') {
                $block['attrs']['anchor'] = 'tab-' . $index;
                $pages[] = $block['attrs'];
            }
        }
        ?>

        <div class="row">
            <div class="col-12">

                <div class="uc-tabpanel" data-tabpanel>
                    <div class="uc-tab-body">
                        <?php
                        echo '<div>';
                        foreach ($blocks as $index => &$block) {
                            if (str_contains($block['blockName'], 'uc-kit/')) {
                                $block['attrs']['columns'] = 'col-md-6';
                                UCKitWP::kitPageDraw($block);
                            }elseif($block['blockName']=='core/media-text'){
                                ?>
                                <div class="container my-80">
                                    <?php 
                                UCKitWP::kitPageDraw($block);
                                ?>
                                </div>
                                <?php
                            } else {
                                if (in_array($block['blockName'], ['core/image', 'core/embed', 'core/video'], true)) {
                                    UCKitWP::kitPageDraw($block);
                                } elseif ($block['blockName'] === 'core/heading') {
                                    $level = $block['attrs']['level'] ?? 2;
                                    $anchor = !empty($block['attrs']['anchor']) ? ' id="' . esc_attr($block['attrs']['anchor']) . '"' : '';
                                    ?>
                                        <h<?php echo $level . $anchor; ?>><?php echo $block['attrs']['text']; ?></h<?php echo $level; ?>>
                                        <div class="uc-text-divider divider-primary mt-12 mb-20"></div>
                                    <?php
                                } else {
                                    UCKitWP::kitPageDraw($block);
                                }
                            }
                        }
                        echo '</div>';
                        ?>
                    </div>
                </div>

            </div>
        </div>

    </div>
</section>
