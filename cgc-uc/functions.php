<?php
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function uc_theme_support()
{
    add_theme_support('automatic-feed-links');
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(1200, 9999);
    add_image_size('uc-fullscreen', 1980, 9999);
    $logo_width = 120;
    $logo_height = 90;
    if (get_theme_mod('retiuc_kit_logo', false)) {
        $logo_width = floor($logo_width * 2);
        $logo_height = floor($logo_height * 2);
    }
    add_theme_support(
        'custom-logo',
        array(
            'height' => $logo_height,
            'width' => $logo_width,
            'flex-height' => true,
            'flex-width' => true,
        )
    );
    add_theme_support('title-tag');
    add_theme_support('editor-styles');
    add_editor_style([
        'https://kit-digital-uc-prod.s3.amazonaws.com/uc-kitdigital/css/uc-kitdigital.css',
        'assets/css/index.css'
    ]);
    add_filter('wpseo_title', 'custom_yoast_title');
    function custom_yoast_title()
    {
        if (is_home() || is_front_page()) return get_option('blogname');
        return null;
    }
}


add_action('after_setup_theme', 'uc_theme_support');

/**
 * Globales JS que antes entregaba el endpoint REST /wp-json/uc-kit/1/components.js.
 *
 * SITEWEB es la URL del directorio del tema: se concatena con rutas de asset
 * (window.SITEWEB + '/assets/img/picture.jpg'), no es el nombre del sitio.
 */
if (!function_exists('uc_kit_globals_js')) {
    function uc_kit_globals_js()
    {
        return sprintf(
            'window.SITEWEB = %s; window.SITEURL = %s;',
            wp_json_encode(get_template_directory_uri()),
            wp_json_encode(home_url())
        );
    }
}

// Breadcrumb
include __DIR__ . '/lib/develop/functions.php';
if (!defined('_VER')) {
    define('_VER', wp_get_theme()->get('Version'));

    /**
     * Register and Enqueue Styles.
     */
    function uc_register_styles()
    {
        wp_enqueue_style('uc-kitdigital', 'https://kit-digital-uc-prod.s3.amazonaws.com/uc-kitdigital/css/uc-kitdigital.css', [], '1.23.15-beta.1');
        wp_enqueue_style('uc-kit', get_template_directory_uri() . '/assets/css/index.css', [], filemtime(get_template_directory() . '/assets/css/index.css'));
        wp_enqueue_style( 'jquery-ui-datepicker-style' , '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css');
    }

    add_action('wp_enqueue_scripts', 'uc_register_styles');

    /**
     * Register and Enqueue Scripts.
     */
    function uc_register_scripts()
    {
        wp_enqueue_script('jquery', null, null, null, true);
        wp_enqueue_script("moment", null, null, null, true);
        wp_enqueue_script('uc-index', get_template_directory_uri() . '/assets/js/index.js', ['jquery', 'moment'], _VER, true);
        // Handle sin src: solo transporta los globales que antes servía /wp-json/uc-kit/1/components.js
        wp_register_script('uc-components', false, ['uc-index'], _VER, true);
        wp_enqueue_script('uc-components');
        wp_add_inline_script('uc-components', uc_kit_globals_js());
        // wp_enqueue_script('uc-news', get_template_directory_uri() . '/assets/js/news.js', ['uc-index', 'uc-components'], _VER, true);
        wp_enqueue_script('uc-kitdigital', 'https://kit-digital-uc-prod.s3.amazonaws.com/uc-kitdigital/js/uc-kitdigital.js', [], '1.23.15-beta.1', true);
        wp_enqueue_script('wp-jquery-date-picker', includes_url('/js/jquery/ui/datepicker.js'));

        // Agrega esta línea para tu JS del frontend
        wp_enqueue_script(
            'uc-frontend',
            get_template_directory_uri() . '/assets/js/frontend.js',
            array('jquery'),
            _VER,
            true
        );
    }

    add_action('wp_enqueue_scripts', 'uc_register_scripts');
}

add_filter('template_include', 'uc_register_template_page', 1000);
function uc_register_template_page($t)
{
    $GLOBALS['uc-kit-page'] = basename($t);
    return $t;
}

