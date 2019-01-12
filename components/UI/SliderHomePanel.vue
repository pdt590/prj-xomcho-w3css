<template>
    <section>
        <div class="w3-display-container w3-center">
            <div class="main-panel w3-animate-opacity">
                <img class="w3-image" src="https://picsum.photos/600/220/?image=16" alt="Image 1" style="width: 100%;">
                <div class="w3-display-left w3-padding w3-hide-small" style="width:35%">
                    <div class="w3-black w3-opacity w3-hover-opacity-off w3-padding-large ">
                        <h1 class="w3-xlarge">Take photos with our app</h1>
                        <hr class="w3-opacity">
                        <p>Super simple installment: free of charge</p>
                        <p><button class="w3-button w3-block w3-blue w3-round" @click="document.getElementById('download').style.display='block'">Download <i class="fa fa-android"></i> <i class="fa fa-apple"></i> <i class="fa fa-windows"></i></button></p>
                    </div>
                </div>
            </div>
            <div class="main-panel w3-animate-opacity">
                <img class="w3-image" src="https://picsum.photos/600/200/?image=17" alt="Image 2" style="width: 100%;">
                <div class="w3-display-left w3-padding w3-hide-small" style="width:35%">
                    <div class="w3-black w3-opacity w3-hover-opacity-off w3-padding-large ">
                        <h1 class="w3-xlarge w3-text-red"><b>CLICK!</b> Fast and Easy</h1>
                        <hr class="w3-opacity">
                        <p>Choose from thousands of features</p>
                        <p><button class="w3-button w3-block w3-red w3-round" @click="document.getElementById('download').style.display='block'">Download <i class="fa fa-android"></i> <i class="fa fa-apple"></i> <i class="fa fa-windows"></i></button></p>
                    </div>
                </div>
            </div>
            <div class="main-panel w3-animate-opacity">
                <img class="w3-image" src="https://picsum.photos/600/200/?image=18" alt="Image 3" style="width: 100%;">
                <div class="w3-display-left w3-padding w3-hide-small" style="width:35%">
                    <div class="w3-black w3-opacity w3-hover-opacity-off w3-padding-large ">
                        <h1 class="w3-xlarge">Smart Design</h1>
                        <hr class="w3-opacity">
                        <p>Customize photos as you go</p>
                        <p><button class="w3-button w3-block w3-indigo w3-round" @click="document.getElementById('download').style.display='block'">Download <i class="fa fa-android"></i> <i class="fa fa-apple"></i> <i class="fa fa-windows"></i></button></p>
                    </div>
                </div>
            </div>
            <a class="w3-button w3-large w3-black w3-display-right w3-margin-right w3-hide-small w3-hover-light-grey" @click="plusDivs(1)">Khám phá <i class="fa fa-angle-right"></i></a>
            <a class="w3-button w3-block w3-black w3-hide-large w3-hide-medium" @click="plusDivs(1)">Khám phá <i class="fa fa-angle-right"></i></a>
        </div>
    </section>
</template>

<script>
    let slideIndex = 1
    export default {
        mounted() {
            this.showDivs(1)
        },
        methods: {
            showDivs(n) {
                let i 
                let x = document.getElementsByClassName("main-panel")
                if (n > x.length) {slideIndex = 1}    
                if (n < 1) {slideIndex = x.length}
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none"
                }
                x[slideIndex-1].style.display = "block"
            },
            plusDivs(n) {
                this.showDivs(slideIndex += n)
            }
        }
    }
</script>

<style>
    .main-panel {display: none;}
</style>
