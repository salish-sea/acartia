<template>
<div>
  <header class="reset-password">
  </header>
  <section class="reset-password-section">
    <!--<h1 id="title">Reset password</h1>-->
    <h1 class="header">Reset password</h1>
    <div class="description">
      <p>A request has been made to reset your password. If you made this request enter a new password below.</p>
    </div>
    <input type="text" name="password" class="txt"/>
    <img class="hide" src="../../assets/eye.svg" width="27px" @click="togglePassword"/>
    <input type="password" name="confirm-password" class="txt"/>
    <img class="hide" src="../../assets/eye.svg" width="27px" @click="togglePassword"/>
    <button class="standard-btn">Reset password</button>
  </section>
</div>
</template>
<script>
</script>
<style scoped>

.reset-password-section {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  width: 327px;
}

.hide {
  position: relative;
  top: -37px;
  left: 290px;
}

.description {
  font-family: "Montserrat";
  font-weight: 400;
  font-size: 16px;
  line-height: 22.4px;
  text-align: left;
  margin-top: 20px;
}

</style>