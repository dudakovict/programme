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
      <router-link :to="{ name: 'Subject', params: { slug: subject.slug }}" class="btn btn--teal btn--small">Details</router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: 'MySubjectCard',
    props: ['subject'],
    data(){
        return{
          stack: null
        }
    },
    mounted() {
      this.stack = this.subject.summary.split(' ')
    }
}
</script>