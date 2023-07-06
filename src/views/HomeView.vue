<!-- eslint-disable no-template-curly-in-string -->
<template>
  <head>
    <link rel= "stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
  </head>
  <div class="background">
    <div class="left-side">
      <div class="left-side-container">
        <div>
          <div class = "profile-picture">
            <div class = "circle button">
              <i class="fa fa-upload fa-2x"></i>
            </div>
          </div>

          <div class="profile-button button button::before button:hover::before button:hover button:active">
            <i class="fa fa-user icons-left-side"></i>
            Profile
          </div>
        </div>
        <div>

          <div class="settings-button button button::before button:hover::before button:hover button:active">
            <i class="fa fa-cog icons-left-side"></i>
            Settings
          </div>

          <div class="logout-button button button::before button:hover::before button:hover button:active" @click="navigateToLogin()">
            <i class="gg-log-out icons-left-side" style="margin-right: 18%;"></i>
            Logout
          </div>
        </div>
      </div>
    </div>
    <div class="main-part">
      <div class = "to-do-header">
        <span>
          <h1>TO DO's </h1>
        </span>
      </div>
      <div class = to-do-body>
        <table v-if="todolist && todolist.length > 0" id='todoTable'>
          <!-- Diese Zeile geht durch alle To-do's durch -->
          <tr v-for="todo in todolist" :key ="todo.id" class = TODOS>
            <td class = "TODO_name"> {{ todo.name ? todo.name : ' ' }} </td>
            <td class = "TODO_deadline"> {{ todo.date ? todo.date : ' ' }} </td>
            <td> <i class="fas fa-edit fa-lg edit-button edit-button i"></i> </td>
            <td> <i class="fas fa-trash fa-lg edit-button edit-button i" id="'deleteTodo-' + todo.id" @click="deleteTodo(todo.id)"></i> </td>
            <td> <i class="fa fa-check-circle fa-lg edit-button edit-button i"></i> </td>
          </tr>
        </table>
        <table v-else id='todoTable'>
          <tr class = "TODOS">
            <td class= "TODO_name"> </td>
            <td class= "TODO_date"> </td>
          </tr>
        </table>
        <div class = TODO_input>
          <input v-model="todoName" type = "text" class = "input" placeholder="To-do">
          <input v-model="todoDate" class = "input" placeholder="Date">
          <i class="fa fa-plus fa-lg edit-button edit-button i todo_add_button" @click = "addTask"></i>
        </div>
      </div>
    </div>
    <div class="right-side">
      <ScoreboardView>

      </ScoreboardView>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ScoreboardView from './ScoreboardView.vue'
export default {
  name: 'HomeView',
  components: { ScoreboardView },
  props: ['id'],
  // nicht sicher ob todoList hier eine Liste oder nicht ein Objekt ist
  data () {
    return {
      todolist: [],
      todoName: '',
      todoDate: ''

    }
  },

  methods: {

    navigateToLogin () {
      this.$router.push('/')
    },

    addTask () {
      const data = {
        todoName: this.todoName,
        todoDeadline: this.todoDate
      }

      const task = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }

      fetch('http://localhost:8080/add', task)
        .then(response => response.json())
        .then(data => {
          const todoTable = document.getElementById('todoTable')
          // creates new elements in html that are then showed on website
          const tr = document.createElement('tr')
          const tdName = document.createElement('td')
          const tdDate = document.createElement('td')
          const editIcon = document.createElement('i')
          const trashIcon = document.createElement('i')
          const checkIcon = document.createElement('i')
          // defines the css classes for the created elements
          tr.classList.add('TODO')
          tdName.classList.add('TODO_name')
          tdDate.classList.add('TODO_deadline')
          editIcon.classList.add('fas', 'fa-edit', 'fa-lg', 'edit-button', 'i')
          trashIcon.classList.add('fas', 'fa-trash', 'fa-lg', 'edit-button', 'i')
          checkIcon.classList.add('fa', 'fa-check-circle', 'fa-lg', 'edit-button', 'i')
          // adds the created elements to the tr element
          tr.appendChild(tdName)
          tr.appendChild(tdDate)
          tr.appendChild(editIcon)
          tr.appendChild(trashIcon)
          tr.appendChild(checkIcon)
          // adds the tr element to the todoTable
          todoTable.appendChild(tr)
        }
        ).catch(error => {
        // Behandle Fehler
          console.log(error)
        })
    },
    loadTasks (todolistid) {
      const endpoint = 'http://localhost:8080/alltodos/' + todolistid
      const requestOptions = {
        method: 'GET',
        headers: {
          Origin: 'https://aegid1.github.io'
        },
        redirect: 'follow'
      }

      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => { this.todolist = result })
        .catch(error => console.log('todos cant be loaded', error))
    },

    // deletes a todoitem based on the todoid
    deleteTodo (todoId) {
      // sucht den index des todos raus, das deleted werden soll
      const index = this.todolist.findIndex(todo => todo.id === todoId)

      // wenn todo gefunden gibt es den index zurück, falls kein todo gefunden wird -1 returned und es geht nicht in if case rein
      if (index !== -1) {
        this.todolist.splice(index, 1)
      }
      const endpoint = 'http://localhost:8080/delete/' + todoId
      const requestOptions = {
        method: 'DELETE',
        headers: {
          Origin: 'https://aegid1.github.io'
        },
        redirect: 'follow'
      }

      fetch(endpoint, requestOptions)
        .then(response => {
          if (!response.ok) { console.log('Todo deletion failed') }
        })
        .catch(error => {
          console.log('Todo deletion failed', error)
        })
    }
  },
  mounted () {
    const todolistId = this.$route.params.id
    this.loadTasks(todolistId)
  }

}
</script>

