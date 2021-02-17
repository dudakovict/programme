<template>
    <main class="main">
        <div class="user-view">
        <Sidebar class="col-sm-2 col-3"/>
   
        <div class="login-form w-50 mx-auto" style="max-width: none; box-shadow: none;">
            <h2 class="heading-secondary ma-bt-lg">Update review</h2>
            <form action="" class="form form--login">
                <div class="form__group">
                    <label for="text" class="form__label">Review</label>
                    <input type="text" id="email" class="form__input" v-model="newReview" :placeholder="review.review" required>
                </div>
                <div class="form__group ma-bt-md">
                    <label for="text" class="form__label">Rating</label>
                    <input type="number" id="password" class="form__input" v-model="rating" :placeholder="review.rating" min="1" max="5" required>
                </div>
                <div class="form__group">
                    <button class="btn btn--teal" @click.prevent="updateReview(review._id)">Update</button>
                </div>
            </form>
        </div>
        </div>
    </main>
</template>

<script>
import ReviewService from '@/services/ReviewService'
import Sidebar from '@/components/Account/Sidebar';

export default {
  name: 'UpdateMyReview',
  props: ['review'],
  components: {Sidebar},
  data() {
      return {
          id: null,
          newReview: null,
          rating: null
      }
  },
  methods: {
      async updateReview(id) {
          const data = {
              review: !this.newReview ? this.review.review : this.newReview,
              rating: !this.rating ? this.review.rating : this.rating
          }
          console.log(data)
          const updatedReview = await ReviewService.updateReview(id, data)
          if (updatedReview) this.$router.go(-1)
      }
  },
  async mounted() {
      if (!this.review) {
          this.review = await ReviewService.getReview(this.$route.params.id)
          console.log(this.review)
      }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width:992px){
  .login-form{
    width:75% !important;
  }
}

</style>