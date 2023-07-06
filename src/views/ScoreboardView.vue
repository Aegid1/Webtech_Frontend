<!-- eslint-disable no-template-curly-in-string -->
<template>
  <head>
    <link rel= "stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
  </head>

    <div>
      <h1 class = "title"> Scoreboard </h1>
      <div class = "layout">
      <div class = ""> </div>
      <table v-if="group && group.length > 0" id='group'>
        <!-- Diese Zeile geht durch alle To-do's durch -->
        <tr v-for="user in group" :key ="user.id">
          <td> <b> {{ user.firstname ? user.firstname : ' ' }} </b> </td>
          <td> <b> {{ user.score ? user.score : ' ' }} </b> </td>
          <td :style="{ width: calculateBarWidth(user.score) }" class = "BAR">. </td>
        </tr>
      </table>
      <table v-else id='group' class="">
        <tr class = "SCORES">
          <td> <b> User </b> </td>
          <td> <b> 5 </b> </td>
          <td class = "BAR_BACK">
            <div :style="{ width: calculateBarWidth(8) }"  class = "BAR">. </div>
          </td>
        </tr>
        <tr class = "SCORES">
          <td> <b> Ägidius </b> </td>
          <td> <b> 3 </b>  </td>
          <td class = "BAR_BACK">
            <div :style="{ width: calculateBarWidth(2) }" class = "BAR">. </div>
          </td>
        </tr>
      </table>
      </div>
    </div>

</template>

<script>
// @ is an alias to /src
export default {
  name: 'ScoreboardView',
  components: {},

  // nicht sicher ob todoList hier eine Liste oder nicht ein Objekt ist
  data () {
    return {
      group: [],
      firstname: '',
      userScore: '',
      totalScore: 0

    }
  },

  methods: {

    loadScores (userId) {
      const endpoint = 'http://localhost:8080/getGroup/' + userId
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }

      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => { this.group = result })
        .catch(error => console.log('scores cant be loaded', error))
    },
    calculateTotalScore () {
      this.totalScore = 0

      for (let i = 0; i < this.group.length; i++) {
        const user = this.group[i]
        this.totalScore += user.score
      }
    },
    calculateBarWidth (score) {
      const percentage = (score / this.calculateTotalScore()) * 100
      return `${(percentage)}%`
    }

  },
  mounted () {
    const userId = this.$route.params.id
    this.loadScores(userId)
  }

}
</script>

<style>

.title {
margin-top: 5vh;
}

.layout{
background-color: #f8efef;
margin-left: 2.5vh;
width: 90%;
height: 83%;
z-index: 10;
border-radius: 30px 30px 30px 30px;
box-shadow: 15px -2px 50px #00000022;
}

.SCORES{
margin-top: 20vh;
margin-left: 5vh;
}

.BAR{
width: 50%;
height: 100%;
background-color: #20c9c1;
border-radius: 30px 30px 30px 30px;
z-index: 1;
}

.BAR_BACK{
width: 70%;
background-color: #f8efef;
border-radius: 30px 30px 30px 30px;
z-index: 0;
}

</style>
