<template>
    
    <div class = "wrapperLoginForm">
        <div v-if="createGroup === false && joinGroup === false">
            <div style='padding-top: 3%;'>
                <h1> willst du einer Gruppe beitreten </h1>
                <h1> oder eine Gruppe erstellen? </h1>    
            </div>

            <div>
                <span class = "button button:hover" style="margin-right: 20%; margin-top: 10%;" @click = "toggleJoinGroup()" >Gruppe beitreten</span>
                <span class = "button button:hover" @click = "toggleCreateGroup()" >Gruppe erstellen</span>
            </div>
        </div>

        <div v-if="createGroup === true && groupName === ''">
            <div style='padding-top: 3%;'>
                <h1> Wie soll deine Gruppe heißen? </h1>
            </div>

            <div>
                <input type = "text" class ="inputField" id="groupName"> 
            </div>
        </div>



    </div>

</template>

<script>
export default {
    name: 'RegistrationQuestionView',

    data() {
        return{
            createGroup: false,
            joinGroup: false,
            groupName: ''
        }
    },


    methods: { 
        
        toggleCreateGroup(){
            this.createGroup = true;
        },
        toggleJoinGroup(){
            this.joinGroup = true;
        }
    }
}
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 5px 10px;
  background-color: #20c9c1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 220%;
}

.button:hover {
  background-color: #ffffff;
}

.wrapperLoginForm {
background-color: #20c9c1;
padding-bottom: 10%;
border-radius: 30px 30px 30px 30px;
width: 60%;
height:60%;
margin-top: 10%;
margin-left: 20%;
box-shadow: 15px 10px 1px #1bada6;
}

.inputField {
margin-top: 5%;
border-radius: 30px 30px 30px 30px;
width: 50%;
padding: 1vh;
background-color: white;

}
</style>
