<template>
  <div class="reviews__card">
    <div class="reviews__avatar">
      <img
        :src="'/img/users/' + review.user.photo"
        :alt="review.user.name"
        class="reviews__avatar-img"
      />
      <h6 class="reviews__user">{{ review.user.name }}</h6>
    </div>
    <p class="reviews__text">Course: {{ review.subject.name }}</p>
    <p class="reviews__text">Review: {{ review.review }}</p>
    <div class="reviews__rating">
      <p class="reviews__text">Rating: {{ review.rating }}/5</p>
    </div>
    <div class="card__footer">
      <button @click.prevent="deleteReview(review.id)" class="btn btn--teal btn--small">Delete</button>
    </div>
  </div>
</template>

<script>
import AdminService from "@/services/AdminService";

export default {
  name: "AdminReviewCard",
  props: ["review"],
  data() {
    return {};
  },
  methods: {
    async deleteReview(id) {
      await AdminService.deleteReview(id);
      window.location.reload();
    }
  },
  mounted() {
    console.log(this.review);
  }
};
</script>