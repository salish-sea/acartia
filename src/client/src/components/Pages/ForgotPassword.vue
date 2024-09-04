<template>
<div>
  <header class="forgot-password-header">
  </header>
  <section class="forgot-password-section">
    <h1 class="header">Forgot password?</h1>
    <div class="description">
      <p>Enter your email and we'll send you a link to reset your password.</p>
    </div>
    <input type="text" name="email" class="txt"/>
    <button class="standard-btn">Request a reset link</button>
    <a class="link">Return to login</a>
  </section>
</div>
</template>
<script>
</script>
<style>

.forgot-password-section {
  width: 327px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  font-family: "Montserrat";
}

.header {
  font-family: "Mukta";
  font-weight: 600;
  font-size: 32px;
  line-height: 32px;
  color: #3D3951; 
  text-align: center;
  margin-top: 100px;
}

.txt {
  border-width: 1px;
  border-radius: 4px;
  width: 327px;
  height: 52px;
  border-color: #3D3951;

  margin-top: 15px;
}

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

  margin-top: 40px;
}

.link {
  color: #007B83 !important;
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;

  margin-top: 16px;
}
</style>