<style>
.ul li{
  list-style: none;
  font-size: 17px;
  padding: 12px 8px 12px 50px;
  user-select: none;
  cursor: pointer;
}
h1{
  font-size: 4.5vh;
}
body {
  margin: 0;
  padding: 0;
  position: relative;
}
.TODOS {
  display: grid;
  margin-top: 1%;
  margin-left: 1%;
  grid-template-columns: 16.3fr 9.5fr 0.10fr 0.10fr 0.10fr;
  padding: 1%;
  grid-gap: 1%;
}
.TODO_input{
  display: grid;
  margin-top: 3%;
  margin-left: 1%;
  grid-template-columns: 5fr 3fr 0.20fr 0.20fr 0.20fr;
  padding: 1%;
  grid-gap: 1%;

}
.TODO_name{
  font-weight: bold;
  font-size: 125%;
  text-align: left;
  color: rgb(0, 0, 0);

}

.TODO_date{
  text-align: left;
  margin-left: 5%;
  font-weight: bold;
  font-size: 125%;
  color: rgb(0, 0, 0);

}

.input{
  /* border-bottom: 2px solid rgb(67, 65, 65); */
  background-color: #00000000;
  padding: 2.5%;
  border-radius:10px;
  box-shadow:0 0 15px 0px rgba(0,0,0,0.06);
}
.background {
  position: absolute;
  background-color: #f8efef;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.left-side {
  display: grid;
  grid-template-rows: 2ch auto minmax(10px, 60px);
  grid-gap: 20px;
  background-color: #20c9c1;
  width: 10%;
  height: 100vh;
  float: left;
  z-index: 1;
  border-radius: 0px 30px 0px 0px;
  box-shadow: 15px -20px 10px rgb(221, 227, 228);
}

.right-side {
  display: grid;
  background-color: #20c9c1;
  float: left;
  width: 20%;
  height: 100vh;
  z-index: 0;
  border-radius: 30px 0px 0px 0px;
  box-shadow: -15px 2px 10px rgb(221, 227, 228)
}

.profile-picture{
  position: relative;
  display: inline-block;
}

.main-part {
  background-color: #f8efef;
  width: 70%;
  height: 100vh;
  float: left;
  z-index: 0;
  box-shadow: 15px -2px 10px rgb(221, 227, 228) inset;
  display: grid;
  grid-template-rows: 20% 80%;
  height: 100vh;
}

.to-do-header{
  grid-row-end: auto;
  display: inline-grid;
  z-index: 2;
  margin-right: 75%;
  margin-top: 8%;
}

.to-do-body{
  background-color: #0000000d;
  width: 87%;
  height: 92%;
  float: left;
  z-index: 1;
  border-radius: 15px 15px 15px 15px;
  box-shadow: 15px -2px 50px rgb(210, 212, 213);
  /* display: grid; */
  /* grid-template-rows: 20% 80%; */
  /* height: 50vh; */
  margin-right: 0%;
  margin-left: 5%
}
.todo_add_button{
  margin-top: 20%;
}
.content {
  z-index: 1;
}

.left-side-container {
  display: grid;
  grid-template-rows: 80% 20%;
  height: 100vh;
}

.profile-button{
  display: flex;
  align-items: center;
  padding: 5%;
  color: rgb(0, 0, 0);
  cursor: pointer;
  z-index: 1;
  margin-top: 5%;
}
.settings-button,
.logout-button,
.to-do-button,
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
.to_do{
  margin-top: 1%;
  margin-left: 1%;
  cursor: pointer;
  position: relative;
  padding: 10px 10px;
  font-size: 18px;
  color: rgb(0, 0, 0);
  border-radius: 20px;
  background-color: transparent;
  font-weight: 600;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.320, 1);
  overflow: hidden;
}

.to_do::before {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 50%;
  height: 50px;
  border-radius: inherit;
  scale: 0;
  z-index: -1;
  background-color: rgb(173, 165, 165);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.to_do:hover {
  color: #212121;
  scale: 0.98;
}

.to_do:hover::before {
  scale: 3;
}

.to_do:active {
  scale: 0.98;
}

.button {
  cursor: pointer;
  position: relative;
  padding: 5% 5%;
  font-size: 3vh;
  color: rgb(0, 0, 0);
  border-radius: 20px;
  background-color: transparent;
  font-weight: 600;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.320, 1);
  overflow: hidden;
}

.button::before {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 60%;
  height: 60%;
  border-radius: inherit;
  scale: 0;
  z-index: -1;
  background-color: rgb(253, 253, 253);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.button:hover::before {
  scale: 3;
}

.button:hover {
  color: #212121;
  scale: 0.95;
}

.button:active {
  scale: 0.95;
}

.icons-left-side {
  margin-left: 10%;
}

.gg-log-out {
 box-sizing: border-box;
 position: relative;
 display: block;
 width: 6px;
 height: 16px;
 border: 2px solid;
 border-right: 0;
 border-top-left-radius: 2px;
 border-bottom-left-radius: 2px;
 margin-right: 10%;
}

.gg-log-out::after,
.gg-log-out::before {
 content: "";
 display: block;
 box-sizing: border-box;
 position: absolute
}

.gg-log-out::after {
 border-top: 2px solid;
 border-left: 2px solid;
 transform: rotate(-45deg);
 width: 8px;
 height: 8px;
 left: 4px;
 bottom: 2px
}

.gg-log-out::before {
 border-radius: 3px;
 width: 10px;
 height: 2px;
 background: currentColor;
 left: 5px;
 bottom: 5px
}

.circle {
  width: 7.5vw;
  height: 7.5vw;
  border-radius: 50%;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  border-color: black;
  border:10px;
}

</style>
