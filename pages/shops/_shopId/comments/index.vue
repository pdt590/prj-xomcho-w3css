<template>
    <section>
        <div class="w3-content w3-padding-64" style="max-width:1300px">
            <app-sidebar-shop :shopData="loadedShop"/>
            <div class="w3-main" style="margin-left:270px;">
                <div class="w3-padding w3-white w3-margin-bottom">
                    <h6><strong>Giới thiệu</strong></h6><br>
                    <p style="white-space: pre">{{loadedShop.description}}</p>
                    <hr>
                    <app-item-types :displayedItemTypes="loadedShop.itemTypes" :selectedItemTypes="loadedShop.itemTypes" />
                </div> 
                <div class="w3-padding w3-white">
                    <form>
                        <h6><strong>Các nhận xét gần đây</strong></h6><br>
                        <p><input class="w3-input w3-border" type="text" placeholder="Name" required name="Name"></p>
                        <p><input class="w3-input w3-border" type="email" placeholder="Email" required name="Email"></p>
                        <p><input class="w3-input w3-border" type="text" placeholder="Message" required name="Message"></p>
                        <div class="w3-row">
                            <button class="w3-button w3-border w3-border-blue  w3-right w3-quarter" type="submit"><i class="fa fa-send-o w3-large w3-margin-right"></i>Gửi nhận xét</button>
                        </div>
                    </form>
                    <hr>
                    <div class="w3-row">
                        <div class="w3-col l1 m2 text-center">
                            <img class="w3-circle" src="https://picsum.photos/600/600/?image=49" style="width:50px;height:50px">
                        </div>
                        <div class="w3-col l11 m10">
                            <h4>Nam <span class="w3-opacity w3-medium">Sep 29, 2018, 9:12 PM</span></h4>
                            <p>Cừa hàng phục vụ rất tận tình. Hàng hóa rất đẹp</p>
                        </div>
                    </div>
                    <hr>
                </div>
                <hr>
                <div class="w3-center w3-padding-24">
                    Powered by 
                    <a href="https://www.tadicho.net" title="tadicho.net" target="_blank" class="w3-hover-opacity">tadicho.net</a>
                </div>                         
            </div>  
        </div>

    </section>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        layout: 'shop',
        computed: {
            ...mapGetters(['loadedShop', 'loadedItems'])
        },
        async fetch({ store, params, error }) {
            try {
                // ? Issue when using multi tabs
                // ? When refreshing, new ``params.shopId`` from client will be tranferred to 
                // ? server. So, there is a conflict bw new ``params.shopId`` and the old ``shopId`` 
                // ? at store of server, which is rendered for previous page. 
                if(process.client) {
                    if(!store.getters.loadedShop) { 
                        await Promise.all([
                            store.dispatch('loadShop', params.shopId),
                            store.dispatch('loadItems', params.shopId)
                        ])
                    }
                }else {
                    await Promise.all([
                        store.dispatch('loadShop', params.shopId),
                        store.dispatch('loadItems', params.shopId)
                    ])
                }
            } catch(error) {
                console.log('[_ERROR] ' + error)
                error({ statusCode: 500, message: '...Lỗi'})
            }
            if(!store.getters.loadedShop) {
                error({ statusCode: 404, message: '...Lỗi'})
            }
        }
    }
</script>