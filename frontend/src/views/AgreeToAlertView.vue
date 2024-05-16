<template>
  <div>
    <div class="alert-container">
      <div class="alert-frame">
        <ol>
          <li v-for="(alert, index) in alerts" :key="index">
            <span class="alert-info">Alert ID:</span> {{ alert._id }} |
            <span class="alert-info">Latitude:</span> {{ alert.latitude }} |
            <span class="alert-info">Longitude:</span> {{ alert.longitude }} |
            <span class="alert-info">Description:</span> {{ alert.description }}
            <button class="small-button" @click="agreeToAlert(index)">
              Accept
            </button>
            <button
              v-if="alert.accepted"
              class="button"
              @click="showPopup = true"
            >
              Preview Alert
            </button>
            <div v-if="showPopup" class="popup">
              <h2>Preview</h2>
              <p v-if="selectedAlert">
                <span class="alert-info">Triage:</span>
                {{ selectedAlert.triage }} <br />
                <span class="alert-info">Time for Ambulance:</span>
                {{ selectedAlert.timeForAmbulance }} <br />
                <span class="alert-info">Description:</span>
                {{ selectedAlert.description }}<br />
              </p>
              <button @click="showPopup = false">Close</button>
            </div>
          </li>
        </ol>
      </div>
      <router-link to="/actionVol">
        <button class="logged-button">Go back</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getToken, decodeToken } from "../services/tokenManagement.js";
const userToken = decodeToken(getToken());

export default {
  data() {
    return {
      alerts: [],
      users: {
        _id: "",
      },
      showPopup: false,
      selectedAlert: null,
    };
  },
  created() {
    axios
      .get(
        `http://localhost:3000/api/v1/users/${
          decodeToken(getToken()).userId
        }/alerts`
      )
      .then((response) => {
        this.alerts = response.data;
        this.users._id = response.data;
        console.log(decodeToken(getToken()).userId);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
  methods: {
    agreeToAlert(index) {
      axios
        .put(`http://localhost:3000/api/v1/users/${userToken.userId}`, {
          alertId: this.alerts[index]._id,
        })
        .then((response) => {
          console.log(response);
          this.selectedAlert = this.alerts[index];
          this.showPreviewAlert(index);
          this.alerts[index].accepted = true;
          this.alerts.splice(index, 1);
        })
        .catch((error) => {
          console.error("Error agreeing to alert:", error);
        });
    },
    showPreviewAlert(index) {
      axios
        .get(`http://localhost:3000/api/v1/alerts/${this.alerts[index]._id}`)
        .then(
          (response) => {
            console.log("Alert shown:", response.data);
            this.showPopup = true;
          },
          (error) => {
            console.error("Error showing alert:", error);
          }
        );
    },
  },
};
</script>

<style>
.alert-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

li {
  margin-bottom: 10px;
}

.alert-info {
  color: red;
}

.alert-frame {
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
}

.logged-button {
  margin-top: 10px;
  align-self: center;
  margin-bottom: 20px;
}
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  background: white;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  padding: 20px;
  border: 1px solid black;
}
</style>
