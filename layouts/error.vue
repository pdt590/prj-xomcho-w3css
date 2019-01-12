<template>
    <div class="w3-white w3-display-container" style="min-height: 900px">
        <div class="w3-display-middle">
            <i class="w3-xxxlarge w3-text-red fa fa-minus-circle"></i> 
            <h1 v-if="error.statusCode === 404"> Không tìm thấy trang</h1>
            <h1 v-else>{{error.message}}</h1>
            <nuxt-link to="/">Trang chủ</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['error'],
    layout: 'home'
}
</script>