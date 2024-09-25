// BUTTON

<template>
  <button
    class="standard-btn"
    :disabled="isLoading || !formCompleted"
    :style="{ color: formCompleted ? 'white' : '#6D6B7D', backgroundColor: formCompleted ? '00AFBA' : 'BFEBED'}"
  >
    <slot></slot>
  </button>
</template>

<script>

export default {
  name: "Button",
  props: {
    isLoading: Boolean,
    formData: Object,
  },
  computed: {
    // This button should be a component so this logic (and the css) doesn't have to be repeated
    formCompleted() {
      if (!this.formData)
        return true;

      if (Object.keys(this.formData).length < 1)
        return false;

      for (var prop in this.formData) {
        if (Object.prototype.hasOwnProperty.call(this.formData, prop)) {
          if (this.formData[prop] === "" || this.formData[prop] === null) {
            return false;
          }
        }
      }

      return true;
    },
  },
}

</script>

<style scoped>

.standard-btn {
  width: 327px;
  height: 48px;
  border-radius: 10px;
  border-width: 0;
  padding: 10px 24px 10px 24px;
  box-shadow: none !important;
  color: #6D6B7D;
  background-color: #BFEBED;
  text-transform: none;
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 16px;
  outline: none !important;
}

</style>