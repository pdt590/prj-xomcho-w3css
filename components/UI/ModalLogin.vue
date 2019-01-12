<template>
    <section>
        <div ref="modal" class="w3-modal w3-text-black">
            <div class="w3-modal-content w3-card w3-animate-zoom" style="max-width:500px; margin-top: 50px">
                <div class="w3-center"><br>
                    <span @click="closeLoginModal" 
                        class="w3-button w3-large w3-transparent w3-light-grey w3-display-topright" 
                        title="Close Modal">×</span>
                </div>
                <form class="w3-container">
                    <div class="w3-section ">
                        <h3 class="w3-center"><strong>{{ isSignin ? 'Đăng nhập' :" Đăng ký" }}</strong></h3>
                        <p v-if="authError && authError.message.includes('The email address is already in use')" class="w3-text-red">
                            Email đã được sử dụng bởi người khác
                        </p>
                        <p v-else-if="authError && authError.message.includes('There is no user record')" class="w3-text-red">
                            Email không tồn tại
                        </p>
                        <p v-else-if="authError && authError.message.includes('The password is invalid')" class="w3-text-red">
                            Sai mật khẩu
                        </p>
                        <!--SignIn Form-->
                        <div v-if="isSignin">
                            <div>
                                <label :class="{'w3-text-red': $v.userSignInData.email.$error}"> <strong>Email</strong></label>
                                <input class="w3-input w3-border w3-margin-bottom"
                                    :class="{'w3-border-red': $v.userSignInData.email.$error}"
                                    type="email" 
                                    @blur="$v.userSignInData.email.$touch()" 
                                    v-model.trim="userSignInData.email"
                                >
                                <p v-if="!$v.userSignInData.email.email" class="w3-text-grey">Điền một email hợp lệ</p>
                            </div>
                            <div>
                                <label :class="{'w3-text-red': $v.userSignInData.password.$error}"><strong>Mật khẩu</strong></label>
                                <input class="w3-input w3-border"
                                    :class="{'w3-border-red': $v.userSignInData.password.$error}" 
                                    type="password" 
                                    @blur="$v.userSignInData.password.$touch()" 
                                    v-model.trim="userSignInData.password"
                                >
                                <p v-if="!$v.userSignUpData.password.minLen" class="w3-text-grey">Yêu cầu dài hơn 6 ký tự</p>
                            </div>   
                        </div>
                        <!--SignUp Form-->
                        <div v-else>
                            <div>
                                <label :class="{'w3-text-red': $v.userSignUpData.username.$error}"><strong>Username</strong></label>
                                <input class="w3-input w3-border w3-margin-bottom"
                                    :class="{'w3-border-red': $v.userSignUpData.username.$error}"  
                                    type="text" 
                                    @blur="$v.userSignUpData.username.$touch()" 
                                    v-model.trim="userSignUpData.username"
                                >
                                <p v-if="!$v.userSignUpData.username.minLen" class="w3-text-grey">Yêu cầu dài hơn 6 ký tự</p>
                            </div>
                            <div>
                                <label :class="{'w3-text-red': $v.userSignUpData.email.$error || !$v.userSignUpData.email.isUnique}"><strong>Email</strong></label>
                                <input class="w3-input w3-border w3-margin-bottom"
                                    :class="{'w3-border-red': $v.userSignUpData.email.$error || !$v.userSignUpData.email.isUnique}"
                                    type="email" 
                                    @blur="$v.userSignUpData.email.$touch()" 
                                    v-model.trim="userSignUpData.email"
                                >
                                <p v-if="!$v.userSignUpData.email.email" class="w3-text-grey">Điền một email hợp lệ</p>
                                <p v-else-if="!$v.userSignUpData.email.isUnique" class="w3-text-grey">Email đã được sử dụng</p>
                            </div>
                            <div>
                                <label :class="{'w3-text-red': $v.userSignUpData.password.$error}"><strong>Mật khẩu</strong></label>
                                <input class="w3-input w3-border"
                                    :class="{'w3-border-red': $v.userSignUpData.password.$error}" 
                                    type="password" 
                                    @blur="$v.userSignUpData.password.$touch()" 
                                    v-model.trim="userSignUpData.password"
                                >
                                <p v-if="!$v.userSignUpData.password.minLen" class="w3-text-grey">Yêu cầu dài hơn 6 ký tự</p>
                            </div>   
                        </div>
                        <button class="w3-button w3-block w3-border w3-border-blue w3-section w3-padding" 
                            @click.prevent="onSignin" 
                            :disabled="isSignin ? $v.userSignInData.$invalid : $v.userSignUpData.$invalid" 
                        >
                            <i v-show="authLoading" class="fa fa-spinner fa-spin w3-xlarge w3-margin-right"></i>
                            {{ isSignin ? 'Đăng nhập' :" Đăng ký" }}
                        </button>
                    </div>
                    <hr>
                </form>
                <!--<div class="w3-row-padding w3-margin-bottom">
                    <div class="w3-half w3-margin-bottom">
                        <button class="w3-button w3-block  w3-red" disabled>
                            <i class="fa fa-google"></i>
                            Google
                        </button>
                    </div>
                    <div class="w3-half">
                        <button class="w3-button w3-block  w3-blue" disabled>
                            <i class="fa fa-facebook-official"></i> 
                            Facebook
                        </button>
                    </div>   
                </div>-->
                <div class="w3-container w3-border-top w3-round w3-padding w3-light-grey">
                    <button class="w3-button w3-border w3-light-grey" @click="onSwitchMode">{{ isSignin ? 'Đăng ký' :" Đăng nhập" }}</button>
                    <!--<span class="w3-right w3-padding w3-disabled">Quên <a href="">mật khấu?</a></span>-->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { required, email, minLength } from 'vuelidate/lib/validators'
    import Vue from 'vue'
    import Vuelidate from 'vuelidate'
    Vue.use(Vuelidate)

    export default {
        computed: {
            ... mapGetters(['authError', 'authLoading'])
        },
        data() {
            return {
                isSignin: true,
                userSignInData: {
                    email: '',
                    password: ''
                },
                userSignUpData: {
                    username: '',
                    email: '',
                    password: ''
                }
            }
        },
        validations: {
            userSignInData: {
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minlen: minLength(6) 
                }
            },
            userSignUpData: {
                username: {
                    required, 
                    minLen: minLength(6)                  
                },
                email: {
                    required,
                    email,
                    async isUnique(value) {
                        if(value === '') return true 
                        //const isUnique = await this.$store.dispatch('isUnique', value)
                        return true
                    }
                },
                password: {
                    required,
                    minLen: minLength(6) //TODO: Min is 6
                }
            }
        },
        methods: {
            closeLoginModal() {
                this.userSignInData = {
                    email: '',
                    password: ''
                }
                this.userSignUpData = {
                    username: '',
                    email: '',
                    password: ''
                }
                this.$v.$reset()
                this.$refs.modal.style.display='none'
                this.$store.dispatch('clearAuthError')
            },
            onSwitchMode() {
                this.isSignin = !this.isSignin; 
                this.$store.dispatch('clearAuthError')
            },
            async onSignin() {
                if (this.isSignin) {
                    await this.$store.dispatch('signUserIn', this.userSignInData)
                    if (!this.authError) this.closeLoginModal()
                } else {
                    await this.$store.dispatch('signUserUp', this.userSignUpData)
                    if (!this.authError) this.closeLoginModal()
                }
            }
        }
    }
</script>

<style scoped>
    input:focus {
        background-color: cornsilk;
        outline: none;
    }
</style>
