<?php
$class = ($type === 'info') ? "uc-message" :
(($type === 'success') ? "uc-message success mb-32" :
(($type === 'warning') ? "uc-message warning" :
(($type === 'error') ? "uc-message error" : "info")));

$icon = ($type === 'success') ? "<i class='uc-icon warning-icon'>check_circle</i>" :
(($type === 'warning') ? "<i class='uc-icon warning-icon'>warning</i>" :
(($type === 'error') ? "<i class='uc-icon warning-icon'>error</i>" : ""));
//var_dump($args['withImage']);
?>
<div class="uc-card <?php echo (is_null($args["link"])) ? 'uc-card--no-interaction' : '' ?> card-type--horizontal card-border--top mb-60">
  <?php echo $args['withImage'] ? '<img src="' . $args['image']['url'] . '" style="max-width: 320px" alt="'.$args['image']['alt'].'" />' : ''; ?>
  <div class="uc-card_body--xl">
    <div class="h3 my-16">
      <div class="uc-icon mr-12">notifications_active</div>
      <?= $icon . $args['title']; ?>
    </div>
    <p>
      <?= $args["description"] ?>
    </p>
    <?php if(!is_null($args["link"])): ?>
    <div class="mt-auto">
      <a href="<?= $args["link"] ?>" class="uc-btn btn-inline">
      <?= $args["label"] ?><i class="uc-icon icon-shape--rounded">arrow_forward</i>
      </a>
    </div>
    <?php endif; ?>
  </div>
</div>

