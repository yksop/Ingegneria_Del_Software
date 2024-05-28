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
      errorMessage: null,
    };
  },
  created() {
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
        console.log(decodeToken(getToken()).userId);
      })
      .catch((error) => {
        if (error.response) {
          this.errorMessage = error.response.data;
        } else {
          console.error("Error fetching data:", error);
        }
      });
  },
  methods: {
    agreeToAlert(index) {
      axios
        .put(
          `http://localhost:3000/api/v1/users/${userToken.userId}`,
          {
            alertId: this.alerts[index]._id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.selectedAlert = this.alerts[index];
          this.showPreviewAlert(index);
          this.alerts[index].accepted = true;
          this.alerts.splice(index, 1);
        })
        .catch((error) => {
          if (error.response) {
            this.errorMessage = error.response.data;
          } else {
            console.error("Error agreeing to alert:", error);
          }
        });
    },
    showPreviewAlert(index) {
      axios
        .get(`http://localhost:3000/api/v1/alerts/${this.alerts[index]._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log("Alert shown:", response.data);
          this.showPopup = true;
        })
        .catch((error) => {
          if (error.response) {
            this.errorMessage = error.response.data;
          } else {
            console.error("Error showing alert:", error);
          }
        });
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

.error-message {
  color: white;
  display: inline-block;
  font-size: 20px;
  margin-top: 20px;
  background-color: red;
}
</style>
