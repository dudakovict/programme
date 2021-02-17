<template>
  <main class="main">
    <div class="login-form">
      <h2 class="heading-secondary ma-bt-lg">Signup</h2>
      <form action class="form form--login">
        <div class="form__group">
          <label for="text" class="form__label">Name</label>
          <input
            type="text"
            id="name"
            class="form__input"
            v-model="name"
            placeholder="your name"
            required
          />
        </div>
        <div class="form__group">
          <label for="email" class="form__label">Email address</label>
          <input
            type="email"
            id="email"
            class="form__input"
            v-model="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div class="form__group ma-bt-md">
          <label for="password" class="form__label">Password</label>
          <input
            type="password"
            id="password"
            class="form__input"
            v-model="password"
            placeholder="********"
            minlength="8"
            required
          />
        </div>
        <div class="form__group ma-bt-md">
          <label for="password" class="form__label">Password confirm</label>
          <input
            type="password"
            id="passwordConfirm"
            class="form__input"
            v-model="passwordConfirm"
            placeholder="********"
            minlength="8"
            required
          />
        </div>
        <div class="form__group">
          <button class="btn btn--teal" @click.prevent="signup">Signup</button>
        </div>
      </form>
      <div v-if="feedback" class="alert-l">
        <p><strong>{{ feedback }}</strong></p>
      </div>
    </div>
    <div v-if="feedback" class="alert-s">
      <p><strong>{{ feedback }}</strong></p>
    </div>
  </main>
</template>

<script>
import AuthService from "@/services/AuthService.js";

export default {
  name: "Signup",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      passwordConfirm: null,
      feedback: null
    };
  },
  methods: {
      async signup() {
          try {
              const credentials = {
                  name: this.name,
                  email: this.email,
                  password: this.password,
                  passwordConfirm: this.passwordConfirm
              }

              const response = await AuthService.signup(credentials)
              this.feedback = null
              this.$router.push({ name: 'Login' })
          } catch (err) {
              if(err.response.data.message == "Internal server error!") this.feedback = "Please enter and verify all fields."
              else this.feedback = err.response.data.message;
          }
      }
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