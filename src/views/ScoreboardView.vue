<!-- eslint-disable no-template-curly-in-string -->
<template>
    <div>
      <h1 class = "title"> Scoreboard </h1>
      <div class = "layout">
      <div class = ""> </div>
      <div>
        <br>
        <b> Sort </b>
        <i class = "eddit-button eddit-button i sort_button" @click = "sort"></i>
        <br>
        <br>
      </div>
      <table v-if="group.length > 0" id='group'>
        <!-- Diese Zeile geht durch alle To-do's durch -->
        <tr v-for="user in group" :key ="user.id">
          <td class = ""> <b> {{ user.firstname ? user.firstname : ' ' }} </b> </td>
          <td> <b> {{ user.score ? user.score : ' ' }} </b> </td>
          <td :style="{ width: ((user.score/totalScore)*100) + '%' }" class = "BAR"> . </td>
        </tr>
      </table>
      <table v-else id='group' class="">
        <tr class = "SCORES">
          <td class = "score_name"> <b> User </b> </td>
          <td> <b> 2 </b> </td>
          <td class = "BAR_BACK">
            <div :style="{ width: ((8/totalScore)*100) + '%'}"  class = "BAR">. </div>
          </td>
        </tr>
        <tr class = "SCORES">
          <td class = "score_name"> <b> Ägidius </b> </td>
          <td> <b> 8 </b>  </td>
          <td class = "BAR_BACK">
            <div :style="{ width: ((2/totalScore)*100) + '%'}" class = "BAR">. </div>
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

  data () {
    return {
      group: [],
      firstname: '',
      userScore: '',
      totalScore: 0

    }
  },

  methods: {

    async loadScores (userId) {
      if (userId === undefined) {
        userId = this.$route.params.id
      }
      console.log(userId)
      const endpoint = 'http://localhost:8080/getGroup/' + userId
      const requestOptions = {
        method: 'GET',
        headers: {
          Origin: 'https://aegid1.github.io'
        },
        redirect: 'follow'
      }

      try {
        const response = await fetch(endpoint, requestOptions)
        const result = await response.json()
        this.group = result
        this.totalScore = this.calculateTotalScore(this.group)
        console.log(this.totalScore)
        this.$forceUpdate()
      } catch (error) {
        console.log('error', error)
      }
    },

    calculateTotalScore (group) {
      group.forEach((user) => {
        this.totalScore = this.totalScore + user.score
      }
      )
      return this.totalScore
    },

    sort () {
      this.group.sort((a, b) => b.score - a.score)
      this.$forceUpdate()
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

.sort_button{
  margin-left: 85%;
}

.score_name{
  text-align: left;
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

.edit-button {
  display: flex;
  align-items: center;
  padding: 5px;
  color: rgb(0, 0, 0);
  cursor: pointer;
  z-index: 1;
}

.settings-button i,
.logout-button i,
.profile-button i,
.edit-button i {
  margin-right: 10%;
  z-index: 1;
}

</style>
