<template>
  <main class="main" v-if="this.subject">
    <div class="user-view">
      <Sidebar class="col-sm-2 col-3"/>
      <div class="login-form w-50 mx-auto" style="max-width: none; box-shadow: none;">
        <h2 class="heading-secondary ma-bt-lg">Update Subject</h2>
        <form action class="form form--login">
          <div class="form__group">
            <label for="text" class="form__label">Subject Name</label>
            <input
              type="text"
              id="email"
              class="form__input"
              v-model="name"
              :placeholder="subject.name"
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
              :placeholder="subject.price"
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
              :placeholder="subject.summary"
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
              :placeholder="subject.description"
              required
            />
          </div>
          <div class="form__group ma-bt-md">
            <label for="text" class="form__label">Subject tutors</label>
            <select class="select-css">
              <option v-for="tutor in this.subject.tutors" :key="tutor.id">{{ tutor.name }}</option>
            </select>
          </div>

          <div class="form__group ma-bt-md">
            <label for="text" class="form__label">All tutors</label>
            <select class="select-css" v-model="tutor">
              <option v-for="tutor in tutors" :key="tutor.id" :value="tutor._id">{{ tutor.name }}</option>
            </select>
          </div>
          <div class="form__group form__photo-upload">
            <input
              type="file"
              accept="image/*"
              @change="processFile($event)"
              id="photo"
              name="photo"
              class="form__upload"
            />
            <label for="photo">Choose image cover</label>
          </div>
          <div class="form__group">
            <button class="btn btn--teal" @click.prevent="updateSubject(subject.id)">Update</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import AdminService from "@/services/AdminService";
import Sidebar from "@/components/Account/Sidebar.vue";
import mongoose from "mongoose";

export default {
  name: "UpdateSubject",
  props: ["subject"],
  components: {Sidebar},
  data() {
    return {
      name: null,
      price: null,
      summary: null,
      description: null,
      photo: null,
      tutors: null,
      tutor: null
    };
  },
  methods: {
    processFile(event) {
      this.photo = event.target.files[0];
    },
    async updateSubject(id) {
      const data = new FormData();
      if (this.name) data.append("name", this.name);
      if (this.price) data.append("price", this.price);
      if (this.summary) data.append("summary", this.summary);
      if (this.description) data.append("description", this.description);
      if (this.photo) data.append("photo", this.photo);
      if (this.tutor) {
        data.append("tutors", this.tutor);
      }
      await AdminService.updateSubject(id, data);
      this.$router.go(-1)
    }
  },
  async mounted() {
    this.tutors = await AdminService.getTutors();
    if (!this.subject) {
      this.subject = await AdminService.getSubject(this.$route.params.id);
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