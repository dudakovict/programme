<template>
<main class="main">
    <div class="user-view">
        <Sidebar class="col-sm-2 col-3"/>
        <div class="user-view__content col-sm-10 col-9">
            <div class="user-view__form-container col-sm-10 col-9">
                <h2 class="heading-secondary ma-bt-md">Manage users</h2>
                <h2 v-if="this.loaded && this.users.length==0" class="heading-secondary ma-bt-md d-block text-center" style="color:black;">There are no users to manage.</h2>    
                <div class="card-container">
                    <AdminUserCard v-for="user in users" :key="user.id" :user="user"/>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
import AdminUserCard from '@/components/Admin/Users/AdminUserCard.vue'
import AdminService from '@/services/AdminService'
import Sidebar from '@/components/Account/Sidebar.vue'

export default {
    name: 'ManageUsers',
    components: {
        AdminUserCard,
        Sidebar
    },
    data(){
        return{
            users: null,
            loaded: false,
        }
    },
    async mounted() {
        this.users = await AdminService.getUsers()
        this.loaded = true;
        console.log(this.users)
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