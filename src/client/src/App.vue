<template>
  <div>
    <nav id="navbar-top">
      <router-link to="/home" class="navbar-brand" @click="closeMobileMenu">
        <img src="@/assets/nav-bar-icon.svg" alt="Nav Bar Icon" class="nav-bar-icon" />
        Acartia
      </router-link>
      <div class="hamburger-menu menu-icon" @click="toggleMobileMenu">
        <img src="@/assets/hamburger-icon.svg" alt="Menu" />
      </div>
      <div :class="['navbar-links', { 'mobile-visible': isMobileMenuOpen }]">
        <div class="close-menu menu-icon" @click="toggleMobileMenu">
          <img src="@/assets/close-icon.svg" alt="Close Menu" />
        </div>
        <router-link to="/home" @click.native="closeMobileMenu" :class="{ active: isActive('/home') }">
          <img src="@/assets/menu-map-icon.svg" alt="Map Icon" class="menu-icon" />
          Home
        </router-link>
        <router-link to="/about" :class="{ active: isActive('/about') }" @click.native="closeMobileMenu">
          <img src="@/assets/menu-about-icon.svg" alt="About Icon" class="menu-icon" />
          About
        </router-link>
        <router-link to="/partners" :class="{ active: isActive('/partners') }" @click.native="closeMobileMenu">
          <img src="@/assets/menu-contributors-icon.svg" alt="Contributors Icon" class="menu-icon" />
          Partners
        </router-link>
        <router-link to="/reports" :class="{ active: isActive('/reports') }" @click.native="closeMobileMenu">
          <img src="@/assets/menu-reports-icon.svg" alt="Reports Icon" class="menu-icon" />
          Reports
        </router-link>

        <!-- Map Dropdown -->
        <div class="dropdown" @mouseenter="toggleDropdown('mapDropdown')" @mouseleave="toggleDropdown(null)"
        :class="{ active: isActive(['/data-explorer', '/heatmap']) }">
          <div class="dropdown-link" @click="navigateToDataExplorer">
            <img src="@/assets/menu-map-icon.svg" alt="Map Icon" class="menu-icon" />
            Map
          </div>
          <div v-if="isDropdownOpen === 'mapDropdown'" class="dropdown-content">
            <router-link to="/data-explorer" @click.native="closeMobileMenu">
              Data Explorer
            </router-link>
            <router-link to="/heatmap" @click.native="closeMobileMenu">
              Heatmap
            </router-link>
          </div>
        </div>

        <!-- Contribute Dropdown -->
        <div v-if="isAuth" class="dropdown" @mouseenter="toggleDropdown('contributeDropdown')"
          @mouseleave="toggleDropdown(null)">
          <div class="dropdown-link">
            <img src="@/assets/menu-contribute-icon.svg" alt="Contribute Icon" class="menu-icon" />
            Contribute
          </div>
          <div v-if="isDropdownOpen === 'contributeDropdown'" class="dropdown-content">
            <router-link to="/integrate" v-if="isAuth">How To Contribute</router-link>
            <router-link to="/upload">Upload File</router-link>
            <router-link to="/import-data">Import Data Manually</router-link>
            <router-link to="/export-data">Export Data</router-link>
            <router-link to="/github">Github</router-link>
            <router-link to="/contact-us">Contact Us</router-link>
          </div>
        </div>

        <!-- Profile Dropdown -->
        <div v-if="isAuth" class="dropdown" @mouseenter="toggleDropdown('profileDropdown')"
          @mouseleave="toggleDropdown(null)">
          <div class="dropdown-link" @click="navigateToAccountSettings">
            <img src="@/assets/menu-account-icon.svg" class="profile-icon" alt="Profile Icon" />
            <img v-if="!isMobileMenuOpen" src="@/assets/down-arrow-icon.svg" alt="Down Arrow Icon"
              class="down-arrow-icon" />
            <div v-if="isMobileMenuOpen">Profile</div>
          </div>
          <div v-if="isDropdownOpen === 'profileDropdown'" class="dropdown-content dropdown-offset">
            <router-link to="/profile/account-settings">Update Profile</router-link>
            <router-link to="/profile/active-tokens">Create Token</router-link>
            <router-link to="/profile/user-reports">User Report</router-link>
            <router-link to="/profile/your-contributions">Contributor Profile</router-link>
            <router-link to="/profile/delete-account">Delete Profile</router-link>
            <a v-if="!isMobileMenuOpen" @click="logoutMethod"><img src="@/assets/menu-sign-out-icon.svg"
                alt="Log In Icon" class="menu-icon" />Log Out</a>
          </div>
        </div>

        <!-- Log Out - Visible only on mobile -->
        <div v-if="isAuth && isMobileMenuOpen">
          <div @click="logoutMethod" class="logout-link">
            <img src="@/assets/menu-sign-out-icon.svg" alt="Sign Out Icon" class="menu-icon" />
            Log Out
          </div>
        </div>

        <!-- Login and Sign Up -->
        <router-link to="/login" v-if="!isAuth" class="login-button button-primary" @click.native="closeMobileMenu">
          <img src="@/assets/menu-sign-out-icon.svg" alt="Log In Icon" class="menu-icon" />
          Login
        </router-link>
        <router-link to="/register" v-if="!isAuth" class="button-secondary" @click.native="closeMobileMenu">
          <img src="@/assets/menu-sign-up-icon.svg" alt="Sign Up Icon" class="menu-icon" />
          Sign Up
        </router-link>
      </div>
    </nav>
    <div id="app">
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isDropdownOpen: null,
      isMobileMenuOpen: false // Track mobile menu state
    };
  },
  created() {
    axios.interceptors.response.use(undefined, err => {
      return new Promise((resolve, reject) => {
        if (
          err.response &&
          err.response.status === 401 &&
          err.config &&
          !err.config.__isRetryRequest
        ) {
          this.$store.dispatch("auth_logout");
          this.$router.push("/login");
          resolve();
        } else {
          reject(err);
        }
      });
    });
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    toggleDropdown(dropdown) {
      this.isDropdownOpen = this.isDropdownOpen === dropdown ? null : dropdown;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
      this.isDropdownOpen = null; // Close any open dropdowns
    },
    logoutMethod() {
      this.$store.dispatch("auth_logout").then(() => {
        this.$router.push("/");
        this.$router.go();
      });
    },
    isActive(routes) {
      if (Array.isArray(routes)) {
        return routes.includes(this.$route.path);
      }
      return this.$route.path === routes;
    },
    navigateToDataExplorer() {
      this.$router.push("/data-explorer");
    },
    navigateToAccountSettings() {
      this.$router.push("/profile/account-settings");
    }
  },
  computed: {
    isAuth() {
      return this.$store.state.isAuthenticated;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    isMobile() {
      return window.innerWidth > 768;
    }
  }
};
</script>