function uc_admin_bar()
{
    if (is_user_logged_in()) add_filter('show_admin_bar', '__return_true', 1000);
}

add_action('init', 'uc_admin_bar');

/**
 * W3C
 */
add_action('after_setup_theme', function () {
    add_theme_support('html5', ['script', 'style']);
});
add_action('wp_enqueue_scripts', function () {
    wp_dequeue_style('wp-block-library');
}, 100);

/**
 * Hoja de estilos propia del CGC.
 * Se encola despues de 'uc-kit' para poder ajustar sin tocar el CSS del Kit,
 * que es una de las cuatro zonas que la UC audita.
 */
add_action('wp_enqueue_scripts', function () {
    $style = get_stylesheet_directory() . '/style.css';
    wp_enqueue_style(
        'cgc-uc',
        get_stylesheet_directory_uri() . '/style.css',
        ['uc-kit'],
        file_exists($style) ? filemtime($style) : null
    );
}, 20);

include __DIR__ . '/classes/uc-kit-menu.php';
add_action('init', 'UCKitWPMenu::init');

include __DIR__ . '/classes/walker.php';

include __DIR__ . '/classes/uc-kit-customize.php';
add_action('customize_register', array('UCKitWP_Customize', 'register'));
add_action('customize_save_after', array('UCKitWP_Customize', 'update_alert_id'));
// Verificar si la clase y el método existen
// if (class_exists('UCKitWP_Customize') && method_exists('UCKitWP_Customize', 'update_alert_id')) {
//     error_log('UCKitWP_Customize and update_alert_id() are available');
// } else {
//     error_log('UCKitWP_Customize or update_alert_id() are NOT available');
// }
function richTextInputCustomizer( $wp_customize ) {
    // Añadir una sección en el Customizer
    $wp_customize->add_section( 'seccionRichText', array(
        'title'    => __( 'Mi Sección Personalizada', 'kit-uc' ),
        'priority' => 30,
    ));

    // Añadir la configuración para el campo de texto enriquecido
    $wp_customize->add_setting( 'inputRichText', array(
        'default'   => '',
    ));

    // Añadir el control personalizado
    $wp_customize->add_control( new Mi_Control_Richtext( $wp_customize, 'inputRichText', array(
        'label'   => __( 'Campo de Texto Enriquecido', 'kit-uc' ),
        'section' => 'seccionRichText',
        'type'    => 'richtext',
    )));
}
add_action( 'customize_register', 'richTextInputCustomizer' );
function mi_tema_enqueue_customizer_script() {
    wp_enqueue_script( 'customizerScript', get_template_directory_uri() . '/assets/js/customizer.js', array( 'jquery', 'customize-controls', 'wp-editor' ), false, true );
}
add_action( 'customize_controls_enqueue_scripts', 'mi_tema_enqueue_customizer_script' );


////error_log('test para ver qué línea es esta');

include __DIR__ . '/lib/gutenberg/index.php';
add_action('init', 'UCKitWP_Gutenberg::init');
include __DIR__ . '/classes/uc-kit.php';

/**
 * installer
 */
include __DIR__ . '/admin/index.php';

/**/

add_action('send_headers', 'add_header_seguridad');
function add_header_seguridad()
{
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1;mode=block');
}

register_sidebar(
    array(
        'name' => 'Widgets Home',
        'id' => 'widgets-home',
        'description' => 'Área de widgets que aparece en la Home',
        'class' => '',
        'before_widget' => '<div class="widget-home">',
        'after_widget' => '</div>',
        'before_title' => '<h2>',
        'after_title' => '</h2>'
    )
);

