<?php

include __DIR__.'/uc-kit.php';
if(!class_exists('UCKitWPApi')){
    class UCKitWPApi {

        /**
         * init
         */
        public static function init() {
            add_action('rest_api_init',function(){
                register_rest_route(
                    'uc-kit/1',
                    '/components.js',
                    [
                        'methods'  => ['GET'],
                        'callback' => 'UCKitWPApi::getComponentsJS',
                    ]
                );
                register_rest_route(
                    'uc-kit/1',
                    '/agenda',
                    [
                        'methods'  => ['GET'],
                        'callback' => 'UCKitWPApi::getAgenda',
                    ]
                );
                register_rest_route(
                    'uc-kit/1',
                    '/posts',
                    [
                        'methods'  => ['GET','POST'],
                        'callback' => 'UCKitWPApi::getPosts',
                    ]
                );
            });
        }/** @noinspection PhpUnused */

        /**
         * get components
         */
        public static function getComponentsJS(){
            $js = '(()=>{ window.SITEWEB = "'.get_template_directory_uri().'"; window.SITEURL = "'.get_home_url().'"; if(!window.UCKitWP){ window.UCKitWP = {}; } window.UCKitWP.$components = ';
            $comps = [];
            $files = glob(__DIR__.'/../components/*.php');
            foreach($files as $file){
                ob_start();
                /** @noinspection PhpIncludeInspection */
                include $file;
                $comp = ob_get_contents();
                ob_end_clean();
                $comps[basename($file,'.blade.php')] = $comp;
            }
            $js .= json_encode($comps);
            $js .= '; })();';

            header("HTTP/1.1 200 OK");
            header("Content-type: text/javascript");
            echo $js;
            exit();
        }/** @noinspection PhpUnused */

        /**
         * get agenda
         */
        public static function getAgenda(){
            // Sanitizar y validar el parámetro 'id'
            $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
            // Validar que sea un ID válido
            if ($id <= 0) {
                header("HTTP/1.0 400 Bad Request");
                echo 'Invalid ID parameter';
                exit();
            }
            $url = 'https://agenda.uc.cl/exportar/?action=singlefilter&filter=tipo&tipo=' . $id . '&format=rss';
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $res = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            if($httpCode != 200) header("HTTP/1.0 ".$httpCode." Not Found");
            else{
                header("HTTP/1.1 200 OK");
                header("Content-type: text/xml");
            }
            echo $res;
            exit();
        }/** @noinspection PhpUnused */

        /**
         * get posts
         * @param WP_REST_Request $request
         * @return WP_Error|WP_REST_Response
         */
        public static function getPosts( $request ){
            $body = $request->get_body();
            if(!empty($body)) $body = json_decode($body,true);
            else $body = [];

            $limit = $body['limit'] ? $body['limit'] : 12;
            $page = $body['page'] ? $body['page'] : 1;
            $args = array(
                'posts_per_page' => $limit,
                'paged' => $page,
                'post_type' => 'post'
            );

            if(!empty($body['text'])){
                $args['s'] = $body['text'];
            }
            if(!empty($body['date'])){
                if(strlen($body['date']) == 4){
                    $args['year'] = intval($body['date']);
                }
                else if(strlen($body['date']) == 7){
                    $date = explode('-',$body['date']);
                    $args['year'] = intval($date[0]);
                    $args['month'] = intval($date[1]);
                }
                else if(strlen($body['date']) == 10){
                    $date = explode('-',$body['date']);
                    $args['year'] = intval($date[0]);
                    $args['month'] = intval($date[1]);
                    $args['day'] = intval($date[2]);
                }
            }
            if(!empty($body['category'])){
                $args['category_name'] = $body['category'];
            }

            $postslist = new WP_Query( $args );
            $res = [
                'ok' => true,
                'posts' => [],
                'page' => $page,
                'pages' => $postslist->max_num_pages,
                'limit' => $limit
            ];
            if ( $postslist->have_posts() ){
                while ( $postslist->have_posts() ) {
                    $postslist->the_post();
                    $post = (array) get_post();
                    $_post = UCKitWP::parseBasicPost($post);
                    $res['posts'][] = $_post;
                }
            }
            return rest_ensure_response( $res );
        }
    }
}
