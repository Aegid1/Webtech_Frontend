import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import ProfileView from '../views/ProfileView.vue'
import SettingsView from '../views/SettingsView.vue'
import DarkModeView from '../views/DarkModeView.vue'
import RegistrationQuestionView from '../views/RegistrationQuestionView.vue'

const routes = [
  {
    path: '/home/:id',
    name: 'home',
    component: HomeView,
    props: true
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView
  },
  {
    path: '/ProfileView/:id',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/SettingsView/:id',
    name: 'SettingsView',
    component: SettingsView
  },
  {
    path: '/DarkModeView',
    name: 'DarkModeView',
    component: DarkModeView
  },
  {
    path: '/RegistrationQuestion/:id',
    name: 'RegistrationQuestionView',
    component: RegistrationQuestionView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes
})

export default router
