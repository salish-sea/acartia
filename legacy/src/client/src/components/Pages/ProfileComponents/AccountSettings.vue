<template>
  <div class="account-settings-container">
    <h1 class="settings-header">Account Settings</h1>
    <div class="profile-picture-section">
      <div class="image-placeholder large">
        <img :src="profilePicture" alt="Profile Picture" v-if="profilePicture" />
        <img src="@/assets/profile-placeholder.svg" alt="Profile Picture Placeholder" v-else />
      </div>
      <button class="edit-icon" @click="triggerFileInput">
        <img src="@/assets/edit-icon.svg" alt="Edit Icon" />
      </button>
      <input type="file" ref="fileInput" style="display: none" @change="onFileChange" />
    </div>

    <form class="settings-form" @submit.prevent="updateProfile">
      <div class="text-field">
        <label class="label-text">Your Name</label>
        <input class="input-text" type="text" v-model="userDetails.name" />
      </div>
      <div class="text-field">
        <label class="label-text">Website</label>
        <input class="input-text" type="text" v-model="userDetails.website" />
      </div>
      <div class="text-field">
        <label class="label-text">Email</label>
        <input class="input-text" type="email" v-model="userDetails.email" />
      </div>
      <div class="text-field">
        <label class="label-text">Password</label>
        <input class="input-text" :type="passwordFieldType" v-model="password" />
        <img class="password-eye-icon" src="@/assets/password-eye-icon.svg" alt="Toggle Password Visibility"
          @click="togglePasswordVisibility" />
      </div>
      <div class="text-field">
        <label class="label-text">Confirm Password</label>
        <input class="input-text" :type="passwordFieldType" v-model="confirmPassword" />
        <img class="password-eye-icon" src="@/assets/password-eye-icon.svg" alt="Toggle Password Visibility"
          @click="togglePasswordVisibility" />
      </div>
      <div class="button-container">
        <button type="submit" class="save-button">Save Changes</button>
      </div>
    </form>

    <!-- Modal for showing success or error messages -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ modalTitle }}</h3>
        <p>{{ modalMessage }}</p>
        <button @click="closeModal" class="modal-button">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      confirmPassword: "",
      passwordFieldType: "password",
      logoFile: null,
      showModal: false,
      modalTitle: "",
      modalMessage: "",
    };
  },
  computed: {
    userDetails() {
      return this.$store.getters.getUserDetails;
    },
    profilePicture() {
      return this.userDetails.picture || null;
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    triggerFileInput() {
      // Trigger the hidden file input
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.logoFile = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    updateProfile() {
      if (this.password && this.password !== this.confirmPassword) {
        this.$store.commit("addToast", { message: "Passwords Do Not Match", status: "error" })
        return;
      }

      const formData = {
        name: this.userDetails.name,
        website: this.userDetails.website,
        email: this.userDetails.email,
        password: this.password, // If password is set
        logoFile: this.logoFile, // Include the updated profile picture if changed
      };

      // Dispatch the update profile action
      this.$store
        .dispatch("update_profile", formData)
        .then(() => {
          this.$store.commit("addToast", { message: "Profile Updated Successfully", status: "success" })
        })
        .catch(() => {
          this.$store.commit("addToast", { message: "Error Updating Profile", status: "error" })
        });
    },
  },
};
</script>

<style scoped>
.account-settings-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.settings-header {
  font-family: "Mukta", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: #3d3951;
  text-align: center;
  margin-bottom: 1.5rem;
}

.profile-picture-section {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  position: relative;
}

.image-placeholder.large {
  width: 9rem;
  height: 9rem;
  border: 0.2rem solid #3d3951;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.large {
  width: 100%;
  height: auto;
}

.edit-icon {
  position: absolute;
  background: rgba(8, 13, 38, 0.1);
  border-color: black;
  border-radius: 0.625rem;
  padding: 0.25rem;
  cursor: pointer;
  width: 2.5rem;
  height: auto;
  top: 7.5rem;
  left: 6.5rem;
}

.edit-icon img {
  width: 100%;
  height: 100%;
}

.settings-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 20rem;
  gap: 1rem;
}

.text-field {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 0.4rem;
}

.label-text {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: #3d3951;
}

.input-text {
  width: 100%;
  height: 2.5rem;
  padding: 0.4rem 1rem;
  border: 0.063rem solid #3d3951;
  border-radius: 0.25rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 1rem;
  color: #0c0826;
}

.password-eye-icon {
  position: absolute;
  right: 1rem;
  top: 3.5rem;
  transform: translateY(-50%);
  cursor: pointer;
  width: 1.25rem;
  height: 1.25rem;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.save-button {
  padding: 0.625rem 1.5rem;
  background-color: #bfebed;
  color: #6d6b7d;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  text-align: center;
}

.save-button:hover {
  background-color: #008f9b;
  color: white;
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.modal-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #008f9b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-button:hover {
  background-color: #006f78;
}
</style>
