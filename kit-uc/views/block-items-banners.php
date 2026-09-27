<div <?= (isset($args['anchor']) && empty($args['titleTagEnabled'])) ? "id=\"{$args['anchor']}\"" : '' ?> class="row mt-60">
    <?php
    if(!empty($args['title']) && $args['titleTagEnabled']){
        ?>
        <div class="col-12">

            <div class="mt-40 mb-20 d-flex align-items-center">
            <?= "<" . $args["titleTag"] . (isset($args['anchor']) ? " id=\"{$args['anchor']}\"" : '') . ">" . $args['title'] . "</" . $args["titleTag"] . ">"; ?>
                <div class="uc-heading-decoration"></div>
            </div>
        </div>
        <?php
    }
    // echo '<pre>';
    //     var_dump($args);
    //     echo '</pre>';
    foreach($args['items'] as &$item){

        UCKitWP::parseItemData($item);
        ?>
     <div class="col-md-6 col-xl-4 mb-32">
        <div class="uc-card <?= ($args['withLink']) ? '' : 'uc-card--no-interaction' ?>">
            <?= ($args['withLink']) ? '<a href=' . $item["url"] .  ' target="_blank" class="uc-card">' : '' ?>
                <img src="<?= $item['src'] ?>" <?= ($args['withLink']) ? 'class="img-fluid"' : 'class="img-fluid uc-card--no-interaction"' ?> alt="<?= $item['alternative'] ?>">
            <?= ($args['withLink']) ? '</a>' : '' ?>
        </div>
    </div>
        <?php
    }
    ?>
</div>

