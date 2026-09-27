<?php
$img = get_theme_mod('uckit_404_image');
?>
<section id="404">
    <div class="uc-image-quote image-left">
        <div class="row align-items-center">
            <div class="col-12">
                <div class="uc-image-quote_image pt-160 pb-160" style="height:auto;background-image: url('<?php echo $img ?>')">
                </div>
                <div class="container" style="margin-top:-12rem">
                    <div class="row ml-20 mr-20">
                        <div class="col-12">
                            <div class="uc-card">
                                <div class="uc-card_body--lg">
                                    <div class="flex-fill d-flex flex-column p-40">
                                        <span class="uc-subtitle mb-20">ERROR 404</span>
                                        <h1 class="mb-20" style="width:75%">Lo sentimos, no pudimos llevarte a la página que querías.</h1>
                                        <p class="mb-20 gray">La página que estás buscando ha sido modificada, borrada o no existe. </p>
                                        <a href="<?php echo get_home_url().'/' ?>">
                                            Volver a la página de inicio
                                            <i class="uc-icon" style="font-size: 1.5rem">chevron_right</i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container mb-160">

                    <div class="row">
                        <div class="col-12">
                            <div class="mt-0 mb-20 d-flex align-items-center">
                                <h2 class="h3">¿Tienes dudas? Contáctanos</h2>
                                <div class="uc-heading-decoration"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-40">
                        <div class="col-md-4">
                            <span class="uc-subtitle d-block">MESA CENTRAL</span>
                            <a style="text-decoration: none" class="d-block mt-40" href="tel:+56223544000">
                                <i class="uc-icon" style="font-size:1.5rem">phone</i>
                                <b class="ml-12 color-black">(56) 22354 4000</b>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <span class="uc-subtitle d-block">CONSULTAS EN LÍNEA</span>
                            <div class="mt-20 uc-btn btn-featured">
                                Texto
                                <a href="<?php echo get_home_url().'/' ?>">
                                    Ver más
                                    <i class="uc-icon">launch</i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</section>
