<template>
  <!-- Title and header on the UI -->
  <div class="main">
    <div class="back-button-div main">
      <button class="back-button" @click="HandleBack" v-if="currentStage == 'intent' || currentStage == 'guidelines'">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="#080D26" fill-opacity="0.05" />
          <path d="M18.3333 25.8327L12.5 19.9993M12.5 19.9993L18.3333 14.166M12.5 19.9993L27.5 19.9993" stroke="#3D3951"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
    <section class="register--section main">
      <!-- UI for passing register details -->

      <div>
        <form class='register--form main' @submit="register">
          <!-- First Section - "Start" -->
          <div class="start" v-if="currentStage == 'start'">
            <h1 class="mukta-regular" id="register-heading">Register</h1>
            <div class="errors">
              <ErrorMessage v-if="errors.name" :errorMessage="errors.name">Please enter a name.</ErrorMessage>
              <ErrorMessage v-if="errors.initEmail" :errorMessage="errors.initEmail">Please enter a valid Email
                address.</ErrorMessage>
              <ErrorMessage v-if="errors.email" :errorMessage="errors.email">Confirmation Email does not match.
              </ErrorMessage>
              <ErrorMessage v-if="errors.initPassword" :errorMessage="errors.initPassword">Please enter a valid
                passord.</ErrorMessage>
              <ErrorMessage v-if="errors.password" :errorMessage="errors.password">Confirmation password does not
                match.</ErrorMessage>
            </div>
            <TextInput v-model.trim="registerUserData.name" label="Your Name" :is-password-field="false" :isError="isError" />
            <TextInput v-model.trim="registerUserData.initEmail" label="Email" :is-password-field="false" :isError="isError" />
            <TextInput v-model.trim="registerUserData.email" label="Confirm Email" :is-password-field="false" :isError="isError" />
            <TextInput v-model.trim="registerUserData.initPassword" label="Password" :is-password-field="true" :isError="isError" />
            <TextInput v-model.trim="registerUserData.password" label="Confirm Password" :is-password-field="true" :isError="isError" />
            <div>
              <button class="montserrat-regular button-next" @click="validateForm($event)">Next</button>
              <p class="montserrat-light login-link">Already have an account? <router-link to="/login">Log in</router-link></p>
            </div>

          </div>
          <!-- Second Section - Intent -->
          <div class="intent" v-if="currentStage == 'intent'">
            <h1 class="mukta-regular" id="intent-heading">How do you intend to use Acartia?</h1>
            <fieldset class="checkbox-group">
              <div class="check-div check-intent">
                <div class="check-border">
                  <input type="checkbox" id="browse-data" value="browse">
                </div>
                <label class="inter-regular" for="browse-data">Browse data</label>
              </div>
              <div class="check-div check-intent">
                <div class="check-border">
                  <input type="checkbox" id="contribute-data" value="contribute">
                </div>
                <label class="inter-regular" for="contribute-data">Contribute data</label>
              </div>
              <div class="check-div check-intent">
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
          <div class="guidelines" v-if="currentStage == 'guidelines'">
            <h1 class="mukta-regular intent-heading" id="intent-heading">Community Guidelines</h1>
            <div class="guidelineBorder">
              <p class="montserrat-light">
                The goal of Acartia is to advance marine conservation and science across the Salish Sea and Cascadia
                by sharing animal locations -- both historical and real-time data. Registration is free, access is
                open and free, and the code underlying the decentralized data cooperative is open source.
                Users of this data cooperative agree to these community rules:<br>
                1. Shared data will only include animals observed in marine environments.<br>
                2. All data provided will align with the Acartia data scheme and standards.<br>
                3. Any data use will heed our Creative Commons BY license. Proper attribution includes a link to
                acartia.io, acknowledgement of each data provider, and preservation of the provenance of each data
                point.<br>
                4. All data will be used with the intention of promoting marine conservation and responsible human
                interaction with marine wildlife, including adherence to U.S. and Canadian laws and the Be Whale Wise
                guidelines.<br>
                (CC) Attribution should include a link to acartia.io and listing of providers of the data you use.
              </p>
            </div>
            <fieldset class="checkbox-group guideCheck">
              <div class="check-div">
                <div class="check-border">
                  <input class="guide-checkbox" type="checkbox" id="understood" value="understood">
                </div>
                <label class="inter-regular" for="understood">I have read and understood the community
                  guidelines</label>
              </div>
              <div class="check-div">
                <div class="check-border">
                  <input class="guide-checkbox" type="checkbox" id="emails" value="emails">
                </div>
                <label class="inter-regular" for="emails">I agree to receive emails from the Acartia
                  newsletter</label>
              </div>
            </fieldset>
            <button class="montserrat-regular button-next button-submit" type="submit">Sign up</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import TextInput from "../Form/TextInput.vue"