<style scoped>
/* Navbar Container */
#navbar-top {
  position: sticky;
  top: 0;
  z-index: 99999;
  height: 70px;
  background-color: #e6f7f9;
  padding: 5px 30px;
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

/* Navbar Brand */
.navbar-brand {
  justify-content: left;
  display: flex;
  align-items: center;
  font-family: "Mukta", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #00585d;
  text-decoration: none;
}

.nav-bar-icon {
  width: 3.25rem;
  height: auto;
  margin-right: 1rem;
}

.brand-title {
  display: inline-block;
}

.menu-icon {
  filter: brightness(0) saturate(100%) invert(7%) sepia(13%) saturate(3485%) hue-rotate(176deg) brightness(94%) contrast(90%);
}

/* Navbar Links */
.navbar-links a,
.dropdown-link,
.logout-link {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: #00585d;
  text-decoration: none;
}

.navbar-links a:hover,
.dropdown-link:hover,
.logout-link:hover {
  color: #004049;
  background-color: #e6f7f9;
}

/* mobile styles */
@media (max-width: 768px) {

  /* Hamburger Menu Icon */
  .hamburger-menu {
    display: block;
    cursor: pointer;
  }

  .hamburger-menu img {
    margin-top: 0.8rem;
    width: 32px;
    height: 32px;
  }

  /* Close Menu Icon */
  .close-menu {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }

  .close-menu img {
    width: 1.5rem;
    height: auto;
  }

  /* Mobile Menu Visibility */
  .mobile-visible {
    display: flex !important;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #e6f7f9;
    padding-top: 60px;
    overflow-y: auto;
    flex-direction: column;
    align-items: flex-start;
    z-index: 998;
    animation: slideIn 0.3s forwards;
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }

    to {
      transform: translateX(0);
    }
  }

  /* Navbar Links */
  .navbar-links a,
  .dropdown-link,
  .logout-link {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    color: #00585d;
    text-decoration: none;
    transition: color 0.3s ease, transform 0.3s ease;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    width: 100vw;
    box-sizing: border-box;
    text-align: left;
    cursor: pointer;
  }

  .navbar-links a:hover,
  .dropdown-link:hover,
  .logout-link:hover {
    color: #004049;
    background-color: #e6f7f9;
  }

  .dropdown-link {
    gap: 0.65rem;
  }

  .navbar-links a img,
  .logout-link img {
    margin-right: 10px;
    fill: #000;
    transition: transform 0.3s ease;
  }

  .navbar-links a img:hover,
  .logout-link img:hover {
    transform: scale(1.1);
  }

  /* Dropdown Styles */
  .dropdown-content {
    display: flex;
    flex-direction: column;
    background-color: inherit;
    width: 100%;
    animation: fadeIn 0.3s forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .dropdown-content a {
    display: block;
    padding: 15px 20px;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    color: #00585d;
    text-decoration: none;
    border-bottom: 1px solid #ddd;
    width: calc(100% - 40px);
    box-sizing: border-box;
  }

  /* Responsive Styles */
  #navbar-top {
    flex-direction: row;
    justify-content: space-between;
  }

  .navbar-brand {
    flex: 1;
    justify-content: space-between;
  }

  .brand-title {
    display: none;
  }

  .navbar-links,
  .auth-links {
    display: none;
    flex-direction: column;
    width: 100%;
    text-align: left;
  }

  .navbar-links a,
  .auth-links a {
    width: 100%;
    padding: 15px 0;
    margin: 0;
    border-bottom: 1px solid #ddd;
    padding-left: 1rem;
  }
}

