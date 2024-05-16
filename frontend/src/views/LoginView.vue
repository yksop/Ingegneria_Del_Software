<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <h2>Login</h2>
      <div class="input-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="credentials.username"
          required
        />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="credentials.password"
          required
        />
        <password-error-banner :show="passwordError" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import PasswordErrorBanner from "@/components/PasswordErrorBanner.vue";
import {saveToken, removeToken, isLoggedIn, decodeToken, isVolunteer, isCertifier, isOperator118} from "@/services/tokenManagement.js";

export default {
  components: {
    PasswordErrorBanner,
  },
  data() {
    return {
      passwordError: false,
      credentials: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    async login() {
      const loginUserCredentials = {
        username: this.credentials.username,
        password: this.credentials.password,
      };
  
      axios
        .post("http://localhost:3000/api/v1/tokens", loginUserCredentials)
        .then(
          (response) => {
            console.log("Login successful:", response.data);
            this.passwordError = false;
            this.$router.push("/about");

            saveToken(response.data.token);

            // After 100000 ms, the token will expire
            setTimeout(() => {
              removeToken();
              alert("Token expired. Please login again.")
              this.$router.push("/login");
            }, 1000000);

            console.log("VOL: ", isVolunteer(response.data.token));
            console.log("118_Op: ", isOperator118(response.data.token));
            console.log("CERT: ", isCertifier(response.data.token));
          },
          (error) => {
            this.passwordError = true;
            console.error("Login failed:", error.response.data);
            localStorage.removeItem("token");
          }
        )
        .catch((error) => {
          console.error("Axios request failed:", error);
        });
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
