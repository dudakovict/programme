<template>
<body v-if="subject">
<section class="section-header" style="max-height:300px;">
  <div class="header__hero">
    <div class="header__hero-overlay">&nbsp;</div>
    <img v-if="subject.photo" :src="'http://localhost:5000/api/subjects/files/' + subject.photo" :alt="subject.name" class="card__picture-img" />
    <img v-else :src="'http://localhost:5000/subjects/files/defaultSub.png'" :alt="subject.name" class="card__picture-img" />
    
  </div>
      <div class="heading-box">
        <h1 class="heading-primary">
          <span>{{subject.name}}</span>
        </h1>
      </div>
    </section>

    <section class="section-description">
      <div class="overview-box">
        <div>
          <div class="overview-box__group">
            <h2 class="heading-secondary ma-bt-lg">Tutors</h2>

            <div v-for="tutor in subject.tutors" :key="tutor.id" class="overview-box__detail">
              <img
                :src="'http://localhost:5000/api/users/files/' + tutor.photo"
                :alt="tutor.name"
                class="mr-4"
                style="max-height:200px;"
              />
              <div class="row">
                
                <h1 class="col-12"><b>{{ tutor.name }}</b></h1>
                <h2 class="col-12">
                  
                </h2>
                <h2 class="col-12">Zagreb, Croatia</h2>
                <h2 v-if="subject" class="col-12">
                  <span v-for="i in parseInt(subject.avgRatings)" :key="i" style="font-size:30px;">★</span>
                  <span v-for="i in 5-parseInt(subject.avgRatings)" :key="i" style="font-size:30px;">☆</span>
                </h2>
                <h2 v-if="tutor.role == 'admin'" class="col-12"><b>Premium member</b></h2>
              </div>
            </div>


          </div>
        </div>
      </div>

      <div class="description-box">
        <h1 class="heading-secondary ma-bt-lg">{{subject.name}} Overview</h1>
        <h2 class="" style="line-height: 1.6;">
          <!--{{subject.description}}-->
          Expand your knowledge by learning cutting edge {{subject.name}} technology
          in Zagreb, Croatia. If you're interested click the button below to purchase.  
        </h2>
        <button v-if="!hasPaid" class="btn btn--teal span-all-rows" @click="pay" style="margin-top:40px;">Buy now</button>
        <button v-else class="btn btn--teal span-all-rows" style="margin-top:40px;" disabled>Already purchased</button>
      </div>
    </section>

    <section class="section-reviews">
      <div class="reviews">
        <div v-for="review in subject.reviews" :key="review.id" class="reviews__card">
          <div class="reviews__avatar">
            <img 
              :src="'http://localhost:5000/api/users/files/' + review.user.photo"
              :alt="review.user.name"
              class="reviews__avatar-img"
            />
            <h6 class="reviews__user">{{ review.user.name }}</h6>
          </div>
          <p class="reviews__text">
            {{ review.review }}
          </p>
          <div class="reviews__rating">
            <p class="reviews__text">Rating: {{ review.rating }}/5</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-cta">
      <div class="container">
      <h1  class="heading-secondary ma-bt-lg" style="text-align:center; display:block;">Contact {{subject.tutors[0].name}}</h1>
        <form class="form form-user-data w-75 mx-auto">
          <div class="form__group">
              <label for="name" class="form__label">Your name</label>
              <input type="text" id="name" class="form__input" required>
          </div>
          <div class="form__group">
              <label for="email" class="form__label">Your email</label>
              <input type="email" id="email" class="form__input" required>
          </div>
          <div class="form__group">
              <label for="email" class="form__label">Your message</label>
              <textarea type="email" id="email" class="form__input"> </textarea>
          </div>
        <button class="btn btn--teal span-all-rows mx-auto d-block" style="margin-top:40px;">Send</button>
        </form>
      </div>
    </section>

    <section class="section-cta" v-if="hasPaid && !hasReviewed">
      <div class="cta">
        <div class="cta__content">
          <h2 class="heading-secondary">
            {{ subject.name }}
          </h2>
          <p class="cta__text">{{ subject.summary }}</p>
          <button class="btn btn--teal span-all-rows" @click.prevent="writeReview">Write review</button>
        </div>
      </div>
    </section>
    <section class="section-cta" v-if="hasPaid && hasReviewed">
      <div class="cta">
        <div class="cta__content">
          <h2 class="heading-secondary">
            {{ subject.name }}
          </h2>
          <p class="cta__text">{{ subject.summary }}</p>
          <button class="btn btn--teal span-all-rows" @click.prevent="manageReview">Manage my review</button>
        </div>
      </div>
    </section>
</body>
</template>

<script>
import SubjectService from '@/services/SubjectService'
import PaymentService from '@/services/PaymentService.js'
import UserService from '@/services/UserService.js'
import ReviewService from '@/services/ReviewService.js'
const stripe = Stripe('pk_test_hlKsLw8PxUEI29uCw2FZq6aS004iWmuHjQ')

export default {
    name: 'Subject',
    data(){
        return{
            subject: null,
            stack: null,
            hasPaid: null,
            hasReviewed: null,
        }
    },
    methods: {
      async pay() {
        if (this.$store.getters.isLoggedIn) {
        try {
          const session = await PaymentService.payment(this.subject._id)
          await stripe.redirectToCheckout({
            sessionId: session.data.session.id
          })
        } catch(err) {
          console.log(err, err.message)
        }
        } else this.$router.push({ name: 'Login' })
      },
      writeReview() {
        this.$router.push({ name: 'WriteReview', params: { slug: this.$route.params.slug }})
      },
      manageReview() {
        this.$router.push({ name: 'MyReviews', params: {id: this.$store.getters.getUser._id }})
      }
    },
    async mounted() {
      this.subject = await SubjectService.getBySlug(this.$route.params.slug)
      this.subject.reviews = this.subject.reviews.filter(el => el.user != null)
      this.stack = this.subject.summary.split(' ')
      let subjectOfInterest
      const paidSubjects = await UserService.mySubjects(this.$store.getters.getUser._id)
      paidSubjects.forEach(element => {
        if (element.slug === this.$route.params.slug) {
          subjectOfInterest = element
          this.hasPaid = true
        }
      })
      const myReviews = await UserService.myReviews(this.$store.getters.getUser._id)
      myReviews.forEach(element => {
        if (element.subject._id === subjectOfInterest._id) {
          this.hasReviewed = true
        }
      })
    }
}
</script>

<style lang="scss" scoped>
.heading-primary{
  width:100%;
}
@media screen and (max-width:992px){
  .section-description{
    display:block;
  }
}

@media screen and (max-width:576px){
  .heading-primary{
    font-size:40px;
  }
  .cta{
    padding: 9rem 3rem 9rem 3rem;
  }
}
</style>