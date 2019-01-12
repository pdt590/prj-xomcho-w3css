<template>
    <section>
        <button @click="openSaleModal" class="w3-button w3-border w3-border-blue " style="width: 100%;">Mua </button>
        <div ref="modal" class="w3-modal" style="z-index:1002;">
            <div class="w3-modal-content w3-animate-zoom" style="max-width:500px; margin-top: 50px">
                <div class="w3-container w3-padding w3-blue">
                    <span @click="closeSaleModal"
                    class="w3-button w3-blue w3-right w3-large"><i class="fa fa-remove"></i></span>
                    <h4>Gửi yêu cầu</h4>
                </div>
                <div class="w3-panel">
                    <label>Tên của bạn</label>
                    <input class="w3-input w3-border w3-margin-bottom" type="text">
                    <label>Số điện thoại / email</label>
                    <input class="w3-input w3-border w3-margin-bottom" type="text">
                    <label>Số lượng</label>
                    <input class="w3-input w3-border w3-margin-bottom" type="text">
                    <label>Tin nhắn nếu có</label>
                    <textarea class="w3-input w3-border" rows="2" style="resize:none"></textarea>
                    <div class="w3-section">
                        <a class="w3-button w3-border w3-blue" href="https://facebook.com" target=_blank><i class="fa fa-facebook w3-large"></i></a>
                        <a class="w3-button w3-border w3-red" href="tel:016727735514" target=_blank><i class="fa fa-phone w3-large"></i></a>
                        <a class="w3-button w3-border w3-border-blue w3-right" style="min-width: 100px"><i class="fa fa-paper-plane w3-large"></i></a> 
                    </div>    
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        methods: {
            openSaleModal() {
                this.$refs.modal.style.display='block'
            },
            closeSaleModal() {
                this.$refs.modal.style.display='none'
            }
        }
    }
</script>