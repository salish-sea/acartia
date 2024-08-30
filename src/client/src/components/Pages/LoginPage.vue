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

      <div id="TextInputs">
        <div class="standard-text-input">
          <!--<label for="email">Email</label>-->
          <input type="text" v-model.trim="loginData.email" v-bind:style="{ border: inputBorder }" name="email" class="txt" id="email" required />
        </div>
        <div class="password-input">
          <!--<label>Password</label>-->
          <input :type="passwordFieldType" v-model.trim="loginData.password" v-bind:style="{ border: inputBorder}" name="password" class="txt" required/>
          <img class="hide" src="../../assets/eye.svg" @click="togglePassword"/>
        </div>
        <a id="ForgotPassword" class="link">Forgot password?</a>
      </div>

      <button @click="loginMethod" class='standard-btn'>Log in</button>
      <p>Don't have an account? <a id="signup">Sign up</a></p> <!-- The spacing here isn't quite right -->

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

export default {
  name: 'Login',
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
    // Untested
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

    togglePassword() {
      // This might be a better way to acheive this?
      // https://stackoverflow.com/questions/68602902/vuejs-toggle-password-visibilty-without-mutating-the-type-property
      if (this.passwordFieldType === "password") {
        this.passwordFieldType = "text";
      } else {
        this.passwordFieldType = "password";
      }
    },
  },


}

</script>

<style scoped>

p {
  font-family: "Montserrat";
  font-weight: 400;
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

.hide {
  position: relative;
  top: -37px;
  left: 140px;
}

.icon {
  margin-right: 5px;
}

.btn {
  background-color: #BFEBED;
  color: #6D6B7D;
  width: 327px;
  height: 48px;
  border-radius: 10px; 
  box-shadow: none !important;
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 16px;
  margin-left: 0px;  
  text-transform: none;
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

.txt {
  border-radius: 4px;
  padding: 0.75rem 0.5rem;
  width: 327px;
  height: 52px;
  margin-top: 24px;
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

#TextInputs {
  height: 192px;
  width: 100%;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  
}

#ForgotPassword {
  /*margin-top: -12px;*/ /* Necessary because of how I did the eyball thingy */
  margin-left: auto;
}

#signup {
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
}

#AlternativeLogin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
}



</style>
