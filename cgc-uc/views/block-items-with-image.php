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
		<!--Card con imagen -->
		<div class="col col-sm-9 col-md-6 col-lg-4 col-xl-4 mb-32 d-flex">
			<div class="uc-card card-bg--image <?= ($args['withLink']) ? 'uc-card--no-interaction' : '' ?> card-gradient--bottom-blue uc-card--type-square w-100">
				<?= ($args['withLink']) ? "<a href=". $item['url'] ." >" : '' ?>
					<img class="uc-card-img uc-card-img--type-square" src="<?= $item['src'] ?>" alt="<?= $item['alternative'] ?>" />

					<div class="uc-card_body--lg uc-card_body--absolute">
						<div class="mt-auto">
							<?php 
								$iconClass = (in_array($item['type'], ['page', 'post'])) ? 'card-link-internal' : 'card-link-external';
								echo "<" . $args["itemTitleTag"] . " class='color-white h4 $iconClass' >" . $item['title'] . "</" . $args["itemTitleTag"] . ">"; 
							?>
							<div class="uc-text-divider divider-primary mt-12"></div>
						</div>
					</div>
				<?= ($args['withLink']) ? "</a>" : '' ?>
			</div>
		</div>
	<?php
	}
	?>
</div>