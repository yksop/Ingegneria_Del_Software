<template>
  <div class="centered-square">
    <h1>Forgot Password</h1>
    <p>
      Enter your email address and we will send you a link to reset your
      password.
    </p>
    <div v-if="showError" class="error-banner">User not found</div>
    <form @submit.prevent="checkEmail">
      <div class="input-group">
        <input type="email" id="email" required v-model="email" />
      </div>
      <button type="submit" class="send-reset-button">Send reset link</button>
    </form>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      showError: false,
    };
  },
  methods: {
    checkEmail() {
      axios
        .get(`http://localhost:3000/api/v1/users/email/${this.email}`)
        .then((response) => {
          if (response.status === 200) {
            axios
              .post("http://localhost:3000/api/v1/emails/reset-password", {
                email: this.email,
                frontendBaseUrl: window.location.origin,
              })
              .then((response) => {
                if (response.status === 200) {
                  alert("Email sent");
                } else {
                  alert("Error sending email\nPlease try again");
                }
              })
              .catch((error) => {
                console.error("Axios request failed:", error);
              });
          } else {
            alert("Email not found\nPlease try again");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            this.showError = true;
            setTimeout(() => {
              this.showError = false;
            }, 5000);
          }
          console.error("Axios request failed:", error);
        });
    },
  },
};
</script>
    
  <style>
.centered-square {
  width: 500px;
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

.email-form {
  width: 50%;
  margin: auto;
}

.error-banner {
  color: red;
  margin-bottom: 20px;
}

.send-reset-button {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 50%;
  margin-top: 30px;
}
</style>