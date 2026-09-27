<?php
require_once( ABSPATH . WPINC . '/class-wp-customize-control.php' );
if ( ! class_exists( 'Mi_Control_Richtext' ) ) {
    add_action( 'customize_register', function( $wp_customize ) {
        class Mi_Control_Richtext extends WP_Customize_Control {
            public $type = 'richtext';

            public function render_content() {
                $id = 'custom_richtext_' . $this->id; // Crear un ID único
                ?>
                <label>
                    <span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
                    <textarea maxlength="130" placeholder="Máximo 130 carácteres" id="<?php echo esc_attr($id); ?>" rows="5" style="width:100%;" <?php $this->link(); ?>><?php echo $this->value(); ?></textarea>
                </label>
                <?php
            }
            
        }
        // Resto del código para registrar controles, secciones y ajustes...
    });
    function agregar_placeholder_tinymce( $initArray ) {
        // Define el texto del placeholder.
        $placeholder = 'Escribe aquí tu texto...';
    
        // Añade el placeholder a la configuración de TinyMCE.
        // Usa 'placeholder' si tu versión de TinyMCE lo soporta directamente,
        // de lo contrario, podrías necesitar implementar una solución específica.
        $initArray['placeholder'] = $placeholder;
    
        return $initArray;
    }
    add_filter( 'tiny_mce_before_init', 'agregar_placeholder_tinymce' );
   
}

// Asegúrate de que el resto del código que no necesite estar dentro del hook 'customize_register' siga fuera de este bloque.