// Registrar la función de actualización del breadcrumb
function actualizar_breadcrumb_ajax() {
    $cat_id = isset($_GET['cat_id']) ? intval($_GET['cat_id']) : 0;

    if ($cat_id > 0) {
        $category = get_term($cat_id, 'category');
        if ($category && !is_wp_error($category)) {
            ob_start(); // Iniciar el buffer de salida para capturar el HTML
            ?>
            <li class="uc-breadcrumb_item">
                <a href="<?php echo get_home_url(); ?>/">Inicio</a>
                <i class="uc-icon">keyboard_arrow_right</i>
            </li>
            <?php if ($category->parent != 0): ?>
                <li class="uc-breadcrumb_item">
                    <a href="<?php echo get_category_link($category->parent); ?>"><?php echo get_cat_name($category->parent); ?></a>
                    <i class="uc-icon">keyboard_arrow_right</i>
                </li>
            <?php endif; ?>
            <li class="uc-breadcrumb_item current"><?php echo esc_html($category->name); ?></li>
            <?php
            $breadcrumb_html = ob_get_clean(); // Capturar el HTML generado

            // Asegurarte de que estás retornando un JSON correctamente formado
            wp_send_json_success(['breadcrumb' => $breadcrumb_html]);
        }
    }

    // En caso de error, devuelve un mensaje
    wp_send_json_error(['message' => 'Categoría no encontrada o error en el ID']);
}


// Registrar la acción AJAX
add_action('wp_ajax_actualizar_breadcrumb', 'actualizar_breadcrumb_ajax');
add_action('wp_ajax_nopriv_actualizar_breadcrumb', 'actualizar_breadcrumb_ajax');


// Función para obtener el ID de la categoría desde la URL
function obtener_cat_id_ajax() {
    $cat_url = isset($_GET['cat_url']) ? esc_url_raw($_GET['cat_url']) : '';

    if ($cat_url) {
        // Buscar la categoría por su URL (slug)
        $category = get_term_by('slug', basename($cat_url), 'category');

        if ($category) {
            wp_send_json_success(['cat_id' => $category->term_id]);
        }
    }

    wp_send_json_error();
}

// Registrar la función para manejar la solicitud AJAX
add_action('wp_ajax_obtener_cat_id', 'obtener_cat_id_ajax');
add_action('wp_ajax_nopriv_obtener_cat_id', 'obtener_cat_id_ajax');

// Función para manejar la solicitud AJAX y renderizar los posts filtrados
function handle_ajax_category_filter() {
    if (isset($_GET['ajax']) && $_GET['ajax'] == 1) {
        $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
        $slug = basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
        $category = get_category_by_slug($slug);
        $filtered_category = $category ? $category->term_id : 0;
        $args = array(
            'post_type' => 'post',
            'posts_per_page' => 12,
            'post_status' => 'publish',
            'paged' => $paged,
        );

       
            

        if (!empty($_GET['s'])) {
        $args['s'] = sanitize_text_field($_GET['s']);
        }
         // NUEVO: Filtro por fecha MM/YYYY
        if (!empty($_GET['date'])) {
            $date = sanitize_text_field($_GET['date']); // formato MM/YYYY
            if (preg_match('/^(\d{2})\/(\d{4})$/', $date, $matches)) {
                $args['monthnum'] = intval($matches[1]);
                $args['year'] = intval($matches[2]);
            }
        }else{
             if ($filtered_category ) {
            $args['cat'] = $filtered_category;
        }
        }

        $query = new WP_Query($args);

        ob_start();
        set_query_var('query', $query); // Pasar la consulta a la plantilla
        get_template_part('content-archive-posts'); // Incluir el archivo content-archive-posts.php
        $output = ob_get_clean();
        echo $output;
        echo '<pre>DEBUG: Llega al final de handle_ajax_category_filter</pre>';
        exit;
    }
}
add_action('template_redirect', 'handle_ajax_category_filter');

add_filter('posts_search', function ($search, $wp_query) {
    global $wpdb;
    if (!empty($wp_query->query_vars['s'])) {
        $search = '';
        $q = $wp_query->query_vars;
        $n = !empty($q['exact']) ? '' : '%';
        // IMPORTANTE: Usa '%' en el valor, no en la consulta
        $like = $n . $wpdb->esc_like($q['s']) . $n;
        $search .= " AND ({$wpdb->posts}.post_title LIKE '{$like}')";
          
    }
    return $search;
}, 10, 2);

