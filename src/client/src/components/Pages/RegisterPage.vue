<template>
<div>
  <!-- Title and header on the UI -->
  <div style="padding: 5%">
    <section  class="register--section">
      <!-- UI for passing register details -->
      <div>
        <form class='register--form' >
          <!-- First Section - "Start" -->
           <div class="start" v-if="currentStage == 'start' ">
          <h1 class="mukta-regular" id="register-heading">Register</h1>
          <fieldset class="bordered-label">
            <input class="form-control" name="Name" type="name" required/>
            <label class="mukta-extralight" for="Name">Your Name</label>
          </fieldset>
          <fieldset class="bordered-label">
            <input class="form-control" name="Email" v-model.trim="registerUserData.initEmail" type="email" required/>
            <label class="mukta-extralight" for="Email">Email</label>
          </fieldset>
          <fieldset class="bordered-label">
            <input class="form-control" v-model.trim="registerUserData.email" name="Confirm email" type="email" required/>
            <label class="mukta-extralight" for="Confirm Email">Confirm Email</label>
          </fieldset>
          <fieldset class="bordered-label">
            <input class="form-control" v-model.trim="registerUserData.initPassword" name="Password" type="password" required/>
            <label class="mukta-extralight" for="Password">Password</label>
          </fieldset>
          <fieldset class="bordered-label">
            <input class="form-control" v-model.trim="registerUserData.password" name="Confirm Password" type="password" required/>
            <label class="mukta-extralight" for="Confirm Password">Confirm Password</label>
          </fieldset>
          <fieldset>
            <br>
          </fieldset>
          <div>
            <button class="montserrat-regular button-next" @click="HandleNext($event)">Next</button>
            <p class="montserrat-light">Already have an account? Log in</p>
          </div>
          <div class="line-container">
              <hr class="line">
              <p class="montserrat-light login-text">or login with</p>
          </div>
          <button class="button montserrat-light">Register with Google</button>
          <button class="button montserrat-light">Register with LinkedIn</button>
          </div>
          <!-- Second Section - Intent -->
           <div class="intent" v-if="currentStage == 'intent'">
            <h1 class="mukta-regular" id="intent-heading">How do you intend to use Acartia?</h1>
              <fieldset class="checkbox-group">
                <div class="check-div">
                  <div class="check-border">
                    <input type="checkbox" id="browse-data" value="browse">
                  </div>
                  <label class="inter-regular" for="browse-data">Browse data</label>
                </div>
                <div class="check-div">
                  <div class="check-border">
                    <input type="checkbox" id="contribute-data" value="contribute">
                  </div>
                  <label class="inter-regular" for="contribute-data">Contribute data</label>
                </div>
                <div class="check-div">
                  <div class="check-border">
                    <input type="checkbox" id="other" value="other">
                  </div>
                  <label class="inter-regular" for="other">Other</label>
                </div>
              </fieldset>
              <div>
                <button class="montserrat-regular button-next" @click="HandleNext($event)">Next</button>
              </div>
           </div>
           <!-- Third Section - Community Guidelines -->
           <div class="guidelines" ></div>
        </form>
      </div>
    </section>
   
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  components: {
    
    
  },
  data() {
    return {
      registerUserData: {},
      errors: [],
      VUE_APP_MASTER_KEY: process.env.VUE_APP_MASTER_KEY,
      currentStage: "start"
    };
  },
  methods: {
    HandleNext(event){
      event.preventDefault();
      console.log("going to the next stage of the form...")
      if (this.currentStage == "start"){
        this.currentStage = "intent"
      }
      else if (this.currentStage == "intent"){
        this.currentStage = "guidelines"
      }
    },
    register(event) {

      if (!this.registerUserData.email) {
        alert('Email required.')
        return false
      }

      if (this.registerUserData.email != this.registerUserData.initEmail) {
        alert('Emails do not match.')
        return false
      }

      if (!this.registerUserData.password) {
        alert('Password required.')
        return false
      }

      if (this.registerUserData.password != this.registerUserData.initPassword) {
        alert('Passwords do not match.')
        return false
      }
      // Check for event error to prevent propagation
      event.preventDefault()

      const regUserRequst = {
        'email': this.registerUserData.email,
        'password': this.registerUserData.password,
        'access_token': this.VUE_APP_MASTER_KEY
      }

      //Header post method to pass user details by passing created user details
      axios.post(`${process.env.VUE_APP_WEB_SERVER_URL}/v1/users/`, regUserRequst)
      // Redirect to requested page
      .then( regUser => {
        console.log(`Successfully added ${regUser.data}`)
        this.$router.push({name: 'Dashboard'})
      })
      // Check for request errors
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Actor&family=Amiko&family=Mukta:wght@200;300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Actor&family=Amiko&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Mukta:wght@200;300;400;500;600;700;800&display=swap'); 
/* Flexbox container to center the form */
  .register--section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Ensures the form is vertically centered */
  }

  .register--form {
    width: 100%;
    max-width: 500px; /* Adjust this to your preferred width */
    padding: 20px;
    margin: 0 auto; /* Centers the form horizontally */
  }

  #register-heading {
    text-align: center; /* Center the heading text */
  }

  .use-ssemmi-form label {
    display: block;
    text-align: left;
    margin-bottom: 10px;
  }

  #btn-signup-submit {
    padding-top: 40px;
    padding-bottom: 40px;
    text-align: center; /* Center the submit button */
  }

  .bordered-label {
    position: relative;
    display: inline-block;
    margin: 20px;
  }

  .form-control {
    width: 327px;
    height: 48px;
    position: relative;
    border: 1px solid #3D3951;
    border-radius: 4px;
    padding: 0.75rem 0.5rem;
    display: flex;
    align-items: center;
  }

  .bordered-label label {
    position: absolute;
    top: 50%;
    left: 0.75rem; /* Adjust based on input padding */
    transform: translateY(-145%);
    background-color: white; /* Background color to cover input border */
    padding: 0 0.25rem;
    color: #3D3951;
    pointer-events: none;
    z-index: 1; /* Ensure label is on top */
    white-space: nowrap; /* Prevent label from breaking into multiple lines */
  }

  .button-next {
    width: 327px;
    height: 48px;
    background-color: #BFEBED;
    border: none;
    border-radius: 10px;
    
  }
  .line {
    width: 210px;
    height: 0.1px;
    background-color: #3D3951;
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    align-items: center;
  }
  
  .check-div {
    margin: 20px 0;
    width: 400px;
    display: flex;
    align-items: flex-start;
    transform: translateX(12%);
   
  }
  .checkbox-group input[type="checkbox"] {
    transform: scale(2.3) !important;
    opacity: 0;
  }
  .checkbox-group input[type="checkbox"]:checked{
    opacity: 100;
  }

  .check-border {
    margin-right: 20px !important; /* Adds space between the checkbox and the label */
    justify-content: center;
    padding-top: 5px;
    width: 30px !important;
    height: 30px;
    border: 3px solid #00AFBA;
    border-radius: 5px;
  }

  .mukta-extralight {
  font-family: "Mukta", sans-serif;
  font-weight: 200;
  font-style: normal;
  }
  .mukta-regular {
  font-family: "Mukta", sans-serif;
  font-weight: 400;
  font-style: normal;
  }
  .montserrat-regular {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  color: #6D6B7D;
}
.montserrat-light {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  color: #3D3951;
}
.line-container {
  position: relative;
  text-align: center;
  margin: 40px 0;
}
.login-text {
  display: inline-block;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 10px;
  font-size: 14px;
  color: #6D6B7D;
  z-index: 1;
}
.button {
  width: 327px;
  height: 56px;
  border: 1px solid #9E9CA8;
  border-radius: 10px;
  background-color: white;
  margin: 10px;
}

  
</style>
