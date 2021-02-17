<template>
  <main class="main">
    <div class="user-view">
     <Sidebar class="col-sm-2 col-3"/>
      <div class="user-view__content col-sm-10 col-9">
        <div class="user-view__form-container col-sm-10 col-9">
          <h2 class="heading-secondary ma-bt-md">My subjects</h2>

          <h2 v-if="this.loaded && this.subjects.length==0" class="heading-secondary ma-bt-md d-block text-center" style="color:black;">You haven't bought any subjects.</h2>
          
          <div class="card-container">
              <MySubjectCard v-for="subject in subjects" :key="subject.id" :subject="subject"/>
          </div>
        </div>
      </div>
    </div>
    <div v-if="subjects.length < 1" class="alert-c">
      <p>
        <strong>You haven't bought any courses yet. Get to learning!</strong>
      </p>
    </div>
</main>
</template>

<script>
import UserService from "@/services/UserService";
import SubjectService from "@/services/SubjectService";
import MySubjectCard from "@/components/Account/MySubjectCard.vue"
import Sidebar from '@/components/Account/Sidebar.vue'

export default {
  name: "MySubjects",
  components: {
      MySubjectCard,
      Sidebar
  },
  data() {
    return {
        subjects: null,
        loaded: false
    };
  },
  methods: {},
  async created() {
      this.subjects = await UserService.mySubjects(this.$store.getters.getUser._id)
      this.loaded = true;
  }
};
</script>

<style lang="scss" scoped>

.user-view{
  flex-wrap: nowrap;
}

.user-view__form-container{
  max-width:unset !important;
}

.card-container{  
  max-width:unset !important;
}

@media screen and (max-width: 576px){
  .user-view__form-container{
    padding: unset;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .heading-secondary{
    display:block;
    text-align:center;
  }
}
</style>