<template>
  <div class="login-container">
    <form @submit.prevent="submitForm" class="login-form">
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
      <br><br>
      <label>
        <input type="checkbox" v-model="consenso"/>
        Acconsento al trattamento dei miei dati personali secondo la normativa
        vigente.
      </label>
      <br><br>
      <button type="submit">Login</button>
      <RouterLink to="/forgotPassword" class="forgot-password-link"
        >Forgot password?</RouterLink
      >
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
  getToken,
} from "@/services/tokenManagement.js";
import { RouterLink } from "vue-router";

export default {
  components: {
    PasswordErrorBanner,
  },
  data() {
    return {
      consenso: false,
      passwordError: false,
      credentials: {
        username: "",
        password: "",
        latitude: null,
        longitude: null,
      },
    };
  },

  methods: {
    submitForm() {
      if (this.consenso) {
        this.login();
      } else {
        alert("Devi acconsentire al trattamento dei dati per procedere.");
      }
    },
    async login() {
      const loginUserCredentials = {
        username: this.credentials.username,
        password: this.credentials.password,
      };

      // verify if user exists
      axios
        .post("http://localhost:3000/api/v1/tokens", loginUserCredentials)
        .then(
          (response) => {
            console.log("Login successful:", response.data);
            this.passwordError = false;
            const nextUrl = this.$route.query.nextUrl || "/";
            this.$router.push({ path: nextUrl });

            saveToken(response.data.token);

            // After 100000 ms, the token will expire
            setTimeout(() => {
              removeToken();
              alert("Token expired. Please login again.");
              this.$router.push("/login");
            }, 1000000);

            console.log("VOL: ", isVolunteer(response.data.token));
            console.log("118_Op: ", isOperator118(response.data.token));
            console.log("CERT: ", isCertifier(response.data.token));

            // once the user logs in, the location is updated
            axios
              .patch(
                `http://localhost:3000/api/v1/users/${
                  decodeToken(getToken()).userId
                }`,
                {
                  latitude: this.credentials.latitude,
                  longitude: this.credentials.longitude,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
              .then(
                (response) => {
                  console.log("Location updated:", response.data);
                },
                (error) => {
                  console.error("Location update failed:", error.response.data);
                }
              )
              .catch((error) => {
                console.error("Axios request failed:", error);
              });
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
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.credentials.latitude = Number(position.coords.latitude);
            this.credentials.longitude = Number(position.coords.longitude);
          },
          (error) => {
            console.error("Error Code = " + error.code + " - " + error.message);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
  },
  created() {
    this.getUserLocation();
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
  height: 400px;
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

.forgot-password-link {
  display: block;
  margin-top: 1rem;
  text-align: center;
  color: #5c67f2;
  text-decoration: none;
}

.forgot-password-link:hover {
  text-decoration: underline;
}
</style>