/* Hide hamburger and close icons on larger screens */
@media (min-width: 769px) {
  .profile-icon {
    width: 2rem !important;
    height: auto;
    display: block !important;
  }

  /* Active Link with Squiggly Underline */
  .navbar-links a.active {
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-color: #00afba;
  }

  .hamburger-menu,
  .close-menu {
    display: none;
  }

  .navbar-links {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .navbar-links a,
  .dropdown-link {
    padding: 0 15px;
    border-bottom: none;
    width: auto;
    box-sizing: content-box;
    font-weight: bold;
  }

  .navbar-links img {
    display: none;
  }

  /* Primary and Secondary Button */
  .button-primary,
  .button-secondary {
    margin-left: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 2rem !important;
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    border-radius: 0.35rem;
    cursor: pointer;
    text-decoration: none;
  }

  /* Primary Button */
  .button-primary {
    background: #00afba;
    color: #0c0826;
    margin-left: 2rem;
  }

  /* Secondary Button */
  .button-secondary {
    background: transparent;
    color: #00585d;
    border: 1px solid #00585d !important;
  }

  /* Button Hover Effects */
  .button-primary:hover {
    background: #00979d !important;
    border-color: 1px solid #00585d !important;
  }

  .button-secondary:hover {
    background: rgba(0, 88, 93, 0.1) !important;
  }

  /* Dropdown Styles */
  .dropdown {
    position: relative;
  }

  .dropdown-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* Style for the dropdown content */
  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 10.25em;
    background-color: #ffffff;
    border-radius: 0 0 16px 16px;
    border: 0.0025rem solid #6d6b7d;
  }

  /* invisible hover area around the dropdown */
  .dropdown:after {
    content: "*";
    position: absolute;
    top: -1.5rem;
    left: -1.75rem;
    right: -1.75rem;
    bottom: -2.25rem;
    color: transparent;
  }

  .dropdown:hover .dropdown-content {
    display: flex;
    flex-direction: column;
    margin-top: 2.85rem;
  }

  .dropdown:hover .dropdown-content {
    right: auto;
    left: auto;
    transform: translateX(-30%);
    /* Center align dropdown */
  }

  .dropdown-content a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 3.5rem;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 30px;
    color: #0c0826;
    text-decoration: none;
    border-bottom: 0.5px solid #000000;
    box-sizing: border-box;
    transition: background-color 0.3s ease;
  }

  .dropdown-offset {
    margin-right: 2.75rem !important;
  }

  .dropdown-content a:last-child {
    border-bottom: none;
  }

  .dropdown-content a:hover {
    background-color: rgba(0, 88, 93, 0.1);
  }

  .down-arrow-icon {
    width: 16px;
    height: 16px;
    filter: brightness(0) saturate(100%) invert(7%) sepia(13%) saturate(3485%) hue-rotate(176deg) brightness(94%) contrast(90%);
    display: block !important;
  }

  .nav-bar-icon-text {
    display: none;
  }

  #navbar-top:has(.responsive-menu:checked) {
    border-radius: 0px 0px 20px 20px;
  }

  #navbar-top:has(.responsive-menu:checked) .navbar-links,
  #navbar-top:has(.responsive-menu:checked) .auth-links {
    display: flex;
  }
}
</style>
