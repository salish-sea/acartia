<template>
  <div class="profile-content delete-account-content">
    <!-- Notification Area -->
    <div v-if="notificationMessage" :class="['notification-message', notificationType]" @click="clearNotification">
      <img id="notif-msg-icon" src="@/assets/notif-msg-icon.svg" alt="" />
      <div class="notification-content">{{ notificationMessage }}</div>
    </div>

    <h1>Delete your account?</h1>
    <p>
      You will lose all your data by deleting your account, and your
      contributions will be removed. This action cannot be undone.
    </p>
    <p>To delete your account, input your password below.</p>
    <form class="delete-account-form" @submit.prevent="deleteAccount">
      <div class="text-field">
        <label>Password</label>
        <input :type="passwordFieldType" v-model="password" />
        <img class="password-eye-icon" src="@/assets/password-eye-icon.svg" alt="Toggle Password Visibility"
          @click="togglePasswordVisibility" />
      </div>
      <div class="button-container">
        <button type="submit" class="delete-button">Delete Account</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'; // Import axios

export default {
  data() {
    return {
      password: '',
      passwordFieldType: 'password',
      notificationMessage: '',
      notificationType: '', // 'success-message' or 'error-message'
    };
  },
  methods: {
    async deleteAccount() {
      if (!this.password) {
        this.notificationMessage = 'Password field cannot be empty';
        this.notificationType = 'error-message';
        return;
      }

      try {
        const accessToken = this.$store.state.accessToken; // Assuming you store the token in Vuex
        const userId = this.$store.state.userId; // Assuming the user ID is also stored in Vuex

        // Make the delete API call with Axios
        await axios.delete(`${process.env.VUE_APP_WEB_SERVER_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: { password: this.password }, // Send the password in the request body
        });

        this.notificationMessage = 'Account deleted successfully';
        this.notificationType = 'success-message';

        // Redirect to home page or login page after account deletion
        setTimeout(() => {
          this.$router.push('/');
        }, 2000);
      } catch (error) {
        this.notificationMessage = error.response.data.message || 'Account deletion failed';
        this.notificationType = 'error-message';
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
    clearNotification() {
      this.notificationMessage = '';
    },
  },
};
</script>

<style scoped>
/* Include the styles related to the delete account page */

/* Delete Account Content */
.delete-account-content {
  flex-grow: 1;
  padding: 3vw;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.delete-account-content h1 {
  font-size: 1.6rem;
  font-family: 'Mukta', sans-serif;
  font-weight: 600;
  color: #3d3951;
  margin-bottom: 1rem;
}

.delete-account-form {
  width: 100%;
  max-width: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.text-field {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;
}

.text-field label {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 0.6rem;
  color: #3d3951;
}

.text-field input {
  width: 100%;
  padding: 0.6rem;
  border: 0.063rem solid #3d3951;
  border-radius: 0.25rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
  color: #0c0826;
}

.password-eye-icon {
  position: absolute;
  right: 1rem;
  top: 2.5rem;
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.delete-button {
  padding: 0.5rem 1.2rem;
  background-color: #bfebed;
  color: #6d6b7d;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  font-size: 0.8rem;
  width: 100%;
  text-align: center;
}

.delete-button:hover {
  background-color: #ff6666;
  color: white;
}

/* Notifications */
.notification-message {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  width: 100%;
  max-width: 905px;
  height: 48px;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.error-message {
  background: #f9cdcd;
  color: #d8000c;
}

.success-message {
  background: #bfebed;
  color: #3d3951;
}

#notif-msg-icon {
  width: 24px;
  height: 24px;
}

.notification-content {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  line-height: 140%;
  flex-grow: 1;
}
</style>
