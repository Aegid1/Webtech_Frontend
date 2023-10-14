<template>
        <div class="secondDiv">
          <form>
            <h1>Register To Manage Your Shared Flat</h1>
            <div class ="WrapperLoginForm">
              <div class="loginForm">
                <label for="exampleFirstname" class="Form-titles"><b><h2>Firstname</h2></b></label>
                <input type="text" class="InputFields" id="examplefirstName" required aria-describedby="emailHelp">
                <label for="exampleLastname" class="Form-titles"><b><h2>Lastname</h2></b></label>
                <input type="String" class="InputFields" id="exampleLastname" required aria-describedby="emailHelp">
              </div>
              <div class="loginForm">
                <label for="exampleInputEmail1" class="Form-titles"><b><h2>Email Address</h2></b></label>
                <input type="email" class="InputFields" id="exampleInputEmail1" required aria-describedby="emailHelp">
                <label for="exampleInputEmail1" class="Form-titles"><b><h2>Confirm Email Address</h2></b></label>
                <input type="email" class="InputFields" id="confirmEmail" required aria-describedby="emailHelp">
              </div>
              <div class="loginForm">
                <label for="exampleInputPassword1" class="Form-titles"><b><h2>Password</h2></b></label>
                <input type="password" class="InputFields" id="exampleInputPassword1" minlength="8" required>
                <label for="exampleInputPassword1" class="Form-titles"><b><h2>Confirm Password</h2></b></label>
                <input type="password" class="InputFields" id="confirmPassword" required>
              </div>
              <div class=Checkbox>
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">&nbsp; Check me out</label></div>
              <div class = LoginButtonDiv>
                <button type="submit" class="LoginButton" @click="addUser"><b>Register</b></button>
                <br>
                <br>
                <a @click="navigateToRegistrationQuestions()">Already signed up? <b>Login </b></a>
              </div>
            </div>
          </form>
        </div>
  </template>

<script>
export default {
  name: 'RegistrationView',

  data() {
    return{
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      firstname: '',
      lastname: ''

    }
  },

  methods: {

    navigateToRegistrationQuestions (email) {
      const id = getUserIdByEmail(email);
      this.$router.push({ name: 'RegistrationQuestionView', params: { id } })
    },

    navigateToLogin(){
      this.$router.push('/');
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

    addUser () {
    // Benutzerdaten aus den Eingabefeldern abrufen
      this.email = document.getElementById('exampleInputEmail1').value
      this.confirmEmail = document.getElementById('confirmEmail').value
      this.password = document.getElementById('exampleInputPassword1').value
      this.confirmPassword = document.getElementById('confirmPassword').value
      this.firstname = document.getElementById('examplefirstName').value
      this.lastname = document.getElementById('exampleLastname').value
      // Überprüfung, ob die Eingabefelder korrekt ausgefüllt sind
      if (this.email === '' || this.confirmEmail === '' || this.password === '' || this.confirmPassword === '') {
        alert('Please fill all fields')
        return
      }

      if (this.email !== this.confirmEmail) {
        alert('The email addresses do not match')
        return
      }

      if (this.password !== this.confirmPassword) {
        alert('The passwords do not match')
        return
      }

      const user = {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
      }

      const userData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }

      fetch('http://localhost:8080/register', userData)
        .then(response => response.json())
        .then(response => {
          if (response.ok) {
            // Die Benutzerregistrierung war erfolgreich
            // Führe hier weitere Aktionen aus oder zeige eine Bestätigungsnachricht an
            console.log('Benutzer wurde erfolgreich erstellt')
            this.navigateToRegistrationQuestions()
          } else {
            // Die Benutzerregistrierung ist fehlgeschlagen
            // Zeige eine Fehlermeldung an oder führe entsprechende Aktionen aus
            console.log('Fehler bei der Benutzererstellung')
          }
        })
        .catch(error => {
          console.error('Fehler:', error)
        })
        // Hier kannst du den Code hinzufügen, um den Benutzer zu speichern oder weiterzuverarbeiten
      console.log('Neuer Benutzer:', user)
    }
  }
}
</script>

<style scoped>

  .secondDiv{
    width: 60%;
    height: 0px;
    z-index: 0;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  .thirdDiv{
    width: 15%;
    height: 130vh;
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

  .InputFields {
    width: 90%;
    padding: 1vh;
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
