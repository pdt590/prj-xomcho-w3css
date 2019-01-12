<template>
    <section>
        <app-navbar :isHome="true" />
        <app-navbar-mobile :isHome="true" />
        <div class="w3-padding-64">
            <div class="w3-main">
                <nuxt/>
                <app-footer/>
                <div class="w3-center w3-padding-24">
                    Powered by 
                    <a href="https://www.tadicho.net" title="tadicho.net" target="_blank" class="w3-hover-opacity">tadicho.net</a>
                </div>                         
            </div>  
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                enableSearch: false
            }
        },
        methods: {
            onSearch() {
                this.enableSearch = !this.enableSearch;
                this.enableSearch ? this.$refs.search.style.display = 'block' : this.$refs.search.style.display = 'none'
            }
        }
    }
</script>

<style>
    html,body,h1,h2,h3,h4,h5,h6 {
        font-family: "Nunito", sans-serif;
    }
    html, body {
        font-size: 13px
    }
    h1{font-size:36px} h2{font-size:30px} h3{font-size:24px} 
    h4{font-size:20px} h5{font-size:18px} h6{font-size:16px}
</style>
