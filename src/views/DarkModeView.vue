<template>
  <div class="container">
    <div class="DivWrapper">
      <!-- ... Restlicher Code ... -->
      <form @submit.prevent="login">
        <!-- ... Restlicher Code ... -->
      </form>
      <DarkModeView :isDarkMode="isDarkMode" @toggleDarkMode="toggleDarkMode" />
    </div>
  </div>
</template>

<script>
import DarkModeView from './DarkModeView.vue'
export default {
  name: 'LoginView',
  components: {
    DarkModeView
  },
  data () {
    return {
      isDarkMode: false
    }
  },
  methods: {
    // ... Restlicher Code ...
  }
}
</script>

<style scoped>
/* ... Restlicher Code ... */
</style>
