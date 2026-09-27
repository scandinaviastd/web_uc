<?php
$class = ($args['type'] === 'info') ? "info" : (($args['type'] === 'success') ? "success" : (($args['type'] === 'warning') ? "warning" : (($args['type'] === 'error') ? "error" : "")));

$icon = ($args['type'] === 'success') ? "check_circle" : (($args['type'] === 'warning') ? "warning" : (($args['type'] === 'error') ? "error" : "info"));
?>
<div class="uc-alert simple-alert <?= $class ?>" id="<?= $args['id'] ?>" style="display: none;">
  <div class="uc-alert_content">
    <i class='uc-icon icon-size--sm'>
      <?= $icon ?>
    </i>
    <span class="p p-size--sm bold ml-8"><?= $args["description"] ?></span>
  </div>
  <?php if($args['withClose']): ?>
  <div class="uc-alert_close <?= $args['id'] ?>">
    <i class="uc-icon icon-size--sm" style="cursor: pointer; align-self: flex-start;">close</i>
  </div>
  <?php endif; ?>
</div>

<script>
    document.addEventListener('DOMContentLoaded', (event) => {
        var alertElement = document.getElementById('<?= $args['id'] ?>');
        var lastAlertId = localStorage.getItem('lastSimpleAlertId');
        var alertId = '<?= $args['id'] ?>';

        // Solo mostrar la alerta si el ID actual es diferente del último ID almacenado
        if (alertId != lastAlertId) {
            ///console.log("test1")
            alertElement.style.display = 'flex';
        }else{
            //console.log("test2")
            alertElement.style.display = 'none';

        }

        var closeButton = document.querySelector('.<?= $args['id'] ?>');

        if (closeButton) {
          //console.log('closeButton');
            closeButton.addEventListener('click', function() {
              //console.log('click');
                if (alertElement) {
                    alertElement.style.display = 'none';
                }

                // Almacenar el ID de la alerta cerrada para comparar con futuras alertas
                localStorage.setItem('lastSimpleAlertId', alertId);
            });
        }
    });
</script>