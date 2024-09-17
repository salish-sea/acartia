// TEXT INPUT COMPONENT

<template>
  <div class="text-input-div">
    <label class="input-label" ><span class="label-text" :style="{ color: isError ? '#B22A2A' : '3D3951' }">{{ label }}</span></label>
    <input 
      :type="inputType" 
      class="text-input" 
      v-bind:value="value" 
      v-on:input="$emit('input', $event.target.value)"
      :style="{ border: isError ? '2px solid #B22A2A' : '1px solid #3D3951' }"
    />
      <img v-if="hideShowButton" width="25px" height="24px" class="hide" src="../assets/eye.svg" @click="togglePassword"/>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    inputTypeProp: String,
    value: String,
    hideShowButton: Boolean,
    isError: Boolean,
  },

  data() {
    return {
      inputType: this.inputTypeProp,
    }
  },

  methods: {
    togglePassword() {
      if (this.inputType === "password") {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
    }
  }
}
</script>

<style scoped>

.text-input-div {
  display: flex;
  flex-direction: column;
  width: 327px;
  margin: 0;
}

.input-label {
  position: relative;
  top: 18px;
  left: 10px;
  width: 100%;
  white-space: nowrap;
  text-align: left;
}

.label-text {
  background-color: white;
  padding-left: 3px;
  padding-right: 3px;
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 12px;
  line-height: 16.8px;
}

.text-input {
  width: 327px;
  height: 52px;
  padding: 4px 16px 4px 16px;
  border-radius: 4px;
  margin: 0;
}

.hide {
  position: relative;
  top: -37px;
  left: 295px;
}

</style>