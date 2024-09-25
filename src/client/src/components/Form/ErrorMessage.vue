// ERROR MESSAGE COMPONENT
// a bit overkill but kinda also nice

<template>
<div class="error-message">
  <p><slot></slot></p>
</div>
</template>
<style scoped>

  .error-message {
    background-color: #F9CDCD;
    color: #B22A2A;
    margin: 0;
    padding: 12px 16px;
    font-family: "Montserrat";
    font-weight: 400;
    font-size: 14px;
    border-radius: 12px; 
  }

  .error-message p {
    margin: 0;
  }

</style>