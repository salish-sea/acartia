<template>
<div>
  <header class="forgot-password-header">
  </header>
  <section class="forgot-password-section">
    <h1 class="header">Forgot password?</h1>

    <ErrorMessage v-if="isError">{{ errorMessage }}</ErrorMessage>

    <div class="description">
      <p>Enter your email and we'll send you a link to reset your password.</p>
    </div>

    <TextInput 
      v-if="!isSubmitted"
      v-model.trim="loginData.email" 
      label="Email" 
      inputTypeProp="text" 
      :hideShowButton="false" 
      :isError="isError"
    />

    <Button @click.native="buttonAction" :isLoading="isLoading" :formData="this.loginData">
      {{ buttonText }}
    </Button>

    <a class="link" href="/login">Return to login</a>
  </section>
</div>
</template>
<script>
import TextInput from '../Form/TextInput.vue'
import ErrorMessage from '../Form/ErrorMessage.vue'
import Button from '../Form/Button.vue'

export default {
  name: "ForgotPassword",
  components: {
    TextInput,
    ErrorMessage,
    Button,
  },
  data() {
    return {
      loginData: { email: ""},
      errorMessage: "",
      isLoading: false,
      isError: false,
      isSubmitted: false,
    }
  },
  methods: {
    submitEmail() {
      this.isLoading = true;
      this.$store.dispatch('forgot_password')
      .then( (message) => {
        console.log(message);
        setTimeout(() => this.isLoading = false, 900);
        setTimeout(() => this.isSubmitted = true, 900);
        //this.isLoading = false;
        //this.isSubmitted = true;
      })
      .catch( (message) => {
        console.log(message);
        setTimeout(() => this.isLoading = false, 900);
        setTimeout(() => this.isError = true, 900);
        console.log(message);
        this.errorMessage = message;
        //this.isError = true;
        //this.isLoading = false;
      })
    },
  },
  computed: {
    buttonText() {
      let ret = "Request a reset link";
      if (this.isLoading)
        ret = "Loading...";
      else if (this.isSubmitted)
        ret = "Resend reset link";
      return ret;
    },
    buttonBackgroundColor() {
      for (var prop in this.loginData) {
        if (Object.prototype.hasOwnProperty.call(this.loginData, prop)) {
          console.log(prop === null);
          if (this.loginData[prop] === null)
            return "#BFEBED";
        }
      }

      return "#00AFBA";
    },
    buttonColor() {
      return this.buttonBackgroundColor === "#00AFBA" ? "#0C0826" : "6D6B7D";
    },
    buttonAction() {
      return this.isSubmitted ? () => this.isSubmitted = false : this.submitEmail;
    }
  }
}
</script>
<style scoped>

button {
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
  font-weight: 600;
  font-size: 32px;
  line-height: 32px;
  color: #3D3951; 
  text-align: center;
  margin-top: 100px;
}

.txt {
  border-width: 1px;
  border-radius: 4px;
  width: 327px;
  height: 52px;
  border-color: #3D3951;

  margin-top: 15px;
}

.link {
  color: #007B83 !important;
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: 300;
  line-height: 22.4px;
  margin-top: 16px;
  text-align: center;
}

.description {
  font-family: "Montserrat";
  font-weight: 300;
  font-size: 16px;
  line-height: 22.4px;
  text-align: left;
  margin-top: 20px;
}

.description p {
  margin-bottom: 5px;
}
</style>