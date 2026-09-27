<?php
$post = UCKitWP::getPostBySlug(null,'page');
$cats = get_categories();
?>
<section id="uc-news">
    <div class="container my-80">
        <div class="row">
            <div class="col-12">
                <ol class="uc-breadcrumb">
                    <li class="uc-breadcrumb_item">
                        <a href="<?php echo get_home_url().'/' ?>">Inicio</a>
                        <i class="uc-icon">keyboard_arrow_right</i>
                    </li>
                    <li class="uc-breadcrumb_item current">
                        <?php echo $post['post_title'] ?>
                    </li>
                </ol>
                <h1 class="mt-60 mb-20"><?php echo $post['post_title'] ?></h1>
            </div>
        </div>

        <div class="row mb-40">
            <div class="col-12">
                <form class="uc-news-search container uc-card" style="background: #F6F6F6;box-shadow: none;border:none">
                    <div class="row ml-4 mr-4 mt-20 mb-20">
                        <div class="col-md-4">
                            <div class="uc-form-group-icon uc-form-group m-0">
                                <input id="search" type="text" class="uc-input-style" placeholder="Buscar por palabra clave">
                                <i class="uc-icon">search</i>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="uc-form-group m-0 d-flex flex-row align-items-center">
                                <label for="category" class="m-0">Filtrar por tema</label>
                                <select id="category" style="min-width: 0; width: 50%" class="ml-24 flex-fill uc-input-style" title="Filtrar por tema">
                                    <option selected value="">Ver todos</option>
                                    <?php
                                    foreach($cats as &$cat){
                                        ?><option value="<?php echo $cat->slug ?>"><?php echo $cat->name ?></option><?php
                                    }
                                    ?>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="uc-form-group-icon uc-form-group m-0">
                                <input id="date" type="text" class="uc-input-style datepicker" placeholder="Filtrar por fecha">
                                <i class="uc-icon">calendar_today</i>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="uc-news-content row mb-40" data-limit="12">
        </div>

        <div class="uc-news-paginator row mb-40">
        </div>
    </div>
</section>
