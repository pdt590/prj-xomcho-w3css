<template>
    <section>
        <nuxt-link :to="'/shops/' + shopData.shopId" target="_blank">
            <div class="w3-row w3-border w3-hover-shadow">
                <div class="w3-col l3 w3-padding">
                    <img :src="shopData.logo !== undefined ? shopData.logo.url : '/icon-photo.png'" class="reframe">
                </div>
                <div class="w3-col l9 w3-padding">
                    <span class="w3-text-blue" style="font-size: 15px"><strong> {{shopData.title.substring(0, 10)}}<span v-if="shopData.title.length>10"> ...</span></strong></span><br>
                    <span class="w3-text-grey"><strong>Thời trang, nông sản</strong></span><br>
                    <span class="w3-text-red"><i class="fa fa-neuter"></i> {{shopData.location.substring(0, 10)}}<span v-if="(shopData.location.length)>10"> ...</span>, {{shopData.province}}</span><br>
                    <span><i class="fa fa-clock-o"></i> {{shopData.updatedDate | date}}</span>
                </div>
            </div>  
        </nuxt-link>     
    </section>
</template>

<script>
    export default {
        props: {
            shopData: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .reframe {
        height: 80px;
        width: 100%;
        overflow: hidden;
    }
</style>
