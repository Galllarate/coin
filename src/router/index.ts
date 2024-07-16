import { createRouter, createWebHistory } from '@ionic/vue-router';
import {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoaded,
  RouteRecordRaw
} from 'vue-router';
import HomePage from '../views/HomePage.vue'
import AuthView from "@/views/AuthView.vue";
import RegisterVIew from "@/views/RegisterVIew.vue";
import {logInRequired} from "@/router/utils";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    async beforeEnter(to, from, next: NavigationGuardNext) {
      await logInRequired(next)
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterVIew
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
