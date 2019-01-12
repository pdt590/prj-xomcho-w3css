<template>
    <section>
        <div class="app-shop w3-row-padding" :class="isLeft ? 'w3-animate-opacity' : 'w3-animate-opacity'">
            <div class="w3-col l4 m3 s6 w3-margin-bottom" v-for="(shop, i) in shopsData.slice(0, 15)" :key="i">
                <app-shop-card-home :shopData="shop"/>
            </div>
        </div>
        <div class="app-slider-shop w3-row-padding"  :class="isLeft ? 'w3-animate-opacity' : 'w3-animate-opacity'">
            <div class="w3-col l4 m3 s6 w3-margin-bottom" v-for="(shop, i) in shopsData.slice(15, 30)" :key="i">
                <app-shop-card-home :shopData="shop"/>
            </div>
        </div>
        <div class="app-slider-shop w3-row-padding"  :class="isLeft ? 'w3-animate-opacity' : 'w3-animate-opacity'">
            <div class="w3-col l4 m3 s6 w3-margin-bottom" v-for="(shop, i) in shopsData.slice(30, 45)" :key="i">
                <app-shop-card-home :shopData="shop"/>
            </div>
        </div>
        <!-- Slideshow next/previous buttons -->
        <div class="w3-container">
            <div class="w3-left w3-text-blue w3-hover-text-blue w3-xlarge" @click="plusDivs(-1)">&#10094;</div>
            <div class="w3-right w3-text-blue w3-hover-text-blue w3-xlarge" @click="plusDivs(1)">&#10095;</div>
            <div class="w3-center">
                <span class="w3-badge demodots w3-border w3-transparent w3-hover-blue w3-margin" @click="currentDiv(1)"></span>
                <span class="w3-badge demodots w3-border w3-transparent w3-hover-blue w3-margin" @click="currentDiv(2)"></span>
                <span class="w3-badge demodots w3-border w3-transparent w3-hover-blue w3-margin" @click="currentDiv(3)"></span>
            </div>
        </div>
    </section>
</template>

<script>
    let slideIndex = 1
    export default {
        props: {
            shopsData: {
                type: Array,
                required: true
            }
        },
        mounted() {
            this.showDivs(1)
        },
        data() {
            return {
                isLeft: false
            }
        },
        methods: {
            showDivs(n) {
                let i 
                let x = document.getElementsByClassName("app-shop")
                let dots = document.getElementsByClassName("demodots");
                if (n > x.length) {slideIndex = 1}    
                if (n < 1) {slideIndex = x.length}
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none"
                }
                for (i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(" w3-blue", "")
                }
                x[slideIndex-1].style.display = "block"
                dots[slideIndex-1].className += " w3-blue"
            },
            plusDivs(n) {
                if(n == -1) {
                    this.isLeft = true
                } else {
                    this.isLeft = false
                }
                this.showDivs(slideIndex += n)
            },
            currentDiv(n) {
                this.showDivs(slideIndex = n);
            }
        }
    }
</script>

<style scoped>
    .app-slider-shop {display: none;}
    .w3-left, .w3-right, .w3-badge {cursor:pointer}
    .w3-badge {
        height:15px;
        width:15px;
        padding:0;
        margin-top:6px
    }
</style>