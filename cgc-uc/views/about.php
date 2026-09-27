<?php
global $post;
?>
<section class="container">
    <div class="container my-80">
        <div class="row">
            <div class="col-12">
                <?php get_template_part('views/breadcrumb',null,['post'=>$post]) ?>
            </div>
        </div>

        <?php
        $blocks = UCKitWP::parsePost($post->post_content);
        $pages = [];
        $firstParagraphContent = '';
        $firstParagraphIndex = -1;
        $firstButton = null;
        $firstButtonIndex = -1;

        // Pre-procesamos las anclas, buscamos primer párrafo y primer botón
        foreach($blocks as $index => &$block){
            if ($block['blockName'] === 'core/heading') {
                $block['attrs']['anchor'] = 'page_' . $index;
                $pages[] = [
                    'title'  => $block['attrs']['text'],
                    'anchor' => $block['attrs']['anchor'],
                ];
            }
            else if($block['blockName'] == 'uc-kit/items' || $block['blockName'] == 'uc-kit/carousel'){
                $block['attrs']['anchor'] = 'page_'.$index;
                $pages[] = $block['attrs'];
            }
            else if ($block['blockName'] === 'core/button' || $block['blockName'] === 'core/buttons') {
                if ($firstButton === null && $firstParagraphIndex !== -1) {
                    $firstButton = $block;
                    $firstButtonIndex = $index;
                }
            }

            if ($block['blockName'] === 'core/paragraph' && $firstParagraphIndex === -1) {
                $firstParagraphContent = $block['innerHTML'];
                $firstParagraphIndex = $index;
            }
        }

        $raw_meta = get_post_meta($post->ID, '_uc_local_menu_enabled', false);
        $show_local_menu = count($raw_meta) > 0 ? (bool) $raw_meta[0] : true;
        ?>

        <div class="row justify-content-between">
            <div class="<?php echo $show_local_menu ? 'col-lg-8' : 'col-12'; ?>">
                <h1 class="mb-32"><?php echo $post->post_title ?></h1>
                
                <?php if (!empty($firstParagraphContent)): ?>
                <div class="mb-32 d-none d-lg-block">
                    <?php echo $firstParagraphContent; ?>
                </div>
                <?php endif; ?>

                <?php if ($firstButton !== null): ?>
                <div class="row d-none d-lg-block">
                    <div class="col-lg-6 mb-32">
                        <?php UCKitWP::kitPageDraw($firstButton, 'default', false); ?>
                    </div>
                </div>
                <?php endif; ?>
            </div>

            <?php if ($show_local_menu && !empty($pages)): ?>
            <div class="col-lg-3 d-none d-lg-block">
                <div class="uc-subtitle mb-24">EN ESTA PÁGINA:</div>
                <?php
                foreach($pages as &$page){
                    $pageTitle = isset($page['title']) ? $page['title'] : (isset($page['text']) ? $page['text'] : '');
                    $pageAnchor = $page['anchor'] ?? '';
                    ?>
                    <div class="mb-16">
                        <a href="#<?php echo esc_attr($pageAnchor) ?>" class="uc-btn btn-inline text-weight--medium scrollLink">
                            <?php echo esc_html(strip_tags($pageTitle)); ?>
                        </a>
                    </div>
                    <?php
                }
                ?>
            </div>
            <?php endif; ?>
        </div>

        <div class="row mt-60">
            <div class="col-12">
                <?php
                $sectionOpen = false;
                foreach($blocks as $index => &$block){
                    if ($index === $firstParagraphIndex || $index === $firstButtonIndex) {
                        continue;
                    }

                    if($block['blockName'] == 'uc-kit/items' || $block['blockName'] == 'uc-kit/carousel'){
                        if($sectionOpen){
                            echo '</section>';
                        }
                        echo '<section>';
                        $sectionOpen = true;
                    }

                    UCKitWP::kitPageDraw($block);
                }
                if($sectionOpen){
                    echo '</section>';
                }
                ?>
            </div>
        </div>

    </div>
</section>
