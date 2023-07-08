<template>
  <div class="DarkModeView" :class="mode">
  </div>
</template>

<script>
export default {
  name: 'DarkModeView',
  data () {
    return {
      mode: 'dark'
    }
  },
  components: {
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.DarkModeView {
  width: 100vw;
  min-height: 100vh;
  background: #F3F3F3;
  color: #15202B;
}

.dark {
  background: #192734;
  color: #F3F3F3;
}
</style>
