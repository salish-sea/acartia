// TEXT INPUT COMPONENT

<template>
  <div class="text-input-div">
    <label class="input-label"><span class="label-text">{{ label }}</span></label>
    <input 
      type="text" 
      class="text-input" 
      v-bind:value="value" 
      v-on:input="$emit('input', $event.target.value)"
      :style="{ border: borderStyle }"/>
  </div>
</template>

<script>
export default {
  props: ['label', 'borderStyle', 'value'],
}
</script>

<style>

.text-input-div {
  display: flex;
  flex-direction: column;
  width: 327px;
  margin: auto;
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
  color: #3D3951;
  font-family: "Montserrat";
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

</style>