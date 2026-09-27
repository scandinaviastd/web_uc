<div <?= (isset($args['anchor']) && empty($args['titleTagEnabled'])) ? "id=\"{$args['anchor']}\"" : '' ?> class="row mt-60">
  <?php
  if (!empty($args['title']) && $args['titleTagEnabled']) {
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
    <div class="uc-card <?= ($args['withLink']) ? '' : 'uc-card--no-interaction' ?> mr-12 mb-12">
      <?= "<" . $args["itemTitleTag"] . " class='h4 uc-card_header' >" . $item['textHeader'] . "</" . $args["itemTitleTag"] . ">"; ?>
        <div class="uc-card_body">
          <p><?= $item['desc'] ?></p>
          <?php if (!empty($item['url']) && $args['withLink']) {
          ?>
          <div class="mt-auto">
            <a href="<?= $item['url'] ?>" class="uc-btn btn-inline">
              Ver más
              <i class="uc-icon icon-shape--rounded">keyboard_arrow_right</i>
            </a>
          </div>
          <?php
          }
          ?>
        </div>
        <div class="uc-card_footer text-right">
          <p class="text-color--gray no-margin"><?= $item['textFooter'] ?></p>
        </div>
    </div>
  <?php
  }
  ?>
</div>