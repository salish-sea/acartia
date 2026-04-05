// Table.vue
<template>
  <div>
    <table>
      <thead>
        <slot name="head"></slot>
      </thead>
      <tbody>
        <slot v-for="item in pageRange" :item="item" :key="item.reference"></slot>
      </tbody>
    </table>

    <div id='page-controls'>
      <button class="pagination-button" @click="changePage(-1)">
        <img :src="require('@/assets/chevron-left.svg')"/>
        Back
      </button>

      <p>{{ pageNo }} of {{ numPages}}</p>

      <button class="pagination-button" @click="changePage(1)">
        Next
        <img :src="require('@/assets/chevron-right.svg')"/>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Table',
  props: {
    rows: Array,
    pagination: Boolean,
  },
  data() {
    return {
      startRow: 0,
      rowsPerPage: 10,
    }
  },
  methods: {
    changePage(amount) {
      const newStartRow = this.startRow + (amount * this.rowsPerPage);
      if (newStartRow >= 0 && newStartRow < this.rows.length) {
        this.startRow = newStartRow;
      }
    },
  },
  computed: {
    pageRange() {
      return this.rows.slice(this.startRow, this.startRow + this.rowsPerPage);
    },
    pageNo() {
       return this.rows.length > 0 ? (this.startRow / this.rowsPerPage) + 1 : 0;
    },
    numPages() {
      return Math.ceil(this.rows.length / this.rowsPerPage);
    }
  }
}

</script>

<style scoped>

.scroll {
  overflow: scroll; 
  overflow-x: auto;
}
scroll::-webkit-scrollbar {
  width: 100%;
}

#page-controls {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
}

#page-controls p {
  margin: 0;
}

.pagination-button {
  background-color: white;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead :deep(th) {
  padding: 20px;
}

tbody :deep(td) {
  padding: 30px;
}

thead :deep(tr),
tbody :deep(tr) {
  border-top: 0;
  border-left: 0;
  border-right: 0;
}

thead :deep(tr) {
  border-bottom: 2px solid #d3d3d3;
}

tbody :deep(tr) {
  border-bottom: 1px solid #d3d3d3;
}

tbody :deep(button) {
  background-color: #00afba;
  color: white;
  border: none;
  padding: 10px 24px 10px 24px;
  border-radius: 6px;
}

tbody :deep(button:hover) {
  background-color: #BFEBED; 
  color: #00585d;
}

tbody :deep(.button-cell) {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 30 0 30 0;
}

@media screen and (max-width: 750px) {
  tbody >>> td {
    padding: 0px !important;
  }

  thead >>> th {
    padding: 0;
  }
}

</style>