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
        wp_enqueue_script('uc-components', get_home_url() . '/wp-json/uc-kit/1/components.js', ['uc-index'], _VER, true);
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
/**
 * API REST
 */
include __DIR__ . '/classes/uc-kit-api.php';
UCKitWPApi::init();

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

$themeName = 'kit-uc-wp-master';
$userRepoGitHub = 'UniversidadCatolicaChile';
$repository = 'kit-uc-wp';
include __DIR__ . '/classes/updater.php';
if (is_admin()) {
    $config = [
        'slug' => dirname(plugin_basename(__FILE__)), // this is the slug of your plugin
        'proper_folder_name' => $themeName, // this is the name of the folder your plugin lives in
        'api_url' => "https://api.github.com/repos/$userRepoGitHub/$repository", // the GitHub API url of your GitHub repo
        'raw_url' => "https://raw.githubusercontent.com/$userRepoGitHub/$repository/master", // the GitHub raw url of your GitHub repo
        'github_url' => "https://github.com/$userRepoGitHub/$repository", // the GitHub url of your GitHub repo
        'zip_url' => "https://api.github.com/repos/$userRepoGitHub/$repository/zipball/master?access_token=YOUR_GITHUB_TOKEN", // the zip url of the GitHub repo
        'sslverify' => true, // whether WP should check the validity of the SSL cert when getting an update, see https://github.com/jkudish/WordPress-GitHub-Plugin-Updater/issues/2 and https://github.com/jkudish/WordPress-GitHub-Plugin-Updater/issues/4 for details
        'requires' => '5.0', // which version of WordPress does your plugin require?
        'tested' => '6.1', // which version of WordPress is your plugin tested up to?
        'readme' => 'README.md', // which file to use as the readme for the version number
        'access_token' => 'YOUR_GITHUB_TOKEN', // Access private repositories by authorizing under Plugins > GitHub Updates when this example plugin is installed
    ];
    new WP_GitHub_Updater($config);
}

// Custom Post Type - Agenda con ítems Evento
function crear_post_type_agenda() {

    $labels = array(
        'name'                  => _x( 'Agenda', 'Post type general name', 'kit-uc' ),
        'singular_name'         => _x( 'Evento', 'Post type singular name', 'kit-uc' ),
        'menu_name'             => _x( 'Agenda', 'Admin Menu text', 'kit-uc' ),
        'name_admin_bar'        => _x( 'Evento', 'Add New on Toolbar', 'kit-uc' ),
        'add_new'               => __( 'Añadir nuevo', 'kit-uc' ),
        'add_new_item'          => __( 'Añadir nuevo evento', 'kit-uc' ),
        'new_item'              => __( 'Nuevo evento', 'kit-uc' ),
        'edit_item'             => __( 'Editar evento', 'kit-uc' ),
        'view_item'             => __( 'Ver evento', 'kit-uc' ),
        'all_items'             => __( 'Todos los eventos', 'kit-uc' ),
        'search_items'          => __( 'Buscar eventos', 'kit-uc' ),
        'parent_item_colon'     => __( 'Evento padre:', 'kit-uc' ),
        'not_found'             => __( 'No se encontraron eventos.', 'kit-uc' ),
        'not_found_in_trash'    => __( 'No se encontraron eventos en la papelera.', 'kit-uc' ),
        'featured_image'        => _x( 'Imagen destacada del evento', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'kit-uc' ),
        'set_featured_image'    => _x( 'Establecer imagen destacada', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'kit-uc' ),
        'remove_featured_image' => _x( 'Eliminar imagen destacada', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'kit-uc' ),
        'use_featured_image'    => _x( 'Usar como imagen destacada', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'kit-uc' ),
        'archives'              => _x( 'Archivo de eventos', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'kit-uc' ),
        'insert_into_item'      => _x( 'Insertar en evento', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'kit-uc' ),
        'uploaded_to_this_item' => _x( 'Cargado a este evento', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'kit-uc' ),
        'filter_items_list'     => _x( 'Filtrar lista de eventos', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'kit-uc' ),
        'items_list_navigation' => _x( 'Navegación de lista de eventos', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'kit-uc' ),
        'items_list'            => _x( 'Lista de eventos', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'kit-uc' ),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'agenda' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
    );

    register_post_type( 'agenda', $args );
}

add_action( 'init', 'crear_post_type_agenda', 1 );

function custom_rewrite_rule() {
    // Añade la regla de reescritura para URLs del tipo /agenda/xxx
    add_rewrite_rule('^agenda/([^/]+)/?', 'index.php?custom_agenda_var=$matches[1]', 'top');
}
add_action('init', 'custom_rewrite_rule', 10, 0);

function custom_query_vars($vars) {
    $vars[] = 'custom_agenda_var'; // Nuestra variable personalizada
    return $vars;
}
add_filter('query_vars', 'custom_query_vars');

function custom_template_include($template) {
    if (get_query_var('custom_agenda_var')) {
        $new_template = locate_template(array('single-agenda.php'));
        if ('' != $new_template) {
            return $new_template;
        }
    }
    return $template;
}
add_filter('template_include', 'custom_template_include');

// Añade una función que evitará el error 404 en casos específicos
function custom_parse_request($wp) {
    // Si nuestra variable personalizada está presente pero no hay post correspondiente,
    // evita el error 404 y maneja la salida con la plantilla custom
    if (array_key_exists('custom_agenda_var', $wp->query_vars) 
        && !get_page_by_path($wp->query_vars['custom_agenda_var'], OBJECT, 'agenda')) {
        $wp->is_404 = false;
        status_header(200);
    }
}
add_action('parse_request', 'custom_parse_request');

function custom_pre_get_posts($query) {
    // Verifica que no estemos en el panel de administración, y que sea la consulta principal
    if (!is_admin() && $query->is_main_query()) {
        if (get_query_var('custom_agenda_var')) {
            $query->set('post_type', 'agenda');
            // Aquí puedes ajustar otras propiedades de la consulta según lo que necesites
        }
    }
}
add_action('pre_get_posts', 'custom_pre_get_posts');

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