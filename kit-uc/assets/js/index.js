(()=>{

    const $ = window.jQuery;

    /**
     * UC Media
     * @type {Object}
     */
    const UCKitWP = {
        days: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'],
        months: ['','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        longmonths: ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        $components: {},
        /**
         * init
         */
        init(){
            UCKitWP.resize();
            $( window ).resize(function() {UCKitWP.resize(); });
            /*
            UCKitWP.fetch(4673).then(($xml)=>{
                console.log('xml',$xml.html());
            });
            */
            // $( "a.scrollLink" ).click(function( event ) {
            //     event.preventDefault();
            //     $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
            // });
        },

        /**
         * @property window.SITEURL
         */
        /**
         * fetch
         * @param id
         * @returns {Promise<void>}
         */
        async fetch(id){
            return new Promise((resolve,reject)=>{
                $.ajax({
                    type: "GET",
                    url: window.SITEURL+'/wp-json/uc-kit/1/agenda?id='+id,
                    dataType: "xml",
                    'success': (xml) => resolve($(xml)),
                    'error': (xhr,status,error) => reject(error)
                });
            });
        },
        /**
         * tx
         * @param url
         * @param {Object=} body
         * @param {String=} token
         * @returns {Promise<any>}
         */
        tx(url,body,token){
            return new Promise((resolve,reject)=>{
                const opts = {
                    method: body ? 'POST' : 'GET',
                    headers:{ 'Content-Type': 'application/json; charset=utf-8' }
                };
                if(token) opts.headers['Authorization'] = 'Bearer '+token;
                if(body) opts.body = JSON.stringify(body);
                // noinspection JSCheckFunctionSignatures
                fetch(url, opts).then(res => res.json())
                    .catch(error => reject(error))
                    .then(response => resolve(response));
            });
        },
        /**
         * api
         * @param url
         * @param body
         * @returns {Promise<*>}
         */
        async api(url,body){
            return await UCKitWP.tx(window.SITEURL+'/wp-json/uc-kit/1/'+url,body);
        },
        /**
         * resize
         */
        resize(){
            let mvp = document.getElementById('vp');
            if(!mvp){
                mvp = document.createElement('meta');
                mvp.id = "vp";
                mvp.name = "viewport";
                mvp.content = "";
                document.getElementsByTagName('head')[0].appendChild(mvp);
            }
            if (screen.width <= 475) {
                mvp.setAttribute('content','user-scalable=no,width=475');
            }
            else if(screen.width <= 1200){
                mvp.setAttribute('content','user-scalable=no,width=1200');
            }
            else {
                mvp.setAttribute('content','width=device-width, initial-scale=1, shrink-to-fit=no');
            }
        },
    };

    /**
     * constructor
     */
    $(document).ready(()=>{
        UCKitWP.init();
    });

    window.UCKitWP = UCKitWP;

})();
