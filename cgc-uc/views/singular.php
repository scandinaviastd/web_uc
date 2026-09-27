<?php
global $post;
function customizeTagCloudHTML($html) {
    $doc = new DOMDocument();
    libxml_use_internal_errors(true);
    $doc->loadHTML('<?xml encoding="utf-8" ?>' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    libxml_clear_errors();

    $links = $doc->getElementsByTagName('a');

    foreach ($links as $link) {
        $link->setAttribute('class', 'uc-tag');
        $link->removeAttribute('style');
    }

    return $doc->saveHTML();
}
?>
<!--suppress HtmlUnknownTarget -->
<section>
    <div class="container my-80">
        <div class="row">
            <div class="col-12">
                <?php get_template_part('views/breadcrumb',null,['post'=>$post]) ?>
                <h1 class="mt-60 mb-20"><?php echo $post->post_title ?></h1>
            </div>
        </div>
        <?php
        $first = true;
        $blocks = UCKitWP::parsePost($post->post_content);
        $pages = [];
        foreach($blocks as $index => &$block){
            if($block['blockName'] == 'core/heading'){
                $block['attrs']['anchor'] = 'tab-'.$index;
                $pages[] = $block['attrs'];
            }
        }
        ?>
        <div class="row">
            <div class="col-12">
            <?php echo "ESTE ES EL ARCHIVO DE VIEW/SINGULAR.PHP" ?>
                <div class="uc-tabpanel" data-tabpanel>
                    <div class="row">
                        <div class="col-lg-4">
                            <!-- Tabs mobile se muestran como Select -->
                            <div class="uc-card card-bg--gray card-radius--none card-border--none d-block d-lg-none mb-32">
                                <div class="uc-card_body">
                                    <label for="tabSelect"><strong>Seleccione tab</strong></label>
                                    <select name="tabSelect" id="tabSelect" class="uc-input-style" data-tabselect>
                                        <?php
                                        foreach($pages as &$page){
                                            ?>
                                            <option value="<?php echo $page['anchor'] ?>"><?php echo $page['text'] ?></option>
                                            <?php
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                            <!-- Tabs en desktop se muestran como botones -->
                            <ul class="uc-vertical-tabs d-none d-lg-flex">
                                <?php
                                foreach($pages as $index => &$page){
                                    ?>
                                    <li class="uc-vertical-tabs_item">
                                        <a href="javascript:void(0);"
                                           class="uc-vertical-tabs_item-link"
                                           data-tabtarget="<?php echo $page['anchor'] ?>"
                                            <?php echo $index == 0 ? 'data-tabactive' : '' ?>>
                                            <?php echo $page['text'] ?>
                                        </a>
                                    </li>
                                    <?php
                                }
                                ?>
                            </ul>
                        </div>
                        <div class="col-lg-8">
                            <div class="uc-tab-body">
                                <?php
                                echo '<div>';
                                foreach($blocks as $index => &$block){
                                    if($block['blockName'] == 'core/heading'){
                                        echo '</div>';
                                        echo '<div data-tab="'.$block['attrs']['anchor'].'">';
                                        ?>
                                        <div class="mt-0 mb-20 d-flex align-items-center">
                                            <h2><?php echo $block['attrs']['text'] ?></h2>
                                            <div class="uc-heading-decoration"></div>
                                        </div>
                                        <?php
                                    }else if ($block['blockName'] == 'core/tag-cloud') {
                                        $content = apply_filters('the_content', render_block($block));
                                        echo customizeTagCloudHTML($content);
                                    }
                                    else {
                                        if($block['blockName'] == 'uc-kit/items' || $block['blockName'] == 'uc-kit/carousel') $block['attrs']['columns'] = 'col-md-6';
                                        UCKitWP::kitPageDraw($block);
                                    }
                                }
                                echo '</div>';
                                ?>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>

</section>
