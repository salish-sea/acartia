<template>
  <div class="profile-page">
    <button class="mobile-menu-hide-button" @click="toggleMenu">
      <img src="@/assets/mobile-menu-action-icon.svg" alt="Menu Toggle Icon" />
    </button>
    <!-- Sidebar Menu -->
    <aside :class="{ 'secondary-navigation': true, collapsed: !isMenuVisible }">
      <!-- Menu Hide Button -->
      <button class="menu-hide-button" @click="toggleMenu">
        <img src="@/assets/menu-action-icon.svg" alt="Menu Toggle Icon" />
      </button>
      <div class="profile-overview" v-if="isMenuVisible || isMobile">
        <div class="image-placeholder">
          <img :src="profilePicture" alt="Profile Picture" />
        </div>
        <div class="text-fields">
          <p class="name">{{ userDetails.name }}</p>
          <p class="email">{{ userDetails.email }}</p>
        </div>
      </div>

      <div class="settings-title" v-if="isMenuVisible || isMobile">
        <h2>Settings</h2>
      </div>

      <nav class="menu">
        <div class="side-navigation-item" @click="navigateTo('account-settings')">
          <img class="menu-icon" src="@/assets/menu-account-icon.svg" alt="Account Settings Icon" />
          <p v-if="isMenuVisible || isMobile" class="home">Account Settings</p>
          <img v-if="isMenuVisible" class="arrow-icon" src="@/assets/menu-arrow-icon.svg" alt="Arrow Icon" />
        </div>
        <div class="side-navigation-item" @click="navigateTo('active-tokens')">
          <img class="menu-icon" src="@/assets/menu-token-icon.svg" alt="Active Tokens Icon" />
          <p v-if="isMenuVisible || isMobile" class="home">Active Tokens</p>
          <img v-if="isMenuVisible" class="arrow-icon" src="@/assets/menu-arrow-icon.svg" alt="Arrow Icon" />
        </div>
        <div class="side-navigation-item" @click="navigateTo('user-reports')">
          <img class="menu-icon" src="@/assets/menu-reports-icon.svg" alt="User Reports Icon" />
          <p v-if="isMenuVisible || isMobile" class="home">User Reports</p>
          <img v-if="isMenuVisible" class="arrow-icon" src="@/assets/menu-arrow-icon.svg" alt="Arrow Icon" />
        </div>
        <div class="side-navigation-item" @click="navigateTo('your-contributions')">
          <img class="menu-icon" src="@/assets/menu-contributions-icon.svg" alt="Your Contributions Icon" />
          <p v-if="isMenuVisible || isMobile" class="home">
            Your Contributions
          </p>
          <img v-if="isMenuVisible" class="arrow-icon" src="@/assets/menu-arrow-icon.svg" alt="Arrow Icon" />
        </div>
        <div class="side-navigation-item" @click="navigateTo('delete-account')">
          <img class="menu-icon" src="@/assets/menu-delete-icon.svg" alt="Delete Account Icon" />
          <p v-if="isMenuVisible || isMobile" class="home">Delete Account</p>
          <img v-if="isMenuVisible" class="arrow-icon" src="@/assets/menu-arrow-icon.svg" alt="Arrow Icon" />
        </div>
        <div class="side-navigation-item" @click="logout">
          <img class="menu-icon" src="@/assets/menu-sign-out-icon.svg" alt="Sign Out Icon" />
          <p v-if="isMenuVisible || isMobile" class="home">Sign Out</p>
        </div>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <section class="profile-content">
      <!-- Dynamic Component Rendering based on section prop -->
      <component :is="currentPageComponent" />
    </section>
  </div>
</template>

<script>
import AccountSettings from "./ProfileComponents/AccountSettings.vue";
import ActiveTokens from "./ProfileComponents/ActiveTokens.vue";
import DeleteAccount from "./ProfileComponents/DeleteAccount.vue";
import Contributions from "./ProfileComponents/Contributions.vue";
import UserReports from "./ProfileComponents/UserReports.vue";

