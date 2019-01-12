<template>
    <section>
        <div class="w3-content w3-padding-64" style="max-width:1300px">
            <app-sidebar-shop :shopData="loadedShop" />
            <div class="w3-main" style="margin-left:270px;">
                <div class="w3-padding w3-white w3-margin-bottom">
                    <div class="w3-row">
                        <a href="javascript:void(0)">
                            <div class="w3-col w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                                <h5><strong>Tạo sản phẩm mới</strong></h5>
                            </div>
                        </a>
                    </div>
                    <br>
                    <div id="itemImg" class="w3-margin-bottom section">
                        <h6><strong>Ảnh sản phẩm (tối đa 4 ảnh)</strong></h6><br>
                        <app-img-uploader 
                            :maxImages="4" 
                            @imagesAdded="onImagesAdded" 
                            @imageRemoved="onImageRemoved" />
                        <br>
                    </div>
                    <hr>
                    <form id="itemInfo" class="w3-margin-bottom section">
                        <h6><strong>Thông tin sản phẩm</strong></h6><br>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-file-archive-o w3-large"></i><strong> Tên sản phẩm </strong>*</label>
                                <input class="w3-input w3-border" type="text" v-model.trim="itemData.title">
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-codepen w3-large"></i><strong> Thương hiệu </strong></label>
                                <input class="w3-input w3-border" type="text" v-model.trim="itemData.brand">
                            </div>
                        </div>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-dollar w3-large"></i><strong> Giá </strong>*</label>
                                <input class="w3-input w3-border" type="number" step="0.1" v-model="itemData.price">
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-dollar w3-large"></i><strong> Giá sale </strong></label>
                                <input class="w3-input w3-border" type="number" step="0.1" v-model="itemData.salePrice">
                            </div>
                        </div>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-money w3-large"></i><strong> Loại tiền </strong>*</label>
                                <select class="w3-select w3-border" name="option" v-model="itemData.currency">
                                    <option value="" disabled selected>Lựa Chọn</option>
                                    <option value="vnd">VND</option>
                                </select>
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-balance-scale w3-large"></i><strong> Đơn vị sản phẩm </strong>*</label>
                                <input class="w3-input w3-border" type="tex" placeholder= "Ví dụ: '5 cái'" required v-model.trim="itemData.unit">
                            </div>
                        </div>
                        <p><strong>Miêu tả </strong>*</p>
                        <textarea class="w3-input w3-border" rows="5" style="resize:none" v-model="itemData.description"></textarea>
                        <hr>
                        <h6><strong>Loại sản phẩm</strong> *</h6><br>
                        <app-item-types @onCheckBox="itemData.types=$event"/>
                        
                    </form>
                    <div class="w3-row">
                        <button class="w3-button w3-border w3-border-blue  w3-right w3-quarter" type="submit" @click.prevent="onAddItem" :disabled="$v.itemData.$invalid && $v.newImages.invalid">
                        <i class="w3-xlarge w3-margin-right" :class="itemLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Thêm sản phẩm</button>
                    </div>
                    <br>
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
    import { required, email, decimal, maxLength } from 'vuelidate/lib/validators'
    import Vue from 'vue'
    import Vuelidate from 'vuelidate'
    Vue.use(Vuelidate)

    export default {
        middleware: 'auth',
        layout: 'shop',
        computed: {
            ...mapGetters(['itemLoading', 'loadedShop'])
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
            if(!store.getters.loadedShop) {
                error({ statusCode: 404, message: '...Lỗi'})
            }
        },
        data() {
            return {
                itemData: {
                    title: '',
                    brand: '',
                    price: 0,
                    salePrice: 0,
                    currency: '',
                    unit: '',
                    description: '',
                    types: []
                },
                newImages: []
            }
        },
        validations: {
            itemData: {
                title: {
                    required    
                },
                brand: {},
                price: {
                    required,
                    decimal
                },
                salePrice: {
                    decimal
                },
                currency: {
                    required
                },
                unit: {
                    required
                },
                description: {
                    required
                },
                types: {
                    required
                }
            },
            newImages: {
                maxLen: maxLength(4)
            }
        },
        methods: {
            async onAddItem() {
                const payload = {
                    item: this.itemData,
                    images: this.newImages
                }
                const itemUrl = await this.$store.dispatch('addItem', payload)
                this.$router.push('/shops/' + this.$route.params.shopId + '/' + itemUrl)
            },
            onImagesAdded(addedImages) {
                addedImages.forEach( addedImage => {
                    const index = this.newImages.findIndex( image => image === addedImage)
                    if(index >= 0) this.newImages.splice(index, 1)
                })
                for(let key in addedImages) {
                    this.newImages.push(addedImages[key])
                }
            },
            onImageRemoved(removedImage) {
                const index = this.newImages.findIndex( image => image === removedImage )
                if(index >= 0) this.newImages.splice(index, 1)
            }
        }
    }
</script>