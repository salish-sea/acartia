// INFO LIST item
// This component can be extended/modified to work for the list on the faq page

<template>
  <li @click="hideShowContent">
    <div class="list-title">
      <h2 class="list-h2">{{ title }}</h2>
      <!--<hr width="14px" >-->
      <img class="expand-indicator" :src="require(`@/assets/${contentVisibilityIndicator}.svg`)"/>
    </div>
    <div class="list-content" v-bind:style="{ display: contentVisibility }">
      <p class="list-text">
       <slot></slot> 
      </p>
      <div class="list-image-container">
        <img :src="require(`@/assets/${img_src}`)"/>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  name: 'InfoListItem',
  props: ["title", "img_src"],
  data() {
    return {
      contentVisibility: "none",
      contentVisibilityIndicator: "plus",
    }
  },
  methods: {
    hideShowContent() {
      if (this.contentVisibility === "none") {
        this.contentVisibility = "block";
        this.contentVisibilityIndicator = "minus";
      } else {
        this.contentVisibility = "none";
        this.contentVisibilityIndicator = "plus";
      }
    }
  }
}
</script>
<style>

.list-h2 {
  display: inline;
  margin: 0;
  color: #3d3951;
  font-family: "Mukta";
  font-weight: 500;
  font-size: 24px;
  line-height: 25.2px;
  user-select: none;
}

h2:hover {
  cursor: default;
}

li {
  list-style-type: none;
  border-color: rgba(8, 13, 38, 0.1);
  border-style: solid;
  border-width: 1px;
  padding: 16px;
  margin-top: 20px;
}

hr {
  background-color: #3d3951;
  display: inline;
  float: right;
  height: 2px;
  margin: 12px;;
  border-radius: 15px;
}

.expand-indicator {
  float: right;
  display: inline;
}

.list-title {
  /* unsure why this is necessary */
  display: block !important;
}

.list-content {
  margin-top: 16px;
}


.list-text {
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 16px;
  line-height: 22.4px;
  color: #3D3951;
  text-align: left;
}

</style>