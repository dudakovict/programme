<template>
<main class="main">
  <div class="user-view">
    <Sidebar class="col-sm-2 col-3"/>
          
    <div class="reviews col-sm-10 col-9">
      <h2 v-if="this.loaded && this.reviews.length==0" class="heading-secondary ma-bt-md text-center" style="color:black;">You have left no reviews.</h2>
        <div v-for="review in reviews" :key="review.id" class="reviews__card">
          <div class="reviews__avatar">
            <img
              :src="'http://localhost:5000/api/users/files/' + user.photo"
              :alt="user.name"
              class="reviews__avatar-img"
            />
            <h6 class="reviews__user">{{ review.user.name }}</h6>
          </div>
          <p class="reviews__text">
            Course: {{ review.subject.name }}
          </p>
          <p class="reviews__text">
            Review: {{ review.review }}
          </p>
          <div class="reviews__rating">
            <p class="reviews__text">Rating: {{ review.rating }}/5</p>
          </div>
          <div class="card__footer">
            <router-link :to="{ name: 'UpdateMyReview', params: { id: review._id, review: review }}" class="btn btn--teal btn--small">Update</router-link>
            <button @click.prevent="deleteReview(review._id)" class="btn btn--teal btn--small">Delete</button>
        </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import UserService from '@/services/UserService'
import SubjectService from '@/services/SubjectService'
import ReviewService from '@/services/ReviewService'
import UpdateMyReview from '@/components/Account/UpdateMyReview.vue'
import Sidebar from '@/components/Account/Sidebar.vue'

export default {
  name: "MyReviews",
  components: {
    UpdateMyReview,
    Sidebar
  },
  data() {
      return {
          reviews: [],
          user: null,
          loaded: false,
      }
  },
  methods: {
    async deleteReview(id) {
      await ReviewService.deleteReview(id);
      window.location.reload();
    }
  },
  async mounted() {
      this.reviews = await UserService.myReviews()
      console.log(this.reviews)
      this.loaded = true;
  },
  created() {
    this.user = this.$store.getters.getUser;
  }
};
</script>

<style lang="scss" scoped>
.user-view{
  flex-wrap: nowrap;
}

.reviews{
  grid-column-gap: 1rem;
}
</style>