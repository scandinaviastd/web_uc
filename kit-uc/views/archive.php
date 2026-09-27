<?php
global $post;
?>
<section class="container">
    <div class="container my-80">
        <div class="row">
            <div class="col-12">
                <?php get_template_part('views/breadcrumb',null,['post'=>$post]) ?>
                <h1 class="mt-60 mb-20"><?php echo $post->post_title ?></h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <?php
                $blocks = UCKitWP::parsePost($post->post_content);
                foreach($blocks as &$block){
                    switch($block['blockName']){
                        case 'uc-kit/items':
                        case 'uc-kit/carousel':
                            get_template_part('views/block-items',null,$block['attrs']);
                            break;
                        case 'uc-kit/table':
                            get_template_part('views/block-table',null,$block['attrs']);
                            break;
                        case 'uc-kit/section':
                            get_template_part('views/block-section',null,$block['attrs']);
                            break;
                        case 'core/heading':
                            ?>
                            <h2><?php echo $block['attrs']['text'] ?></h2>
                            <div class="uc-text-divider divider-primary  mt-12 mb-20"></div>
                            <?php
                            break;
                        case 'core/paragraph':
                            echo $block['innerHTML'];
                            break;
                        case 'core/image':
                            $alt = $block['attrs']['caption'];
                            if(empty($alt) && !empty($block['attrs']['id'])){
                                $alt = get_post_meta($block['attrs']['id'],'_wp_attachment_image_alt',true);
                            }
                            if(empty($alt)) $alt = '';
                            ?>
                            <div class="d-flex flex-column mt-20 mb-60">
                                <img class="uc-media-frame" src="<?php echo $block['attrs']['src'] ?>" alt="<?php echo $alt ?>" />
                                <?php
                                if(!empty($block['attrs']['caption'])){
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
                            <div class="uc-card card-type--horizontal card-border--left mt-40 mb-40">
                                <div class="uc-card_body--xl">
                                    <div class="h3 text-weight--medium my-16"><?php echo $block['attrs']['quote'] ?></div>
                                    <?php
                                    if(!empty($block['attrs']['cite'])){
                                        ?>
                                        <b><?php echo $block['attrs']['cite'] ?></b>
                                        <?php
                                    }
                                    ?>
                                </div>
                            </div>
                            <?php
                            break;
                        default:
                            UCKitWP::kitPageDraw($block);
                            break;
                    }
                }
                ?>
            </div>
        </div>

    </div>
</section>
