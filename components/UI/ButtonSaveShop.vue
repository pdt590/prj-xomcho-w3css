<template>
    <section>
        <i class="w3-margin-right" :class="isSave ? 'my-heart fa fa-bookmark' :'my-heart fa fa-bookmark-o'" @click="onSave()"></i> 
        <h6>Lưu cửa hàng</h6>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isSave: false
            }
        },
        methods: {
            onSave() {
                this.isSave = !this.isSave
            }
        }
    }
</script>

<style scoped>
    .my-heart {
        font-size: 22px;
        color:red;
        cursor: pointer;
    }
</style>

