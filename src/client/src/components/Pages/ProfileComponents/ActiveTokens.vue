<template>
  <div class="token-content">
    <h1>Active Tokens</h1>

    <!-- Search and Filter -->
    <div class="search-filter">
      <div class="search-input">
        <input
          type="text"
          placeholder="Search tokens..."
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
          <tr v-for="token in filteredTokens" :key="token.id">
            <td>{{ token.name }}</td>
            <td class="token-text">{{ token.token }}</td>
            <!-- Apply the token-text class here -->
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
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      searchTerm_token: "",
      userTokens: [],
      filteredTokens: [],
      openDropdownId: null
    };
  },
  methods: {
    loadUserTokens() {
      this.$store.dispatch("get_user_tokens").then(res => {
        const getList = res.data;
        this.userTokens = getList.map(token => ({
          id: token._id,
          name: token.name,
          token: token.token,
          createdAt: dayjs(token.createdAt).format("DD-MMM-YYYY")
        }));
        this.filterTokens(); // Update the filtered list after loading
      });
    },
    filterTokens() {
      const term = this.searchTerm_token.toLowerCase();
      this.filteredTokens = this.userTokens.filter(
        token =>
          token.name.toLowerCase().includes(term) ||
          token.token.toLowerCase().includes(term)
      );
    },
    createToken() {
      // Logic to create a new token
      // Replace this with actual API call
      const tokenName = prompt("Enter token name:");
      if (tokenName) {
        this.$store
          .dispatch("create_user_token", { name: tokenName })
          .then(res => {
            const newToken = {
              id: res.data._id,
              name: res.data.name,
              token: res.data.token,
              createdAt: dayjs(res.data.createdAt).format("DD-MMM-YYYY")
            };
            this.userTokens.push(newToken);
            this.filterTokens(); // Update the filtered list
            alert("New token created");
          })
          .catch(err => {
            console.error(err);
            alert("Failed to create token");
          });
      }
    },
    copyToken(tokenValue) {
      navigator.clipboard.writeText(tokenValue).then(
        () => {
          alert("Token copied to clipboard");
        },
        err => {
          console.error(err);
          alert("Failed to copy token");
        }
      );
    },
    deleteToken(id) {
      // Logic to delete a token
      // Replace this with actual API call
      if (confirm("Are you sure you want to delete this token?")) {
        this.$store
          .dispatch("delete_user_token", { id })
          .then(() => {
            this.userTokens = this.userTokens.filter(token => token.id !== id);
            this.filterTokens(); // Update the filtered list
            alert("Token deleted");
          })
          .catch(err => {
            console.error(err);
            alert("Failed to delete token");
          });
      }
    },
    toggleDropdown(id) {
      this.openDropdownId = this.openDropdownId === id ? null : id;
    },
    isDropdownOpen(id) {
      return this.openDropdownId === id;
    }
  },
  mounted() {
    this.loadUserTokens();
  }
};
</script>

<style scoped>
/* Base Styles */
.token-content {
  padding: 3vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background-color: #fafafa;
}

.token-content h1 {
  font-size: 2.5rem; /* Responsive font-size using viewport width */
  font-family: "Mukta", sans-serif;
  font-weight: 600;
  color: #3d3951;
}

/* Search and Filter */
.search-filter {
  display: flex;
  justify-content: space-between;
  width: 75vw;
  max-width: 90vw; /* Make the search filter take up most of the viewport */
  margin-bottom: 2vw;
}

.search-input {
  display: flex;
  align-items: center;
  border: 0.2rem solid #3d3951;
  border-radius: 0.6rem;
  padding: 1vw;
  flex-grow: 1;
}

.search-input input {
  border: none;
  outline: none;
  flex-grow: 1;
  font-size: 1rem;
  color: #6d6b7d;
  background-color: transparent;
}

.search-input img {
  margin-left: 1vw;
  cursor: pointer;
}

.filter-button {
  background: #eef1f4;
  border-radius: 0.6rem;
  padding: 1vw;
  margin-left: 1vw;
  cursor: pointer;
  width: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-button img {
  width: 1.25rem; /* Responsive icon size */
  height: auto;
}

/* Token Table */
.token-table-container {
  width: 75vw; /* Relative width to ensure responsiveness */
  overflow-x: auto; /* Horizontal scroll if necessary */
}

table {
  width: 100%; /* Table width adjusts with its container */
  border-collapse: collapse;
  font-size: 1rem;
  border: 0.063rem solid #eef1f4;
}

thead tr {
  background-color: #eef1f4;
  color: #3d3951;
}

thead th {
  padding: 1vw; /* Responsive padding */
  text-align: center;
  font-weight: 600;
  border-bottom: 0.25rem solid #6d6b7d;
}

tbody tr {
  background-color: #fff;
  border-bottom: 0.1rem solid #6d6b7d;
}

tbody td {
  padding: 1.5vw; /* Responsive padding */
  text-align: center;
}

/* Token Text Truncation with Ellipsis */
.token-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20vw; /* Max width for token column to truncate on smaller screens */
}

.create-token-button {
  background-color: #00afba;
  color: white;
  padding: 0.75rem 1.25rem; /* Responsive padding */
  border-radius: 0.8rem;
  font-size: 1rem;
  cursor: pointer;
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
  box-shadow: 0px 0.5vw 1vw rgba(0, 0, 0, 0.2);
  padding: 0.5vw 0;
  z-index: 1000;
  list-style: none;
  border-radius: 0.4rem;
  margin: 0;
  min-width: 20vw;
}

.dropdown-menu li {
  padding: 0.5vw 1vw;
  cursor: pointer;
  font-size: 1rem;
}

.dropdown-menu li:hover {
  background-color: #f5f7fa;
}

/* Desktop-specific styles for narrower table */
@media (min-width: 1024px) {
  .token-table-container {
    width: 50vw; /* Make the table container narrower on desktop */
  }

  table {
    font-size: 0.9rem; /* Slightly smaller font for desktop */
  }

  thead th,
  tbody td {
    padding: 0.8vw; /* Narrower padding on desktop */
  }

  .token-text {
    max-width: 15vw; /* Reduce the max width for token text on desktop */
  }

  .search-filter {
    display: flex;
    justify-content: space-between;
    width: 50vw;
    max-width: 90vw; /* Make the search filter take up most of the viewport */
    margin-bottom: 2vw;
  }
}
</style>
