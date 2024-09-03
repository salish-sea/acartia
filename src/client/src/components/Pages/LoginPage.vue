// LOGIN PAGE

<template>
  <div>
    <!-- Title and header on the UI -->
    <header class="login--header">
    </header>
    <section class="login--section">
      <!-- UI for passing login details -->
      <div id="Header">
        <h1>Welcome back!</h1>
      </div>
      <div id="ErrorMessage" v-bind:style="{ display: errorVisibility }">
        <p>The email and/or password you entered did not match our records.</p>
      </div>
      <div id="TextInputs">
        <div class="bordered-label">
          <input type="text" v-model.trim="loginData.email" v-bind:style="{ border: inputBorder }" name="email" class="txt" id="email" required />
        </div>
        <div class="bordered-label">
          <input :type="passwordFieldType" v-model.trim="loginData.password" v-bind:style="{ border: inputBorder}" name="password" class="txt" required/>
          <img class="hide" src="../../assets/eye.svg" @click="togglePassword"/>
        </div>
        <a id="ForgotPassword">Forgot password?</a>
      </div>
      <div id="LogInLink">
        <button @click="loginMethod" class='btn'>Log in</button>
        <p id="InterestingName">Don't have an account? <a id="signup">Sign up</a></p>
      </div>
      <div id="OrLoginWith">
        <hr width="60px">
        <p>or login with</p>
        <hr width="60px">
      </div>
      <div id="AlternativeLogin">
        <button class="alternative-btn"><img class="icon" src="../../assets/google.svg"/>Log in with Google</button>
        <button class="alternative-btn"><img class="icon" src="../../assets/linkedin.svg"/>Log in with Linkedin</button>
      </div> 
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
      isLoggingIn: false,
      logMsgLogin: "",
      logMsgColour: "secondary"
    }
  },

  methods: {
    loginMethod() {
      // Hide login message before clicking on submit login details
      this.isLoggingIn = true
      this.logMsgLogin = "Logging you in....."
      this.logMsgColour = "secondary"

      this.$store.dispatch('auth_request', this.loginData)
      .then((loginMessage) => {
        console.log(loginMessage);
        // Will change the log upon submit for login to be successful
        this.logMsgLogin = loginMessage;
        this.logMsgColour = "success";
        // Redirect to page upon login --admins will be redirected to register
        this.$router.replace({ name: 'DataExplorer' });
      })
      .catch((loginMessage) => {
        console.log(loginMessage);
        // Will change the log upon submit for login to be invalid
        this.logMsgLogin = loginMessage;
        this.logMsgColour = "danger";
        this.inputBorder = "2px solid #B22A2A";
        this.errorVisibility = "block";
      });
    },

    togglePassword() {
      // This might be a better way to achieve this?
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
/* Styles remain unchanged */
h1 {
  font-size: 32px;  
  font-weight: 600;
  font-family: "Mukta";
  line-height: 32px;
  margin: 0;
}

a {
  color: #007B83;
  font-family: "Montserrat";
  font-weight: 400;
}

p {
  font-family: "Montserrat";
  font-weight: 400;
}

hr {
  background-color: #6D6B7D;
  margin: 10;
}

.hide {
  position: relative;
  top: -37px;
  left: 140px;
}

.icon {
  margin-right: 5px;
}

.bordered-label {
  padding: 0;
  margin: 0;
}

.bordered-label label {
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-130%);
  background-color: white;
  color: #3D3951; 
  padding: 0 0.2rem;
  pointer-events: none;
  z-index: 1;
  white-space: nowrap;
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

.login--section {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  width: 327px;
}

#Header {
  margin-top: 110px;
  padding: 0px 24px 0px 24px;  
}

#TextInputs {
  height: 192px;
  width: 100%;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  
}

#ForgotPassword {
  margin-top: -12px;
  margin-left: auto;
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 16px;
  color: #007B83;
}

#LogInLink {
  margin-top: 10px;
  padding-top: 18px;
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

#signup {
  color: #007B83;
}

#AlternativeLogin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
}

#InterestingName {
  margin-top: 12px;
}

#ErrorMessage {
  background-color: #F9CDCD;
  color: #B22A2A;
  padding: 12px 16px;
  margin-top: 20px;
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 14px;
  border-radius: 12px;
}

#ErrorMessage p { 
  margin-bottom: 0;
}
</style>
