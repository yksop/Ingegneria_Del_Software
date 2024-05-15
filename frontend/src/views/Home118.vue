<template>
<div class="alert-creation-container">
    <form
      @submit.prevent="handleAlertCreation"
      class="alert-form"
    >
      <h2>Alert Creation</h2>
      <div class="input-group">
        <label for="latitude">Latitude</label>
        <input type="number" id="latitude" v-model="alerts.latitude" required />
      </div>
        <div class="input-group">
        <label for="longitude">Longitude</label>
        <input type="number" id="longitude" v-model="alerts.longitude" required />
      </div>
      </div>
        <div class="input-group">
        <label for="triage">Triage</label>
        <input type="number" id="triage" v-model="alerts.triage" required />
      </div>
    <div class="input-group">
        <label for="radius">Radius</label>
        <input type="number" id="radius" v-model="alerts.radius" required />
      </div>
      <div class="input-group">
        <label for="expire">Expires-in</label>
        <input type="number" id="expire" v-model="alerts.expire" required />
      </div>
      <div class="input-group">
        <label for="isActive">Is Active</label>
        <input type="bool" id="isActive" v-model="alerts.isActive" required />
      </div>
      <div class="input-group">
        <label for="Description">Description</label>
        <input type="text" id="description" v-model="alerts.description"/>
      </div>
      <div class="input-group">
        <label for="timeForAmbulance">Time Ambulance</label>
        <input type="number" id="timeForAmbulance" v-model="alerts.timeForAmbulance" required />
      </div>
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
      alerts: {
        latitude: null,
        longitude: null,
        triage: null,
        radius: null,
        expire: null,
        isActive: null,
        description: "",
        timeForAmbulance: null,
      },
    };
  },
  methods: {
    handleAlertCreation() {
      axios
        .post("http://localhost:3000/api/v1/users", registerNewUserCredentials)
        .then(
          (response) => {
            console.log("Registration successful:", response.data);
            this.$router.push("/login");
          },
          (error) => {
            console.error("Registration failed:", error);
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
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(email).toLowerCase())) {
        alert(
          "Invalid email format. Email should be something like example@example.example\n"
        );
        return false;
      }
      return true;
    },
  },
  created() {
    this.getUserLocation();
  },
};
</script>

<style>
.alert-creation-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert-form {
  padding: 2rem;
  background: white;
  margin: 100px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  height: 600px;
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
