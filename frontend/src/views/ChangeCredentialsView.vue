<template>
  <div class="login-container">
    <form @submit.prevent="changeCreds" class="login-form">
      <h2>Cambio credenziali</h2>
      <div class="input-group">
        <label for="newUsername">New username</label>
        <input
          type="text"
          id="newUsername"
          v-model="credentials.newUsername"
          required
        />
      </div>
      <div class="input-group">
        <label for="newPassword">New password</label>
        <input
          type="password"
          id="newPassword"
          v-model="credentials.newPassword"
          required
        />
        <password-error-banner :show="passwordError" />
      </div>
      <button type="submit">Change credentials</button>
      <button type="reset">Reset</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import PasswordErrorBanner from "@/components/PasswordErrorBanner.vue";
import {
  saveToken,
  removeToken,
  isLoggedIn,
  decodeToken,
  isVolunteer,
  isCertifier,
  isOperator118,
} from "@/services/tokenManagement.js";

export default {
  components: {
    PasswordErrorBanner,
  },
  data() {
    return {
      passwordError: false,
      credentials: {
        newUsername: "",
        newPassword: "",
      },
    };
  },

  methods: {
    async changeCreds() {
      const newUserCredentials = {
        newUsername: this.credentials.newUsername,
        newPassword: this.credentials.newPassword,
      };

    axios
     
    },
  },
};
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  padding: 2rem;
  background: white;
  margin: 100px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  height: 350px;
  /*box-sizing: border-box;*/
}

h2 {
  text-align: center;
  color: #333;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.input-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #5c67f2;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #5058e5;
}

button:active {
  background-color: #4045b2; /* Darker shade when the button is clicked */
}
</style>
