<template>
  <div class="toggle-wrapper">
    <label class="toggle">
      <input
        type="checkbox"
        :checked="darkMode === 'dark'"
        @change="toggleDarkMode"
      />
      <span class="toggler round"></span>
    </label>
  </div>
</template>

<script>
import ContentView from '@/components/ContentView'
export default {
  computed: {
    darkMode () {
      return this.$store.getters.darkMode
    }
  },
  methods: {
    toggleDarkMode () {
      this.$store.commit('toggleDarkMode')
    }
  }
}
</script>
