<template>
    <div class="container">
      <div class="DivWrapper">
        <div class="firstDiv"></div>
        <div class="secondDiv">
          <form>
            <h1>Register To Manage Your Shared Flat</h1>
            <div class ="WrapperLoginForm">
              <div class="loginForm">
                <label for="exampleFirstname" class="Form-titles"><b><h2>Firstname</h2></b></label>
                <input type="" class="InputFields" id="examplefirstName" required aria-describedby="emailHelp">
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
                <input type="password" class="InputFields" id="exampleInputPassword1" required>
                <label for="exampleInputPassword1" class="Form-titles"><b><h2>Confirm Password</h2></b></label>
                <input type="password" class="InputFields" id="confirmPassword" required>
              </div>
              <div class="ForgotPassword">
                <a href="http://localhost:3000/login"><b>Forgot your password?</b></a>
                <br>
              </div>
              <div class=Checkbox>
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">&nbsp; Check me out</label></div>
              <div class = LoginButtonDiv>
                <button type="submit" class="LoginButton" @click="addUser"><b>Register</b></button>
                <br>
                <br>
                <a @click="navigateToLoginView()">Already having an account? <b>to the login </b></a>
              </div>
            </div>
          </form>
        </div>
        <div class="thirdDiv"></div>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'RegistrationView',

  methods: {

    navigateToLoginView () {
      this.$router.push('/')
    },

    addUser () {
    // Benutzerdaten aus den Eingabefeldern abrufen
      const email = document.getElementById('exampleInputEmail1').value
      const confirmEmail = document.getElementById('confirmEmail').value
      const password = document.getElementById('exampleInputPassword1').value
      const confirmPassword = document.getElementById('confirmPassword').value
      const firstname = document.getElementById('examplefirstName').value
      const lastname = document.getElementById('exampleLastname').value
      // Überprüfung, ob die Eingabefelder korrekt ausgefüllt sind
      if (email === '' || confirmEmail === '' || password === '' || confirmPassword === '') {
        alert('Please fill all fields')
        return
      }

      if (email !== confirmEmail) {
        alert('The email addresses do not match')
        return
      }

      if (password !== confirmPassword) {
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
            this.navigateToLoginView()
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
  .firstDiv {
    height: 130vh;
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
