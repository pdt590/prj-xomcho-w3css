<template>
    <section>
        <div class="w3-content w3-padding-64" style="max-width:1300px">
            <app-sidebar-shop :shopData="loadedShop" />
            <div class="w3-main" style="margin-left:270px;">       
                <div class="w3-padding w3-white w3-margin-bottom">
                    <div class="w3-row">
                        <a href="javascript:void(0)" @click="openTab($event, 'updateShop')">
                            <div class="w3-col l3 m3 s3 tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                                <h5><strong>Thông tin</strong></h5>
                            </div>
                        </a>
                        <a href="javascript:void(0)" @click="openTab($event, 'shopLogo')">
                            <div class="w3-col l3 m3 s3 tablink w3-bottombar w3-hover-light-grey w3-padding">
                                <h5><strong>Logo</strong></h5>
                            </div>
                        </a>
                        <a href="javascript:void(0)" @click="openTab($event, 'panelImg')">
                            <div class="w3-col l3 m3 s3 tablink w3-bottombar w3-hover-light-grey w3-padding">
                                <h5><strong>Panel</strong></h5>
                            </div>
                        </a>
                        <a href="javascript:void(0)" @click="openTab($event, 'delShop')">
                            <div class="w3-col l3 m3 s3 tablink w3-bottombar w3-hover-light-grey w3-padding">
                                <h5><strong>Xóa</strong></h5>
                            </div>
                        </a>
                    </div>
                    <hr>

                    <form id="updateShop" class="w3-margin-bottom section">
                        <h6><strong>Thông tin cửa hàng</strong></h6><br>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-trello w3-large"></i><strong> Tên cửa hàng </strong>*</label>
                                <input class="w3-input w3-border" type="text" disabled v-model.trim="editedShopData.title">
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-facebook-official w3-large"></i><strong> Facebook</strong></label>
                                <input class="w3-input w3-border" type="text" v-model.trim="editedShopData.facebook">
                            </div>
                        </div>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-phone w3-large"></i><strong> Số điện thoại </strong>*</label>
                                <input class="w3-input w3-border" type="tel" v-model.trim="editedShopData.phone">
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-envelope w3-large"></i><strong> Email liên hệ</strong></label>
                                <input class="w3-input w3-border" type="email" v-model.trim="editedShopData.email">
                            </div>
                        </div>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-map-pin w3-large"></i><strong> Địa chỉ </strong>*</label>
                                <input class="w3-input w3-border" type="text" v-model="editedShopData.location">
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-bullseye w3-large"></i><strong> Tỉnh/Thành Phố </strong>*</label>
                                <select class="w3-select w3-bar-item w3-border" v-model="editedShopData.province">
                                    <option value="" disabled selected>Lựa Chọn</option>
                                    <option v-for="(province, i) in provinceList" :key="i">{{ province }}</option>
                                </select>
                            </div>
                        </div>
                        <label><strong>Miêu tả</strong> *</label>
                        <textarea class="w3-input w3-border" rows="5" style="resize:none" v-model="editedShopData.description"></textarea>
                        <hr>
                        <h6><strong>Các mặt hàng sẽ bán</strong> *</h6><br>
                        <app-item-types :selectedItemTypes="editedShopData.itemTypes" @onCheckBox="editedShopData.itemTypes=$event"/>
                        <br>
                        <div class="w3-row">
                            <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onUpdateShopContent" :disabled="$v.editedShopData.$invalid">
                                <i class="w3-xlarge w3-margin-right" :class="shopLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Sửa cửa hàng
                            </button>
                        </div>
                    </form>

                    <div id="shopLogo" class="w3-margin-bottom section" style="display:none; min-height: 800px">
                        <div style="max-width:300px; margin: auto">
                            <h6><strong>Ảnh logo</strong></h6><br>
                            <app-logo-uploader 
                                :displayedLogo="displayedLogo" 
                                :maxImages="1" 
                                :resizeWidth="100" 
                                :resizeHeight="100"
                                @logoAdded="onLogoAdded" 
                                @logoRemoved="onLogoRemoved" />
                            <br>
                            <div class="w3-row">
                                <button class="w3-button w3-border w3-border-blue w3-right w3-mobile" @click.prevent="onUpdateShopLogo">
                                    <i class="w3-xlarge w3-margin-right" :class="shopLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Lưu thay đổi
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="panelImg" class="w3-margin-bottom section" style="display:none; min-height: 800px">
                        <h6><strong>Ảnh panel</strong></h6><br>
                        <app-img-uploader 
                            :displayedImages="displayedImages" 
                            :maxImages="1" 
                            :resizeWidth="100" 
                            :resizeHeight="100"
                            @imagesAdded="onImagesAdded" 
                            @imageRemoved="onImageRemoved" />
                        <br>
                        <div class="w3-row">
                            <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onUpdateShopImage">
                                <i class="w3-xlarge w3-margin-right" :class="shopLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Lưu thay đổi
                            </button>
                        </div>
                    </div>

                    <div id="delShop" class="w3-margin-bottom section" style="display:none; min-height: 800px">
                        <h6><strong>Đổi tên cửa hàng</strong></h6><br>
                        <form style="max-width:500px; margin: auto"> 
                            <div class="w3-margin-bottom">
                                <label><strong> Nhập tên cửa hàng </strong></label>
                                <input class="w3-input w3-border" type="text" v-model.trim="editedShopData.title">
                            </div>
                            <div class="w3-row">
                                <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onUpdateShopTitle" :disabled="$v.editedShopData.title.$invalid">
                                    <i class="w3-xlarge w3-margin-right" :class="shopLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Đổi tên
                                </button>
                            </div>
                        </form>
                        <br>
                        <h6><strong>Xóa cửa hàng</strong></h6><br>
                        <form style="max-width:500px; margin: auto"> 
                            <div class="w3-margin-bottom">
                                <label><i class="fa fa-trello w3-large"></i><strong> Tên cửa hàng </strong></label>
                                <input class="w3-input w3-border" type="text" disabled v-model.trim="editedShopData.title">
                            </div>
                            <div class="w3-margin-bottom">
                                <label><strong> Nhập tên cửa hàng </strong></label>
                                <input class="w3-input w3-border" type="text" v-model.trim="deletedShopTitle">
                            </div>
                            <div class="w3-row">
                                <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onDeleteShop" :disabled="$v.deletedShopTitle.$invalid">
                                    <i class="w3-xlarge w3-margin-right" :class="shopLoading ? 'fa fa-spinner fa-spin' : 'fa fa-close'"></i>Xóa
                                </button>
                            </div>
                        </form>
                        <br>
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
    import provinceList from '~/plugins/province-list'
    import { deepCopy } from '~/plugins/funcs'
    import { required, email, numeric, sameAs, maxLength } from 'vuelidate/lib/validators'
    import Vue from 'vue'
    import Vuelidate from 'vuelidate'
    Vue.use(Vuelidate)

    export default {
        middleware: 'auth',
        layout: 'shop',
        computed: {
            ...mapGetters(['shopLoading', 'loadedShop'])
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
        created() {
            this.editedShopData = deepCopy(this.loadedShop)
            // TODO: displayedLogo and displayedImages object will be changed when they are assigned to preview mode of dropzone
            const shopLogo = this.loadedShop.logo
            const shopImages = this.loadedShop.images
            if(shopLogo !== undefined) {
                this.displayedLogo = deepCopy(shopLogo)
                this.newShopLogo = deepCopy(shopLogo)
            }
            if(shopImages !== undefined) {
                this.displayedImages = deepCopy(shopImages)
                this.newShopImages = deepCopy(shopImages)
            }
        },
        data() {
            return {
                deletedShopTitle: '',
                editedShopData: {},
                displayedLogo: {
                    metadata: null,
                    url: null
                },
                displayedImages: [],
                newShopLogo: null,
                newShopImages: [],
                provinceList: provinceList
            }
        },
        validations: {
            editedShopData: {
                title: {
                    required
                },
                facebook: {},
                location: {
                    required
                },
                province: {
                    required
                },
                phone: {
                    required,
                    numeric
                },
                email: {
                    email
                },
                description: {
                    required
                },
                itemTypes: {
                    required
                }
            },
            deletedShopTitle: {
                required,
                sameAs: sameAs(vm => {
                    if(vm.loadedShop !== null) {
                        return vm.loadedShop.title
                    }
                })
            }
        },
        methods: {
            openTab(event, arg) {
                let i, x, tablinks;
                x = document.getElementsByClassName("section")
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none"
                }
                tablinks = document.getElementsByClassName("tablink")
                for (i = 0; i < x.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "")
                }
                document.getElementById(arg).style.display = "block"
                event.currentTarget.firstElementChild.className += " w3-border-red"
                this.editedShopData = deepCopy(this.loadedShop)
            },
            async onUpdateShopContent() {       
                await this.$store.dispatch('updateShopContent', this.editedShopData)
                this.$router.push("/shops/" + this.$route.params.shopId + '/edit-shop')
            },
            async onUpdateShopTitle() {
                const newShopId = await this.$store.dispatch('updateShopTitle', this.editedShopData)
                this.$router.push('/shops/' + newShopId + '/edit-shop')
            },
            async onUpdateShopLogo() {
                await this.$store.dispatch('updateShopLogo', this.newShopLogo)
                this.$router.push('/shops/' + this.$route.params.shopId + '/edit-shop')
            },
            async onUpdateShopImage() {  
                await this.$store.dispatch('updateShopImg', this.newShopImages)
                this.$router.push('/shops/' + this.$route.params.shopId + '/edit-shop')
            },
            async onDeleteShop() {
                await this.$store.dispatch('deleteShop', this.loadedShop)
                this.$router.push('/')
            },
            onLogoAdded(addedImages) {
                this.newShopLogo = addedImages[0]
            },
            onLogoRemoved(removedImage) {
                this.newShopLogo = null
            },
            onImagesAdded(addedImages) {
                addedImages.forEach( addedImage => { 
                    const index = this.newShopImages.findIndex( image => image === addedImage)
                    if(index >= 0) this.newShopImages.images.splice(index, 1)
                })
                for(let key in addedImages) {
                    this.newShopImages.push(addedImages[key])
                }
            },
            onImageRemoved(removedImage) {
                const index = this.newShopImages.findIndex( image => {
                        if(removedImage.manuallyAdded !== undefined && removedImage.manuallyAdded === true) {
                            return image.metadata.name === removedImage.name 
                        }else {
                            if(removedImage.accepted) {
                                return image.name === removedImage.name
                            }
                        }
                    })
                if(index >= 0) this.newShopImages.splice(index, 1)
            }
        }
    }
</script>