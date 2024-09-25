<template>
  <section class="contributions-content">
    <!-- Page Header -->
    <h1>Your Contributions</h1>

    <!-- Search and Filter -->
    <div class="search-filter">
      <div class="search-input">
        <input
          type="text"
          placeholder="Search contributions"
          v-model="searchTerm_contribution"
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
</template>

<script>
import { fakeContributions } from "@/fake_contribution_data.js"; // Replace with actual data fetching

export default {
  data() {
    return {
      contributions: fakeContributions, // Replace with actual data
      searchTerm_contribution: "",
      activeFilters: ["Species: Species A"],
      currentPage: 1,
      itemsPerPage: 5
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
      console.log("Filtering contributions based on search term");
    },
    clearFilters() {
      this.activeFilters = [];
    },
    removeFilter(filter) {
      this.activeFilters = this.activeFilters.filter(f => f !== filter);
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
    }
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
  width: 65vw; /* Narrower width */
  margin-bottom: 1.5vw; /* Reduced margin */
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
}

.filter-button,
.sort-button,
.clear-button {
  background: #eef1f4;
  border-radius: 0.5rem;
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
  padding: 0.5rem; /* Smaller padding */
  font-size: 0.875rem; /* Smaller font size */
  color: #3d3951;
  gap: .5rem;
}

.filter-tag img {
  cursor: pointer;
}

.filter-icon {
  height: auto;
  width: 0.75rem; /* Smaller icon */
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
  border-radius: 0.5rem;
  padding: 0.25rem;
  cursor: pointer;
}

.pagination-button img {
  width: 2vw;
  height: 2vw;
}

/* Download Contributions Button */
.download-contributions-button {
  background-color: #00afba;
  color: white;
  padding: 0.75rem 1.25rem; /* Updated to match token page */
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
}
</style>
