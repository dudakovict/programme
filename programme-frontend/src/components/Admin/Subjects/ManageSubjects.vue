<template>
<main class="main">
    <div class="user-view">
        <Sidebar class="col-sm-2 col-3"/>
        <div class="user-view__content col-sm-10 col-9">
            <div class="user-view__form-container col-sm-10 col-9">
                <h2 class="heading-secondary ma-bt-md">Manage subjects</h2>
                <h2 v-if="this.loaded && this.subjects.length==0" class="heading-secondary ma-bt-md d-block text-center" style="color:black;">There are no subjects to manage.</h2>    
                <div class="card-container">
                    <AdminSubjectCard v-for="subject in subjects" :key="subject.id" :subject="subject"/>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
import AdminSubjectCard from '@/components/Admin/Subjects/AdminSubjectCard.vue'
import SubjectService from '@/services/SubjectService'
import Sidebar from '@/components/Account/Sidebar'

export default {
    name: 'ManageSubjects',
    components: {
        AdminSubjectCard,
        Sidebar
    },
    data(){
        return{
            subjects: null,
            loaded: false
        }
    },
    async mounted() {
        this.subjects = await SubjectService.getAllSubjects()
        this.loaded = true;
    }
}
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