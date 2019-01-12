<template>
    <section>
        <no-ssr>
            <croppa
                v-model="croppa"
                :reverse-scroll-to-zoom="true"
                :zoom-speed="9"
                placeholder="click button on the right :)"
                :placeholder-font-size="14">
            </croppa>
        </no-ssr>   
        <a class="w3-button w3-border" @click="croppa.chooseFile()">upload</a>
    </section>
</template>

<script>
    export default {
        layout: 'shop',
        data() {
            return {
                croppa: {}
            }
        }
    }
</script>

<style>
    @import 'vue-croppa/dist/vue-croppa.css';
</style>
