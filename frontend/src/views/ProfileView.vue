<template>
  <div class="profile-section">
    <h2>PROFILE</h2>
    <p>Here you can see your profile</p>
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
  <div class="button_universal">
    <router-link to="/changeCredentials" class="button_text_universal"
      >CHANGE CREDENTIALS</router-link
    >
  </div>
  <div class="button_universal">
    <button class="button_text_universal" @click="deleteProfile()"
      >DELETE PROFILE</button
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
      isLoading: true,
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
        this.isLoading = false;
      })
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
      axios
        .delete(
          `http://localhost:3000/api/v1/users/${decodeToken(getToken()).userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
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
  padding-bottom: 60px;
  padding-left: 20px;
  padding-right: 20px;
}

.profile-section h2 {
  color: #333;
  text-align: center;
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
</style>