function enqueue_recaptcha_scripts() {
    $site_key = get_theme_mod('uc_recaptcha_site_key', '');
    if (!$site_key) return; // No cargar si no hay clave
    wp_enqueue_script('recaptcha', 'https://www.google.com/recaptcha/api.js?render=' . $site_key, [], null, true);
    wp_enqueue_script('axios', 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', [], null, true);
    wp_enqueue_script('frontend', get_template_directory_uri() . '/assets/js/frontend.js', ['recaptcha', 'axios'], null, true);
    wp_localize_script('frontend', 'ajax_object', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'recaptcha_site_key' => $site_key
    ]);
}
add_action('wp_enqueue_scripts', 'enqueue_recaptcha_scripts');

// Acción AJAX para validar reCAPTCHA
add_action('wp_ajax_verify_recaptcha', 'verify_recaptcha');
add_action('wp_ajax_nopriv_verify_recaptcha', 'verify_recaptcha');
function verify_recaptcha() {
    $secret_key = get_theme_mod('uc_recaptcha_secret_key', '');
    $token = isset($_POST['token']) ? sanitize_text_field($_POST['token']) : '';
    if (!$token || !$secret_key) {
        wp_send_json_error(['message' => 'Token o clave secreta vacía']);
    }
    $response = wp_remote_post('https://www.google.com/recaptcha/api/siteverify', [
        'body' => [
            'secret' => $secret_key,
            'response' => $token
        ]
    ]);
    if (is_wp_error($response)) {
        wp_send_json_error(['message' => $response->get_error_message()]);
    }
    $data = json_decode(wp_remote_retrieve_body($response));
    if (!empty($data->success)) {
        wp_send_json_success();
    } else {
        wp_send_json_error(['message' => 'reCAPTCHA validation failed']);
    }
}

function uc_recaptcha_customizer($wp_customize) {
    $wp_customize->add_section('uc_recaptcha_section', array(
        'title'    => __('reCAPTCHA', 'kit-uc'),
        'priority' => 120,
    ));
    $wp_customize->add_setting('uc_recaptcha_site_key', array('default' => ''));
    $wp_customize->add_setting('uc_recaptcha_secret_key', array('default' => ''));
    $wp_customize->add_control('uc_recaptcha_site_key', array(
        'label'    => __('Site Key', 'kit-uc'),
        'section'  => 'uc_recaptcha_section',
        'type'     => 'text',
    ));
    $wp_customize->add_control('uc_recaptcha_secret_key', array(
        'label'    => __('Secret Key', 'kit-uc'),
        'section'  => 'uc_recaptcha_section',
        'type'     => 'text',
    ));
}
add_action('customize_register', 'uc_recaptcha_customizer');

add_action('template_redirect', function() {
    if (is_category()) {

        $category = get_queried_object();
        if (!$category) return;

        // Obtener la página de entradas configurada en WordPress
        $posts_page_id = get_option('page_for_posts');

        // Si no hay página de entradas definida, no hacer nada
        if (!$posts_page_id) return;

        // Obtener la URL de la página de entradas
        $posts_page_url = get_permalink($posts_page_id);

        // Crear URL destino con el filtro
        $redirect_url = add_query_arg([
            's'   => '',
            'cat' => $category->slug
        ], $posts_page_url);

        wp_redirect($redirect_url, 301);
        exit;
    }
});

/**
 * Intenta asignar automáticamente un menú a la ubicación principal si no hay ninguno asignado.
 */
function uc_kit_auto_assign_menu() {
    $menu_location = 'uc-kit-navbar_nav';
    $locations = get_theme_mod('nav_menu_locations');

    // Si no tasado o está vacío
    if (empty($locations[$menu_location])) {
        $menus = wp_get_nav_menus();
        if (!empty($menus)) {
            // Asigna el primer menú encontrado
            // Ordenamos por ID o nombre si se prefiere, por defecto wp_get_nav_menus devuelve por nombre
            $locations[$menu_location] = $menus[0]->term_id;
            set_theme_mod('nav_menu_locations', $locations);
        }
    }
}
add_action('after_switch_theme', 'uc_kit_auto_assign_menu');