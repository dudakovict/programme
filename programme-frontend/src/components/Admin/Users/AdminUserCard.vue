<template>
  <div v-if="user" class="card">
    <div class="card__header">
      <div class="card__picture">
        <div class="card__picture-overlay">&nbsp;</div>
        <img :src="'http://localhost:5000/api/users/files/' + user.photo" :alt="user.name" class="card__picture-img" />
      </div>

      <h3 class="heading-tertirary">
        <span>{{user.name}}</span>
      </h3>
    </div>

    <div class="card__details">
      <p class="card__text">Role: {{ user.role}}</p>
      <p class="card__text">Email: {{ user.email}}</p>
    </div>

    <div class="card__footer">
      <router-link :to="{ name: 'UpdateUser', params: { id: user._id, user: user }}" class="btn btn--teal btn--small">Update</router-link>
      <button class="btn btn--teal btn--small" @click.prevent="deleteUser(user._id)">Delete</button>
    </div>
  </div>
</template>

<script>
import AdminService from '@/services/AdminService'

export default {
    name: 'AdminUserCard',
    props: ['user'],
    data(){
        return{
          
        }
    },
    methods: {
        async deleteUser(id) {
            await AdminService.deleteUser(id)
            window.location.reload()
        }
    },
}
</script>