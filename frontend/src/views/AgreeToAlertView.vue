<template>
  <div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <div class="alert-container">
      <div class="alert-frame">
        <ol>
          <li v-for="(alert, index) in alerts" :key="index">
            <span class="alert-info">Alert ID:</span> {{ alert._id }} |
            <span class="alert-info">Latitude:</span> {{ alert.latitude }} |
            <span class="alert-info">Longitude:</span> {{ alert.longitude }} |
            <span class="alert-info">Description:</span> {{ alert.description }}
            <button
              class="button"
              @click="agreeToAlert(index)"
              :disabled="acceptedAlertIndex === index"
            >
              Accept
            </button>
            <button
              v-if="showPreviewButton[index]"
              class="button"
              @click="showPreviewAlert(index)"
            >
              Preview Alert
            </button>
            <div v-if="showPopup" class="popup">
              <h2>Preview</h2>
              <p v-if="selectedAlert"></p>
              <span class="alert-info">Triage:</span>
              {{ selectedAlert.triage }} <br />
              <span class="alert-info">Time for Ambulance:</span>
              {{ selectedAlert.timeForAmbulance }} <br />
              <span class="alert-info">Description:</span>
              {{ selectedAlert.description }}<br />
              <span class="alert-info">Emergency:</span>
              {{ selectedAlert.emergency }}<br />
              <button @click="readBestPractices">Read Best Practices</button>
              <div v-if="read" v-html="bestPracticeDescription"></div>
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

export default {
  data() {
    return {
      alerts: [],
      users: {
        _id: "",
      },
      showPopup: false,
      selectedAlert: null,
      errorMessage: null,
      showPreviewButton: [],
      acceptedAlertIndex: null,
      bestPracticeDescription: "",
      read: false,
    };
  },
  created() {
    this.showPreviewButton = this.alerts.map(() => false);
    axios
      .get(
        `http://localhost:3000/api/v1/users/${
          decodeToken(getToken()).userId
        }/alerts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        this.alerts = response.data;
        this.users._id = response.data;
      })
      .catch((error) => {
        if (error.response) {
          this.errorMessage = error.response.data;
        } else {
          this.errorMessage = "Error fetching data";
        }
      });
  },
  methods: {
    agreeToAlert(index) {
      this.errorMessage = "";
      this.showPreviewButton = this.showPreviewButton.map(() => false);
      this.showPreviewButton[index] = true;
      this.acceptedAlertIndex = index;
      this.read = false;
      this.bestPracticeDescription = "";
      axios
        .patch(
          `http://localhost:3000/api/v1/users/${
            decodeToken(getToken()).userId
          }`,
          { alertId: this.alerts[this.acceptedAlertIndex]._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          this.selectedAlert = this.alerts[index];
          this.alerts[index].accepted = true;
          if (this.alerts[index].emergency === undefined) {
            this.bestPracticeDescription =
              "No best practices found for this emergency";
          } else {
            this.getBestPractices(this.alerts[index].emergency);
          }
        })
        .catch((error) => {
          if (error.response) {
            this.errorMessage = error.response.data;
          } else {
            this.errorMessage = "Error agreeing to alert";
          }
        });
    },
    getBestPractices(emergency) {
      axios
        .get(`http://localhost:3000/api/v1/bestpractises?title=${emergency}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.bestPracticeDescription = response.data.advise;
        })
        .catch((error) => {
          if (error.response) {
            this.errorMessage = error.response.data;
          } else {
            this.errorMessage = "Error fetching best practices";
          }
        });
    },
    readBestPractices() {
      this.read = true;
      //this.getBestPractices();
    },
    showPreviewAlert(index) {
      axios
        .get(`http://localhost:3000/api/v1/alerts/${this.alerts[index]._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.showPopup = true;
        })
        .catch((error) => {
          if (error.response) {
            this.errorMessage = error.response.data;
          } else {
            this.errorMessage = "Error showing alert preview";
          }
        });
    },
  },
};
</script>

<style>
.button[disabled] {
  background-color: grey;
  cursor: not-allowed;
}

.button[disabled]:hover {
  background-color: grey;
}

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
  background: rgb(193, 217, 237);
  border: 5px solid black;

  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
  max-height: 500px;
  padding: 20px;
  border: 1px solid black;
  overflow: auto;
}

.error-message {
  color: white;
  display: inline-block;
  font-size: 20px;
  margin-top: 20px;
  background-color: red;
}
</style>
