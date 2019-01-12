<template>
    <section>
        <div class="w3-container">
            <div class="app-img-slider" v-for="(img, i) in displayedImages" :key="i">
                <img :src="img.url" style="width:100%;margin-bottom:-6px">
            </div>
        </div>
        <div class="w3-row-padding w3-section" >
            <div class="w3-col s3" v-for="(img, i) in displayedImages" :key="i">
                <img class="smallImg w3-opacity w3-hover-opacity-off" :src="img.url" style="width:100%;cursor:pointer" @click="currentDiv(i+1)">
            </div>
        </div>
    </section>
</template>

<script>
    let slideIndex = 1;
    export default {
        props: {
            images: {
                type: Array
            }
        },
        mounted(){
            this.showDivs(slideIndex)
        },
        computed: {
            displayedImages() {
                if(this.images === undefined || !this.images.length) {
                    return [{url: '/icon-photo.png'}]
                }else {
                    return this.images
                }
            }
        },
        methods: {
            plusDivs(n) {
                this.showDivs(slideIndex += n);
            },
            currentDiv(n) {
                this.showDivs(slideIndex = n);
            },
            showDivs(n) {
                let i;
                let x = document.getElementsByClassName("app-img-slider");
                let dots = document.getElementsByClassName("smallImg");
                if (n > x.length) {slideIndex = 1}
                if (n < 1) {slideIndex = x.length}
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }
                for (i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
                }
                x[slideIndex-1].style.display = "block";
                dots[slideIndex-1].className += " w3-opacity-off";
            }
        }
    }
</script>

<style scoped>
    .app-img-slider {display:none}
</style>
