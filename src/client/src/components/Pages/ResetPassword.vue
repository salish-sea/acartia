<template>
<div>
  <section v-if="showForm" class="reset-password-section">
    <h1 class="header">
      {{ isSubmitted ? "Your password has been reset" : "Reset Password" }}
    </h1>

    <ErrorMessage v-if="isError" v-html="errorMessage"></ErrorMessage>

    <div v-if="!isSubmitted" class="description">
      <p>A request has been made to reset your password. If you made this request enter a new password below.</p>
    </div>
    <form v-if="!isSubmitted" @submit.prevent>
      <TextInput 
        v-model.trim="data.password"
        label="Password" 
        inputTypeProp="password" 
        :hideShowButton="true"
        :isError="isError"
      />
      <TextInput 
        v-model.trim="data.confirmPassword"
        label="Confirm Password" 
        inputTypeProp="password" 
        :hideShowButton="true"
        :isError="isError"
      />
      <button 
        class="standard-btn" 
        @click="resetPassword" 
        :disabled="isLoading" 
        :style="{ backgroundColor: isLoading ? '#80D7DD' : '#BFEBED' }"
      >
        Reset password
      </button>
    </form>
    
    
    <button v-if="isSubmitted" class="standard-btn" @click="$router.replace({name: 'Login'})">
      Log In
    </button>
  </section>
</div>
</template>
<script>
import TextInput from '../TextInput.vue';
import ErrorMessage from '../ErrorMessage.vue';


export default {
  name: "reset-password",
  components: {
    TextInput,
    ErrorMessage,
  },
  data() {
    return {
      data: {},
      errorMessage: "",
      isLoading: false,
      isSubmitted: false,
      isError: false,
    }
  },
  methods: {
    resetPassword() {

      function validatePasswords(password, confirmPassword) {
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if (password != confirmPassword)  
          throw new Error('Passwords do not match')
        else if (!re.test(password))
          throw new Error(' \
          <ul style="margin: 0; padding: 0px 0px 0px 15px"> \
            <li style="margin: 0">Passwords must have at least one digit character (0 - 9).</li> \
            <li style="margin: 0">Passwords must have at least one uppercase character (A - Z). </li> \
            <li style="margin: 0">Passwords must be at least 8 characters long.</li>\
          </ul> \
        ');
      }

      try {
        if (this.data.password || this.data.confirmPassword) {
          validatePasswords(this.data.password, this.data.confirmPassword)
          // this should be moved to the .then() of the server invocation once implemented
          this.isError = false;
          this.isSubmitted = true; 
        }
      }
      catch(error)  {
        this.isError = true;
        this.errorMessage = error.message;
      }

      // invoke server endpoint here
    }
    
  },
  computed: {
    // only show form if token is present and valid
    showForm() {
      return this.$route.query.token ? true : false;
      /*
       * TODO: return true/false depending on whether token is valid
       * I'm pretty sure there is an endpoint on the server under "password-reset"
       * specifically for this 
       */
    }
  }
}
</script>
<style scoped>

.header {
  width: 411px;
  font-family: "Mukta";
  font-weight: 600;
  font-size: 32px;
  line-height: 32px;
  color: #3D3951; 
  text-align: center;
  margin-top: 100px;
}

.text-input-div {
}

.reset-password-section {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  /*width: 327px;*/
}

.description {
  color: #3D3951;
  width: 327px;
  font-family: "Montserrat";
  font-weight: 300;
  font-size: 16px;
  line-height: 22.4px;
  text-align: left;
  margin-top: 10px;
  margin-bottom: -16px;
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

  margin-top: 16px;
}

.error-message {
  width: 327px;
}
</style>