<template>
  <div class="user-view">
    <Sidebar class="col-sm-2 col-3"/>
    <div class="reviews w-100">
      <h2 v-if="this.loaded && this.reviews.length==0" class="heading-secondary ma-bt-md d-block text-center" style="color:black;">There are no reviews for this subject.</h2>    
      <div v-for="review in reviews" :key="review.id" class="reviews__card">
        <div class="reviews__avatar">
          <img
            :src="'http://localhost:5000/api/users/files/' + review.user.photo"
            :alt="review.user.name"
            class="reviews__avatar-img"
          />
          <h6 class="reviews__user">{{ review.user.name }}</h6>
        </div>
        <p class="reviews__text">Course: {{ review.subject.name }}</p>
        <p class="reviews__text">Average course rating: {{ review.subject.avgRatings }}</p>
        <p class="reviews__text">Review: {{ review.review }}</p>
        <div class="reviews__rating">
          <p class="reviews__text">Rating: {{ review.rating }}/5</p>
        </div>
        <div class="card__footer">
          <button @click.prevent="deleteReview(review._id)" class="btn btn--teal btn--small">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminService from "@/services/AdminService";
import Sidebar from "@/components/Account/Sidebar";

export default {
  name: "ManageSubjects",
  components: {Sidebar},
  data() {
    return {
      reviews: null,
      loaded: false,
    };
  },
  methods: {
    async deleteReview(id) {
      console.log(id)
      await AdminService.deleteReview(id);
      window.location.reload();
    },
  },
  async mounted() {
    this.reviews = await AdminService.getSubjectReviews(this.$route.params.id);
    this.reviews = this.reviews.filter(el => el.user != null)
    this.loaded = true;
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