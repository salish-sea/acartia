// LOGIN PAGE

<template>
  <div>
    <!-- Title and header on the UI -->
    <header class="login--header">
    </header>
    <section class="login--section">
      <!-- UI for passing login details -->
      <h1 class="header">Welcome back!</h1>

      <div class="error-message" v-bind:style="{ display: errorVisibility }">
        <p>The email and/or password you entered did not match our records.</p>
      </div>

      <TextInput v-model.trim="loginData.email" label="Email" inputType="text" :borderStyle="inputBorder"/>
      <TextInput v-model.trim="loginData.password" label="Password" :inputType="passwordFieldType" :borderStyle="inputBorder"/>

      <a id="ForgotPassword" class="link">Forgot password?</a>

      <button @click="loginMethod" class='standard-btn'>Log in</button>
      <div id="NoAccount">
        <p>Don't have an account? <a id="signup">Sign up</a></p> 
      </div>

      <div id="OrLoginWith">
        <hr width="60px">
        <p>or login with</p>
        <hr width="60px">
      </div>

      <button class="alternative-btn"><img class="icon" src="../../assets/google.svg"/>Log in with Google</button>
      <button class="alternative-btn"><img class="icon" src="../../assets/linkedin.svg"/>Log in with Linkedin</button>
    </section>
  </div>
</template>

<script>
import TextInput from "../TextInput.vue"

export default {
  name: 'Login',
  components: {
    TextInput,
  },
  data() {
    return {
      // Password alert stuff
      inputBorder: "1px solid #3D3951",
      errorVisibility: "none",
      // Password visibility stuff
      passwordFieldType: "password",
      loginData: {},
    }
  },

  methods: {
    // I have no idea whats going on with the backend
    loginMethod() {
      this.$store.dispatch('auth_request', this.loginData)
      .then( (loginMessage) => {
        console.log(loginMessage);
        this.$router.replace({name: 'DataExplorer'});
      })
      .catch( (loginMessage) => {
        console.log(loginMessage);
        this.inputBorder = "2px solid #B22A2A";
        this.errorVisibility = "block";
      })
    },
  },
}

</script>

<style scoped>

p {
  font-family: "Montserrat";
  font-weight: 400;
  margin-top: 0 !important; /* css in this project is cooked */
}

hr {
  background-color: #6D6B7D;
  margin: 10;
}

.login--section {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  width: 327px;
}

.icon {
  margin-right: 5px;
}

.alternative-btn {
  border: solid 1px;
  border-radius: 10px;
  padding: 12px 16px;
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 16px;
  background-color: white;
  border-color: #9E9CA8;
  color: #3D3951;
  margin-top: 6px;
  margin-bottom:8px;
  height: 56px;
}

.error-message {
  background-color: #F9CDCD;
  color: #B22A2A;
  padding: 12px 16px;
  margin-top: 20px;
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 14px;
  border-radius: 12px;
}

.error-message p { 
  margin-bottom: 0;
}

#ForgotPassword {
  /*margin-top: -12px;*/ /* Necessary because of how I did the eyball thingy */
  margin-top: -14px;
  margin-left: auto;
}

#signup {
  margin-left: 12px;
  color: #007B83;
}

#OrLoginWith {
  color: #6D6B7D;
  display: flex;
  flex-direction: row;
  padding: 3px, 0px;
  justify-content: center;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 14px;
}

#AlternativeLogin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
}

#NoAccount {
  display: flex;
  flex-direction: row;
  justify-content:center;;
  margin-top: 16px;
}

</style>
