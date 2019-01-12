<template>
    <section>
        <div class="w3-content" style="max-width:1300px">
            <app-slider-homepanel />
        </div>

        <div class="w3-margin-bottom w3-margin-top">
            <div class="w3-row w3-content" style="max-width:1300px;"> 
                <div class="w3-col l6 m6 s6">
                    <nuxt-link to="/shops/new-shop" class="w3-button w3-white w3-border w3-center w3-padding w3-hover-shadow w3-hover-white" style="width: 100%">
                        <i class="fa fa-plus-square-o w3-xxlarge"></i>
                        <h5><b>Tạo cửa hàng</b></h5>
                    </nuxt-link>
                </div>
                <div class="w3-col l6 m6 s6">
                    <nuxt-link to="/user/mgmt" class="w3-button w3-white w3-border w3-center w3-padding w3-hover-shadow w3-hover-white" style="width: 100%">
                        <i class="fa fa-cube w3-xxlarge"></i>
                        <h5><b>Quản lý đơn hàng</b></h5>
                    </nuxt-link>
                </div>
            </div>
        </div>

        <div class="w3-margin-bottom">
            <div class="w3-content w3-white w3-border" style="max-width:1300px">
                <h5 class="w3-padding w3-border-bottom"><i class="fa fa-trello w3-xlarge w3-margin-right"></i><b>CỬA HÀNG NỔI BẬT</b></h5>
                <app-slider-homeshop :shopsData="loadedShops"/>
            </div>
        </div>

        <div class="w3-margin-bottom">
            <div class="w3-content w3-white w3-border" style="max-width:1300px">
                <h5 class="w3-padding w3-border-bottom"><i class="fa fa-shopping-bag w3-xlarge w3-margin-right"></i><b>SẢN PHẨM MỚI</b></h5>
                <div class="w3-row-padding">
                    <div class="w3-col l2 m3 s6 w3-margin-bottom" v-for="(item, i) in loadedItems" :key="i">
                        <app-item-card-home :itemData="item"/>
                        <br>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
    export default {
        layout: 'home',
        async asyncData({ store, error }) {
            try {
                const [loadedShops, loadedItems] = await Promise.all([
                    store.dispatch('loadPreviewShops'),
                    store.dispatch('loadPreviewItems')
                ])
                return {
                    loadedShops: loadedShops,
                    loadedItems: loadedItems
                }
            }catch(error) {
                console.log('[_ERROR] ' + error)
                error({ statusCode: 500, message: '...Lỗi' })
            }
        }
    }
</script>