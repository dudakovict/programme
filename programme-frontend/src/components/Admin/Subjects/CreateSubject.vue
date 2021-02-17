<template>
  <main class="main">
    <div class="user-view">
      <Sidebar class="col-sm-2 col-3"/>
      <div class="login-form w-50 mx-auto" style="max-width: none; box-shadow: none;">
        <h2 class="heading-secondary ma-bt-lg">Create Subject</h2>
        <form action class="form form--login">
          <div class="form__group">
            <label for="text" class="form__label">Subject Name</label>
            <input
              type="text"
              id="email"
              class="form__input"
              v-model="name"
              placeholder="name"
              required
            />
          </div>
          <div class="form__group ma-bt-md">
            <label for="number" class="form__label">Subject Price</label>
            <input
              type="number"
              id="password"
              class="form__input"
              v-model="price"
              placeholder="price"
              required
            />
          </div>
          <div class="form__group ma-bt-md">
            <label for="text" class="form__label">Subject Summary</label>
            <input
              type="text"
              id="password"
              class="form__input"
              v-model="summary"
              placeholder="summary"
              required
            />
          </div>
          <div class="form__group ma-bt-md">
            <label for="text" class="form__label">Subject Description</label>
            <input
              type="text"
              id="password"
              class="form__input"
              v-model="description"
              placeholder="description"
              required
            />
          </div>
          <div class="form__group ma-bt-md">
            <label for="text" class="form__label">All Tutors</label>
            <select class="select-css" multiple>
              <option v-for="tutor in tutors" :key="tutor.id">{{ tutor.name }}</option>
            </select>
          </div>
          <div class="form__group">
            <button class="btn btn--teal" @click.prevent="createSubject">Create</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import AdminService from "@/services/AdminService";
import Sidebar from '@/components/Account/Sidebar';

export default {
  name: "CreateSubject",
  components:{Sidebar},
  data() {
    return {
      user: null,
      name: null,
      price: null,
      summary: null,
      description: null,
      tutors: null,
    };
  },
  methods: {
    async createSubject() {
      if (
        !this.name ||
        !this.price ||
        !this.summary ||
        !this.description
      ) {
        console.log("fail");
      } else {
        const data = {
            name: this.name,
            price: this.price,
            summary: this.summary,
            description: this.description,
            tutors: [this.user._id]
        }
        console.log(data)
        await AdminService.createSubject(data);
        this.$router.go(-1);
      }
    }
  },
  async mounted() {
    this.user = this.$store.getters.getUser
    this.tutors = await AdminService.getTutors();
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