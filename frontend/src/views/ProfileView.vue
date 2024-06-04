<template>
  <div class="profile-section">
    <h2>PROFILE</h2>
    <div class="profile-info">
      <div class="personal-info">
        <p  v-if="isLoggedIn"> Name: {{name}}</p> 
        <p  v-if="isLoggedIn"> Surname: {{surname}}</p> 
        <p  v-if="isLoggedIn"> Username: {{username}}</p> 
        <p  v-if="isLoggedIn"> Mail: {{email}}</p> 
        <p  v-if="isLoggedIn"> Position:  [ {{latitude}} , {{longitude}} ]</p> 
      </div>
      <div class="personal-info"> 
        <p>Is Volunteer: {{ isVolunteer ? "Yes" : "No" }}</p>
        <p>Is Certifier: {{ isCertifier ? "Yes" : "No" }}</p>
        <p>Is Operator118: {{ isOperator118 ? "Yes" : "No" }}</p>
        <p>Is Logged In: {{ isLoggedIn ? "Yes" : "No" }}</p>
        <div class="availability-container" v-if="isVolunteer">
          <p>Is Available:</p>
          <label class="switch">
            <input
              type="checkbox"
              v-model="isAvailable"
              @click="updateAvailability()"
            />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
  <div class="button_container_universal">
    <router-link to="/changeCredentials" class="button_universal">
      <div class="button_text_universal">CHANGE CREDENTIALS</div>
    </router-link>
    <button class="button_universal" @click="showPopup=true">
      <div class="button_text_universal">DELETE PROFILE</div>
    </button>
  </div>
  <div v-if="showPopup" class="popup">
    <p>Are you sure you want to delete your profile?</p>
    <button class="button_popup" @click="deleteProfile"
      >Agree</button
    >
    <button class="button_popup" @click="showPopup = false"
      >Cancel</button
    >
  </div>
</template>

<script>
import {
  isLoggedIn,
  isVolunteer,
  isCertifier,
  isOperator118,
  isAvailable,
} from "@/services/tokenManagement.js";

import axios from "axios";
import { getToken, decodeToken } from "../services/tokenManagement.js";

export default {
  data() {
    return {
      isVolunteer: isVolunteer(),
      isCertifier: isCertifier(),
      isOperator118: isOperator118(),
      isLoggedIn: isLoggedIn(),
      isAvailable: isAvailable(),
      name: "",
      surname: "",
      username: "",
      email: "",
      latitude: "",
      longitude: "",
      isLoading: true,
      showPopup: false,
    };
  },
  created() {
    axios
      .get(
        `http://localhost:3000/api/v1/users/${decodeToken(getToken()).userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        this.isAvailable = response.data.volunteer.isAvailable;
        this.name = response.data.name;
        this.surname = response.data.surname;
        this.email = response.data.email;
        this.username = response.data.username;
        this.latitude = response.data.latitude;
        this.longitude = response.data.longitude;
        this.isLoading = false;
      });
  },
  methods: {
    updateAvailability() {
      const modifyAvailability = {
        isAvailable: !this.isAvailable,
      };
      axios
        .patch(
          `http://localhost:3000/api/v1/users/${
            decodeToken(getToken()).userId
          }`,
          modifyAvailability,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log("Availability modified:", response.data);
          this.isAvailable = modifyAvailability.isAvailable;
        })
        .catch((error) => {
          if (error.response) {
            this.errorMessage = error.response.data;
          } else {
            this.errorMessage = "Error fetching data";
          }
        });
    },
    deleteProfile() {
      showPopup = false;
      axios
        .delete(
          `http://localhost:3000/api/v1/users/${
            decodeToken(getToken()).userId
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          alert("Profile deleted");
          localStorage.removeItem("token");
          this.$router.push("/");
        })
        .catch((error) => {
          if (error.response) {
            this.errorMessage = error.response.data;
          } else {
            this.errorMessage = "Error fetching data";
          }
        });
    },
  },
};
</script>
<style>
.profile-section {
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
}

.profile-info {
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
}

.switch {
  position: relative;
  display: inline-block;
  margin-left: 10px;
  width: 50px;
  height: 25px;
}

.availability-container {
  display: flex;
  align-items: center;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
  border-radius: 45%;
}

.slider {
  position: absolute;
  cursor: pointer;
  border-radius: 45%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  border-radius: 45%;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #11ed44;
  border-radius: 45%;
}

input:checked + .slider:before {
  transform: translateX(26px);
  border-radius: 45%;
}

.slider.round {
  border-radius: 25px;
  border-radius: 45%;
}

.slider.round:before {
  border-radius: 45%;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  background: rgb(241, 242, 243);
  border: 5px solid black;

  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
  max-height: 500px;
  padding: 20px;
  border: 1px solid black;
  overflow: auto;
}
.button_popup {
  background-color: #f44336;
  color: white;
  padding: 10px 24px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px;
}
.button_popup:hover {
  background-color: #36f45c;
}

</style>
