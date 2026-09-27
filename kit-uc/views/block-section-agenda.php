<?php
if (empty($args)) $args = [];
//echo "<pre>";
//var_dump($args);
//echo "</pre>";
?>
<!-- Sección 2: Agenda -->
<section>
    <div class="container">
        <div class="row align-items-center mb-40">
            <div class="col-lg">
                <div class="heading-container">
                    <?php echo '<' . $args['titleTag'] . (isset($args['anchor']) ? " id=\"{$args['anchor']}\"" : '') . '>'; ?><?php echo $args['title'] ?><?php echo '</' . $args['titleTag'] . '>'; ?>
                    <div class="uc-heading-decoration">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <!-- <div
                    <?= ($args['hideImg'] === true) ? 'hide-img' : ''; ?>
                    <?= ($args['hideTag']  === true) ? 'hide-tag' : '' ?>
                    class="agenda-<-?= $args['type'] ?>"
                    data-base-url="https://skymedia2.works/temaUCDesarrollo/agenda"
                    data-items="5"
                    data-host="<-?= $args['host'] ?>"
                    data-token="<-?= $args['token'] ?>"
                    data-types-of-activities=""
                    data-organizers="<-?= $args['organizers'] ?>"
                    data-audience="<-?= $args['audience'] ?>">
                </div> -->
                <div
                class="agenda-slider"
                data-base-url="https://skymedia2.works/temaUCDesarrollo/agenda"
                data-host="https://api.agenda.uc.cl/api"
                data-token="3bbaa0a2588684a4188c8233b3e0c2b316e453d2dca253cae7d9d79cf594a44bb10da9078e07a1eeca43927097d8f732e7e8acf3d2426e46ef671758c12781825e1cfe1147fcd1586935f7ee6836dd8de977fc56f61b8332594cc8f2970810b3dae9241b6c2fd3c3b74faa0f324045f8a71378ae59481e9819dfab973b67cd8e"
                data-types-of-activities="54"
                data-organizers="99"
                data-audience="78"
                data-keywords="2"
                data-places="4"
                data-items="5"
                >
                </div>
            </div>
        </div>
    </div>

</section>