<template>
  <div v-if="subject" class="card">
    <div class="card__header">
      <div class="card__picture">
        <div class="card__picture-overlay">&nbsp;</div>
        <img v-if="subject.photo" :src="'http://localhost:5000/api/subjects/files/' + subject.photo" :alt="subject.name" class="card__picture-img" />
        <img v-else :src="'http://localhost:5000/api/subjects/files/defaultSub.png'" :alt="subject.name" class="card__picture-img" />
      </div>

      <h3 class="heading-tertirary">
        <span>{{subject.name}}</span>
      </h3>
    </div>

    <div class="card__details">
      <p v-for="s in this.stack" :key="s.id" class="card__text">{{s}}</p>
    </div>

    <div class="card__footer">
      <router-link :to="{ name: 'UpdateSubject', params: { id: subject._id, subject: subject }}" class="btn btn--teal btn--small">Update</router-link>
      <button class="btn btn--teal btn--small" @click.prevent="deleteSubject(subject.id)">Delete</button>
    </div>
  </div>
</template>

<script>
import AdminService from '@/services/AdminService'

export default {
    name: 'AdminSubjectCard',
    props: ['subject'],
    data(){
        return{
          stack: null
        }
    },
    methods: {
        async deleteSubject(id) {
            await AdminService.deleteSubject(id)
            window.location.reload()
        }
    },
    mounted() {
      this.stack = this.subject.summary.split(' ')
    }
}
</script>