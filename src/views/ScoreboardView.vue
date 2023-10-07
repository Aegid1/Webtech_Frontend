<template>
    <div>
      <h1 class = "title"> Scoreboard </h1>
      <div class = "layout">
      <div class = ""> </div>
      <div>
        <br>
        <div class = "sort-button sort-button:hover" @click = "sort(group)"> <b> Sort </b> </div>
        <i class = "eddit-button eddit-button i sort_button"></i>
        <br>
        <br>
      </div>
      <table v-if="sorted === false && group.length > 0 && this.totalScore !== null" id='group' class = "table">
        <tr v-for="user in group" :key ="user.id">
          <td class = ""> <b> {{ user.firstname ? user.firstname : ' ' }} </b> </td>
          <td> <b> {{ user.score ? user.score : ' ' }} </b> </td>
          <td>
            <div :style="{ width: (((user.score/this.totalScore)*5000) + '%') }" class = "BAR"> . </div>
          </td>
        </tr>
      </table>
      <table v-else-if="sorted === true && group.length > 0 && this.totalScore !== null" id='sortedgroup' class="table">
        <tr v-for="user in sortedGroup" :key ="user.id">
          <td class = ""> <b> {{ user.firstname ? user.firstname : ' ' }} </b> </td>
          <td> <b> {{ user.score ? user.score : ' ' }} </b> </td>
          <td>
            <div :style="{ width: (((user.score/this.totalScore)*5000) + '%') }" class = "BAR"> . </div>
          </td>
        </tr>
      </table>
      <table v-else class="table">
        <tr class = "SCORES">
          <td class = "score_name"> <b> User </b> </td>
          <td> <b> 2 </b> </td>
          <td class = "BAR_BACK">
            <div :style="{ width: ((8/this.totalScore)*5000) + '%'}"  class = "BAR">. </div>
          </td>
        </tr>
        <tr class = "SCORES">
          <td class = "score_name"> <b> Ägidius </b> </td>
          <td> <b> 8 </b>  </td>
          <td class = "BAR_BACK">
            <div :style="{ width: ((2/this.totalScore)*5000) + '%'}" class = "BAR">. </div>
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
      totalScore: null,
      sorted: false,
      sortedGroup: []

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
      } catch (error) {
        console.log('error', error)
      }
    },

    calculateTotalScore (group) {
      let total = 0
      group.forEach((user) => {
        total = total + user.score
      }
      )
      return total
    },

    sortByScoreDescending (array) {
      return array.sort((a, b) => b.score - a.score)
    },

    sort (group) {
      this.sorted = true
      console.log(group)
      this.sortedGroup = this.sortByScoreDescending(group)
      console.log(this.sortedGroup)
    }
  },
  mounted () {
    const userId = this.$route.params.id
    this.loadScores(userId)
  }

}
</script>

<style>

.table {
  margin-left: 5%;
}
.sort-button {
  display: inline-block;
  padding: 5px 10px;
  background-color: #e7dcdc;
  color: #0a0a0a;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 5%;
}

.sort-button:hover {
  background-color: #ffffff;
}

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
