<div <?= (isset($args['anchor']) && empty($args['titleTagEnabled'])) ? "id=\"{$args['anchor']}\"" : '' ?> class="row mt-60">
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
<!--Card anidada visible en hover -->
<div
  class="uc-card <?= ($args['withLink']) ? '' : 'uc-card--no-interaction' ?> card-hoverable card-bg--image card-gradient--bottom-blue uc-card--type-square mr-12 mb-12"
>
  <img class="uc-card-img uc-card-img--type-square" src="<?= $item['src'] ?>" alt="<?= $item['alternative'] ?>" />
  <div class="uc-card_body--lg uc-card_body--absolute">
    <div class="mt-auto">
	  <?php echo "<" . $args["itemTitleTag"] . " class='color-white h4" . ($args['withLink'] ?  "external' >" : "'>" ) . $item['title'] . "</" . $args["itemTitleTag"] . ">"; ?>
      <div class="uc-text-divider divider-primary mt-12"></div>
    </div>
  </div>
  <div class="uc-card card-hovered">
    <div class="uc-card_body--lg">
      <h4 class="color-white"><?= $item['titleHover'] ?></h4>
      <div class="uc-text-divider divider-primary my-12"></div>
      <p class="color-white">
      <?= $item["textHover"] ?>
      </p>
      <?= ($args['withLink']) ? '<a href="'. $item['url'] .'" class="uc-btn btn-primary mt-auto">Más información<i class="uc-icon icon-shape--rounded">arrow_forward</i></a>' : '' ?>
    </div>
  </div>
</div>

<?php
  }
  ?>
</div>