<template>
    <section>
        <i :class="isSave ? 'heart fa fa-heart' :'heart fa fa-heart-o'" @click="onSave()"></i>
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
    .heart {
        font-size: 32px;
        color:red;
        cursor: pointer;
    }
</style>

