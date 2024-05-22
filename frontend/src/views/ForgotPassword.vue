<template>
  <div class="centered-square">
    <h1>Forgot Password</h1>
    <p>
      Enter your email address and we will send you a link to reset your
      password.
    </p>
    <form>
      <div class="input-group">
        <input type="email" id="email" required />
      </div>
      <button type="submit" class="send-reset-button">Send reset link</button>
    </form>
  </div>
</template>
  
  <script>
</script>
    
  <style>
.centered-square {
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  box-sizing: border-box;
  position: relative;
  top: 150px;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  margin-bottom: 50px;
  margin-top: 50px;
}

.send-reset-button {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 30%;
}
</style>