export default {
  props: ["section"], // Accept section as a prop
  components: {
    AccountSettings,
    ActiveTokens,
    DeleteAccount,
    Contributions,
    UserReports
  },
  data() {
    return {
      isMenuVisible: true, // Menu is visible by default for desktop
      isMobile: false // Track if it's mobile view or not
    };
  },
  computed: {
    userDetails() {
      return this.$store.getters.getUserDetails;
    },
    profilePicture() {
      return this.userDetails.picture;
    },
    currentPageComponent() {
      const components = {
        "account-settings": "AccountSettings",
        "active-tokens": "ActiveTokens",
        "user-reports": "UserReports",
        "your-contributions": "Contributions",
        "delete-account": "DeleteAccount"
      };
      return components[this.section] || "AccountSettings";
    }
  },
  methods: {
    navigateTo(page) {
      this.$router.push({ name: "Profile", params: { section: page } });
      if (this.isMobile) {
        this.toggleMenu(); // Close the menu if in mobile view
      }
    },
    logout() {
      this.$store.dispatch("auth_logout").then(() => {
        this.$router.push("/");
        this.$router.go();
      });
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    updateViewBasedOnWidth() {
      // Detect mobile view using matchMedia
      this.isMobile = window.matchMedia("(max-width: 768px)").matches;
    }
  },
  mounted() {
    this.updateViewBasedOnWidth(); // Set initial view on mount
    window.addEventListener("resize", this.updateViewBasedOnWidth); // Update on resize
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateViewBasedOnWidth); // Clean up event listener
  }
};
</script>

<style scoped>
/* Base layout */
.profile-page {
  display: flex;
  background-color: #f5f7fa;
  height: 90vh;
  /* Full viewport height */
  overflow-y: hidden !important;
  /* Scroll when necessary */
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
  transition: width 0.3s ease;
}

.secondary-navigation.collapsed {
  width: 5rem;
}

.menu-hide-button {
  position: relative;
  top: -1.5rem;
  right: 1rem;
  margin-left: auto;
  background: transparent;
  border: none;
  cursor: pointer;
}

.menu-hide-button img {
  width: 2rem;
  height: 2rem;
  transform: rotate(0);
}

.secondary-navigation.collapsed .menu-hide-button img {
  transform: rotate(180deg);
}

.profile-overview {
  text-align: center;
  margin-bottom: 1rem;
}

.image-placeholder {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  border: 0.188rem solid #3d3951;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
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

.settings-title h2 {
  font-family: "Mukta", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: #3d3951;
  margin-bottom: 0.5rem;
  text-align: left;
  width: 100%;
  padding-left: 1.25rem;
  position: relative;
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
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
  background-color: #ffffff;
  justify-content: center;
  border-bottom: 0.063rem solid #eef1f4;
}

.side-navigation-item:first-child {
  border-top: 0.063rem solid #eef1f4;
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
}

/* Arrow icon */
.arrow-icon {
  width: 1rem;
  height: 1rem;
  margin-left: auto;
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
  overflow-y: auto;
  /* Enable scroll only if content overflows */
  overflow-x: hidden !important;
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

.mobile-menu-hide-button {
  display: none;
}

/* Mobile-specific styles */
@media (max-width: 768px) {
  .secondary-navigation {
    display: none;
    /* Hide the sidebar */
  }

  .menu-hide-button {
    display: none;
  }

  .secondary-navigation.collapsed {
    margin-top: 5vh;
    display: flex;
    /* Show the collapsed sidebar */
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    height: 95vh;
    background-color: #fff;
    /* Background for menu */
  }

  .mobile-menu-hide-button {
    display: block;
    position: absolute;
    top: 5.5rem;
    border: none;
    background-color: transparent;
  }

  /* Hide content when the sidebar is visible */
  .secondary-navigation.collapsed+.profile-content {
    display: none;
  }

  .profile-page {
    flex-direction: column;
  }

  .profile-content {
    width: 100% !important;
    /* Make the profile content occupy the full width */
    padding: 1rem;
  }
}
</style>
