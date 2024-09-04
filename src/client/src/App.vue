<template>
  <div>
    <nav id="navbar-top">
      <router-link to="/home" class="navbar-brand">
        <img src="@/assets/nav-bar-icon.svg" alt="Nav Bar Icon" class="nav-bar-icon" />
        Acartia
      </router-link>
      <div class="navbar-links">
        <div class="dropdown">
          <button class="dropbtn" :class="{'active': isActive('/data-explorer') || isActive('/heatmap') || isActive('/home')}">
            Map
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <router-link to="/data-explorer">Data Explorer</router-link>
            <router-link to="/heatmap">Heatmap</router-link>
          </div>
        </div>
        <router-link to="/about" :class="{'active': isActive('/about')}">About</router-link>
        <router-link to="/partners" :class="{'active': isActive('/partners')}">Partners</router-link>
        <router-link to="/reports" :class="{'active': isActive('/reports')}">Reports</router-link>
        <div class="dropdown" v-if="isAuth">
          <button class="dropbtn">
            Contribute
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <router-link to="/integrate" v-if="isAuth">How To Contribute</router-link>
            <router-link to="/upload">Upload File</router-link>
            <router-link to="/import-data">Import Data Manually</router-link>
            <router-link to="/export-data">Export Data</router-link>
            <router-link to="/github">Github</router-link>
            <router-link to="/contact-us">Contact Us</router-link>
          </div>
        </div>
      </div>
      <div class="auth-links">
        <div class="dropdown" v-if="isAuth">
          <button class="dropbtn">
            <img src="@/assets/nav-profile-icon.svg" class="profile-icon" alt="profile icon">
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <router-link to="/profile">Contributor Profile</router-link>
            <router-link to="/user-report">User Report</router-link>
            <router-link to="/create-token">Create Token</router-link>
            <router-link to="/update-profile">Update Profile</router-link>
            <a @click="logoutMethod">Log Out</a>
          </div>
        </div>
        <router-link to="/login" v-if="!isAuth" class="login-button">Login</router-link>
        <router-link to="/register" v-if="!isAuth" class="signup-button">Sign Up</router-link>
      </div>
    </nav>
    <div id="app">
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isDropdownOpen: null,
    };
  },
  created() {
    axios.interceptors.response.use(undefined, (err) => {
      return new Promise((resolve, reject) => {
        if (err.response && err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('auth_logout');
          this.$router.push('/login');
          resolve();
        } else {
          reject(err);
        }
      });
    });
  },
  methods: {
    logoutMethod() {
      this.$store.dispatch('auth_logout').then(() => {
        this.$router.push('/');
        this.$router.go();
      });
    },
    isActive(route) {
      return this.$route.path === route;
    }
  },
  computed: {
    isAuth() {
      return this.$store.state.isAuthenticated;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    }
  }
};
</script>

<style scoped>
/* Navbar Container */
#navbar-top {
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #E6F7F9;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Navbar Brand */
.navbar-brand {
  display: flex;
  align-items: center;
  font-family: 'Mukta', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #00585D;
  text-decoration: none;
}

.nav-bar-icon {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}

/* Arrow Icon */
.arrow-icon {
  width: 12px;
  height: 12px;
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.dropdown.open .arrow-icon {
  transform: rotate(180deg);
}

/* Profile Icon */
.profile-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

/* Navbar Links */
.navbar-links {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.navbar-links a {
  margin-right: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #00585D;
  text-decoration: none;
  transition: color 0.3s ease;
}

.navbar-links a:hover {
  color: #004049;
}

/* Dropdown Styles */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: inherit;
  color: #00585D;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  border: none;
  cursor: pointer;
  padding: 14px 16px;
  margin: 0;
}

.dropbtn:hover {
  background-color: #ddd;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #BCCCDB;
  border-radius: 0px 0px 16px 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  padding: 0;
  width: 250px;
  z-index: 999;
  right: 0; 
}

.dropdown-content a {
  display: block;
  padding: 12px 20px; 
  font-family: 'Inter', sans-serif;
  font-size: 18px; 
  color: #0C0826;
  border-bottom: 0.5px solid #000000;
  text-decoration: none;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

/* Active Link with Squiggly Underline */
.navbar-links a.active {
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: #00AFBA;
}

/* Auth Links with gap */
.auth-links {
  display: flex;
  align-items: center;
  margin-left: 40px;
}

.auth-links a {
  margin-left: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #00585D;
  text-decoration: none;
  transition: color 0.3s ease;
}

.auth-links a:hover {
  color: #004049;
}

/* Login Button Styling */
.login-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  gap: 8px;
  width: 120px;
  height: 42px;
  background: #00AFBA;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #008f9b;
}

/* Signup Button Styling (matching login) */
.signup-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  gap: 8px;
  width: 120px;
  height: 42px;
  background: #ffffff;
  border-radius: 10px;
  color: #00AFBA;
  border: 1px solid #00AFBA;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.signup-button:hover {
  background-color: #00AFBA;
  color: white;
}

/* Responsive Styles */
@media (max-width: 768px) {
  #navbar-top {
    flex-direction: column;
  }

  .navbar-links {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }

  .auth-links {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
    justify-content: flex-end;
  }

  .navbar-links a, .auth-links a {
    width: 100%;
    text-align: left;
    padding: 10px 0;
  }
}
</style>
