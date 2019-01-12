<template>
    <section>
        <div class="w3-row">
            <div class="w3-col l4 m4 s6" 
                v-for="(type, i) in displayedItemTypes" 
                :key="i">
                <p>
                    <label class="app-cb-container">
                        <input type="checkbox" :value="displayedItemTypes[i]" v-model="itemTypes" @change="$emit('onCheckBox', itemTypes)">
                        <span class="app-cb-checkmark"></span>
                        <i class="w3-xlarge w3-margin-right" :class="type.icon"></i>
                        {{ type.title }}
                    </label>
                </p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            displayedItemTypes: {
                type: Array,
                default: () => [
                    {icon: "fa fa-shopping-basket", title: "Thực phẩm"},
                    {icon: "fa fa-leaf", title: "Nông sản"},
                    {icon: "fa fa-cutlery", title: "Gia dụng"},
                    {icon: "fa fa-camera-retro", title: "Điện tử"},
                    {icon: "fa fa-medkit", title: "Y tế"},
                    {icon: "fa fa-shopping-bag", title: "Thời trang"},
                    {icon: "fa fa-question-circle", title: "Khác"}
                ]
            },
            selectedItemTypes: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                itemTypes: this.selectedItemTypes
            }
        }
    } 
</script>

<style scoped>
    /* The app-cb-container */
    .app-cb-container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default cb */
    .app-cb-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    /* Create a custom cb */
    .app-cb-checkmark {
        position: absolute;
        top: 4px;
        left: 0;
        height: 18px;
        width: 18px;
        background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    .app-cb-container:hover input ~ .app-cb-checkmark {
        background-color: #ccc;
    }

    /* When the cb is checked, add a blue background */
    .app-cb-container input:checked ~ .app-cb-checkmark {
        background-color: #2196F3;
    }

    /* Create the app-cb-checkmark/indicator (hidden when not checked) */
    .app-cb-checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the app-cb-checkmark when checked */
    .app-cb-container input:checked ~ .app-cb-checkmark:after {
        display: block;
    }

    /* Style the app-cb-checkmark/indicator */
    .app-cb-container .app-cb-checkmark:after {
        left: 6px;
        top: 2px;
        width: 7px;
        height: 12px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>