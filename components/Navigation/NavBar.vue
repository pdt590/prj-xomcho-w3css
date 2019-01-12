<template>
    <section>
        <div class="w3-top" style="z-index:1001; font-size: 15px">
            <div class="w3-bar w3-padding w3-blue w3-hide-small w3-hide-medium">
                <nuxt-link to="/" class="w3-bar-item w3-hover-none" style="padding: 0;">
                    <img src="/logo.png" style="width: 30%;" alt="Avatar">
                </nuxt-link>
                
                <div v-if="user" class="w3-dropdown-hover w3-right">
                    <a class="w3-button">
                        <img :src="user.avatar !== undefined ? user.avatar.url : '/icon-user.png'" class="w3-circle" style="height:30px;width:30px" alt="Avatar">
                    </a>
                    <div class="w3-dropdown-content w3-bar-block w3-card w3-light-grey" style="right:15px;">
                        <p class="w3-bar-item" style="padding-bottom:0">{{user.username}}</p>
                        <nuxt-link to="/user/profile" class="w3-bar-item w3-button"><i class="fa fa-user w3-large"></i> Cá nhân</nuxt-link>
                        <nuxt-link to="/user/mgmt" class="w3-bar-item w3-button"><i class="fa fa-cube w3-large"></i> Trang quản lý</nuxt-link>
                        <nuxt-link to="/user/messages" class="w3-bar-item w3-button"><i class="fa fa-envelope w3-large"></i> Tin nhắn</nuxt-link>
                        <a class="w3-bar-item w3-button w3-border-top" @click="onLogout"><i class="fa fa-sign-out w3-large"></i> Đăng xuất</a>
                    </div>
                </div>
                
                <button
                    v-else
                    @click="openLoginModal"
                    class="w3-bar-item w3-button w3-padding w3-right">
                    <i class="fa fa-sign-in w3-large"></i>
                    Đăng nhập/Đăng ký
                </button>
                <app-modal-login ref="modalLogin" />
                
                <div v-if="user">
                    <nuxt-link to="/user" 
                        class="w3-bar-item w3-button w3-right">
                        <i class="fa fa-bell w3-large"></i><span class="w3-badge w3-right w3-small w3-red">3</span>
                    </nuxt-link>
                    <nuxt-link v-if="!isHome" to="/shops/new-shop"
                        class="w3-bar-item w3-padding w3-button w3-right" target="_blank"> 
                        <i class="w3-large fa fa-plus-square"></i> Tạo cửa hàng
                    </nuxt-link>
                </div>
            
                <!--<button @click="onSearch" class="w3-bar-item w3-button"><i :class="enableSearch ? 'fa fa-close' : 'fa fa-search'" class="w3-large"></i></button>-->
                <form ref="search" class="app-search">
                    <button class="w3-button w3-light-grey w3-bar-item w3-margin-left">Tìm kiếm</button>
                    <select class="w3-select w3-bar-item" v-model="searchOption">
                        <option value="" disabled selected>Danh mục</option>
                        <option value="shop">Cửa hàng</option>
                        <option value="item">Sản phẩm</option>
                    </select>
                    <input type="text" class="w3-bar-item w3-input" placeholder="nhập từ khóa..." style="width:70%" required>
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
        middleware: 'expired-auth',
        computed: {
            ...mapGetters(['user'])
        },
        data() {
            return {
                enableSearch: true,
                searchOption: ''
            }
        },
        methods: {
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

<style>
    .app-search {
        display: block;
        margin: auto;
        width: 50%;
    }
</style>
