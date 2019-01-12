<template>
    <section>
        <div class="w3-top" style="z-index:1001">
            <div class="w3-bar w3-padding w3-hide-large w3-blue" style="z-index:1001">
                <nuxt-link to="/" class="w3-bar-item w3-button w3-hover-none w3-hover-text-white"><i class="fa fa-home w3-xlarge"></i> </nuxt-link>
                <a href="javascript:void(0)" class="w3-bar-item w3-button w3-right" @click="openSideBar" v-if="!isHome"><i class="fa fa-bars"></i></a>
                
                <div v-if="user" class="w3-dropdown-hover w3-right">
                    <a class="w3-button">
                        <img :src="user.avatar !== undefined ? user.avatar.url : '/icon-user.png'" class="w3-circle" style="height:23px;width:23px" alt="Avatar">
                    </a>
                    <div class="w3-dropdown-content w3-bar-block w3-card w3-light-grey" :style="!isHome ? 'right:58px;' : 'right:15px;'">
                        <p class="w3-bar-item" style="padding-bottom:0">{{user.username}}</p>
                        <nuxt-link to="/user/profile" class="w3-bar-item w3-button"><i class="fa fa-user w3-large"></i> Cá nhân</nuxt-link>
                        <nuxt-link to="/user/mgmt" class="w3-bar-item w3-button"><i class="fa fa-cube w3-large"></i> Trang quản lý</nuxt-link>
                        <nuxt-link to="/user/messages" class="w3-bar-item w3-button"><i class="fa fa-envelope w3-large"></i> Tin nhắn</nuxt-link>
                        <a class="w3-bar-item w3-button w3-border-top"  @click="onLogout"><i class="fa fa-sign-out w3-large"></i> Đăng xuất</a>
                    </div>
                </div>

                <button
                    v-else
                    @click="openLoginModal"
                    class="w3-bar-item w3-button w3-right">
                    <i class="fa fa-sign-in w3-large"></i>
                </button>
                <app-modal-login ref="modalLogin" />

                <div v-if="user">
                    <nuxt-link to="/user" 
                        class="w3-bar-item w3-button w3-right">
                        <i class="fa fa-bell w3-large"></i><span class="w3-badge w3-right w3-small w3-red">3</span>
                    </nuxt-link>
                    <nuxt-link v-if="!isHome" to="/shops/new-shop"
                        class="w3-bar-item w3-padding w3-button w3-right"> 
                        <i class="w3-large fa fa-plus-square"></i>
                    </nuxt-link>
                </div>

                <button @click="onSearch" class="w3-bar-item w3-button w3-right"><i :class="enableSearch ? 'fa fa-close' : 'fa fa-search'" class="w3-large"></i></button>
                <form ref="search" style="display: none">
                    <button class="w3-button w3-light-grey w3-bar-item w3-mobile">Tìm kiếm</button>
                    <select class="w3-select w3-bar-item w3-mobile" name="option">
                        <option value="" disabled selected>Danh mục</option>
                        <option value="1">Cửa hàng</option>
                        <option value="2">Sản phẩm</option>
                    </select>                    
                    <input  type="text" class="w3-bar-item w3-input w3-mobile" placeholder="nhập từ khóa..." required>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: {
            isHome: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters(['user'])
            /*
            ...mapState({
                user: state => state.user.user
            })
            */
        },
        data() {
            return {
                enableSearch: false
            }
        },
        methods: {
            openSideBar() {
                if(this.$store.getters.sideBar) { // ? or this.$store.state.shared.sideBar
                    this.$store.dispatch('openSideBar', false)
                }else {
                    this.$store.dispatch('openSideBar', true)
                }  
            },
            openLoginModal() {
                this.$refs.modalLogin.$refs.modal.style.display='block'
            },
            onSearch() {
                this.enableSearch = !this.enableSearch;
                this.enableSearch ? this.$refs.search.style.display = 'block' : this.$refs.search.style.display = 'none'
            },
            async onLogout() {
                await this.$store.dispatch('logOut')
                if(this.$route.params.shopId && this.$route.params.itemId) {
                    this.$router.push('/shops/' + this.$route.params.shopId + '/' + this.$route.params.itemId)
                }else if(this.$route.params.shopId) {
                    this.$router.push('/shops/' + this.$route.params.shopId)
                }else {
                    this.$router.push('/')
                }
            }
        }
    }
</script>
