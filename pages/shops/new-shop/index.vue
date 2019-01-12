<template>
    <section>
        <div class="w3-padding w3-white w3-margin-bottom">
            <div class="w3-row">
                <a href="javascript:void(0)">
                    <div class="w3-col w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                        <h5><strong>Tạo cửa hàng mới</strong></h5>
                    </div>
                </a>
            </div>
            <br>
            <div class="w3-row w3-margin-bottom">
                <div class="w3-half" style="padding:1px">
                    <h6><strong>Ảnh logo</strong></h6>
                    <app-logo-uploader :maxImages="1" @logoAdded="onLogoAdded" @logoRemoved="onLogoRemoved"/>
                </div>
                <div class="w3-half" style="padding:1px ">
                    <h6><strong>Ảnh panel</strong></h6>
                    <app-img-uploader 
                        :maxImages="1" 
                        @imagesAdded="onImagesAdded"
                        @imageRemoved="onImageRemoved" />  
                </div>
            </div>
            <hr>
            <form class="w3-margin-bottom">
                <h6><strong>Thông tin cửa hàng</strong></h6><br>
                <div class="w3-row-padding" style="margin:0 -16px;">
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-trello w3-large"></i><strong> Tên cửa hàng </strong>*</label>
                        <input class="w3-input w3-border" type="text" v-model.trim="shopData.title">
                    </div>
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-facebook-official w3-large"></i><strong> Facebook</strong></label>
                        <input class="w3-input w3-border" type="text" v-model.trim="shopData.facebook">
                    </div>
                </div>
                <div class="w3-row-padding" style="margin:0 -16px;">
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-phone w3-large"></i><strong> Số điện thoại </strong>*</label>
                        <input class="w3-input w3-border" type="tel" v-model.trim="shopData.phone">
                    </div>
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-envelope w3-large"></i><strong> Email liên hệ</strong></label>
                        <input class="w3-input w3-border" type="email" v-model.trim="shopData.email">
                    </div>
                </div>
                <div class="w3-row-padding" style="margin:0 -16px;">
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-map-pin w3-large"></i><strong> Địa chỉ </strong>*</label>
                        <input class="w3-input w3-border" type="text" v-model="shopData.location">
                    </div>
                    <div class="w3-half w3-margin-bottom">
                        <label><i class="fa fa-bullseye w3-large"></i><strong> Tỉnh/Thành Phố </strong>*</label>
                        <select class="w3-select w3-bar-item w3-border" v-model="shopData.province">
                            <option value="" disabled selected>Lựa Chọn</option>
                            <option v-for="(province, i) in provinceList" :key="i">{{ province }}</option>
                        </select>
                    </div>
                </div>
                <label><strong>Miêu tả</strong> *</label>
                <textarea class="w3-input w3-border" rows="5" style="resize:none" v-model="shopData.description"></textarea>
                <hr>
                <h6><strong>Các mặt hàng sẽ bán</strong> *</h6><br>
                <app-item-types @onCheckBox="shopData.itemTypes=$event"/>
                <br>
            </form>
            <div class="w3-row">
                <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onAddShop" :disabled="$v.shopData.$invalid && $v.newImages.$invalid">
                    <i class="w3-xlarge w3-margin-right" :class="shopLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Tạo cửa hàng
                </button>
            </div>
            <br>
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'
    import provinceList from '~/plugins/province-list'
    import { required, email, numeric, maxLength } from 'vuelidate/lib/validators'
    import Vue from 'vue'
    import Vuelidate from 'vuelidate'
    Vue.use(Vuelidate)

    export default {
        middleware: 'auth',
        computed: {
            ...mapGetters(['shopLoading'])
        },
        data() {
            return {
                shopData: {
                    title: '',
                    facebook: '',
                    location: '',
                    province: '',
                    phone: '',
                    email: '',
                    description: '',
                    itemTypes: []
                },
                newLogo: null,
                newImages: [],
                provinceList: provinceList
            }
        },
        validations: {
            shopData: {
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
            newLogo: {},
            newImages: {
                maxLen: maxLength(1)
            }
        },
        methods: {
            async onAddShop() {
                const payload = {
                    shop: this.shopData,
                    logo: this.newLogo,
                    images: this.newImages
                }
                const shopUrl = await this.$store.dispatch('addShop', payload)
                this.$router.push("/shops/" + shopUrl)
            },
            onLogoAdded(addedImages) {
                this.newLogo = addedImages[0]
            },
            onLogoRemoved(removedImage) {
                this.newLogo = null
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
