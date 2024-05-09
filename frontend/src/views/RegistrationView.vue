<template>
  <div class="registration-container">
    <form
      @submit.prevent="handleRegistrationSubmission"
      class="registration-form"
    >
      <h2>Registration</h2>
      <div class="input-group">
        <label for="name">First name</label>
        <input type="text" id="name" v-model="credentials.name" required />
      </div>
      <div class="input-group">
        <label for="surname">Last name</label>
        <input
          type="text"
          id="surname"
          v-model="credentials.surname"
          required
        />
      </div>
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
        <label for="email">Email</label>
        <input type="email" id="email" v-model="credentials.email" required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="credentials.password"
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      credentials: {
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        latitude: null,
        longitude: null,
        volunteer: {
          isVolunteer: false,
        },
        certifier: {
          isCertifier: false,
        },
        operator118: {
          isOperator118: false,
        },
      },
      emailValid: true,
    };
  },
  methods: {
    handleRegistrationSubmission() {
      if (!this.validateEmail(this.credentials.email)) {
        this.emailValid = false;
        return;
      }
      axios.post("http://localhost:3000/api/v1/users", this.credentials).then(
        (response) => {
          console.log("Registration successful:", response.data);
          this.$router.push("/login");
        },
        (error) => {
          console.error("Registration failed:", error);
        }
      );
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
    validateEmail(email) {
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
  created() {
    this.getUserLocation();
  },
};
</script>

<style>
.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.registration-form {
  padding: 2rem;
  background: white;
  margin: 100px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  height: 500px;
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