<template>
    <section>
        <app-navbar :navItems="navItems" />
        <app-navbar-mobile :navItems="navItems" />
        <div class="w3-content w3-padding-64" style="max-width:100%">
            <!-- Sidebar left -->
            <div class="w3-sidebar w3-collapse w3-top w3-padding-64" style="z-index:3;width:400px;" ref="mySidebar">
                <div class="w3-bar-block">
                    <a v-for="(msg, i) in 3" :key="i" class="w3-bar-item w3-button w3-border-bottom tablink" :class="{'app-hover': i===0}" @click="openTab($event, i)">                    
                        <div class="w3-container">
                            <img class="w3-round w3-margin-right" src="/icon-user.png" style="width:10%;"><span class="w3-opacity w3-large">Borge Refsnes</span>
                            <h6>Subject: Remember {{i}}</h6>
                            <p>Hello, i just wanted to let you know that i'll be home at...</p>
                        </div>
                    </a>
                </div>
            </div>
            <!-- Overlay effect when opening sidebar on small screens -->
            <div class="w3-overlay w3-hide-large" @click="closeSideBar" style="cursor:pointer" title="close side menu" ref="myOverlay"></div>
            <div class="w3-main" style="margin-left:400px;" >
                <div v-for="(msg, m) in 3" :key="m" :id="m" class="section" :class="{'app-tab-hide': m!=0}">
                    <div class="overflow" style="width: 65%; padding: 0 30px; margin: auto">
                        <ul class="w3-ul">
                            <li class="w3-bar container" v-for="(ms, n) in 5" :key="n">
                                <span class="w3-bar-item w3-right">11:00</span>
                                <img src="/icon-user.png" class="w3-bar-item w3-circle" style="width:85px">
                                <div class="w3-bar-item">
                                    <span><b>pdthang</b></span><br>
                                    <span>Hello. How are you today?</span>
                                </div>
                            </li>
                            <li class="w3-bar container w3-blue" v-for="(ms, l) in 5" :key="l">
                                <span class="w3-bar-item w3-left">11:00</span>
                                <img src="/icon-user.png" class="w3-bar-item w3-circle w3-right" style="width:85px">
                                <div class="w3-bar-item w3-right">
                                    <span class="w3-right"><b>pdthang</b></span><br>
                                    <span>Hello. How are you today?</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <form style="width: 65%; padding: 10px 30px; margin: auto">
                        <textarea class="w3-input w3-border" rows="3" style="resize:none"></textarea>
                        <br>
                        <div class="w3-row">
                            <button class="w3-button w3-border w3-border-blue w3-right w3-quarter"><i class="fa fa-save w3-xlarge w3-margin-right"></i>Gửi</button>
                        </div>  
                    </form>  
                </div>
            </div>  
        </div>
    </section>
</template>

<script>
    export default {
        middleware: ['check-auth', 'auth'],
        layout: 'user',
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
        mounted() {
            //let container = this.$el.querySelector(".overflow");
            //container.scrollTop = container.scrollHeight;
        },
        data() {
            return {
                navItems: [
                    {link: '/shops/new-shop', icon: 'fa fa-plus-square', title: 'Tạo cửa hàng'}
                ],
                caretShop: false,
                caretItem: false,
                caretInfo: false,
                on1: false,
                on2: false
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
                
                this.closeSideBar()
            },
            closeSideBar() {
                this.$store.dispatch('openSideBar', false)
                this.$refs.myOverlay.style.display = 'none'
            }
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
    .app-tab-hide {
        display: none;
    }
    .container {
        border: 2px solid #dedede;
        background-color: white;
        border-radius: 5px;
        padding: 10px;
        margin: 10px 0;
    }
    .overflow {
        padding: 15px;
        width: 50%;
        height: 600px;
        overflow: scroll;
    }
</style>
