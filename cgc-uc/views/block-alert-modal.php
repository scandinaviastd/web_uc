<!--?php 
//$class = ($args['type'] === 'info') ? "info" : (($args['type'] === 'success') ? "success mb-32" : (($args['type'] === 'warning') ? "warning" : (($args['type'] === 'error') ? "error" : "")));
//$icon = ($args['type'] === 'success') ? "check_circle" : (($args['type'] === 'warning') ? "warning" : (($args['type'] === 'error') ? "error" : "info"));
// echo '<pre>';
// var_dump($args);
// echo '<br>';
// var_dump($class);
// echo '</pre>';
//var_dump(is_front_page());
?-->

<div data-modal="modalAlert" id="<?= $args['id'] ?>" class="uc-modal" open>
	<div class="uc-modal_content uc-message <?= $class ?> mb-32">
		<a href="javascript:void(0)" class="uc-message_close-button" data-mclosed><i class="uc-icon">close</i></a>
		<div class="uc-message_body">
			<?= "<" . $args["titleTag"] . " class='mb-24' ><i class='uc-icon warning-icon'>" . $icon . "</i>" . $args['title'] . "</" . $args["titleTag"] . ">"; ?>
			<p class="no-margin">
				<?= $args["description"] ?>
			</p>
			<?php if (in_array($args["type"], ['warning', 'error'])) : ?>

				<div class="row align-items-center">
					<div class="col-md-6">
						<p class="no-margin"><?= $args["lugarContacto"] ?></p>
						<a href="#" class="uc-link uc-btn btn-inline"><i class="uc-icon no-margin">phone</i> <?= $args["numeroContacto"] ?></a>
					</div>
					<div class="col-md-6 text-right">
						<a href="<?= $args["masInformacion"] ?>" class="uc-link uc-btn btn-inline">
							Más información
							<i class="uc-icon icon-shape--rounded">arrow_forward</i>
						</a>
					</div>
				</div>
			<?php endif; ?>
		</div>
	</div>
</div>

<script>
    jQuery(document).ready(function() {
        // Obtén la lista de modales cerrados desde localStorage
        var closedModals = JSON.parse(localStorage.getItem('closedModals')) || [];

        // Recorre todos los elementos de modal en la página
        jQuery('[data-modal="modalAlert"]').each(function() {
            var modalID = jQuery(this).attr('id');

            // Muestra el modal solo si su ID no está en la lista de modales cerrados
            if (!closedModals.includes(modalID)) {
                jQuery(this).css('display', 'block');
                jQuery(this).attr('open', true);
            } else {
                jQuery(this).css('display', 'none');
                jQuery(this).removeAttr('open');
            }

            // Evento al hacer clic en el botón de cerrar
            jQuery(this).find('[data-mclosed]').on('click', function() {
                // Añade el ID a la lista de modales cerrados si no está ya presente
                if (!closedModals.includes(modalID)) {
                    closedModals.push(modalID);
                    localStorage.setItem('closedModals', JSON.stringify(closedModals));
                }

                // Cierra el modal
                jQuery('#' + modalID).css('display', 'none');
                jQuery('#' + modalID).removeAttr('open');
            });
        });
    });
</script>