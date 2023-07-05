<template>
  <div class="container">
    <div class="DivWrapper">
      <div class="firstDiv"></div>
      <div class="secondDiv">
        <form @submit.prevent="login">
          <h1>Login into your Home</h1>
          <div class="WrapperLoginForm">
            <div class="loginForm">
              <label for="exampleInputEmail1" class="Form-titles"><b><h2>Email Address</h2></b></label>
              <input type="email" class="InputFields" id="exampleInputEmail1" required aria-describedby="emailHelp">
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="loginForm">
              <label for="exampleInputPassword1" class="Form-titles"><b><h2>Password</h2></b></label>
              <input type="password" class="InputFields" id="exampleInputPassword1" required>
            </div>
            <div class="ForgotPassword">
              <a href="http://localhost:3000/login"><b>Passwort vergessen?</b></a>
              <br>
            </div>
            <div class="Checkbox">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">&nbsp; Check me out</label>
            </div>
            <div class="LoginButtonDiv">
              <button type="submit" class="LoginButton"><b>Login</b></button>
              <br>
              <br>
              <a @click="navigateToRegistrationView()">Noch keinen Account? <b>Registrieren</b></a>
            </div>
          </div>
        </form>
        <DarkModeView :isDarkMode="isDarkMode" @toggleDarkMode="toggleDarkMode" />
        <button @click="toggleDarkMode">Toggle Dark Mode</button> <!-- New button -->
      </div>
      <div class="thirdDiv"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data () {
    return {
      isDarkMode: false
    }
  },
  methods: {
    login (event) {
      event.preventDefault()
      // Restlicher Code für den Login
    },
    navigateToHomeView () {
      this.$router.push('/')
    },
    toggleDarkMode () {
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('darkMode', this.isDarkMode.toString())
      document.body.classList.toggle('dark-mode')
    },
    mounted () {
      const darkMode = localStorage.getItem('darkMode')
      if (darkMode === 'true') {
        this.isDarkMode = true
        document.body.classList.add('dark-mode')
      }
    }
  }
}
/*
lo
 */
</script>

<style scoped>
.standard-mode {
  background-color: white;
  color: black;
}
.dark-mode {
  background-color: #333333;
  color: #ffffff;
}
</style>
