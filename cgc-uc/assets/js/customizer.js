(function ($) {
    $(document).ready(function () {
        // Este selector debe apuntar al textarea que TinyMCE reemplaza en la pestaña "Texto".
        // Asegúrate de que el ID coincida con el que se utiliza en tu entorno.
        var textareaId = "#custom_richtext_uckit_alert_text";
        var placeholderText = "Máximo 130 carácteres"; // Asegúrate de que este texto coincida exactamente con tu placeholder falso.

        $(textareaId).on("focus", function () {
            var contentWithoutHTML = $(this)
                .val()
                .replace(/<[^>]*>?/gm, "")
                .trim();
            if (contentWithoutHTML === placeholderText) {
                $(this).val(""); // Limpia el contenido si coincide con el placeholder falso.
            }
        });

        $(textareaId).on("blur", function () {
            var contentWithoutHTML = $(this)
                .val()
                .replace(/<[^>]*>?/gm, "")
                .trim();
            if (contentWithoutHTML === "") {
                $(this).val(placeholderText); // Restablece el placeholder falso si el área de texto está vacía.
            }
        });

        $('#_customize-input-uckit_menu_type').change(function() {
            // Obtener el valor seleccionado
            var valorSeleccionado = $(this).val();
    
            // Verificar si el valor contiene la palabra 'submarca'
            if (valorSeleccionado.includes('submarca')) {
                // Si contiene 'submarca', mostrar el <li>
                $('#customize-control-uckit_menu_image').show();
                $('#customize-control-uckit_footer_image').show();
            } else {
                // Si no contiene 'submarca', ocultar el <li>
                $('#customize-control-uckit_menu_image').hide();
                $('#customize-control-uckit_footer_image').hide();
            }
        });
    
        // Disparar el evento change al cargar la página para manejar el valor inicial seleccionado
        $('#_customize-input-uckit_menu_type').change();
    });

    wp.customize.controlConstructor["richtext"] = wp.customize.Control.extend({
        ready: function () {
            var control = this;
            var id = "custom_richtext_" + control.id; // Asegúrate de que este ID coincida con el ID del editor TinyMCE
            console.log("Inicializando editor para: ", id);

            wp.editor.initialize(id, {
                tinymce: {
                    wpautop: true,
                },
                quicktags: true,
            });
            var editor = tinymce.get(id);
            var placeholderText = "Máximo 130 carácteres";
            var maxLength = 130;

            editor.on("init", function () {
                //Verifica si el editor está vacío y muestra el placeholder

                if (!editor.getContent().trim()) {
                    editor.setContent(placeholderText);
                }
            });
            editor.on("keydown", function (e) {
                var content = editor.getContent({ format: "text" }).trim();
                if (
                    content.length >= maxLength &&
                    e.keyCode !== 8 &&
                    e.keyCode !== 46
                ) {
                    // No permitir más entrada si se alcanza el máximo de caracteres y no es una tecla de retroceso o suprimir
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
            editor.on("focus", function () {
                // Elimina el placeholder cuando el editor recibe el foco, si el contenido coincide con el placeholder.
                var content = editor.getContent({ format: "text" }).trim();
                if (content === placeholderText) {
                    editor.setContent("");
                }
            });

            editor.on("blur", function () {
                // Vuelve a colocar el placeholder si el editor está vacío cuando pierde el foco.
                if (!editor.getContent().trim()) {
                    editor.setContent(placeholderText);
                }
            });
            // Lo más importante: Asegúrate de que cualquier cambio en el editor actualice el valor en el Personalizador.
            editor.on("keyup change", function () {
                // Asegurar que cualquier cambio no exceda el máximo de caracteres permitido
                var content = editor.getContent();
                var textContent = $("<div>").html(content).text(); // Usa un div para parsear el HTML y extraer el texto
                if (textContent.length > maxLength) {
                    // Encuentra el punto para truncar sin eliminar etiquetas HTML innecesariamente
                    var truncatedContent = truncateHtml(content, maxLength);
                    editor.setContent(truncatedContent);
                    editor.undoManager.add(); // Añadir un punto de restauración en el historial del editor
                }
                // Actualizar el valor en el Personalizador
                control.setting.set(editor.getContent());
                // Función para truncar el HTML correctamente hasta un número máximo de caracteres de texto visible
                function truncateHtml(html, maxLength) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(html, 'text/html');
                    var allTextNodes = [];
                    var totalLength = 0;
                
                    (function findAllTextNodes(node) {
                        if (node.nodeType === Node.TEXT_NODE) {
                            totalLength += node.textContent.length;
                            if (totalLength > maxLength) {
                                // Calcula cuántos caracteres deben eliminarse del nodo de texto actual
                                var overLength = totalLength - maxLength;
                                node.textContent = node.textContent.slice(0, -overLength);
                                // Una vez que se alcanza el límite, elimina todos los nodos subsiguientes
                                while (node.nextSibling) {
                                    node.parentNode.removeChild(node.nextSibling);
                                }
                                // También asegúrate de eliminar cualquier nodo posterior en la jerarquía del documento
                                while (node.parentNode !== doc.body) {
                                    while (node.parentNode.nextSibling) {
                                        node.parentNode.parentNode.removeChild(node.parentNode.nextSibling);
                                    }
                                    node = node.parentNode;
                                }
                                return;
                            }
                        } else {
                            for (var i = 0; i < node.childNodes.length; i++) {
                                findAllTextNodes(node.childNodes[i]);
                            }
                        }
                    })(doc.body);
                
                    return doc.body.innerHTML;
                }
                
                

            });
            // Actualiza el texto de la alerta en tiempo real en la vista previa
            wp.customize(control.id, function (value) {
                value.bind(function (newval) {
                    console.log("Actualizando valor en tiempo real: ", newval);
                    $(".uc-alert_content span").html(newval); // Asegúrate de que este selector sea correcto
                });
            });
        },
    });
})(jQuery);
