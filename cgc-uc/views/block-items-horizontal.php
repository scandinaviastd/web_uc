<?= "<" . $args["titleTag"] . (isset($args['anchor']) ? " id=\"{$args['anchor']}\"" : '') . ">" . $args['title'] . "</" . $args["titleTag"] . ">"; ?>
  <?php
  if (!empty($args['title']) && !empty($args['titleTagEnabled'])) {
  ?>
    <div class="col-12">

      <div class="mt-40 mb-20 d-flex align-items-center">
        <?= "<" . $args["titleTag"] . (isset($args['anchor']) ? " id=\"{$args['anchor']}\"" : '') . ">" . $args['title'] . "</" . $args["titleTag"] . ">"; ?>
        <div class="uc-heading-decoration"></div>
      </div>
    </div>
  <?php
  }
  foreach ($args['items'] as &$item) {
    UCKitWP::parseItemData($item);
  ?>
  <!-- Card horizontal -->
<div class="col-lg-12 mb-32">
  <div class="uc-card <?= ($args['withLink']) ? '' : 'uc-card--no-interaction' ?> card-type--horizontal card-height--same">
    <div class="row no-gutters">
      <div class="col-4">
        <img src="<?= $item['src'] ?>" class="uc-card-img" alt="<?= $item['alternative'] ?>" />
      </div>
      <div class="col-8">
        <div class="uc-card_body">
          <!-- <a href="#" class="uc-tag">Texto</a> -->
          <?= "<" . $args["itemTitleTag"] . " class='h4' >" . $item['title']. "</" . $args["itemTitleTag"] . ">"; ?>
          <p><?= $item['desc'] ?></p>
          <div class="text-right">
            <?= ($args['withLink']) ? '<a href="' . $item['url'] .'" class="uc-btn btn-inline">Ver más<i class="uc-icon icon-shape--rounded">keyboard_arrow_right</i></a>' : '' ?>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<?php
  }
  ?>