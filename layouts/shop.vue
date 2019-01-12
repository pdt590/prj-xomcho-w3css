<template>
    <section>
        <app-loading v-if="itemLoading || shopLoading"/>
        <app-navbar />
        <app-navbar-mobile />
        <nuxt/>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        middleware: 'check-auth',
        computed: {
            ...mapGetters(['itemLoading', 'shopLoading'])
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