if ( ! class_exists( 'UCKitWP_Customize' ) ) {
    /**
     * CUSTOMIZER SETTINGS
     */
    class UCKitWP_Customize {

        /**
         * Register customizer options.
         *
         * @param WP_Customize_Manager $wp_customize Theme Customizer object.
         */
        private static $old_alert_text = null;

        public static function register( $wp_customize ) {

            /**
             * Theme Options
             * https://developer.wordpress.org/reference/classes/wp_customize_control/__construct/
             */
            
            add_action('customize_save', array(__CLASS__, 'capture_old_value'));
            add_action('customize_save_after', array(__CLASS__, 'update_alert_id'));

            $wp_customize->add_section(
                'options',
                array(
                    'title'      => __( 'Opciones Kit UC', 'kit-uc' ),
                    'priority'   => 10,
                    'capability' => 'edit_theme_options',
                )
            );

            $options = [
                'uckit_menu_type' => [
                    'title' => 'Tipo de marca(header y footer)',
                    'type' => 'select',
                    'choices' => [
                        'none' => 'Seleccione tipo de marca',
                        'denominacion_internacional' => 'Denominación internacional',
                        'denominacion' => 'Denominación',
                        'submarca' => 'Submarca',
                        'submarca_con_slogan' => 'Submarca con slogan',
                        'header_denominacion_alpha' => 'Denominación (alpha)',
                        'denominacion_internacional_alpha' => 'Denominación internacional (alpha)',
                        'submarca_con_slogan_alpha' => 'Submarca con slogan (alpha)',
                    ],
                    'default' => 'none',
                ],
                'uckit_menu_dark' => [
                    'title' => 'Ver header dark',
                    'type' => 'checkbox',
                    'default' => false,
                ],
                 'uckit_show_acreditacion' => [
                    'title' => '¿Mostrar sello de acreditación en el footer?',
                    'type' => 'checkbox',
                    'default' => false,
                    'description' => 'Validar filiación marcaria del proyecto con Dirección de Visibilidad Digital: visibilidaddigital@uc.cl',
                ],
                'uckit_tipo_sello_acreditacion' => [
                    'title' => 'Tipo de sello de acreditación',
                    'type' => 'select',
                    'choices' => [
                        'horizontal' => 'Acreditación versión horizontal',
                        'vertical' => 'Acreditación versión vertical',
                        '7_horizontal_areas' => 'Acreditación 7 años grande horizontal con áreas',
                        '7_horizontal_sin_areas' => 'Acreditación 7 años grande horizontal sin áreas',
                        '7_vertical_areas' => 'Acreditación 7 años grande vertical con áreas',
                        '7_vertical_sin_areas' => 'Acreditación 7 años grande vertical sin áreas',
                    ],
                    'default' => 'horizontal',
                ],
                'uckit_menu_image' => [
                    'title' => 'Imagen de la submarca en el header',
                    'type' => 'image',
                    'default' => '',
                ],
                'uckit_footer_image' => [
                    'title' => 'Imagen de la submarca en el footer',
                    'type' => 'image',
                    'default' => '',
                ],
                'uckit_alert' => [
                    'title' => 'Alerta Fija',
                    'type' => 'select',
                    'choices' => [
                        'none' => 'No mostrar alerta fija',
                        'info' => 'Información',
                        'success' => 'Éxito',
                        'warning' => 'Alerta',
                        'error' => 'Error',
                    ],
                    'default' => 'none'
                ],
                'uckit_alert_text' => [
                    'title' => 'Texto Alerta Fija',
                    'type' => 'richtext',
                    'default' => null,
                ],
                'uckit_id_tagManager' => [
                    'title' => 'ID Tag Manager',
                    'type' => 'text',
                    'placeholder' => 'Escribe aquí tu ID de Tag Manager',
                    'default' => null,
                ],
                'uckit_phone' => [
                    'title' => 'Número de Teléfono',
                    'type' => 'text',
                    'default' => null,
                ],
                'uckit_address' => [
                    'title' => 'Dirección',
                    'type' => 'text',
                    'default' => null,
                ],
                'uckit_designed_by' => [
                    'title' => 'Diseñado por',
                    'type' => 'text',
                    'default' => '',
                ],
                'uckit_url_designer' => [
                    'title' => 'URL Diseñador',
                    'type' => 'text',
                    'default' => '',
                ],
                'uckit_both_design_and_development' => [
                    'title' => '¿Diseñado y Desarrollado?',
                    'type' => 'checkbox',
                    'default' => true,
                ],
                'uckit_developed_by' => [
                    'title' => 'Desarrollado por',
                    'type' => 'text',
                    'default' => '',
                ],
                'uckit_url_developer' => [
                    'title' => 'URL Desarrollador',
                    'type' => 'text',
                    'default' => '',
                ],
                'uckit_administrated_by' => [
                    'title' => 'Administrado por',
                    'type' => 'text',
                    'default' => '',
                ],
                'uckit_url_administrated_by' => [
                    'title' => 'URL Administrador',
                    'type' => 'text',
                    'default' => '',
                ],
                
                'uckit_twitter' => [
                    'title' => 'Url de Twitter',
                    'type' => 'text',
                    'default' => '',
                ],
                'uckit_facebook' => [
                    'title' => 'Url de Facebook',
                    'type' => 'text',
                    'default' => '',
                ],
                'uckit_linkedin' => [
                    'title' => 'Url de linkedin',
                    'type' => 'text',
                    'default' => '',
                ],
                'uckit_instagram' => [
                    'title' => 'Url de Instagram',
                    'type' => 'text',
                    'default' => '',
                ],
                'uckit_youtube' => [
                    'title' => 'Url de Youtube',
                    'type' => 'text',
                    'default' => '',
                ],
                'uckit_flickr' => [
                    'title' => 'Url de Flickr',
                    'type' => 'text',
                    'default' => '',
                ],
                'uckit_header_html' => [
                    'title' => 'Código Header',
                    'type' => 'textarea',
                    'default' => '',
                ],
                'uckit_body_html' => [
                    'title' => 'Código Body',
                    'type' => 'textarea',
                    'default' => '',
                ],
                'uckit_footer_html' => [
                    'title' => 'Código Footer',
                    'type' => 'textarea',
                    'default' => '',
                ],
                'uckit_404_image' => [
                    'title' => 'Imagen 404',
                    'type' => 'image',
                    'default' => '',
                ],
            ];

            $i = 10;
            foreach($options as $key => $value){
                $sanitize = null;
                if($value['type'] == 'checkbox') $sanitize = array( __CLASS__, 'sanitize_checkbox' );
                if($value['type'] == 'textarea') $sanitize = 'sanitize_textarea_field';
                if($value['type'] == 'richtext') $sanitize = 'wp_kses_post';
                $wp_customize->add_setting(
                    $key,
                    array(
                        'capability'        => 'edit_theme_options',
                        'default'           => $value['default'],
                        'sanitize_callback' => $sanitize,
                    )
                );
                if($value['type'] == 'image'){
                    $wp_customize->add_control(new WP_Customize_Image_Control(
                        $wp_customize,
                        $key,
                        array(
                            'label'      => __( $value['title'], 'kit-uc' ),
                            'section'  => 'options',
                            'priority' => $i,
                        )
                    ));

                }else if ($value['type'] == 'select') {
                        $wp_customize->add_control(
                            $key,
                            array(
                                'label'    => __( $value['title'], 'kit-uc' ),
                                'section'  => 'options',
                                'type'     => $value['type'],
                                'choices'  => $value['choices'],
                                'priority' => isset($value['priority']) ? $value['priority'] : $i,
                            )
                        );
                }else if($key == 'uckit_alert_text') {
                    // Agregar el control personalizado para texto enriquecido
                    $wp_customize->add_control(new Mi_Control_Richtext(
                        $wp_customize,
                        $key,
                        array(
                            'label'    => __( $value['title'], 'kit-uc' ),
                            'section'  => 'options',
                            'priority' => $i,
                            'type'     => $value['type'],
                            'placeholder' => 'Máximo 130 carácteres',
                        )
                    ));
                }
                else {
                    $wp_customize->add_control(new WP_Customize_Control(
                        $wp_customize,
                        $key,
                        array(
                            'label'    => __( $value['title'], 'kit-uc' ),
                            'section'  => 'options',
                            'priority' => $i,
                            'type'     => $value['type'],
                            'input_attrs' => array(
                                'placeholder' => __( isset($value['placeholder']) ? $value['placeholder'] : '' ),
                            )
                        )
                    ));
                }
                $i++;
            }

            ////error_log("test 1");
            add_action('customize_save_after', array(__CLASS__, 'update_alert_id'));

            if (has_action('customize_save_after', array(__CLASS__, 'update_alert_id'))) {
                ////error_log('update_alert_id() has been added to customize_save_after');
            } else {
                ////error_log('update_alert_id() has NOT been added to customize_save_after');
            }
        }/** @noinspection PhpUnused */

        public static function capture_old_value($wp_customize) {
            // Capturar el valor antiguo antes de que se guarde
            self::$old_alert_text = get_theme_mod('uckit_alert_text');
            ////error_log("Captured old value: " . self::$old_alert_text);
        }
    
        public static function update_alert_id($wp_customize) {
            ////error_log("Customize Save After Triggered");
    
            // Usar el valor antiguo capturado y compararlo con el nuevo valor
            $old_value = self::$old_alert_text;
            $new_value = $wp_customize->get_setting('uckit_alert_text')->post_value();
    
            ////error_log("old_value: " . print_r($old_value, true));
            ////error_log("new_value: " . print_r($new_value, true));
    
            if ($old_value !== $new_value) {
                $new_alert_id = uniqid('alert_', true);
                update_option('uckit_alert_id', $new_alert_id);
                ////error_log("Alert ID updated: " . $new_alert_id);
            } else {
                ////error_log("No change detected in 'uckit_alert_text'");
            }
        }
        
        /**
         * Sanitize boolean for checkbox.
         *
         * @param bool $checked Whether or not a box is checked.
         * @return bool
         */
        public static function sanitize_checkbox( $checked ) {
            return ( ( isset( $checked ) && true === $checked ) ? true : false );
        }

    }
}
