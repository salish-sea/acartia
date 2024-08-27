<template>
  <div>
    <nav id="navbar-top">
      <a href="/home" class="navbar-brand">
        <img src="@/assets/nav-bar-icon.svg" alt="Nav Bar Icon" class="nav-bar-icon" />
        Acartia
      </a>
      <div class="navbar-links">
        <a href="/data-explorer" :class="{'active': isActive('/data-explorer')}">Map</a>
        <a href="/about" :class="{'active': isActive('/about')}">About</a>
        <a href="/partners" :class="{'active': isActive('/partners')}">Partners</a>
        <a href="/reports" :class="{'active': isActive('/reports')}">Reports</a>
        <a href="/dashboard" v-if="isAuth" :class="{'active': isActive('/dashboard')}">Contribute</a>
        <a href="/integrate" v-if="isAuth" :class="{'active': isActive('/integrate')}">How to Contribute</a>
        <div @mouseover="showDropdown" @mouseleave="hideDropdown" v-if="isAuth" class="dropdown">
          <a href="#" :class="{'active': isActive('/browse')}">Browse</a>
          <div v-show="isDropdownOpen" class="dropdown-menu">
            <a href="/data-explorer">Short-term</a>
            <a href="/historical">Historical</a>
          </div>
        </div>
        <a href="/manage-users" v-if="isAuth && isAdmin" :class="{'active': isActive('/manage-users')}">Manage Users</a>
        <a href="/manage-data" v-if="isAuth" :class="{'active': isActive('/manage-data')}">Manage Data</a>
      </div>
      <div class="auth-links">
        <a href="/profile" v-if="isAuth">Profile</a>
        <a href="/login" v-if="!isAuth" class="login-button">Login</a>
        <a href="/register" v-if="!isAuth" class="signup-button">Sign Up</a>
        <a href="/" @click="logoutMethod" v-if="isAuth" class="login-button">Logout</a>
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
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
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
    goHome() {
      this.$router.push('/home');
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
  top:0;
  z-index:9;
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



