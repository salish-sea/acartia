<template>
  <div>
    <section class="reset-password-section">
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
          :is-password-field="true"
          :isError="isError"
        />
        <TextInput 
          v-model.trim="data.confirmPassword"
          label="Confirm Password" 
          :is-password-field="true"
          :isError="isError"
        />

        <Button @click="resetPassword" :isLoading="isLoading" :formData="data">
          Reset password
        </Button>
      </form>

      <Button v-if="isSubmitted" @click="() => $router.replace({name: 'Login'})">
        Log In
      </Button>
    </section>
  </div>
</template>
<script>
import TextInput from '../Form/TextInput.vue';
import ErrorMessage from '../Form/ErrorMessage.vue';
import Button from '../Form/Button.vue';
import axios from 'axios';

export default {
  name: "reset-password",
  components: {
    TextInput,
    ErrorMessage,
    Button,
  },
  data() {
    return {
      data: { password: "", confirmPassword: ""},
      errorMessage: "",
      isLoading: false,
      isSubmitted: false,
      isError: false,
    }
  },
  async mounted() {
    const requestAuth = {
      headers: {
        'Content-Type': 'application/json', // TODO: is this even right??  
      }
    }
    const token = this.$route.query.token;
    const url = `${process.env.VUE_APP_WEB_SERVER_URL}/v1/forgot-password/${token}`;
    try {
      if (!token) throw new Error('Missing token');
      await axios.get(url, requestAuth);
    } catch (err) {
      if (err.response.status === 404) 
        alert('Error: Invalid token')
        this.$router.replace({ name: 'Home'});
    }

  },
  methods: {
    validatePasswords(password, confirmPassword) {
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
    },

    resetPassword() {
      try {
        if (this.data.password || this.data.confirmPassword) {
          this.validatePasswords(this.data.password, this.data.confirmPassword);

          this.$store.dispatch('reset_password', this.data.password)
            .then((response) => {
              console.log(response.statusText);
              this.isLoading = false;
              this.isSubmitted = true;
            })
            .catch((err) => {
              this.errorMessage = err.response.status === 404 ? "Token has expired or doesn't exist" : err.message;
              this.isError = true;
              this.isLoading = false;
            })
        }
      }
      catch(error)  {
        this.isError = true;
        this.errorMessage = error.message;
      }
    }
  },
}
</script>
<style scoped>

button {
  margin-top: 36px;
}

.header {
  width: 411px;
  font-family: "Mukta";
  font-weight: 500;
  font-size: 32px;
  line-height: 32px;
  color: #3D3951; 
  text-align: center;
  margin-top: 100px;
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

.error-message {
  width: 327px;
}

</style>