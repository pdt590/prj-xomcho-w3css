<template>
    <section>
        <div class="w3-border w3-border-grey w3-white w3-hover-shadow">
            <div class="w3-display-container"> 
                <span class="w3-tag w3-display-topleft">New</span>
                <nuxt-link :to="$route.path + '/' + itemData.itemId">
                    <img :src="itemData.images !== undefined ? itemData.images[0].url : '/icon-photo.png'" class="reframe">
                </nuxt-link>
            </div>
            <div class="w3-container w3-padding">
                <p>{{itemData.title.substring(0, 10)}}<span v-if="itemData.title.length>10"> ...</span><br><b>{{itemData.price}}</b></p>
                <div class="w3-bar-item w3-left">
                    <app-btn-saveitem />
                </div>
                <div class="w3-bar-item w3-right">
                    <app-btn-salecard />
                </div>
            </div>        
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            itemData: {
                type: Object,
                required: true
            }
        }   
    }
</script>

<style scoped>
    .reframe {
        height: 200px;
        width: 100%;
        overflow: hidden;
    }
</style>
