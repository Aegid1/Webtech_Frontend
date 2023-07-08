<template>
  <div class="DarkModeView" :class="mode">
    <HeaderView />
    <ContentView />
  </div>
</template>

<script>
import HeaderView from '@/components/HeaderView.vue'
import ContentView from '@/components/ContentView.vue'

export default {
  name: 'DarkModeView',
  computed: {
    mode () {
      return this.$store.getters.darkMode
    }
  },
  created () {
    window.addEventListener('keyup', this.keyPress)
  },
  methods: {
    keyPress (e) {
      if (e.key === 't') {
        this.$store.commit('toggleDarkMode')
      }
    }
  },
  components: {
    HeaderView,
    ContentView
  }
}
</script>
