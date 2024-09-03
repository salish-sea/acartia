<template>
  <div class="profile-page">
    <!-- Sidebar Menu -->
    <aside :class="{ 'secondary-navigation': true, collapsed: !isMenuVisible }">
      <div class="profile-overview" v-if="isMenuVisible">
        <div class="image-placeholder">
          <img :src="profilePicture" alt="Profile Picture" />
        </div>
        <div class="text-fields">
          <p class="name">{{ userDetails.name }}</p>
          <p class="email">{{ userDetails.email }}</p>
        </div>
      </div>

      <div class="settings-title" v-if="isMenuVisible">
        <h2>Settings</h2>
      </div>

      <nav class="menu">
        <div
          class="side-navigation-item"
          @click="navigateTo('AccountSettings')"
        >
          <img
            class="menu-icon"
            src="@/assets/menu-account-icon.svg"
            alt="Account Settings Icon"
          />
          <p v-if="isMenuVisible" class="home">Account Settings</p>
          <img
            v-if="isMenuVisible"
            src="@/assets/menu-arrow-icon.svg"
            alt="Arrow Icon"
          />
        </div>
        <div class="side-navigation-item" @click="navigateTo('ActiveTokens')">
          <img
            class="menu-icon"
            src="@/assets/menu-token-icon.svg"
            alt="Active Tokens Icon"
          />
          <p v-if="isMenuVisible" class="home">Active Tokens</p>
          <img
            v-if="isMenuVisible"
            src="@/assets/menu-arrow-icon.svg"
            alt="Arrow Icon"
          />
        </div>
        <div class="side-navigation-item" @click="navigateTo('UserReports')">
          <img
            class="menu-icon"
            src="@/assets/menu-reports-icon.svg"
            alt="User Reports Icon"
          />
          <p v-if="isMenuVisible" class="home">User Reports</p>
          <img
            v-if="isMenuVisible"
            src="@/assets/menu-arrow-icon.svg"
            alt="Arrow Icon"
          />
        </div>
        <div
          class="side-navigation-item"
          @click="navigateTo('YourContributions')"
        >
          <img
            class="menu-icon"
            src="@/assets/menu-contributions-icon.svg"
            alt="Your Contributions Icon"
          />
          <p v-if="isMenuVisible" class="home">Your Contributions</p>
          <img
            v-if="isMenuVisible"
            src="@/assets/menu-arrow-icon.svg"
            alt="Arrow Icon"
          />
        </div>
        <div class="side-navigation-item" @click="navigateTo('DeleteAccount')">
          <img
            class="menu-icon"
            src="@/assets/menu-delete-icon.svg"
            alt="Delete Account Icon"
          />
          <p v-if="isMenuVisible" class="home">Delete Account</p>
          <img
            v-if="isMenuVisible"
            src="@/assets/menu-arrow-icon.svg"
            alt="Arrow Icon"
          />
        </div>
        <div class="side-navigation-item" @click="logout">
          <img
            class="menu-icon"
            src="@/assets/menu-sign-out-icon.svg"
            alt="Sign Out Icon"
          />
          <p v-if="isMenuVisible" class="home">Sign Out</p>
        </div>
      </nav>
      <!-- Menu Hide Button -->
      <button class="menu-hide-button" @click="toggleMenu">
        <img src="@/assets/menu-action-icon.svg" alt="Menu Toggle Icon" />
      </button>
    </aside>

    <!-- Main Content Area -->
    <section v-if="disPage === 'AccountSettings'" class="profile-content">
      <!-- Notification Area -->
      <div
        v-if="notificationMessage"
        :class="['notification-message', notificationType]"
        @click="clearNotification"
      >
        <img id="notif-msg-icon" src="@/assets/notif-msg-icon.svg" alt="" />
        <div class="notification-content">{{ notificationMessage }}</div>
      </div>

      <h1>Account Settings</h1>
      <div class="profile-picture-section">
        <div class="image-placeholder large">
          <img :src="userDetails.logoFile" alt="Profile Picture" />
        </div>
        <button class="edit-icon">
          <img src="@/assets/edit-icon.svg" alt="Edit Icon" />
        </button>
      </div>

      <form class="settings-form" @submit.prevent="updateProfile">
        <div class="text-field">
          <label>Your Name</label>
          <input type="text" v-model="userDetails.name" />
        </div>
        <div class="text-field">
          <label>Website</label>
          <input type="text" v-model="userDetails.website" />
        </div>
        <div class="text-field">
          <label>Email</label>
          <input type="email" v-model="userDetails.email" />
        </div>
        <div class="text-field">
          <label>Password</label>
          <input :type="passwordFieldType" v-model="password" />
          <img
            class="password-eye-icon"
            src="@/assets/password-eye-icon.svg"
            alt="Toggle Password Visibility"
            @click="togglePasswordVisibility"
          />
        </div>
        <div class="text-field">
          <label>Confirm Password</label>
          <input :type="passwordFieldType" v-model="confirmPassword" />
          <img
            class="password-eye-icon"
            src="@/assets/password-eye-icon.svg"
            alt="Toggle Password Visibility"
            @click="togglePasswordVisibility"
          />
        </div>
        <div class="button-container">
          <button type="submit" class="save-button">Save Changes</button>
        </div>
      </form>
    </section>

    <!-- Active Token Page -->
    <section v-if="disPage === 'ActiveTokens'" class="token-content">
      <h1>Active Tokens</h1>

      <!-- Search and Filter -->
      <div class="search-filter">
        <div class="search-input">
          <input
            type="text"
            placeholder="Search tokens"
            v-model="searchTerm_token"
            @input="filterTokens"
          />
          <img src="@/assets/search-icon.svg" alt="Search Icon" />
        </div>
        <button class="filter-button">
          <img src="@/assets/filter-icon.svg" alt="Filter Icon" />
        </button>
      </div>

      <!-- Token Table -->
      <div class="token-table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Token</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="token in userTokens" :key="token.id">
              <td>{{ token.name }}</td>
              <td>{{ token.token }}</td>
              <td>{{ token.createdAt }}</td>
              <td>
                <div class="dropdown">
                  <button
                    class="dropdown-toggle"
                    @click="toggleDropdown(token.id)"
                  >
                    <img
                      src="@/assets/table-option-icon.svg"
                      alt="Actions Icon"
                    />
                  </button>
                  <ul v-if="isDropdownOpen(token.id)" class="dropdown-menu">
                    <li @click="copyToken(token.token)">Copy</li>
                    <li @click="deleteToken(token.id)">Delete</li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Create Token Button -->
      <button class="create-token-button" @click="createToken">
        Create Token
      </button>
    </section>

    <!-- Main Content Area -->
    <section
      v-if="disPage === 'YourContributions'"
      class="contributions-content"
    >
      <!-- Page Header -->
      <h1>Your Contributions</h1>

      <!-- Search and Filter -->
      <div class="search-filter">
        <div class="search-input">
          <input
            type="text"
            placeholder="Search contributions"
            v-model="searchTerm"
            @input="filterContributions"
          />
          <img src="@/assets/search-icon.svg" alt="Search Icon" />
        </div>
        <div class="filter-sort">
          <button class="filter-button">
            <img src="@/assets/filter-icon.svg" alt="Filter Icon" />
          </button>
          <button class="sort-button">
            <img src="@/assets/sort-icon.svg" alt="Sort Icon" />
          </button>
          <button class="clear-button" @click="clearFilters">
            <img src="@/assets/x-icon.svg" alt="Clear Filters" />
          </button>
        </div>
      </div>

      <!-- Active Filters -->
      <div class="active-filters">
        <div v-for="filter in activeFilters" :key="filter" class="filter-tag">
          {{ filter }}
          <img
            class="filter-icon"
            src="@/assets/x-icon.svg"
            alt="Remove Filter"
            @click="removeFilter(filter)"
          />
        </div>
      </div>

      <!-- Contributions Table -->
      <div class="contributions-table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Species</th>
              <th># Sighted</th>
              <th>Observed Behaviors</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="contribution in paginatedContributions"
              :key="contribution.id"
            >
              <td>{{ contribution.date }}</td>
              <td>{{ contribution.species }}</td>
              <td>{{ contribution.sighted }}</td>
              <td>{{ contribution.behaviors }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button
          class="pagination-button"
          @click="previousPage"
          :disabled="currentPage === 1"
        >
          <img src="@/assets/chevron-left.svg" alt="Previous Page" />
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button
          class="pagination-button"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          <img src="@/assets/chevron-right.svg" alt="Next Page" />
        </button>
      </div>

      <!-- Download Contributions Button -->
      <button
        class="download-contributions-button"
        @click="downloadContributions"
      >
        <img src="@/assets/download-icon.svg" alt="Download Contributions" />
        Download Contributions
      </button>
    </section>

    <!-- Delete Account Section -->
    <section
      v-if="disPage === 'DeleteAccount'"
      class="profile-content delete-account-content"
    >
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
          <img
            class="password-eye-icon"
            src="@/assets/password-eye-icon.svg"
            alt="Toggle Password Visibility"
            @click="togglePasswordVisibility"
          />
        </div>
        <div class="button-container">
          <button type="submit" class="delete-button">Delete Account</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { fakeContributions } from "@/fake_contribution_data.js";

export default {
  data() {
    return {
      password: "",
      confirmPassword: "",
      isMenuVisible: true,
      notificationMessage: "",
      notificationType: "", // 'success-message' or 'error-message'
      disPage: "", // Tracks the current page view
      passwordFieldType: "password",
      userTokens: [],
      searchTerm_token: "",
      openDropdownId: null,
      searchTerm_contribution: "",
      contributions: fakeContributions,
      activeFilters: ["Species: Species A"],
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    userDetails() {
      return this.$store.getters.getUserDetails;
    },
    profilePicture() {
      return "@/assets/profile-placeholder.svg";
    },
    paginatedContributions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.contributions.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.contributions.length / this.itemsPerPage);
    },
  },
  methods: {
    navigateTo(page) {
      this.disPage = page;
    },
    logout() {
      this.$store.dispatch("auth_logout").then(() => {
        this.$router.push("/");
        this.$router.go();
      });
    },
    updateProfile() {
      if (this.password !== this.confirmPassword) {
        this.notificationMessage =
          "Please confirm your new password before saving changes";
        this.notificationType = "error-message";
        return;
      }
      if (!this.password || !this.confirmPassword) {
        this.notificationMessage =
          "Password and confirm password fields cannot be empty";
        this.notificationType = "error-message";
        return;
      }
      this.notificationMessage = ""; // Clearing any previous messages

      const formData = {
        name: this.userDetails.name,
        website: this.userDetails.website,
        email: this.userDetails.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      this.$store
        .dispatch("update_profile", formData)
        .then(() => {
          this.notificationMessage = "Profile updated successfully";
          this.notificationType = "success-message";
        })
        .catch((err) => {
          this.notificationMessage = err.message || "Profile update failed";
          this.notificationType = "error-message";
        });
    },
    deleteAccount() {
      if (!this.password) {
        this.notificationMessage = "Password field cannot be empty";
        this.notificationType = "error-message";
        return;
      }
      this.notificationMessage = "Account deleted successfully";
      this.notificationType = "success-message";
    },
    togglePasswordVisibility() {
      if (this.passwordFieldType === "password") {
        this.passwordFieldType = "text";
      } else {
        this.passwordFieldType = "password";
      }
    },
    toggleDropdown(id) {
      this.openDropdownId = this.openDropdownId === id ? null : id;
    },
    isDropdownOpen(id) {
      return this.openDropdownId === id;
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    clearNotification() {
      this.notificationMessage = "";
    },
    loadUserTokens() {
      this.$store.dispatch("get_user_tokens").then((res) => {
        let getList = JSON.parse(JSON.stringify(res.data));
        this.userTokens = [];
        for (let i = 0; i < getList.length; i++) {
          let tokenData = {
            name: getList[i].name,
            token: getList[i].token,
            createdAt: dayjs(getList[i].createdAt).format("DD-MMM-YYYY"),
            id: getList[i]._id,
          };
          this.userTokens.push(tokenData);
        }
      });
    },
    copyToken(token) {
      console.log("copying - ".token);
      navigator.clipboard.writeText(token);
    },
    deleteToken(id) {
      console.log("deleting token - " + id);
    },
    filterTokens(searchTerm_token) {
      console.log(searchTerm_token);
    },
    createToken(name) {
      console.log(name);
    },
    filterContributions() {
      console.log("Filtering contributions");
    },
    clearFilters() {
      this.activeFilters = [];
    },
    removeFilter(filter) {
      this.activeFilters = this.activeFilters.filter((f) => f !== filter);
    },
    downloadContributions() {
      console.log("Downloading contributions");
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  mounted() {
    this.loadUserTokens();
  },
};
</script>

<style scoped>
/* Base layout */
.profile-page {
  display: flex;
  height: 100vh;
  background-color: #f5f7fa;
  position: relative;
}

/* Sidebar Menu */
.secondary-navigation {
  width: 25%;
  background-color: #ffffff;
  padding: 2.5rem 0;
  border-right: 0.063rem solid #9e9ca8;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: width 0.3s ease;
}

.secondary-navigation.collapsed {
  width: 5rem;
  padding-top: 6rem;
}

.menu-hide-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 9;
}

.menu-hide-button img {
  width: 2rem;
  height: 2rem;
  transform: rotate(0);
  margin-bottom: 1rem;
}

.collapsed .menu-hide-button img {
  transform: rotate(180deg);
}

.profile-overview {
  text-align: center;
  margin-bottom: 1rem;
  /* Reduced gap */
}

.image-placeholder {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  border: 0.188rem solid #3d3951;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-fields p {
  font-family: "Montserrat", sans-serif;
  color: #3d3951;
}

.name {
  font-weight: 600;
  font-size: 0.9rem;

  margin-top: 0.5rem;
}

.email {
  font-weight: 400;
  font-size: 0.7rem;

  color: #7d7d7d;
  margin-bottom: 1rem;
}

/* Notifications */
.notification-message {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  width: 905px;
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
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  line-height: 140%;
  flex-grow: 1;
}

.settings-title h2 {
  font-family: "Mukta", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  /* Reduced font size */
  color: #3d3951;
  margin-bottom: 0.5rem;
  /* Reduced gap */
  text-align: left;
  width: 100%;
  padding-left: 1.25rem;
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background: #f5f7fa;
  border: 0.063rem solid #eef1f4;
  border-radius: 0.375rem;
  padding: 0;
}

.side-navigation-item {
  width: 100%;
  padding: 1rem;

  font-size: 0.8rem;

  color: #3d3951;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: 0.063rem solid #eef1f4;
  background-color: #ffffff;
  justify-content: center;
}

.home {
  margin: 0;
  margin-left: 0.5rem;

  line-height: 1.25rem;

  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.side-navigation-item:hover,
.side-navigation-item.active {
  background-color: rgba(8, 13, 38, 0.05);
}

.menu-icon {
  width: 1.5rem;

  height: 1.5rem;

  margin: 0 auto;
}

/* Profile Content */
.profile-content {
  flex-grow: 1;
  padding: 3vw;

  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.profile-content h1 {
  font-size: 1.6rem;

  margin-bottom: 1rem;

  font-family: "Mukta", sans-serif;
  font-weight: 600;
  color: #3d3951;
}

.profile-picture-section {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  position: relative;
}

.image-placeholder.large {
  width: 10rem;

  height: 10rem;

  border-radius: 50%;
  border: 0.188rem solid #3d3951;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.edit-icon {
  position: absolute;
  background: rgba(8, 13, 38, 0.1);
  border-radius: 0.625rem;
  padding: 0.25rem;

  cursor: pointer;
  width: 2.5rem;

  height: 2.5rem;

  top: 92%;

  left: 90%;

  transform: translate(-50%, -50%);
}

.edit-icon img {
  width: 100%;
  height: 100%;
}

.settings-form {
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
}

.text-field label {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 0.6rem;

  color: #3d3951;
}

.text-field input {
  width: 100%;
  padding: 0.6rem;

  border: 0.063rem solid #3d3951;
  border-radius: 0.25rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 0.8rem;

  color: #0c0826;
}

.text-field .password-eye-icon {
  position: relative;
  right: -16rem;

  top: calc(-27% - 0.5rem);

  cursor: pointer;
  width: 1.2rem;

  height: 1.2rem;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.save-button {
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

.save-button:hover {
  background-color: #008f9b;
  color: white;
}

/* Delete Account */
.delete-account-content {
  flex-grow: 1;
  padding: 3vw;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.delete-account-form {
  width: 100%;
  max-width: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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

.token-content {
  flex-grow: 1;
  padding: 3vw;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.token-content h1 {
  font-size: 1.6rem;
  font-family: "Mukta", sans-serif;
  font-weight: 600;
  color: #3d3951;
  margin-bottom: 1rem;
}

.search-filter {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
}

.search-input {
  display: flex;
  align-items: center;
  border: 1px solid #3d3951;
  border-radius: 6px;
  padding: 10px;
  flex-grow: 1;
}

.search-input input {
  border: none;
  outline: none;
  flex-grow: 1;
  font-size: 1rem;
  color: #6d6b7d;
}

.search-input img {
  margin-left: 10px;
  cursor: pointer;
}

.filter-button {
  background: #eef1f4;
  border-radius: 6px;
  padding: 12px;
  margin-left: 10px;
  cursor: pointer;
}

.filter-button img {
  width: 24px;
  height: 24px;
}

.token-table-container {
  width: 100%;
  max-width: 800px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead tr {
  background-color: #eef1f4;
  color: #3d3951;
}

thead th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid #6d6b7d;
}

tbody tr {
  background-color: #fff;
  border-bottom: 1px solid #6d6b7d;
}

tbody td {
  padding: 12px 16px;
  text-align: center;
}

.create-token-button {
  background-color: #00afba;
  color: white;
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  display: block;
  position: absolute;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  padding: 8px 0;
  z-index: 1000;
  list-style: none;
  border-radius: 4px;
  margin: 0;
  min-width: 120px;
}

.dropdown-menu li {
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}

.dropdown-menu li:hover {
  background-color: #f5f7fa;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination-button {
  background: #eef1f4;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
}

.pagination-button img {
  width: 24px;
  height: 24px;
}

/* Download Contributions Button */
.download-contributions-button {
  background-color: #00afba;
  color: white;
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.download-contributions-button img {
  width: 24px;
  height: 24px;
}

.contributions-page {
  display: flex;
  height: 100vh;
  background-color: #f5f7fa;
  position: relative;
}

/* Contributions Content */
.contributions-content {
  flex-grow: 1;
  padding: 3vw;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.contributions-content h1 {
  font-size: 1.6rem;
  font-family: "Mukta", sans-serif;
  font-weight: 600;
  color: #3d3951;
  margin-bottom: 1rem;
}

/* Search and Filter */
.search-filter {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
}

.filter-icon {
  height: auto;
  width: 0.8rem;
}

.search-input {
  display: flex;
  align-items: center;
  border: 1px solid #3d3951;
  border-radius: 6px;
  padding: 10px;
  flex-grow: 1;
}

.search-input input {
  border: none;
  outline: none;
  flex-grow: 1;
  font-size: 1rem;
  color: #6d6b7d;
}

.search-input img {
  margin-left: 10px;
  cursor: pointer;
}

.filter-sort {
  display: flex;
  gap: 10px;
}

.filter-button,
.sort-button,
.clear-button {
  background: #eef1f4;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
}

.filter-button img,
.sort-button img,
.clear-button img {
  width: 24px;
  height: 24px;
}

/* Active Filters */
.active-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.filter-tag {
  display: flex;
  align-items: center;
  background: #eef1f4;
  border-radius: 24px;
  padding: 8px 16px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #3d3951;
  gap: 8px;
}

.filter-tag img {
  cursor: pointer;
}

/* Contributions Table */
.contributions-table-container {
  width: 100%;
  max-width: 800px;
}
</style>
