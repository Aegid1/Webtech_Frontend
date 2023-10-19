<template>
    
    <div class = "wrapperLoginForm">


        <div v-if="createGroup === false && joinGroup === false && locationNavigation === false">
            <div style='padding-top: 3%;'>
                <h1> Do you want to join a group </h1>
                <h1> or do you want to create a group? </h1>    
            </div>

            <div>

                <span class = "button button:hover" style="margin-right: 20%; left: 15%;" @click = "toggleJoinGroup()" > join group </span>
                <span class = "button button:hover" style="right: 15%;" @click = "toggleCreateGroup()" > create group </span>
            </div>
        </div>


        <div v-if="createGroup === true">
            <div style='padding-top: 3%;'>
                <h1> What's the name of your group?? </h1>
            </div>

            <div>
                <input type = "text" class ="inputField" id="groupName"> 
            </div>

            <i class = "bi bi-arrow-left navigation-button navigation-button:hover" style="left: 8%;" @click="navigationBack(createGroup)"></i>
            <i class="bi bi-arrow-right navigation-button navigation-button:hover" style="right: 8%;" @click="toggleShareLocation(createGroup)"></i>
        </div>

        
        <div v-if="locationNavigation === true && createGroup === false">
            <div style='padding-top: 3%;'>
                <h1> Do you want to share your location with us? </h1>
            </div>
            
            <div> 
                <span class = "button button:hover" style="margin-right: 20%; left: 15%;" @click = "allowLocation(false)" > no </span>
                <span class = "button button:hover" style="right: 15%;" @click = "allowLocation(true, )"> yes </span>
            </div>
            
            <i class = "bi bi-arrow-left navigation-button navigation-button:hover" style="left: 8%;" @click="navigationBack(locationNavigation)"></i>
        </div>


    </div>

</template>

<script>
import { routeLocationKey } from 'vue-router';

export default {
    name: 'RegistrationQuestionView',

    data() {
        return{
            createGroup: false,
            joinGroup: false,
            groupName: '',
            locationNavigation: false,
            locationPermission: false,
            groupName: ''
        }
    },


    methods: { 
        
        toggleCreateGroup(){
            this.createGroup = true;
        },

        toggleJoinGroup(){
            this.joinGroup = true;
        },

        toggleShareLocation(){
            this.createGroup = false;
            this.locationNavigation = true;
            return this.createGroup;
        },

        allowLocation(allowance, id){
            this.locationPermission = allowance;
            this.createGroupInDatabase();
        },

        navigateToHomeView (id) {
            this.$router.push({ name: 'home', params: { id } })
        },

        createGroupInDatabase(){

            const group = {

                name: this.groupName,
                countOfMembers: 1,
                profilePicture: '',
                scoreSum: '0',
                locationPermission,
                
                
            }

            const groupData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json.stringify(group)
            }

            fetch('http://localhost:8080/createGroup' + this.$route.params.id, groupData)
            .then(response => response.json())
            .then(response => {
                if (response.ok) {

                console.log('Benutzer wurde erfolgreich erstellt')
                this.navigateToHomeView(this.$route.params.id)
                
                } else {

                console.log('Fehler bei der Benutzererstellung')
                //Hier eine Meldung für den Nutzer einbauen, dass etwas fehlgeschlagen ist
                }
            })
            .catch(error => {
                console.error('Fehler:', error)
            })


        },

        navigationBack(condition){

            switch(condition){
                case this.createGroup:
                    this.createGroup = !this.createGroup;
                    return this.createGroup;
                
                case this.joinGroup:
                    this.joinGroup = !this.joinGroup;
                    return this.joinGroup;

                case this.locationNavigation:
                    this.locationNavigation = !this.locationNavigation;
                    this.createGroup = !this.createGroup;
                    return this.locationNavigation;
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
  position: absolute;
  bottom: 30%;
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
  font-size: 280%;
  cursor: pointer;
  position: absolute;
  bottom: 2%;
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
