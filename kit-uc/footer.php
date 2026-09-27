<?php
wp_footer();
$footer_html = get_theme_mod('uckit_footer_html');
if (!empty($footer_html)) echo $footer_html;
?>
<script>
jQuery(document).ready(function($) {

    const $campo = $('#date');

    let usuarioBorro = false;

    // Detectar si el usuario borra manualmente
    $campo.on('keydown', function(e) {
        // BACKSPACE (8), DEL (46)
        if (e.key === 'Backspace' || e.key === 'Delete') {
            usuarioBorro = true;
        }
    });

    // Detectar si lo dejó vacío manualmente
    $campo.on('input', function() {
        if ($(this).val().trim() === '') {
            usuarioBorro = true;
        }
    });

    $('.datepicker').datepicker({
        dateFormat: 'mm/yy',
        changeMonth: true,
        changeYear: true,
        

        onClose: function(dateText, inst) {

            if (usuarioBorro) {
                usuarioBorro = false; // resetear
                return;
            }

            // Si no borró, entonces sí aplicar selección de mes/año
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
            $(this).trigger('change');
        }
    });

    $('.datepicker').on('focus', function(){
        $(".ui-datepicker-calendar").hide();
        $("#ui-datepicker-div .ui-datepicker-buttonpane").hide();
    });

});

</script>
</body>

</html>