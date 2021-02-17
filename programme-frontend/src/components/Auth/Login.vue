<template>
    <main class="main">
        <div class="login-form">
            <h2 class="heading-secondary ma-bt-lg">Login</h2>
            <form action="" class="form form--login">
                <div class="form__group">
                    <label for="email" class="form__label">Email address</label>
                    <input type="email" id="email" class="form__input" v-model="email" placeholder="you@example.com" required>
                </div>
                <div class="form__group ma-bt-md">
                    <label for="password" class="form__label">Password</label>
                    <input type="password" id="password" class="form__input" v-model="password" placeholder="********" minlength="8" required>
                </div>
                <div class="form__group">
                    <button class="btn btn--teal" @click.prevent="login">Login</button>
                </div>
            </form>
            <div v-if="feedback" class="alert-l">
                <p><strong>{{ feedback }}</strong></p>
            </div>
        </div>

    </main>
</template>

<script>
import AuthService from "@/services/AuthService.js";

export default {
    name: 'Login',
    data(){
        return{
            email: null,
            password: null,
            feedback: null
        }
    },
    methods: {
        async login() {
            try {
                const credentials = {
                    email: this.email,
                    password: this.password
                }

                const response = await AuthService.login(credentials)


                const token = response.token
                
                const user = response.data.user

                this.$store.dispatch('login', { token, user })
                this.feedback = null;
                this.$router.push({ name: 'Home' })

            } catch (err) {
                this.feedback = err.response.data.message
            }
        },
    }
};
</script>

<style lang="scss" scoped>
.login-form{
    margin-top:40px;
}
.alert-l {
  padding: 20px;
  background-color: #f44336;
  color: white;
  border-radius: 5px;
  margin-top: 30px;
  opacity: 0.7 !important;
  width: 100%;
}
.alert-l strong {
  font-size: 15px;
}
.alert-l p {
  text-align: center;
}
.alert-l:hover {
  opacity: 1 !important;
}
</style>