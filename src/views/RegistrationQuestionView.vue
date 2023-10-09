<template>
    
    <div class = "wrapperLoginForm">


        <div v-if="createGroup === false && joinGroup === false">
            <div style='padding-top: 3%;'>
                <h1> Do you want to join a group </h1>
                <h1> or do you want to create a group? </h1>    
            </div>

            <div>
                <span class = "button button:hover" style="margin-right: 20%; margin-top: 10%;" @click = "toggleJoinGroup()" > join group </span>
                <span class = "button button:hover" @click = "toggleCreateGroup()" > create group </span>
            </div>
        </div>


        <div v-if="createGroup === true">
            <div style='padding-top: 3%;'>
                <h1> What's the name of your group?? </h1>
            </div>

            <div>
                <input type = "text" class ="inputField" id="groupName"> 
            </div>

            <span class = "navigation-button navigation-button:hover" style="left: 8%;" @click="navigationBack(createGroup)"> <b> previous </b> </span>
            <span class = "navigation-button navigation-button:hover" style="right: 8%;"> <b> next </b> </span>
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
            groupName: '',
        }
    },


    methods: { 
        
        toggleCreateGroup(){
            this.createGroup = true;
        },

        toggleJoinGroup(){
            this.joinGroup = true;
        },

        navigationBack(condition){

            switch(condition){
                case this.createGroup:
                    this.createGroup = !this.createGroup;
                
                case this.joinGroup:
                    this.joinGroup = !this.joinGroup;
            }
    
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

.navigation-button {
  display: inline-block;
  padding: 5px 10px;
  background-color: #20c9c1;
  color: #0a0a0a;
  border: none;
  border-radius: 5px;
  font-size: 150%;
  cursor: pointer;
  position: absolute;
  bottom: 5%;
}

.navigation-button:hover {
  background-color: #ffffff;
}

.wrapperLoginForm {
  background-color: #20c9c1;
  padding-bottom: 10%;
  border-radius: 30px 30px 30px 30px;
  width: 60%;
  margin-top: 10%;
  margin-left: 20%;
  box-shadow: 15px 10px 1px #1bada6;
  position: relative;
}

.inputField {
margin-top: 5%;
border-radius: 30px 30px 30px 30px;
width: 50%;
padding: 1vh;
background-color: white;

}
</style>
