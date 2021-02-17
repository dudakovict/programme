import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Auth/Login.vue'
import Signup from '../components/Auth/Signup.vue'
import Subject from '../components/Subject/Subject.vue'
import Account from '../components/Account/Account.vue'
import MyReviews from '../components/Account/MyReviews.vue'
import UpdateMyReview from '../components/Account/UpdateMyReview.vue'
import ManageSubjects from '../components/Admin/Subjects/ManageSubjects.vue'
import UpdateSubject from '../components/Admin/Subjects/UpdateSubject.vue'
import ManageUsers from '../components/Admin/Users/ManageUsers.vue'
import UpdateUser from '../components/Admin/Users/UpdateUser.vue'
import ManageReviews from '../components/Admin/Reviews/ManageReviews.vue'
import SubjectReviews from '../components/Admin/Reviews/SubjectReviews.vue'
import CreateSubject from '../components/Admin/Subjects/CreateSubject.vue'
import MySubjects from '../components/Account/MySubjects.vue'
import WriteReview from '../components/Subject/WriteReview.vue'
import Home from '../components/Home.vue'
import Error from '../components/Error.vue'
import store from '../store'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path:'/:slug',
    name: 'Subject',
    component: Subject,
  },
  {
    path: '/:slug/review',
    name: 'WriteReview',
    component: WriteReview,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/err',
    name: 'Error',
    component: Error,
    props: true
  },
  {
    path: '/account/:id',
    name: 'Account',
    component: Account,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reviews/:id',
    name: 'MyReviews',
    component: MyReviews,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reviews/update/:id',
    name: 'UpdateMyReview',
    component: UpdateMyReview,
    meta: {
      requiresAuth: true
    },
    props: true
  },
  {
    path: '/subjects/:id',
    name: 'MySubjects',
    component: MySubjects,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/subjects',
    name: 'ManageSubjects',
    component: ManageSubjects,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/subjects/create',
    name: 'CreateSubject',
    component: CreateSubject,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/subjects/:id',
    name: 'UpdateSubject',
    component: UpdateSubject,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/users',
    name: 'ManageUsers',
    component: ManageUsers,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/users/:id',
    name: 'UpdateUser',
    component: UpdateUser,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/subjects/reviews/:id',
    name: 'ManageReviews',
    component: ManageReviews,
    meta: {
      requiresAuth: true
    }
  },
  {
    path:'/admin/subjects/reviews',
    name: 'SubjectReviews',
    component: SubjectReviews,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
