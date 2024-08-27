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
      <!-- <form class='login--form' @submit.prevent="loginMethod"> -->
      <div id="Error-Message" v-bind:style="{ display: errorVisibility }">
        <p id="Error-Text">The email and/or password you entered did not match our records.</p>
      </div>
      <div id="Text--Inputs">
        <div class="bordered-label">
          <!--<label for="email">Email</label>-->
          <input type="text" v-model.trim="loginData.email" v-bind:style="{ border: border }" name="email" class="txt" id="email" required />
        </div>
        <div class="bordered-label">
          <!--<label>Password</label>-->
          <input type="password" v-model.trim="loginData.password" v-bind:style="{ border: border}" name="password" class="txt" required/>
          <span><img class="hide" src="../../assets/eye.svg"/></span>
        </div>
        <a id="forgot-password">Forgot password?</a>
      </div>
      <div id="Log--In--Link">
        <button @click="sayMyName" class='btn'>Log in</button>
        <p id="InterestingName">Don't have an account? <a id="signup">Sign up</a></p> <!-- The spacing here isn't quite right -->
      </div>
      <div id="Or--Login--With">
        <hr width="60px">
        <p>or login with</p>
        <hr width="60px">
      </div>
      <div id="Alternative-Login">
        <button class="alternative-btn"><img class="icon" src="../../assets/google.svg"/>Log in with Google</button>
        <button class="alternative-btn"><img class="icon" src="../../assets/linkedin.svg"/>Log in with Linkedin</button>
      </div> 
      <!-- </form> -->
    </section>
  </div>
  
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      border: "1px solid #3D3951",
      errorVisibility: "none",
      loginData: {},
    }
  },

  methods: {
    sayMyName() {
      //alert(this.name);
      this.border = "2px solid #B22A2A";
      this.errorVisibility = "block";
    }
  },
}

/*export default {
  name: 'Login',
  data() {
    return {
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
      .then( (loginMessage) => {
        console.log(loginMessage)
        // Will change the log upon submit for login to be successful
        this.logMsgLogin = loginMessage; this.logMsgColour = "success"
        // Redirect to page upon login --admins will be redirected to register
        this.$router.replace({name: 'DataExplorer'})
      })
      .catch( (loginMessage) => {
        console.log(loginMessage)
        // Will change the log upon submit for login to be invalid
        this.logMsgLogin = loginMessage
        this.logMsgColour = "danger"
      })
    }
  }
}*/

</script>

<style scoped>

.hide {
  position: absolute;
  top: 312px;
  /*right: 485px;*/
  left: 60%;
}

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

.icon {
  margin-right: 5px;
}

.bordered-label {
  padding: 0;
  margin: 0;
}

.bordered-label label { position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-130%);
  background-color: white;
  padding: 0 0.2rem;
  color: #3D3951; 
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
  box-shadow: none;
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 16px;
  margin-left: 0px;  
  text-transform: none;
}

.btn:hover {
  box-shadow:none;
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
  /*border: 1px solid #3D3951;*/

  /*border-color: #3D3951;
  border-width: 1px;*/

  border-radius: 4px;
  padding: 0.75rem 0.5rem;
  width: 327px;
  height: 52px;
  margin-top: 24px;
}

.login--section {
  display: inline-flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  width: 327px;
}

#Header {
  margin-top: 110px;
  padding: 0px 24px 0px 24px;  
}

#Text--Inputs {
  height: 192px;
  width: 100%;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  
}

#forgot-password {
  margin-top: 10px;
  margin-left: auto;
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 16px;
  color: #007B83;

}

#Log--In--Link {
  padding-top: 18px;
}

#Or--Login--With {
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

#Alternative-Login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
}

#InterestingName {
  margin-top: 12px;
}

#Error-Message {
  background-color: #F9CDCD;
  color: #B22A2A;
  padding: 12px 16px;
  margin-top: 20px;
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 14px;
  border-radius: 12px;
}

/* this p has an ID but we aren't using it because idk */
#Error-Message p { 
  margin-bottom: 0;
}

</style>
