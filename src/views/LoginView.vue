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
              <a @click="navigateToRegistrationView">Noch keinen Account? <b>Registrieren</b></a>
            </div>
          </div>
        </form>
        <!-- <DarkModeView :isDarkMode="isDarkMode" @toggleDarkMode="toggleDarkMode" -->
        <!-- <button @click="toggleDarkMode">Toggle Dark Mode</button> -->
      </div>
      <div class="thirdDiv"></div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
export default {
  name: 'LoginView',

  methods: {
    login (event) {
      event.preventDefault() // Verhindert das Standardverhalten des Formulars

      // Benutzerdaten aus den Eingabefeldern abrufen
      const email = document.getElementById('exampleInputEmail1').value
      const password = document.getElementById('exampleInputPassword1').value

      // Überprüfung, ob die Eingabefelder korrekt ausgefüllt sind
      if (email === '' || password === '') {
        alert('Bitte füllen Sie alle Felder aus')
        return
      }

      // Benutzerdaten an das Backend senden
      const user = {
        email: email,
        password: password
      }

      fetch('http://localhost:8080/authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(data => {
          // Hier kannst du den Response vom Backend verarbeiten
          console.log(data)
          // Beispiel: Weiterleitung zur Home-Ansicht, wenn der Login erfolgreich war
          if (data.token !== undefined) {
            this.convertTokenToId(data.token)
              .then(id => {
                console.log(id)
                this.navigateToHomeView(id)
              })
              .catch(error => {
                console.log('error', error)
              })
          } else {
            alert('Login fehlgeschlagen')
          }
        })
        .catch(error => {
          // Bei einem Fehler während der Anfrage oder Verarbeitung
          console.error('Fehler:', error)
        })
    },

    data () {
      return {
        isDarkMode: false
      }
    },

    navigateToRegistrationView () {
      this.$router.push('/registration')
    },

    navigateToHomeView (id) {
      this.$router.push({ name: 'home', params: { id } })
    },

    async convertTokenToId (token) {
      try {
        const decodedToken = jwt_decode(token)
        console.log(decodedToken)
        const email = decodedToken.sub
        const response = await this.getUserIdByEmail(email)
        console.log(response)
        console.log(response.Id)
        return response.Id
      } catch (error) {
        console.log('Error', error)
      }
    },

    getUserIdByEmail (email) {
      const endpoint = 'http://localhost:8080/userEmail/' + email
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }

      return fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => {
          console.log('the email doesnt exist', error)
          alert('the email doesnt exist')
        }
        )
    },

    toggleDarkMode () {
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('darkMode', this.isDarkMode.toString())
      document.body.classList.toggle('dark-mode')
    }

  },
  mounted () {
    const darkMode = localStorage.getItem('darkMode')
    if (darkMode === 'true') {
      this.isDarkMode = true
      document.body.classList.add('dark-mode')
    }
  }
}

</script>

  <style scoped>

  .firstDiv {
    height: 100vh;
    width: 15%;
    z-index: 0;
    border-radius: 0px 30px 0px 0px;
    background-color: #20c9c1;
    float: left;
  }

  .secondDiv{
    width: 60%;
    height: 0px;
    z-index: 0;
    margin: 0 auto;
  }

  .thirdDiv{
    width: 15%;
    height: 100vh;
    z-index: 0;
    border-radius: 30px 0px 0px 0px;
    background-color: #20c9c1;
    float: right;
  }

  .WrapperLoginForm {
    background-color: #20c9c1;
    padding-top: 30px;
    border-radius: 30px 30px 30px 30px;
  }

  .form-text{
    margin: 10px;
    text-align: left;
    text-align: left;
  }

  .form-check-input{
    background-color: #2c3e50;
  }

  .loginForm{
    text-align: left;
    padding-left: 20px;
  }

  .form-check-input{
    margin: auto;
  }
  .LoginButton{
    background-color: White;
    max-width: 350px;
    margin-top: 10px;
    padding: 15px;
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 15px 15px 15px 15px;
  }

  .InputFields{
    padding: 1vh;
  }

  .InputFields{
    width: 90%;
    background-color: white;
    display: inline-block;
  }

  .ForgotPassword{
    padding-top: 10px;
    text-align: left;
    padding-left: 20px;
  }
  .Checkbox{
    text-align: left;
    padding-top: 3px;
    padding-left: 20px;
  }
  .LoginButtonDiv{
    text-align: left;
    padding-left: 20px;
    padding-bottom: 30px;
  }
  </style>
