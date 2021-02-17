<template>
  <header class="header">
    <nav class="nav nav--subjects">
      <router-link :to="{name: 'Home'}" class="nav__el" style="font-family:Franklin Gothic Medium; font-size:25px;">
        Programme
      </router-link>
    </nav>
    <nav class="nav nav--user" v-if="this.$store.getters.isLoggedIn">
      <a id="logoutBTN" class="nav__el nav__el--cta" @click.prevent="logout">
        <span class="textLarge">Logout</span>
        <span class="iconSmall"><i class="fas fa-power-off"></i></span>
      </a>
      <router-link :to="{ name: 'Account', params: { id: this.$store.getters.getUser._id } }" class="nav__el">
        <img v-if="this.$store.getters.getUser.photo && this.$store.getters.getUser.photo != 'default.jpg'" 
             :src="'http://localhost:5000/api/users/files/' + this.$store.getters.getUser.photo" :alt="this.$store.getters.getUser.name" class="nav__user-img" />
        
        <img v-else 
             :src="'http://localhost:5000/api/users/files/default.jpg'" :alt="this.$store.getters.getUser.name" class="nav__user-img" />
        
        <span class="textLarge">{{this.$store.getters.getUser.name}}</span>
      </router-link>
    </nav>
    <nav class="nav nav--user" v-if="!this.$store.getters.isLoggedIn">
      <router-link :to="{ name: 'Login' }" class="nav__el">
        <span class="textLarge">Login</span>
        <span class="iconSmall"><i class="fas fa-sign-in-alt"></i></span>
      </router-link>
      <router-link :to="{ name: 'Signup' }" class="nav__el nav__el--cta">
        <span class="textLarge">Signup</span>
        <span class="iconSmall"><i class="fas fa-user-plus"></i></span>
      </router-link>
    </nav>
  </header>
</template>

<script>
import AuthService from "@/services/AuthService.js";

export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    }
  },
  mounted(){
    console.log(this.$store.getters.getUser.photo)
  }
};
</script>

<style lang="scss" scoped>
  .iconSmall{
    display:none;
  }
  @media screen and (max-width: 768px){
    .textLarge{display:none;}
    .iconSmall{display:block;}
  }
</style>