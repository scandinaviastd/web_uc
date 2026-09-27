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
    $cols = $args['columns'] ?? 'col-md-4';

    foreach($args['items'] as &$item){
        UCKitWP::parseItemData($item);
        ?>
        <div class="<?= $cols ?> mb-40">
            <div class="uc-card <?= ($args['withLink']) ? '' : 'uc-card--no-interaction' ?> card-height--same">
                <div class="uc-card_body">
                <?= "<" . $args["itemTitleTag"] . " class='h4' >" . ($args['withLink'] ? '<a class="color-black decoration-none" ' . (!empty($item['url']) ? 'href="' . $item['url'] . '"' : '') . '>' : '') . $item['title'] . ($args['withLink'] ? '</a>' : '') . "</" . $args["itemTitleTag"] . ">"; ?>
                    <div class="uc-text-divider divider-primary my-12"></div>
                    <?= (!empty($item['desc'])) ? "<p>" . $item['desc'] . "</p>" : ''; ?>
                    <?php
                    if(!empty($item['url']) && $args['withLink']){
                        ?>
                        <div class="text-right mt-auto">
                            <a href="<?= $item['url'] ?>" class="uc-btn btn-inline">
                                Ver más
                                <i class="uc-icon">keyboard_arrow_right</i>
                            </a>
                        </div>
                        <?php
                    }
                    ?>
                </div>
            </div>
        </div>
        <?php
    }
    ?>
</div>
