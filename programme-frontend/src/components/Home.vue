<template>
<main class="container" style="margin-bottom:70px;">
    <h2 class="heading-secondary ma-bt-md text-center d-block" style="margin-top:50px; font-size:30px;">Top selling Courses</h2>
    <div class="card-container">
        <SubjectCard v-for="subject in subjects" :key="subject.id" :subject="subject"/>
    </div>
</main>
</template>

<script>
import SubjectCard from '@/components/Subject/SubjectCard.vue'
import SubjectService from '@/services/SubjectService'

export default {
    name: 'Home',
    components: {
        SubjectCard
    },
    data(){
        return{
            subjects: null
        }
    },
    async mounted() {
        this.subjects = await SubjectService.getAllSubjects()
    }
}
</script>