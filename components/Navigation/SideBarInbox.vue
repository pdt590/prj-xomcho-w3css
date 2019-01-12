<template>
    <section>
        <div class="w3-sidebar w3-light-grey w3-collapse w3-top w3-padding-64" style="z-index:3;width:270px" ref="mySidebar">
            <div class="w3-bar-block w3-large">
                <h5 class="w3-bar-item w3-text-grey"><b>Công cụ</b></h5>
                <nuxt-link :to="'/shops/' + $route.params.shopId + '/edit-shop'" class="w3-bar-item w3-button">
                    <img src="/config.svg" class="w3-round w3-margin-right" style="width:10%;" alt="Alps">
                    Chỉnh sửa
                </nuxt-link>
                <nuxt-link :to="'/shops/' + $route.params.shopId + '/new-item'" class="w3-bar-item w3-button">
                    <img src="/add.svg" class="w3-round w3-margin-right" style="width:10%;" alt="Alps">
                    Thêm sản phẩm
                </nuxt-link>
                <nuxt-link :to="'/shops/' + $route.params.shopId + '/comments'" class="w3-bar-item w3-button">
                    <img src="/comment.svg" class="w3-round w3-margin-right" style="width:10%;" alt="Alps">
                    Đánh giá cửa hàng
                </nuxt-link> 
                <button  class="w3-bar-item w3-button">
                    <img src="/bookmark.svg" class="w3-round w3-margin-right" style="width:10%;" alt="Alps">
                    Lưu cửa hàng
                </button>  
            </div>
        </div>
        <!-- Overlay effect when opening sidebar on small screens -->
        <div class="w3-overlay w3-hide-large" @click="closeSideBar" style="cursor:pointer" title="close side menu" ref="myOverlay"></div>
    </section>
</template>

<script>
    export default {
        computed: {
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
        methods: {
            closeSideBar() {
                this.$store.dispatch('openSideBar', false)
                this.$refs.myOverlay.style.display = 'none'
            }
        }
    }
</script>

<style>

</style>
