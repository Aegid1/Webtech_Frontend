<template>
  <div class="container">
    <div class="DivWrapper">
      <div class="firstDiv"></div>
      <div class="secondDiv">
        <form @submit.prevent="login">
          <h1>Login into your Home</h1>
          <div class="WrapperLoginForm">
            <div class="loginForm">
                  <div class="home__container.container.grid.section__border.">
                    <div class="home__data grid">
                      <h1 class="home-title">
                        Hi, I'm Aegid <br>
                      </h1>
                      <div class="home_blob grid">
                        <div clas="div.home_perfil">
                          <img src="assets/img/prefil.png" alt="home perfil">
                        </div>
                        <img src="assets/img/shape-wawes.svg" alt="" class="home__shape-wawes">
                        <img src="assets/img/shape-circle.svg" alt="" class="home__shape-circle">
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </form>
        <DarkModeView :isDarkMode="isDarkMode" @toggleDarkMode="toggleDarkMode" />
        <button @click="toggleDarkMode">Toggle Dark Mode</button>
      </div>
      <div class="thirdDiv"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView.vue'
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
  width: 100vh;
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
