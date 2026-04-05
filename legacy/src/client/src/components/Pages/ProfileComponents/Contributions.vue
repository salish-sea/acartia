<template>
  <section class="contributions-content">
    <!-- Page Header -->
    <h1>Your Contributions</h1>

    <!-- Search and Filter -->
    <div class="search-filter">
      <div class="search-input">
        <input type="text" placeholder="Search contributions" v-model="searchTerm_contribution"
          @input="filterContributions" />
        <img src="@/assets/search-icon.svg" alt="Search Icon" />
      </div>
      <div class="filter-sort">
        <button class="filter-button" @click="openFilterModal">
          <img src="@/assets/filter-icon.svg" alt="Filter Icon" />
        </button>
        <button class="sort-button" @click="toggleSortOrder">
          <img :class="{ flipped: sortOrder === 'desc' }" src="@/assets/sort-icon.svg" alt="Sort Icon" />
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
        <img class="filter-icon" src="@/assets/x-icon.svg" alt="Remove Filter" @click="removeFilter(filter)" />
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
            <th>Witness</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contribution in paginatedContributions" :key="contribution.id">
            <td>{{ contribution.created }}</td>
            <td>{{ contribution.type }}</td>
            <td>{{ contribution.no_sighted }}</td>
            <td>{{ contribution.witness }}</td>
            <td>{{ contribution.comments }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button class="pagination-button" @click="previousPage" :disabled="currentPage === 1">
        <img src="@/assets/chevron-left.svg" alt="Previous Page" />
      </button>

      <!-- Input for the current page number -->
      <input type="number" v-model.number="currentPage" @change="goToPage" :max="totalPages" :min="1" class="page-input"
        style="width: 5rem; text-align: center;" />
      <span>/ {{ totalPages }}</span>

      <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">
        <img src="@/assets/chevron-right.svg" alt="Next Page" />
      </button>
    </div>

    <!-- Download Contributions Button -->
    <button class="download-contributions-button" @click="downloadContributions">
      <img src="@/assets/download-icon.svg" alt="Download Contributions" />
      Download Contributions
    </button>

    <!-- Filter Modal -->
    <div v-if="isFilterModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h2>Select Species</h2>
        <ul class="species-list">
          <li v-for="(species, index) in filterOptions.species" :key="index" @click="toggleSpeciesFilter(index)">
            <input type="checkbox" v-model="species.filter" /> {{ species.name }}
          </li>
        </ul>
        <div class="modal-actions">
          <button @click="clearAllFilters">Clear All</button>
          <button @click="applyFilters">Apply</button>
        </div>
        <button class="modal-close" @click="closeFilterModal">Close</button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { filterUserSightings } from '@/mapUtils.js';

export default {
  data() {
    return {
      allSightings: [],
      contributions: [],
      searchTerm_contribution: "",
      activeFilters: [],
      currentPage: 1,
      itemsPerPage: 10,
      userDid: '',
      isFilterModalOpen: false,
      filterOptions: {
        species: []
      },
      sortOrder: 'asc'
    };
  },
  computed: {
    paginatedContributions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.contributions.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.contributions.length / this.itemsPerPage);
    }
  },
  methods: {
    filterContributions() {
      // Create a filtered list based on the active species filters and the search term
      this.contributions = this.allSightings.filter(contribution => {
        const matchesSpeciesFilter = this.activeFilters.length === 0 || this.activeFilters.includes(contribution.type);
        const matchesSearchTerm = this.searchTerm_contribution === '' ||
          contribution.type.toLowerCase().includes(this.searchTerm_contribution.toLowerCase()) ||
          (contribution.comments && contribution.comments.toLowerCase().includes(this.searchTerm_contribution.toLowerCase()));
        return matchesSpeciesFilter && matchesSearchTerm;
      });

      // Apply sorting
      this.sortContributions();
    },
    toggleSortOrder() {
      // Toggle between ascending and descending sort order
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      // Apply sorting to contributions
      this.sortContributions();
    },
    sortContributions() {
      // Sort contributions based on the created date
      this.contributions.sort((a, b) => {
        const dateA = new Date(a.created);
        const dateB = new Date(b.created);
        return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    },
    applyFilters() {
      this.activeFilters = this.filterOptions.species
        .filter(species => species.filter)
        .map(species => species.name);
      this.filterContributions();
      this.closeFilterModal();
    },
    clearFilters() {
      this.activeFilters = [];
      this.searchTerm_contribution = "";
      this.contributions = [...this.allSightings];
      this.sortContributions(); // Re-apply sorting when clearing filters
    },
    removeFilter(filter) {
      this.activeFilters = this.activeFilters.filter(f => f !== filter);
      this.filterContributions();
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
    goToPage() {
      if (this.currentPage < 1) {
        this.currentPage = 1;
      } else if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    },
    openFilterModal() {
      this.isFilterModalOpen = true;
    },
    closeFilterModal() {
      this.isFilterModalOpen = false;
    },
    toggleSpeciesFilter(index) {
      this.filterOptions.species[index].filter = !this.filterOptions.species[index].filter;
    },
    clearAllFilters() {
      this.filterOptions.species.forEach(species => {
        species.filter = false;
      });
      this.activeFilters = [];
    },
    extractSpeciesList() {
      const speciesSet = new Set();
      this.contributions.forEach(contribution => {
        if (contribution.type) {
          speciesSet.add(contribution.type);
        }
      });
      this.filterOptions.species = Array.from(speciesSet).map(species => ({
        name: species,
        filter: false
      }));
    },
    loadContributions() {
      let requestAuth = {};
      let endpoint = '/v1/sightings';

      requestAuth.headers = {
        'Authorization': 'Bearer ' + process.env.VUE_APP_MASTER_KEY,
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      axios.get(`${process.env.VUE_APP_WEB_SERVER_URL}${endpoint}`, requestAuth)
        .then(res => {
          this.allSightings = res.data;
          this.contributions = filterUserSightings(this.allSightings, this.userDid);
          this.extractSpeciesList();
          this.sortContributions(); // Apply sorting after loading contributions
        })
        .catch(err => {
          console.error("Error fetching sightings:", err);
        });
    }
  },
  mounted() {
    this.loadContributions();
  }
};
</script>


<style scoped>
/* Contributions Content */
.contributions-content {
  flex-grow: 1;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.contributions-content h1 {
  font-size: 2rem;
  font-family: "Mukta", sans-serif;
  font-weight: 600;
  color: #3d3951;
  margin-bottom: 1.5vw;
}

/* Search and Filter */
.search-filter {
  display: flex;
  justify-content: space-between;
  width: 65vw;
  margin-bottom: 1.5vw;
}

.search-input {
  display: flex;
  align-items: center;
  border: 0.15rem solid #3d3951;
  border-radius: 0.5rem;
  padding: 0.75vw;
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
  margin-left: 0.75vw;
  cursor: pointer;
}

.filter-sort {
  display: flex;
  gap: 0.5vw; /* Reduced gap */
  margin-left: 5px;
}

.filter-button,
.sort-button,
.clear-button {
  background: #eef1f4;
  border-radius: 0.5rem;
  border-color: black;
  padding: 1rem;
  cursor: pointer;
}

.filter-button img,
.sort-button img,
.clear-button img {
  width: 1.25rem;
  height: auto;
}

/* Active Filters */
.active-filters {
  display: flex;
  gap: 0.5vw;
  flex-wrap: wrap;
}

.filter-tag {
  display: flex;
  align-items: center;
  background: #eef1f4;
  border-radius: 1.5rem;
  padding: 0.5rem;
  /* Smaller padding */
  font-size: 0.875rem;
  /* Smaller font size */
  color: #3d3951;
  gap: .5rem;
}

.filter-tag img {
  cursor: pointer;
}

.filter-icon {
  height: auto;
  width: 0.75rem;
  /* Smaller icon */
}

/* Contributions Table */
.contributions-table-container {
  width: 65vw;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  border: 0.065rem solid #eef1f4;
}

thead th {
  padding: 0.75vw;
  text-align: center;
  font-weight: 600;
  border-bottom: 0.09rem solid #6d6b7d;
  border-right: 0.065rem solid #eef1f4;
}

tbody td {
  padding: 0.75vw;
  text-align: center;
  border-top: 0.065rem solid #eef1f4;
  border-right: 0.065rem solid #eef1f4;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5vw;
  margin-top: 1.5vw;
  align-items: center;
}

.pagination-button {
  background: #eef1f4;
  border-color: black;
  border-radius: 0.5rem;
  padding: 0.25rem;
  cursor: pointer;
}

.pagination-button:disabled {
  border-color: #D3D3D3;
  border-style: solid;
}

.pagination-button img {
  width: 2vw;
  height: 2vw;
}

/* Download Contributions Button */
.download-contributions-button {
  background-color: #00afba;
  color: white;
  padding: 0.75rem 1.25rem;
  /* Updated to match token page */
  border-radius: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1.5vw;
  display: flex;
  align-items: center;
  gap: 0.75vw;
}

.download-contributions-button img {
  width: 1.5rem;
  height: auto;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 30vw;
  height: 80vh;
  text-align: center;
}

.modal-content h2 {
  margin-bottom: 1rem;
  font-family: "Mukta", sans-serif;
  font-size: 1.5rem;
  color: #3d3951;
}

.species-list {
  list-style: none;
  padding: 0;
  overflow-y: auto;
}

.species-list li {
  padding: 0.5rem;
  cursor: pointer;
}

.modal-actions {
  margin-top: 1rem;
}

.modal-close {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.flipped {
  transform: rotate(180deg);
}

/* Mobile Media Query */
@media (max-width: 768px) {
  .search-filter {
    width: 90vw;
  }

  .search-input {
    padding: 0.5vw;
  }

  .filter-button,
  .sort-button,
  .clear-button {
    padding: 0.75rem;
  }

  .download-contributions-button {
    padding: 0.25rem 1rem;
    font-size: 0.875rem;
  }

  .filter-tag {
    padding: 0.4rem;
    font-size: 0.75rem;
  }

  .contributions-table-container {
    width: 95vw;
  }

  .pagination-button {
    padding: 0.75rem;
  }

  .pagination-button img {
    height: auto;
    width: 1rem;
  }

  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    width: 90vw;
    height: 80vh;
    text-align: center;
  }
}
</style>
