<?php
/*
Template Name: Contacto
 */

get_header();
get_template_part('views/header');
$i = 1;
$iniciativas = [];
while (true) {
    $titulo = get_post_meta(get_the_ID(), "titulo_$i", true);
    $contenido = get_post_meta(get_the_ID(), "contenido_$i", true);
    $icono = get_post_meta(get_the_ID(), "icono_$i", true);
    if (empty($titulo) || empty($contenido)) break;
    $iniciativas[] = [$titulo, $contenido, $icono];
    $i += 1;
}
?>
    <div class="main">
        <div class="container my-44">


            <div class="row">
                <div class="col-lg-10">
                    <h1 class="my-24"><?php the_title(); ?></h1>
                </div>
                <div class="offset-lg-2"></div>
                <div class="col-lg-12">
                    <hr class="uc-hr my-40">
                </div>
            </div>


            <div class="row">
                <div class="col-lg-3 mb-32">
                    <div class="uc-filters">
                        <div class="uc-form-group no-margin">
                            <p class="text-weight--medium uppercase">Información</p>
                            <hr class="uc-hr">

                            <div class="sidebar-iniciativas">
                                <?php foreach ($iniciativas as $iniciativa): ?>
                                    <div class="mb-8">
                                        <span class="text-weight--medium"> <i class="uc-icon"><?php echo $iniciativa[2]?></i><?php echo $iniciativa[0]?></span>
                                        <div class="ml-24" style="color:#808080;"><?php echo $iniciativa[1]?></div>
                                    </div>
                                <?php endforeach; ?>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-lg-9">
                    <?php
                    echo do_shortcode(get_post_meta(get_the_ID(), 'formulario_contacto', true));
                    ?>
                </div>
            </div>


        </div>
    </div>


<?php
get_template_part('views/footer');
get_footer();
