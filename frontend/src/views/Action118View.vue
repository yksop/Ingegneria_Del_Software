<template>
  <div class="alert-creation-container">
    <form @submit.prevent="handleAlertCreation" class="alert-form">
      <h2>Alert Creation</h2>
      <div class="input-group">
        <label for="latitude">Latitude</label>
        <input type="number" id="latitude" v-model="alerts.latitude" required />
      </div>

      <div class="input-group">
        <label for="longitude">Longitude</label>
        <input type="number" id="longitude" v-model="alerts.longitude" required />
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
        <label for="expiresIn">expiresIn</label>
        <input type="number" id="expiresIn" v-model="alerts.expiresIn" required />
      </div>

      <div class="input-group">
        <label for="isActive">Is Active</label>
        <input type="checkbox" id="isActive" checked="checked" v-model="alerts.isActive" required />
      </div>

      <div class="input-group">
        <label for="Description">Description</label>
        <input type="text" id="description" v-model="alerts.description"/>
      </div>

      <div class="input-group">
        <label for="timeForAmbulance">Time Ambulance</label>
        <input type="number" id="timeForAmbulance" v-model="alerts.timeForAmbulance"/>
      </div>
      <div class="container-buttons">
        <button type="Create">Dirama Alert</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  </div>
  <div class="actions">
      <router-link to="/retireAlert" class="button">Retire an Alert</router-link>
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
        expiresIn: null,
        isActive: false,
        description: "",
        timeForAmbulance: null,
      },
      triageValid: true,
    };
  },

  methods: {
    handleAlertCreation() {
      // Validate triage
      if(!this.validateTriage(this.alerts.triage)) {
        this.triageValid = false;
        return;
      }
      axios
        .post("http://localhost:3000/api/v1/alerts", this.alerts)
        .then(
          (response) => {
            console.log("ALERT CREATED SUCCESFULLY: ", response.data);
            console.log(this.alerts);
            alert("Alert created successfully");
            // clean the form 
            this.alerts = {
              latitude: null,
              longitude: null,
              triage: null,
              radius: null,
              expiresIn: null,
              isActive: false,
              description: "",
              timeForAmbulance: null,
            };
            this.$router.push("/action118");
          },
          (error) => {
            console.error("Alert creation failed", error);
            alert("Alert creation failed");
          }
        )
        .catch((error) => {
          console.error("Axios request failed:", error);
        });
    },
    validateTriage(triage) {
      if (triage < 1 || triage > 5) {
        alert("Triage must be between 1 and 5");
        return false;
      }
      return true;
    },
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
  width: 500px;
  height: 750px;
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

.container-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  padding-top:30px;
}

.button {
  width: 50%;
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
.actions {
  display: flex;
  align-items: center;
  padding: 20px;
}
</style>