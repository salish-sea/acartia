// LOGIN PAGE

<template>
  <div>
    <section class="login--section">
      <h1 class="header">Welcome back!</h1>

      <!-- TODO: the error message should be received from the backend instead of hardcoded -->
      <ErrorMessage v-if="isError">The email and/or password you entered did not match our records.</ErrorMessage>
      <form>
        <TextInput v-model.trim="loginData.email" label="Email" inputType="text" :hideShowButton="false"
          :isError="isError" />
        <TextInput v-model.trim="loginData.password" label="Password" inputTypeProp="password" :hideShowButton="true"
          :isError="isError" />

        <router-link id="ForgotPassword" class="link" to="/forgot-password">Forgot password?</router-link> 

        <Button class="standard-btn" @click.native="loginMethod" :isLoading="isLoading" :formData="loginData">
          {{  isLoading ? "Loading..." : "Log in" }}
        </Button>
      </form>


      <div id="NoAccount">
        <p>Don't have an account? <router-link id="signup" to="/register">Sign up</router-link></p>
      </div>

      <div id="OrLoginWith">
        <hr width="60px">
        <p>or login with</p>
        <hr width="60px">
      </div>

      <button class="alternative-btn"><img class="icon" src="../../assets/google.svg" />Log in with Google</button>
      <button class="alternative-btn"><img class="icon" src="../../assets/linkedin.svg" />Log in with Linkedin</button>
    </section>
  </div>
</template>

<script>

import TextInput from "../Form/TextInput.vue"
import ErrorMessage from "../Form/ErrorMessage.vue"
import Button from "../Form/Button.vue"

export default {
  name: 'Login',
  components: {
    TextInput,
    ErrorMessage,
    Button,
  },
  data() {
    return {
      loginData: {email: "", password: ""},
      isLoading: false,
      isError: false,
    }
  },
  methods: {
    loginMethod() {
      this.isLoading = true;
      this.$store.dispatch('auth_request', this.loginData)
        .then((loginMessage) => {
          console.log(loginMessage);
          this.isLoading = false;
          this.$router.replace({ name: 'DataExplorer' });
        })
        .catch((loginMessage) => {
          this.isError = true;
          console.log(loginMessage);
          this.inputBorder = "2px solid #B22A2A";
          this.errorVisibility = "block";
          this.isLoading = false;
        })
    },
  },
}

</script>

<style scoped>
p {
  font-family: "Montserrat";
  font-weight: 300;
  margin-top: 0 !important;
  /* css in this project is cooked */
}

hr {
  background-color: #6D6B7D;
  margin: 10;
}

form {
  margin: 0;
}

.login--section {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  width: 327px;
}

.icon {
  width: 32px;
  height: 32px;
  margin-right: 9px;
}

.standard-btn {
  width: 327px;
  height: 48px;
  border-radius: 10px;
  border-width: 0;
  padding: 10px 24px 10px 24px;
  box-shadow: none !important;
  color: #6D6B7D;
  background-color: #BFEBED;
  text-transform: none;
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 16px;
  outline: none !important;

  margin-top: 40px;
}

.forgot-password-section {
  width: 327px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  font-family: "Montserrat";
}

.header {
  font-family: "Mukta";
  font-weight: 500;
  font-size: 32px;
  line-height: 32px;
  color: #3D3951;
  text-align: center;
  margin-top: 100px;
}

.link {
  color: #007B83 !important;
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: 300;
  line-height: 22.4px;
  margin-top: 16px;
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
  margin-bottom: 8px;
  height: 56px;
}

#ForgotPassword {
  margin-top: 10px; 
  margin-left: auto !important;
  display: block;
  text-align: right;
}

#signup {
  margin-left: 12px;
  font-weight: 300;
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

#NoAccount {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 16px;
}
</style>
