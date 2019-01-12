<template>
    <section>
        <div class="w3-content w3-padding-64" style="max-width:1300px">     
            <app-sidebar-shop :shopData="loadedShop" />
            <div class="w3-main" style="margin-left:270px;">
                <div class="w3-padding w3-white w3-margin-bottom">
                    <div class="w3-row">
                        <div class="w3-col l5">
                            <app-slider-item :images=loadedItem.images />
                        </div>
                        <div class="w3-col l7">
                            <div class="w3-border-bottom">
                                <h3>{{loadedItem.title}}</h3>
                                <p><i class="fa fa-codepen"></i> Thương hiệu: <span class="w3-text-blue"><b> {{loadedItem.brand === '' ? 'Không nắm rõ' : loadedItem.brand}}</b></span></p>
                            </div>
                            <br>
                            <h6 class="w3-text-grey w3-margin-right">Giá:</h6>
                            <span v-if="loadedItem.salePrice==0" class="w3-tag w3-xlarge w3-orange"> {{loadedItem.price}}</span>
                            <span v-else>
                                <span class="w3-tag w3-xlarge w3-orange">{{loadedItem.salePrice}}</span>
                                <span class="w3-tag w3-xlarge"><strike> {{loadedItem.price}} </strike></span>
                            </span >
                            <h4 class="w3-text-red">{{loadedItem.currency}} / {{loadedItem.unit}}</h4>
                            <p><i class="fa fa-fw fa-clock-o"></i> Ngày tạo: {{loadedItem.updatedDate | date}}</p>
                            <hr>
                            <p style="white-space: pre">{{loadedItem.description}}</p>
                            <hr>
                            <div class="w3-row">
                                <h6>Loại sản phẩm</h6><br>
                                <div class="w3-col l4 m4 s6" 
                                    v-for="(type, i) in loadedItem.types" 
                                    :key="i">
                                    <p>
                                        <i class="w3-text-blue w3-large w3-margin-right" :class="type.icon"></i>
                                        {{ type.title }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="w3-row">
                            <div v-if="user && user.id === loadedItem.creatorId" class="w3-margin-bottom w3-right w3-quarter">
                                <button @click="$router.push($route.params.itemId + '/edit-item')" class="w3-button w3-border w3-border-blue " style="width: 100%;">
                                    <i class="fa fa-gear w3-xlarge w3-margin-right"></i>Chỉnh sửa
                                </button>
                            </div>
                            <div v-else class="w3-margin-bottom w3-right w3-quarter">
                                <app-btn-sale />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w3-padding w3-white w3-margin-bottom">
                    <form>
                        <h5><strong>Các nhận xét gần đây</strong></h5><br>
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
                            <img src="https://picsum.photos/600/600/?image=49" class="w3-circle" style="width:50px;height:50px">
                        </div>
                        <div class="w3-col l11 m10">
                            <h4>Hoa <span class="w3-opacity w3-medium">Sep 29, 2018, 9:12 PM</span></h4>
                            <p>Chất lượng sản phẩm rất tốt</p>
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
    import { mapGetters } from 'vuex'

    export default {
        layout: 'shop',
        computed: {
            ...mapGetters(['user', 'loadedShop']),
            loadedItem() {
                return this.$store.getters.loadedItem(this.$route.params.itemId)
            }
        },
        async fetch({ store, params, error }) {
            try{
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
            if(store.getters.loadedItem(params.itemId) === undefined) {
                error({ statusCode: 404, message: '...Lỗi'})
            }
        }
    }
</script>

<style scoped>
    h3, h4, h5, h6 {
        display: inline-block;
    }
</style>
