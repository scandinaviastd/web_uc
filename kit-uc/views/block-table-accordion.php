<?php
$id = mt_rand(0,999999);
?>

<section<?php echo (isset($args['anchor']) && empty($args['title'])) ? " id=\"{$args['anchor']}\"" : '' ?>>

<div class="row">


<?php
    if(!empty($args['title'])){
        ?>
        
        <div class="col-12">

            <div class="mb-20 d-flex align-items-center">
            <?php echo "<" . $args["titleTag"] . (isset($args['anchor']) ? " id=\"{$args['anchor']}\"" : '') . " >"; ?><?php echo $args['title'] ?><?php echo "</" . $args["titleTag"] . " >"; ?>
                <div class="uc-heading-decoration"></div>
            </div>
        </div>
        <?php
    }
        ?>


    <div class="col-12">
        <div class="uc-accordion" data-accordion>
            <?php
            // Support for new Nested Blocks structure
            if (!empty($args['innerBlocks'])) {
                foreach($args['innerBlocks'] as $index => $itemBlock) {
                    if (!isset($itemBlock['attrs']) || !is_array($itemBlock['attrs'])) {
                        $itemBlock['attrs'] = [];
                    }
                    // Pass context to the child item
                    $itemBlock['attrs']['parentId'] = $id;
                    $itemBlock['attrs']['index'] = $index;
                    
                    // Fallback for title tag if not set on item but set on parent
                    if(empty($itemBlock['attrs']['itemTitleTag']) && !empty($args['itemTitleTag'])){
                        $itemBlock['attrs']['itemTitleTag'] = $args['itemTitleTag'];
                    }

                    if (class_exists('UCKitWP')) {
                        UCKitWP::kitPageDraw($itemBlock, 'default', false);
                    }
                }
            } 
            // Fallback for legacy 'items' attribute
            elseif (!empty($args['items'])) {
                foreach($args['items'] as $index => &$item){
                    ?>
                    <div class="uc-collapse uc-card">
                        <a class="uc-collapse_heading" data-collapse="col-<?php echo $id ?>-<?php echo $index ?>">
                        <?php echo "<" . $args["itemTitleTag"] . " class='h4' >"; ?><?php echo $item['title'] ?><?php echo "</" . $args["itemTitleTag"] . " >"; ?>
                            <span class="uc-btn btn-inline ml-auto"><i class="uc-icon icon-shape--rounded">keyboard_arrow_down</i></span>
                        </a>
                        <div class="uc-collapse_body" data-toggle="col-<?php echo $id ?>-<?php echo $index ?>">
                            <div class="uc-card_body">
                                <p><?php echo $item['desc'] ?></p>
                            </div>
                        </div>
                    </div>
                    <?php
                }
            }
            ?>
        </div>
    </div>
</div>

</section>