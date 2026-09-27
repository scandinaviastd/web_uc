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
                data-token=""
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