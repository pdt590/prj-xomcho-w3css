<template>
    <section>
        <app-navbar :navItems="navItems" />
        <app-navbar-mobile :navItems="navItems" />
        <div class="w3-content w3-padding-64" style="max-width:100%">
            <!-- Sidebar left -->
            <div v-if="user" class="w3-sidebar w3-collapse w3-light-grey w3-top w3-padding-64" style="z-index:3;width:270px;" ref="mySidebar">
                <div class="w3-container w3-center w3-margin">
                    <nuxt-link :to="'/shops/' + $route.params.shopId">
                        <img :src="user.avatar !== undefined ? user.avatar.url : '/icon-user.png'" class="w3-circle reframe">
                    </nuxt-link>
                    <br>
                    <h4><b>{{user.username}}</b></h4>
                </div>
                <hr><br>
                <div class="w3-bar-block">
                    <a class="w3-bar-item w3-button tablink app-hover" @click="openTab($event, 't_general_mgmt')">                    
                        <div class="w3-row">
                            <div class="w3-col l2 m2 s2">
                                <i class="fa fa-cube w3-xlarge w3-margin-right"></i>
                            </div>
                            <div class="w3-col l10 m10 s10">
                                <h6 class="mySideBar">Quản lý chung</h6>
                            </div>
                        </div>
                    </a>

                    <a class="w3-bar-item w3-button" @click="extShop()">
                        <div class="w3-row">
                            <div class="w3-col l2 m2 s2">
                                <i class="fa fa-trello w3-xlarge w3-margin-right"></i>
                            </div>
                            <div class="w3-col l10 m10 s10">
                                <h6 class="mySideBar">Quản lý cửa hàng</h6> <i class="w3-right" :class="caretShop ? 'fa fa-caret-down' :'fa fa-caret-up'"></i>
                            </div>
                        </div>
                    </a>
                    <div id="subShop" class="w3-hide">
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_created_shop')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Cửa hàng đã tạo</h6>
                        </a>
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_saved_shop')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Cửa hàng đã lưu</h6>
                        </a>
                    </div>

                    <a class="w3-bar-item w3-button" @click="extItem()">   
                        <div class="w3-row">
                            <div class="w3-col l2 m2 s2">
                                <i class="fa fa-shopping-bag w3-xlarge w3-margin-right"></i>
                            </div>
                            <div class="w3-col l10 m10 s10">
                                <h6 class="mySideBar">Quản lý sản phẩm</h6> <i class="w3-right" :class="caretItem ? 'fa fa-caret-down' :'fa fa-caret-up'"></i>
                            </div>
                        </div>
                    </a>
                    <div id="subItem" class="w3-hide">
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_created_item')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Sản phẩm đã tạo</h6>
                        </a>
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_saved_item')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Sản phẩm đã lưu</h6>
                        </a>
                    </div>

                    <a class="w3-bar-item w3-button" @click="extInfo()">
                        <div class="w3-row">
                            <div class="w3-col l2 m2 s2">
                                <i class="fa fa-user w3-xlarge w3-margin-right"></i>
                            </div>
                            <div class="w3-col l10 m10 s10">
                                <h6 class="mySideBar">Thông tin cá nhân</h6> <i class="w3-right" :class="caretInfo ? 'fa fa-caret-down' :'fa fa-caret-up'"></i>
                            </div>
                        </div>
                    </a>
                    <div id="subInfo" class="w3-hide">
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_info')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Cài đặt thông tin</h6>
                        </a>
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_avatar')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Ảnh đại diện</h6>
                        </a>
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_email')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Đổi email</h6>
                        </a>
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_password')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Đổi mật khẩu</h6>
                        </a>
                        <a class="w3-bar-item w3-button tablink" @click="openTab($event, 't_user')">
                            <i class="fa fa-circle-o w3-margin-left w3-margin-right"></i>
                            <h6 class="mySideBar">Xóa tài khoản</h6>
                        </a>
                    </div>
                </div>
            </div>
            <!-- Overlay effect when opening sidebar on small screens -->
            <div class="w3-overlay w3-hide-large" @click="closeSideBar" style="cursor:pointer" title="close side menu" ref="myOverlay"></div>
            <div class="w3-main" style="margin-left:270px;">
                <div class="w3-padding w3-margin-bottom w3-white">

                    <div id="t_general_mgmt" class="w3-padding-32 section" style="min-height: 1300px">
                        <div class="w3-row">
                            <div class="w3-half app-padding">
                                <div class="w3-container w3-blue w3-padding-16">
                                    <div class="w3-left"><i class="fa fa-trello w3-xxxlarge"></i></div>
                                    <div class="w3-right">
                                    <h3>{{loadedShops.length}}</h3>
                                    </div>
                                    <div class="w3-clear"></div>
                                    <h4>Số cửa hàng</h4>
                                </div>
                            </div>
                            <div class="w3-half app-padding">
                                <div class="w3-container w3-red w3-padding-16">
                                    <div class="w3-left"><i class="fa fa-shopping-bag w3-xxxlarge"></i></div>
                                    <div class="w3-right">
                                    <h3>{{loadedItems.length}}</h3>
                                    </div>
                                    <div class="w3-clear"></div>
                                    <h4>Số sản phẩm</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="t_created_shop" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Cửa hàng của bạn</strong></h5><br>
                        <ul class="w3-ul w3-border" style="max-width:800px; margin: auto">
                            <li v-for="(shop, i) in loadedShops" :key="i" class="w3-bar">
                                <nuxt-link :to="'/shops/' + shop.shopId + '/edit-shop'" target="_blank" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-edit"></i></nuxt-link>
                                <nuxt-link :to="'/shops/' + shop.shopId" target="_blank">
                                    <img :src="shop.logo !== undefined ? shop.logo.url : '/icon-photo.png'" class="w3-bar-item reframeThumbnail">
                                </nuxt-link>
                                <div class="w3-bar-item">
                                    <span class="w3-large">{{shop.title}}</span><br>
                                    <span>{{shop.updatedDate | date}}</span><br>
                                    <span>{{shop.location}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div id="t_saved_shop" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Cửa hàng đã lưu</strong></h5><br>
                        <ul class="w3-ul w3-border" style="max-width:800px; margin: auto">
                            <li v-for="(shop, i) in loadedShops" :key="i" class="w3-bar">
                                <nuxt-link :to="'/shops/' + shop.shopId + '/edit-shop'" target="_blank" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-edit"></i></nuxt-link>
                                <nuxt-link :to="'/shops/' + shop.shopId" target="_blank">
                                    <img :src="shop.logo !== undefined ? shop.logo.url : '/icon-photo.png'" class="w3-bar-item reframeThumbnail">
                                </nuxt-link>
                                <div class="w3-bar-item">
                                    <span class="w3-large">{{shop.title}}</span><br>
                                    <span>{{shop.updatedDate | date}}</span><br>
                                    <span>{{shop.location}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div id="t_created_item" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Sản phẩm của bạn</strong></h5><br>
                        <ul class="w3-ul w3-border" style="max-width:800px; margin: auto">
                            <li v-for="(item, i) in loadedItems" :key="i" class="w3-bar">
                                <nuxt-link :to="'/shops/' + item.shopId + '/' + item.itemId + '/edit-item'" target="_blank" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-edit"></i></nuxt-link>
                                <nuxt-link :to="'/shops/' + item.shopId + '/' + item.itemId">
                                    <img :src="item.images !== undefined ? item.images[0].url : '/icon-area.png'" class="w3-bar-item">
                                </nuxt-link>
                                <div class="w3-bar-item">
                                    <span class="w3-large">{{item.title}}</span><br>
                                    <span>{{item.updatedDate | date}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div id="t_saved_item" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Sản phẩm đã lưu</strong></h5><br>
                        <ul class="w3-ul w3-border" style="max-width:800px; margin: auto">
                            <li v-for="(item, i) in loadedItems" :key="i" class="w3-bar">
                                <nuxt-link :to="'/shops/' + item.shopId + '/' + item.itemId + '/edit-item'" target="_blank" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"><i class="fa fa-edit"></i></nuxt-link>
                                <nuxt-link :to="'/shops/' + item.shopId + '/' + item.itemId">
                                    <img :src="item.images !== undefined ? item.images[0].url : '/icon-area.png'" class="w3-bar-item">
                                </nuxt-link>
                                <div class="w3-bar-item">
                                    <span class="w3-large">{{item.title}}</span><br>
                                    <span>{{item.updatedDate | date}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div id="t_info" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <form style="max-width:600px; margin: auto">
                            <h5><strong>Thông tin cá nhân</strong></h5><br>
                            <div class="w3-row-padding" style="margin:0 -16px;">
                                <div class="w3-half w3-margin-bottom">
                                    <label><i class="fa fa-address-book-o w3-large"></i><strong> Username *</strong></label>
                                    <input class="w3-input w3-border" type="text" v-model.trim="editedUserData.username">
                                </div>
                                <div class="w3-half w3-margin-bottom">
                                    <label><i class="fa fa-address-card-o w3-large"></i><strong> Họ và tên</strong></label>
                                    <input class="w3-input w3-border" type="text" v-model.trim="editedUserData.fullname">
                                </div>
                            </div>
                            <hr>
                            <div class="w3-row-padding" style="margin:0 -16px;">
                                <div class="w3-half w3-margin-bottom">
                                    <label><i class="fa fa-tablet w3-large"></i><strong> Số điện thoại</strong></label>
                                    <input class="w3-input w3-border" type="tel" v-model.trim="editedUserData.phone">
                                </div>
                                <div class="w3-half w3-margin-bottom">
                                    <label><i class="fa fa-envelope-o w3-large"></i><strong> Email</strong></label>
                                    <input class="w3-input w3-border" disabled type="email" v-model.trim="editedUserData.email">
                                </div>
                            </div>
                            <div class="w3-row-padding" style="margin:0 -16px;">
                                <div class="w3-half w3-margin-bottom">
                                    <label><i class="fa fa-facebook-f w3-large"></i><strong> Facebook</strong></label>
                                    <input class="w3-input w3-border" type="text" v-model.trim="editedUserData.facebook" placeholder="">
                                </div>
                                <div class="w3-half">
                                    <label><i class="fa fa-map-o w3-large"></i><strong> Địa chỉ</strong></label>
                                    <input class="w3-input w3-border" type="text" v-model.trim="editedUserData.address" placeholder="" >
                                </div>
                            </div>
                            <hr>
                            <br>
                            <div class="w3-row">
                                <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onUpdateUserInfo" :disabled="$v.editedUserData.$invalid">
                                    <i class="w3-xlarge w3-margin-right" :class="authLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Lưu
                                </button>
                            </div>
                        </form>
                    </div>

                    <div id="t_avatar" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Ảnh đại diện</strong></h5><br>
                        <app-avatar-uploader 
                            :displayedAvatar="displayedAvatar" 
                            :maxImages="1" 
                            :resizeWidth="100" 
                            :resizeHeight="100"
                            @avatarAdded="onAvatarAdded" 
                            @avatarRemoved="onAvatarRemoved" />
                        <br>
                        <div class="w3-row">
                            <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onUpdateAvatar">
                                <i class="w3-xlarge w3-margin-right" :class="authLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Lưu thay đổi
                            </button>
                        </div>
                    </div>

                    <div id="t_email" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Đổi email</strong></h5><br>
                        <form style="max-width:600px; margin: auto"> 
                            <div class="w3-margin-bottom">
                                <label><strong>Nhập email mới *</strong></label>
                                <input class="w3-input w3-border" type="text" v-model.trim="editedUserData.email">
                            </div>
                            <div class="w3-margin-bottom">
                                <label><strong>Xác nhận email *</strong></label>
                                <input class="w3-input w3-border" type="text" v-model.trim="confirmedEmail">
                            </div>
                            <div class="w3-row">
                                <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onUpdateEmail" :disabled="$v.editedUserData.email.$invalid || $v.confirmedEmail.$invalid">
                                    <i class="w3-xlarge w3-margin-right" :class="authLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Lưu
                                </button>
                            </div>
                        </form>
                    </div>  

                    <div id="t_password" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Đổi mật khẩu</strong></h5><br>
                        <form style="max-width:600px; margin: auto"> 
                            <div class="w3-margin-bottom">
                                <label><strong>Nhập mật khẩu mới *</strong></label>
                                <input class="w3-input w3-border" type="password" v-model.trim="password">
                            </div>
                            <div class="w3-margin-bottom">
                                <label><strong>Xác nhận khẩu *</strong></label>
                                <input class="w3-input w3-border" type="password" v-model.trim="confirmedPassword">
                            </div>
                            <div class="w3-row">
                                <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onUpdatePassword" :disabled="$v.password.$invalid || $v.confirmedPassword.$invalid">
                                    <i class="w3-xlarge w3-margin-right" :class="authLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Lưu
                                </button>
                            </div>
                        </form>
                    </div>

                    <div id="t_user" class="w3-padding-24 section" style="display: none; min-height: 1300px">
                        <h5><strong>Xóa tài khoản</strong></h5><br>
                        <form style="max-width:600px; margin: auto"> 
                            <div class="w3-margin-bottom">
                                <label><strong> Email</strong></label>
                                <input class="w3-input w3-border" type="text" disabled v-model.trim="editedUserData.email">
                            </div>
                            <div class="w3-margin-bottom">
                                <label><strong> Nhập tên email *</strong></label>
                                <input class="w3-input w3-border" type="text" v-model.trim="deletedUserEmail">
                            </div>
                            <div class="w3-row">
                                <button class="w3-button w3-border w3-border-blue w3-right w3-quarter" @click.prevent="onDeleteUser" :disabled="$v.deletedUserEmail.$invalid">
                                    <i class="w3-xlarge w3-margin-right" :class="authLoading ? 'fa fa-spinner fa-spin' : 'fa fa-close'"></i>Xóa
                                </button>
                            </div>
                        </form>
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
    import { deepCopy } from '~/plugins/funcs'
    import { required, email, numeric, sameAs, minLength } from 'vuelidate/lib/validators'
    import Vue from 'vue'
    import Vuelidate from 'vuelidate'
    Vue.use(Vuelidate)

    export default {
        middleware: ['check-auth', 'auth'],
        layout: 'user',
        computed: {
            ...mapGetters(['authLoading', 'user']),
            openSideBar() {
                return this.$store.getters.sideBar
            }
        },
        watch: {
            openSideBar(newValue) {
                if(newValue) {
                    this.$refs.mySidebar.style.display = 'block'
                    this.$refs.myOverlay.style.display = 'block'
                } else {
                    this.$refs.mySidebar.style.display = 'none'
                    this.$refs.myOverlay.style.display = 'none'
                }
            },
        },
        async asyncData({ store, error}) {
            try {
                const [loadedShops, loadedItems] = await Promise.all([
                    store.dispatch('loadOwnShops'),
                    store.dispatch('loadOwnItems')
                ])
                return {
                    loadedShops: loadedShops,
                    loadedItems: loadedItems
                }
            }catch(error) {
                console.log('[_ERROR] ' + error)
                error({ statusCode: 500, message: '...Lỗi' })
            }
        },
        created() {
            this.editedUserData = deepCopy(this.user)
            const avatar = this.user.avatar
            if(avatar !== undefined){
                this.displayedAvatar = deepCopy(avatar)
                this.newAvatar = deepCopy(avatar)
            }
        },
        data() {
            return {
                navItems: [
                    {link: '/shops/new-shop', icon: 'fa fa-plus-square', title: 'Tạo cửa hàng'}
                ],
                deletedUserEmail: '',
                editedUserData: {},
                password: '',
                confirmedPassword: '',
                confirmedEmail: '',
                displayedAvatar: {
                    metadata: null,
                    url: null
                },
                newAvatar: null,
                caretShop: false,
                caretItem: false,
                caretInfo: false
            }
        },
        validations: {
            editedUserData: {
                username: {
                    required,
                    minLen: minLength(6)
                },
                fullname: {},
                email: {
                    required,
                    email
                },
                phone: {
                    numeric
                },
                facebook: {},
                address: {},
                avatar: {}
            },
            deletedUserEmail: {
                required,
                sameAs: sameAs(vm => {
                    if(vm.user !== null) {
                        return vm.user.email
                    }
                })
            },
            password: {
                required,
                minLen: minLength(6)
            },
            confirmedPassword: {
                required,
                minLen: minLength(6),
                sameAs: sameAs('password')
            },
            confirmedEmail: {
                required,
                email,
                sameAs: sameAs(vm => {
                    if(vm.editedUserData !== null) {
                        return vm.editedUserData.email
                    }
                })
            }
        },
        methods: {
            openTab(event, arg) {
                let i, x, tablinks
                x = document.getElementsByClassName("section")
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none"
                }
                tablinks = document.getElementsByClassName("tablink")
                for (i = 0; i < x.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" app-hover", "")
                }
                document.getElementById(arg).style.display = "block"
                event.currentTarget.className += " app-hover"
                this.editedUserData = deepCopy(this.user)
                //this.closeSideBar()
            },
            closeSideBar() {
                this.$store.dispatch('openSideBar', false)
                this.$refs.myOverlay.style.display = 'none'
            },
            extShop() {
                let x = document.getElementById("subShop")
                if (x.className.indexOf("w3-show") == -1) {
                    x.className += " w3-show";
                } else {
                    x.className = x.className.replace(" w3-show", "")
                }
                this.caretShop = !this.caretShop
            },
            extItem() {
                let x = document.getElementById("subItem")
                if (x.className.indexOf("w3-show") == -1) {
                    x.className += " w3-show"
                } else {
                    x.className = x.className.replace(" w3-show", "")
                }
                this.caretItem = !this.caretItem
            },
            extInfo() {
                let x = document.getElementById("subInfo")
                if (x.className.indexOf("w3-show") == -1) {
                    x.className += " w3-show"
                } else {
                    x.className = x.className.replace(" w3-show", "")
                }
                this.caretInfo = !this.caretInfo
            },
            async onUpdateUserInfo() {
                await this.$store.dispatch('updateUserInfo', this.editedUserData)
                this.$router.push("/user/mgmt")
            },
            async onUpdateEmail() {
                await this.$store.dispatch('updateEmail', this.editedUserData)
                this.$router.push("/user/mgmt")
            },
            async onUpdatePassword() {
                await this.$store.dispatch('updatePassword', this.password)
                this.$router.push("/user/mgmt")
            },
            async onUpdateAvatar() {
                await this.$store.dispatch('updateAvatar', this.newAvatar)
                this.$router.push('/user/mgmt')
            },
            async onDeleteUser() {
                await this.$store.dispatch('deleteUser', this.user)
                this.$router.push('/')
            },
            onAvatarAdded(addedImages) {
                this.newAvatar = addedImages[0]
            },
            onAvatarRemoved(removedImage) {
                this.newAvatar = null
            },
        }
    }
</script>

<style>
    .w3-bar-block .w3-bar-item {padding: 10px}
    h6.mySideBar {
        display: inline-block;
        margin: 0
    }
    .app-hover {
        background-color: #ccc
    }
    .app-padding {
        padding: 0 5px
    }
    .reframe {
        height: 150px;
        width: 150px;
        overflow: hidden;
    }
    .reframeThumbnail {
        height: 100px;
        width: 100%;
        overflow: hidden;
    }
</style>
