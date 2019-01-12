<template>
    <section>
        <div class="w3-content w3-padding-64" style="max-width:1300px">
            <app-sidebar-shop :shopData="loadedShop"/>
            <div class="w3-main" style="margin-left:270px;">
                <div class="w3-margin-bottom">
                    <app-slider-shoppanel :images="loadedShop.images"/>
                </div>
                <div class="w3-padding w3-white w3-margin-bottom">
                    <h6><strong>Thông tin</strong></h6><hr>
                    <p style="white-space: pre">{{loadedShop.description}}</p>
                </div>
                <div class="w3-padding w3-white w3-margin-bottom">
                    <h6><strong>Chọn mặt hàng hiển thị</strong></h6><hr>
                    <app-item-types :displayedItemTypes="loadedShop.itemTypes" :selectedItemTypes="loadedShop.itemTypes" />
                </div>

                <div class="w3-padding w3-white w3-margin-bottom">
                    <div class="w3-row-padding" style="padding: 0">
                        <br>
                        <div class="w3-col l3 m4 s6 w3-margin-bottom" v-for="(item, i) in loadedItems" :key="i">
                            <app-item-card-shop :itemData="item" />
                            <br>
                        </div>
                    </div>
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
    import { mapGetters } from 'vuex'

    export default {
        layout: 'shop',
        computed: {
            ...mapGetters(['loadedShop', 'loadedItems'])
        },
        async fetch({ store, params, error }) {
            try {
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