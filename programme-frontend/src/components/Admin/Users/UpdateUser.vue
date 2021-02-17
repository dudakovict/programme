<template>
  <main class="main" v-if="this.user">
    <div class="user-view">
      <Sidebar class="col-sm-2 col-3"/>
      <div class="login-form w-50 mx-auto" style="max-width: none; box-shadow: none;">
        <h2 class="heading-secondary ma-bt-lg">Update User</h2>
        <form action class="form form--login">
          <div class="form__group">
            <label for="text" class="form__label">User Name</label>
            <input
              type="text"
              id="email"
              class="form__input"
              v-model="name"
              :placeholder="user.name"
              required
            />
          </div>
          <div class="form__group ma-bt-md">
            <label for="email" class="form__label">User Email</label>
            <input
              type="email"
              id="password"
              class="form__input"
              v-model="email"
              :placeholder="user.email"
              required
            />
          </div>
          <div class="form__group ma-bt-md">
            <label for="text" class="form__label">Role</label>
            <select class="select-css" v-model="role">
              <option value="" disabled selected>Current role: {{ user.role.charAt(0).toUpperCase() + user.role.slice(1) }}</option>
              <option value="user">User</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="form__group">
            <button class="btn btn--teal" @click.prevent="updateUser(user._id)">Update</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import AdminService from "@/services/AdminService";
import Sidebar from "@/components/Account/Sidebar";

export default {
  name: "UpdateUser",
  props: ["user"],
  components: {Sidebar},
  data() {
    return {
      name: null,
      email: null,
      role: null
    };
  },
  methods: {
      async updateUser(id) {
          const data = {
              name: !this.name ? this.user.name : this.name,
              email: !this.email ? this.user.email : this.email,
              role: !this.role ? this.user.role : this.role
          }
          const response = await AdminService.updateUser(id, data)
          const updatedUser = response.data.data
          if (updatedUser._id === this.$store.getters.getUser._id) {
            this.$store.dispatch('updateUser', updatedUser)
            this.$router.push({ name: 'Home' })
          } else {
            this.$router.go(-1)
          }
      }
  },
  async mounted() {
    if (!this.user) {
      this.user = await AdminService.getUser(this.$route.params.id)
    }
  }
};
</script>

<style lang="scss" scoped>

@media screen and (max-width:992px){
  .login-form{
    width:75% !important;
  }
}

</style>