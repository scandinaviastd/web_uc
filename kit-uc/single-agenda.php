<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Tema_UC
 */

get_header();
get_template_part( 'views/header' );
$api_token = "R9pGNowrJ0ICaQcIdI6Nu9Yy05HeuTngCbf4CSUoh5Bfs0K4kcrfq4HHamV1F7iTrcTclp4V4plVkjvT";
global $activity_slug;
$activity_slug = str_replace('/temaUCDesarrollo/agenda/','',$_SERVER['REDIRECT_URL']);
//var_dump($_SERVER['REDIRECT_URL']);
$url="https://api.agenda.uc.cl/api/render/single/". $activity_slug;

// Inicializar sesion cURL
$curl_session = curl_init($url);

// Setear opciones de cURL
curl_setopt_array($curl_session, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ["Authorization: Bearer $api_token"],
]);


// Ejecutar la peticion y guardar la respuesta
$content = curl_exec($curl_session);

$contentUTF8 = '<?xml encoding="UTF-8">' . $content;
// Crear una instancia de DOMDocument
$doc = new DOMDocument();
// Cargar el contenido HTML en el DOMDocument
@$doc->loadHTML(mb_convert_encoding($contentUTF8, 'HTML-ENTITIES', 'UTF-8'), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
// Crear una instancia de DOMXPath para hacer la búsqueda
$xpath = new DOMXPath($doc);
// Buscar el contenido del primer h1 en el documento
$h1Nodes = $xpath->query('//h1');
if ($h1Nodes->length > 0) {
    global $h1Content;
    $h1Content = $h1Nodes->item(0)->nodeValue;
} else {
    echo "No se encontró una etiqueta <h1> en el contenido.";
}
?>
<div class="container mt-44">
    <div class="row">
        <div class="col-12">
            <?php get_template_part( 'views/breadcrumb' ); ?>
        </div>
    </div>
</div>

<div class="actividad-single">
            <?php
                //var_dump($contentBreadcrumb);
                if ($content) {
                    echo $content;
                  } else {
                    echo "<h3>Ocurrió un error ".curl_error($curl_session)."</h3>";

                    curl_close($curl_session);
                }
?>
    </div>
<?php
get_template_part( 'views/footer' );
get_footer();