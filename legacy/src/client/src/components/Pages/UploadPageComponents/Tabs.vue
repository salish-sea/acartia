<template>
  <div class = "tabs">
    <ul class = "tabsheader">
      <li 
        v-for="title in tabTitles"
        :key="title"
        :class="{ selected: title == selectedTitle}"
        @click="selectedTitle = title"  
      >
        {{ title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
import { ref, provide } from 'vue'
export default {
  setup(props, { slots }){
    const tabTitles = ref(slots.default().map((tab) => tab.props.title))
    const selectedTitle = ref(tabTitles.value[0])

    provide("selectedTitle", selectedTitle)
    return {
      tabTitles,
      selectedTitle,
    }
  },
}
</script>

<style scoped>
.tabs {
  width: 1120px;
  height: auto;
  margin: auto;
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 16px;
}

.tabsheader {
  margin-bottom: 10px;
  list-style: none;
  padding: 0;
  display: flex;
}

.tabsheader li {
  width: 560px;
  height: 48px;
  color: rgba(61, 57, 81, 1);
  text-align: center;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(206, 206, 212, 1);
  background-color: white;
  cursor: pointer;
  transition: 0.4s all ease-out;
}

.tabsheader li.selected {
  border-bottom: 2px solid black;
  font-weight: 600;
}
</style>