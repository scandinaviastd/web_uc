(()=>{

    const $ = window.jQuery;
    const {UCKitWP,moment} = window;

    /**
     * UC Media
     * @type {Object}
     */
    const UCKitWPNews = {
        $content: null,
        $pagination: null,
        $search: null,

        $searchTextTime: null,
        $searchText: null,
        $category: null,
        $dateTime: null,
        $date: null,

        $item: '',
        $navigation: '',
        json: {
            text: '',
            category: '',
            date: '',
            page: 1,
            limit: 12,
            pages: 0,
        },
        /**
         * init
         */
        init(){
            UCKitWPNews.checkNews().then().catch();
        },
        /**
         * check news
         * @returns {Promise<void>}
         */
        async checkNews(){
            const self = UCKitWPNews;
            const $news = $('section#uc-news');
            if($news.length > 0){
                self.$item = UCKitWP.$components['news-item'];
                self.$navigation = UCKitWP.$components['news-nav'];
                self.$notFound = UCKitWP.$components['news-404'];

                self.$content = $('.uc-news-content',$news);
                const limit = parseInt(self.$content.attr('data-limit'),10);
                if(limit > 0) self.json.limit = limit;
                self.$search = $('.uc-news-search',$news);
                self.$pagination = $('.uc-news-paginator',$news);

                self.$searchText = $('input#search',$news);
                self.$searchText.on('change',()=>{
                    if(!self.$searchTextTime){
                        clearTimeout(self.$searchTextTime);
                        self.$searchTextTime = null;
                    }
                    self.$searchTextTime = setTimeout(()=>{
                        self.setSearch();
                    },500);
                });
                self.$category = $('select#category',$news);
                self.$category.on('change',()=>{
                    self.setCategory();
                });
                self.$date = $('input#date',$news);
                self.$date.on('change',()=>{
                    if(!self.$dateTime){
                        clearTimeout(self.$dateTime);
                        self.$dateTime = null;
                    }
                    self.$dateTime = setTimeout(()=>{
                        self.setDate();
                    },500);
                });

                const urlParams = new URLSearchParams(window.location.search);
                const slug = urlParams.get('category');
                if(slug){
                    self.$category.val(slug);
                    self.json.category = slug;
                }

                await self.getNews();
            }
        },
        /**
         * set search
         */
        setSearch(){
            const self = UCKitWPNews;
            self.json.text = self.$searchText.val();
            self.getNews().then().catch();
        },
        /**
         * set search
         */
        setCategory(){
            const self = UCKitWPNews;
            self.json.category = self.$category.val();
            self.getNews().then().catch();
        },
        /**
         * click category
         * @param slug
         */
        clickCategory(slug){
            const self = UCKitWPNews;
            self.$category.val(slug);
            self.json.category = slug;
            self.getNews().then().catch();
        },
        /**
         * set search
         */
        setDate(){
            const self = UCKitWPNews;
            const date = self.$date.val();
            const matchs = [
                /^\d{4}$/, // YYYY
                /^\d{4}-\d{2}$/, // YYYY-MM
                /^\d{4}-\d{1,2}$/, // YYYY-M
                /^\d{2}-\d{4}$/, // MM-YYYY
                /^\d{1,2}-\d{4}$/, // M-YYYY
                /^\d{2}\/\d{4}$/, // MM/YYYY
                /^\d{1,2}\/\d{4}$/, // M/YYYY
                /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
                /^\d{2}-\d{2}-\d{4}$/, // DD-MM-YYYY
                /^\d{1,2}-\d{1,2}-\d{4}$/, // D-M-YYYY
                /^\d{2}\/\d{2}\/\d{4}$/, // DD/MM/YYYY
                /^\d{1,2}\/\d{1,2}\/\d{4}$/, // D/M/YYYY
            ];
            const formats = ['YYYY','YYYY-MM','YYYY-M','MM-YYYY','M-YYYY','MM/YYYY','M/YYYY','YYYY-MM-DD','DD-MM-YYYY','D-M-YYYY','DD/MM/YYYY','D/M/YYYY'];
            const index = matchs.findIndex((match,index)=>{
                const format = formats[index];
                return date.match(match) && moment(date,format)['isValid']();
            });
            if(index > -1){
                const format = formats[index];
                if(index < 1) self.json.date = date;
                else if(index < 7) self.json.date = moment(date,format).format('YYYY-MM');
                else self.json.date = moment(date,format).format('YYYY-MM-DD');
                console.log('index',index,self.json.date,format,date);
            }
            else self.json.date = '';
            self.getNews().then().catch();
        },
        /**
         * get news
         * @returns {Promise<void>}
         */
        async getNews(){
            const self = UCKitWPNews;
            const data = await UCKitWP.api('posts',self.json);
            if(data.ok){
                self.$content.html('');
                /**
                 * @property data.posts
                 * @property post.cats
                 * @property window.SITEWEB
                 */

                if(data.posts.length < 1){
                    self.$content.append($(self.$notFound));
                }
                else {
                    data.posts.forEach((post)=>{
                        let tag = null;
                        post.tagClick = `id="tagClick"`;
                        if(post.cats && post.cats.length > 0) tag = post.cats[0];
                        if(tag){
                            post.tag = tag.name;
                            post.tag_slug = tag.slug;
                        }
                        if(!post.src) post.src = window.SITEWEB+'/assets/img/picture.jpg';
                        const date = moment(post.date,'YYYY-MM-DD HH:mm:ss');
                        post.date = date.format('D')+' '+UCKitWP.longmonths[parseInt(date.format('M'))]+', '+date.format('YYYY');
                        const item = self.$item.replace(/{{(.*?)}}/gm,(text,key)=>{
                            key = key.trim();
                            return post[key] ? post[key] : '';
                        });
                        const $item = $(item);
                        const $tagClick = $('#tagClick',$item);
                        if($tagClick.length > 0){
                            if(!tag) $tagClick.remove();
                            else {
                                $tagClick.removeAttr('id');
                                $tagClick.on('click',()=>{
                                    UCKitWPNews.clickCategory(post.tag_slug);
                                });
                            }
                        }
                        self.$content.append($item);
                    });
                }

                self.genNav(data);
            }
        },
        /**
         * gen nav
         * @param data
         */
        genNav(data){
            const self = UCKitWPNews;
            Object.assign(self.json,{
                page: data.page,
                pages: data.pages,
                limit: data.limit,
            });

            self.$pagination.html('');
            if(data.pages < 2) return;

            const $objs = Object.assign({},{
                prevPageNum: data.page-1,
                currentPageNum: data.page,
                nextPageNum: data.page+1,
                totalPagesNum: data.pages,
            });

            const $keys = [
                'prevPageClick',
                'isNotFirstPageClick',
                'isNotFirstPage',
                'currentPage',
                'isNotLastPage',
                'isNotLastPageClick',
                'nextPageClick'
            ];
            $keys.forEach((key)=>{
                $objs[key] = `id="${key}"`;
            });
            const item = self.$navigation.replace(/{{(.*?)}}/gm,(text,key)=>{
                key = key.trim();
                return $objs[key] ? $objs[key] : '';
            });

            const $pagination = $(item);
            $keys.forEach((key)=>{
                $objs[key] = $(`#${key}`,$pagination);
                $objs[key].removeAttr('id');
            });

            if(data.page > 1){
                $objs['prevPageClick'].on('click',()=>self.nextPage(-1));
                $objs['isNotFirstPageClick'].on('click',()=>self.setPage(1));
            }
            else {
                $objs['prevPageClick'].remove();
                $objs['isNotFirstPageClick'].remove();
            }
            if(data.page < 3){
                $objs['isNotFirstPage'].remove();
            }
            if(data.page < data.pages){
                $objs['isNotLastPageClick'].on('click',()=>self.setPage(data.pages));
                $objs['nextPageClick'].on('click',()=>self.nextPage(+1));
            }
            else {
                $objs['isNotLastPageClick'].remove();
                $objs['nextPageClick'].remove();
            }
            if(data.page > data.pages-2){
                $objs['isNotLastPage'].remove();
            }
            self.$pagination.append($pagination);
        },
        /**
         * next page
         */
        nextPage(num){
            const self = UCKitWPNews;
            self.json.page += num;
            if(self.json.page < 1) self.json.page = 1;
            else if(self.json.page > self.json.pages) self.json.page = self.json.pages;
            self.getNews().then().catch();
        },
        /**
         * set page
         */
        setPage(num){
            const self = UCKitWPNews;
            self.json.page = num;
            self.getNews().then().catch();
        }
    };

    /**
     * constructor
     */
    $(document).ready(()=>{
        UCKitWPNews.init();
    });

    window.UCKitWPNews = UCKitWPNews;

})();
