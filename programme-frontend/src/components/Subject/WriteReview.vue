<template>
    <main class="main">
        <div class="login-form">
            <h2 class="heading-secondary ma-bt-lg">Write review</h2>
            <form action="" class="form form--login">
                <div class="form__group">
                    <label for="text" class="form__label">Review</label>
                    <input type="text" id="email" class="form__input" v-model="review" placeholder="review" required>
                </div>
                <div class="form__group ma-bt-md">
                    <label for="number" class="form__label">Grade</label>
                    <input type="number" id="password" class="form__input" v-model="rating" placeholder="5" min="1" max="5" required>
                </div>
                <div class="form__group">
                    <button class="btn btn--teal" @click.prevent="writeReview">Post</button>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import SubjectService from '@/services/SubjectService.js'
import ReviewService from '@/services/ReviewService.js'

export default {
    name: 'WriteReview',
    data(){
        return{
            review: null,
            rating: null,
        }
    },
    methods: {
        async writeReview() {
            if (!this.review || !this.rating) {
                console.log('err')
            } else {
                const reviewSubject = await SubjectService.getBySlug(this.$route.params.slug)
                const data = {
                    review: this.review,
                    rating: this.rating,
                    user: this.$store.getters.getUser._id,
                    subject: reviewSubject._id
                }
                const review = await ReviewService.postReview(data)
                console.log(review)
                this.$router.go(-1)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login-form{
    margin-top:40px;
}
</style>