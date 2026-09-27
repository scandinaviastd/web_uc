<?php
global $post;
$contacts = [];
$newsletter = '';
$blocks = UCKitWP::parsePost($post->post_content);
foreach($blocks as &$block){
    if($block['blockName'] == 'core/html'){
        $newsletter = $block['innerHTML'];
    }
    else if($block['blockName'] == 'uc-kit/items' || $block['blockName'] == 'uc-kit/carousel'){
        $contacts = $block['attrs']['items'];
    }
}
?>
<section>
    <div class="container my-80">
        <div class="row">
            <div class="col-12">
                <?php get_template_part('views/breadcrumb',null,['post'=>$post]) ?>
                <h1 class="mt-60 mb-20"><?php echo $post->post_title ?></h1>
            </div>
        </div>

        <div class="row">
            <div class="col-md-3">
                <?php
                foreach($contacts as &$contact){
                    $icon = 'place';
                    if(strpos($contact['url'],'mailto:') !== FALSE){
                        $icon = 'mail';
                    }
                    else if(strpos($contact['url'],'tel:') !== FALSE){
                        $icon = 'phone';
                    }
                    ?>
                    <div class="row mb-40">
                        <div class="col-2">
                            <i class="uc-icon"><?php echo $icon ?></i>
                        </div>
                        <div class="col-10">
                            <b class="d-block"><?php echo $contact['title'] ?></b>
                            <a class="d-block" target="_blank" href="<?php echo $contact['url'] ?>"><?php echo $contact['desc'] ?></a>
                        </div>
                    </div>
                    <?php
                }
                ?>
            </div>
            <div class="col-md-8">
                <div class="container d-flex flex-column align-items-center">
                    <?php echo $newsletter ?>
                </div>
            </div>
        </div>

    </div>

</section>
