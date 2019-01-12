<template>
    <section>
        <div v-if="displayedImages.length" v-for="(img, i) in displayedImages" :key="i" class="reframe">
            <img class="w3-image" :src="img.url" >
        </div>
    </section>
</template>

<script>
    let slideIndex = 1
    export default {
        props: {
            images: {
                type: Array
            }
        },
        computed: {
            displayedImages() {
                if(this.images === undefined) {
                    return []
                }else {
                    return this.images
                }
            }
        }
    }
</script>

<style scoped>
    .reframe {
        height: 300px;
        width: 100%;
        overflow: hidden;
    }
</style>
