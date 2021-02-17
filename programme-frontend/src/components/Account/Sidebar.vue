<template>
    <nav class="user-view__menu">
        <ul class="side-nav">
            <li v-bind:class="{'side-nav--active': this.$route.name == 'Account'}">
                <router-link :to="{name: 'Account', params: { id: this.$store.getters.getUser._id }}">
                    <span class="textLarge">Settings</span>
                    <span class="iconSmall"><i class="fas fa-cog"></i></span>
                </router-link>
            </li>
            <li v-bind:class="{'side-nav--active': this.$route.name == 'MySubjects'}">
                <router-link :to="{ name: 'MySubjects', params: { id: this.$store.getters.getUser._id }}">
                    <span class="textLarge">My subjects</span>
                    <span class="iconSmall"><i class="fas fa-shopping-basket"></i></span>
                </router-link>
            </li>
            <li v-bind:class="{'side-nav--active': this.$route.name == 'MyReviews'}">
                <router-link :to="{ name: 'MyReviews', params: { id: this.$store.getters.getUser._id }}">
                    <span class="textLarge">My reviews</span>
                    <span class="iconSmall"><i class="fas fa-comment-dots"></i></span>
                </router-link>
            </li>
            
        </ul>
        <div class="admin-nav" v-if="this.$store.getters.isAdmin">
            <h5 class="admin-nav__heading">Admin</h5>
            <ul class="side-nav">
                <li v-bind:class="{'side-nav--active': this.$route.name == 'CreateSubject'}">
                    <router-link :to="{ name: 'CreateSubject'}">
                        <span class="textLarge">Create subject</span>
                        <span class="iconSmall"><i class="fas fa-plus-square"></i></span>
                    </router-link>
                </li>
                <li v-bind:class="{'side-nav--active': this.$route.name == 'ManageSubjects'}">
                    <router-link :to="{ name: 'ManageSubjects' }">
                        <span class="textLarge">Manage subjects</span>
                        <span class="iconSmall"><i class="fas fa-pen-square"></i></span>
                    </router-link>
                </li>
                <li v-bind:class="{'side-nav--active': this.$route.name == 'ManageUsers'}">
                    <router-link :to="{ name: 'ManageUsers' }">
                        <span class="textLarge">Manage users</span>
                        <span class="iconSmall"><i class="fas fa-users"></i></span>
                    </router-link>
                </li>
                <li v-bind:class="{'side-nav--active': this.$route.name == 'SubjectReviews'}">
                    <router-link :to="{ name: 'SubjectReviews' }">
                        <span class="textLarge">Manage reviews</span>
                        <span class="iconSmall"><i class="fas fa-comments"></i></span>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    mounted(){
    }

}
</script>

<style lang="scss" scoped>
    .iconSmall{
        display:none;
    }
    
    @media screen and (max-width:1024px){
        .iconSmall{
            display:block;
            font-size:25px;
        }
        li a{
            display: block !important;
            text-align:center;
        }
        .textLarge{display:none;}
    }
    @media screen and (min-width:1024px){
        li a{
            display: flex;
        }
    }
</style>