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

      <TextInput v-if="!isSubmitted" v-model.trim="loginData.email" label="Email" :is-password-field="false"
        :isError="isError" />

    <Button @click="buttonAction" :isLoading="isLoading" :formData="loginData">
      {{ buttonText }}
    </Button>

    <router-link class="link" to="/login">Return to login</router-link>
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
      function validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

      this.isLoading = true;

      if (!validateEmail(this.loginData.email)) {
        this.errorMessage = "Email is invalid";
        this.isError = true;
        this.isLoading = false;
        return;
      }

      this.$store.dispatch('forgot_password', this.loginData)
      .then( (message) => {
        console.log(message);
        this.isLoading = false;
        this.isSubmitted = true;
      })
      .catch( (message) => {
        console.log(message);
        this.errorMessage = message;
        this.isError = true;
        this.isLoading = false;
      });
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
  font-weight: 500;
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
