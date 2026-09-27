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
  ?>

  <?php

  foreach ($args['items'] as &$item) {
    UCKitWP::parseItemData($item);
  ?>
    <!--Card con imagen de fondo -->
    <div class="col-md-6 col-xl-4 mb-32">
      <div class="uc-card <?= ($args['withLink']) ? '' : 'uc-card--no-interaction' ?> card-bg--image card-gradient--bottom-blue">
        <?= ($args['withLink']) ? "<a href=" . $item['url'] . " >" : '' ?>
        <img class="uc-card-img" src="<?= $item['src'] ?>" alt="<?= $item['alternative'] ?>" />
        <div class="uc-card_body uc-card_body--absolute">
          <div class="uc-card card-bg--white mt-auto">
            <div class="uc-card_body">
              <?= "<" . $args["itemTitleTag"] . " class='h4 color-black' >" . $item['title'] . "</" . $args["itemTitleTag"] . ">"; ?>
            </div>
          </div>
        </div>
        <?= ($args['withLink']) ? "</a>" : '' ?>
        <!-- <a href="<?= $item['url2'] ?>" class="uc-tag tag-fixed">Texto</a> -->
      </div>
    </div>

  <?php
  }
  ?>
</div>