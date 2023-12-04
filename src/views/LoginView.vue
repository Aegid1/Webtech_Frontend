<template>
  <div id = "loader"></div>
  <div>
    <div class="secondDiv">
      <div @submit.prevent="login" >
        <h1>Login into your Home</h1>
        <div class="WrapperLoginForm">
          <div class="loginForm">
            <label for="exampleInputEmail1" class="Form-titles"><b><h2>Email Address</h2></b></label>
            <input type="email" class="InputFields" id="exampleInputEmail1" required aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="loginForm">
            <label for="exampleInputPassword1" class="Form-titles"><b><h2>Password</h2></b></label>
            <input type="password" class="InputFields" id="exampleInputPassword1">
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
            <button type="submit" class="LoginButton" @click="login()"><b>Login</b></button>
            <br>
            <br>
            <a @click="navigateToRegistrationView">need to sign up? <b>Register</b></a>
          </div>
        </div>
      </div>
      <!-- <DarkModeView :isDarkMode="isDarkMode" @toggleDarkMode="toggleDarkMode" -->
      <!-- <button @click="toggleDarkMode">Toggle Dark Mode</button> -->
    </div>
  </div>
</template> 

<script>
import jwt_decode from 'jwt-decode'
export default {
  name: 'LoginView',

  methods: {

    login () {
      event.preventDefault() // Verhindert das Standardverhalten des Formulars

      // Benutzerdaten aus den Eingabefeldern abrufen
      const email = document.getElementById('exampleInputEmail1').value
      const password = document.getElementById('exampleInputPassword1').value

      // Überprüfung, ob die Eingabefelder korrekt ausgefüllt sind
      if (email === '' || password === '') {
        alert('Bitte füllen Sie alle Felder aus')
        return
      }

      const loader = document.getElementById("loader");
      loader.classList.add('lds-dual-ring', 'background');

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
          // Beispiel: Weiterleitung zur Home-Ansicht, wenn der Login erfolgreich war
          if (data.token !== undefined) {
            this.convertTokenToId(data.token)
              .then(id => {

                loader.classList.remove('lds-dual-ring', 'background');
                this.navigateToHomeView(id)
              })
              .catch(error => {
                console.log('error', error)
              })
          } else {
            loader.classList.remove('lds-dual-ring', 'background');
            alert('Login fehlgeschlagen')
          }
        })
        .catch(error => {
          // Bei einem Fehler während der Anfrage oder Verarbeitung
          loader.classList.remove('lds-dual-ring', 'background');
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
        const email = decodedToken.sub
        const response = await this.getUserIdByEmail(email)

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

.lds-dual-ring {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: #000000;
}
.lds-dual-ring:after {
  content: " ";
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #000000;
  border-color: #918585 transparent #918585 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
  z-index: 1;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
  .background{
    position: fixed;
    background-color: #f8efef;
    opacity: 70%;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .secondDiv{
    /* background-color: #f8efef; */
    position: relative;
    z-index: 0;
    width: 60%;
    margin: 0 auto;
  }

  .WrapperLoginForm {
    position: relative;
    z-index: 0;
    background-color: #20c9c1;
    padding-top: 30px;
    border-radius: 30px 30px 30px 30px;
  }

  .form-text{
    z-index: 0;
    margin: 10px;
    text-align: left;
    text-align: left;
  }

  .form-check-input{
    background-color: #2c3e50;
  }

  .loginForm{
    z-index: 0;
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