import ErrorMessage from "../Form/ErrorMessage.vue"

export default {
  name: 'Register',
  components: {
    TextInput,
    ErrorMessage
  },
  data() {
    return {
      registerUserData: {},
      errors: {},
      isError: false,
      VUE_APP_MASTER_KEY: process.env.VUE_APP_MASTER_KEY,
      currentStage: "start"
    };
  },
  methods: {
    validateForm(event) {
      this.errors = {}; // Clear previous errors
      let isValid = true;

      // Name validation
      if (!this.registerUserData.name) {
        this.errors.name = 'Name is required.';
        isValid = false;
      }

      // Email format validation using regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.registerUserData.initEmail) {
        this.errors.initEmail = 'Email is required.';
        isValid = false;
      } else if (!emailPattern.test(this.registerUserData.initEmail)) {
        this.errors.initEmail = 'Please enter a valid Email address.';
        isValid = false;
      }

      // Check if confirmation email matches
      if (this.registerUserData.initEmail !== this.registerUserData.email) {
        this.errors.email = 'Emails do not match.';
        isValid = false;
      }

      // Password validation
      if (!this.registerUserData.initPassword) {
        this.errors.initPassword = 'Password is required.';
        isValid = false;
      } else if (this.registerUserData.initPassword !== this.registerUserData.password) {
        this.errors.password = 'Passwords do not match.';
        isValid = false;
      }

      // Prevent progression if there are errors
      if (!isValid) {
        this.isError = true;
        event.preventDefault();
      } else {
        this.HandleNext(event); // Proceed to next stage if no errors
      }
    },

    HandleNext(event) {
      event.preventDefault();
      if (this.currentStage == "start") {
        this.currentStage = "intent"
      }
      else if (this.currentStage == "intent") {
        this.currentStage = "guidelines"
      }
    },

    HandleBack() {
      if (this.currentStage == "guidelines") {
        this.currentStage = "intent"
      }
      else if (this.currentStage == "intent") {
        this.currentStage = "start"
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
        .then(regUser => {
          console.log(`Successfully added ${regUser.data}`)
          this.$router.push({ name: 'Dashboard' })
          this.$store.commit("addToast", { message: "Successfully Logged In", status: "success" })
        })
        // Check for request errors
        .catch(err => {
          this.$store.commit("addToast", { message: "Something Went Wrong", status: "error" })
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Actor&family=Amiko&family=Mukta:wght@200;300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Actor&family=Amiko&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Mukta:wght@200;300;400;500;600;700;800&display=swap');

.register--section {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  margin-top: 100px;
}

.register--form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#register-heading {
  text-align: center;
  font-weight: 500;
  font-size: 32px;
  line-height: 32px;
  color: #3D3951;
}

.use-ssemmi-form label {
  display: block;
  text-align: left;
  margin-bottom: 10px;
}

#btn-signup-submit {
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;
}

.text-input-div {
  display: inline-flex;
}

.error-message {
  max-width: 327px;
  align-items: center;
  justify-content: center;
}

.errors {
  max-width: 327px;
  display: inline-grid;
  align-items: center;
  justify-content: center;
}

.button-next {
  width: 327px;
  height: 48px;
  background-color: #BFEBED;
  border: none;
  border-radius: 10px;
  margin-top: 39px;
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
  display: flex;
  align-items: flex-start;
  transform: translateX(12%);

}

.check-intent {
  width: 400px;
}

.checkbox-group input[type="checkbox"] {
  transform: scale(2.3) ;
  opacity: 0;
}

.checkbox-group input[type="checkbox"]:checked {
  opacity: 100;
}

.check-border {
  margin-right: 20px !important;
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

.guidelineBorder {
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #3D3951;
  border-radius: 6px;
  text-align: left;
}

.start {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.intent {
  text-align: center;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.guidelines {
  display: inline-grid;
  align-items: center;
  max-width: 928px;
  transform: translateY(-10%);
}

.intent-heading {
  margin-left: auto;
  margin-right: auto;
}

.guideCheck {
  align-items: flex-start;
}

.guide-checkbox {
  transform: scale(2.3) translateX(17%) !important;
}

.button-submit {
  margin-left: auto;
  margin-right: auto;
}

a {
  color: #007B83;
}

.back-button {
  background-color: white;
  border: none;
  transform: translateX(10vw) translateY(100%);
}

@media (max-width: 800px) {
  .back-button{
    transform: translateX(10vw) translateY(30%) !important;
  }
}

.back-button:focus {
  outline: none;
}

.icon {
  margin-right: 9px;
}

.login-link {
  margin-top: 10px;
  text-align: center;
}

</style>
