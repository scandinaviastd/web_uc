<div <?php echo (isset($args['anchor']) && empty($args['title'])) ? "id=\"{$args['anchor']}\"" : '' ?> class="row mt-40">
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

<div class="col-12 mb-32">
        <table class="uc-table">
            <thead>
            <tr>
                <th style="width:50%;"><?=$args['column1']?></th>
                <th><?=$args['column2']?></th>
            </tr>
            </thead>
            <tbody>
            <?php
            foreach($args['items'] as &$item){
                ?>
                <tr>
                    <td><strong><?php echo $item['title'] ?></strong></td>
                    <td><?php echo $item['desc'] ?></td>
                </tr>
                <?php
            }
            ?>
            </tbody>
        </table>
    </div>
</div>
