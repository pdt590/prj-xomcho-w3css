<template>
    <section>
        <nuxt-link :to="'/shops/' + itemData.shopId + '/' + itemData.itemId" target="_blank">
            <img :src="itemData.images !== undefined ? itemData.images[0].url : '/icon-area.png'" class="w3-hover-shadow reframe">
        </nuxt-link>
        <div class="w3-container w3-padding">
            <h6>{{itemData.title.substring(0, 10)}}<span v-if="itemData.title.length>10"> ...</span><br><b class="w3-text-red">{{itemData.price}} {{itemData.currency}}</b></h6>
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
        height: 150px;
        width: 100%;
        overflow: hidden;
    }
</style>