import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

const app = createApp(App)
app.use(router)
app.use(Vuex)

const store = new Vuex.Store({
  state: {
    darkMode: 'light'
  },
  mutations: {
    toggleDarkMode (state) {
      state.darkMode = state.darkMode === 'dark' ? 'light' : 'dark'
    }
  },
  getters: {
    darkMode (state) {
      return state.darkMode
    }
  }
})

app.provide('store', store)

app.mount('#app')
