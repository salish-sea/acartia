<template>
  <div>
    <nav id="navbar-top">
      <router-link to="/home" class="navbar-brand">
        <img src="@/assets/nav-bar-icon.svg" alt="Nav Bar Icon" class="nav-bar-icon" />
        Acartia
      </router-link>
      <div class="navbar-links">
        <router-link to="/data-explorer" :class="{'active': isActive('/data-explorer')}">Map</router-link>
        <router-link to="/about" :class="{'active': isActive('/about')}">About</router-link>
        <router-link to="/partners" :class="{'active': isActive('/partners')}">Partners</router-link>
        <router-link to="/reports" :class="{'active': isActive('/reports')}">Reports</router-link>
        <router-link to="/dashboard" v-if="isAuth" :class="{'active': isActive('/dashboard')}">Contribute</router-link>
        <router-link to="/integrate" v-if="isAuth" :class="{'active': isActive('/integrate')}">How to Contribute</router-link>
        <div @mouseover="showDropdown" @mouseleave="hideDropdown" v-if="isAuth" class="dropdown">
          <a :class="{'active': isActive('/browse')}">Browse</a>
          <div v-show="isDropdownOpen" class="dropdown-menu">
            <router-link to="/data-explorer">Short-term</router-link>
            <router-link to="/historical">Historical</router-link>
          </div>
        </div>
        <router-link to="/manage-users" v-if="isAuth && isAdmin" :class="{'active': isActive('/manage-users')}">Manage Users</router-link>
        <router-link to="/manage-data" v-if="isAuth" :class="{'active': isActive('/manage-data')}">Manage Data</router-link>
      </div>
      <div class="auth-links">
        <router-link to="/profile" v-if="isAuth">Profile</router-link>
        <router-link to="/login" v-if="!isAuth" class="login-button">Login</router-link>
        <router-link to="/register" v-if="!isAuth" class="signup-button">Sign Up</router-link>
        <a @click="logoutMethod" v-if="isAuth" class="login-button">Logout</a>
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
      isDropdownOpen: false,
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
    showDropdown() {
      this.isDropdownOpen = true;
    },
    hideDropdown() {
      this.isDropdownOpen = false;
    },
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
  z-index: 9;
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

/* Active Link with Squiggly Underline */
.navbar-links a.active {
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: #00AFBA; /* Customize the color as needed */
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

/* Dropdown Menu */
.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-menu a {
  display: block;
  color: #00585D;
  text-decoration: none;
  padding: 8px 16px;
}

.dropdown-menu a:hover {
  background-color: #f8f8f8;
}

.navbar-links .dropdown:hover .dropdown-menu {
  display: block;
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
