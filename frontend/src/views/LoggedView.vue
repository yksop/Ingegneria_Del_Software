<template>
  <div class="actions">
    <section class="certificator-actions">
      <router-link to="/upgradeDowngrade" class="button"
        >Upgrade/Downgrade volunteer</router-link
      >
      <button class="button" @click="showPopup = true">Preview Alert</button>
    </section>
    <!-- Popup -->
    <div v-if="showPopup" class="popup">
      <h2>Preview</h2>
      <text>Here the alert's info</text><br><br>
      <button @click="showPopup = false">Close</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showPopup: false,
    };
  },

  methods: {
      showPreviewAlert() {
        
        axios
          .get(
            `http://localhost:3000/api/v1/alerts/66388e52b966c2520554540c`,
          )
          .then(
            (response) => {
              console.log("Alert shown:", response.data);
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
.popup {
  /* Example styles for the popup */
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

.certificator-actions {
  display: flex;
  align-items: center;
  padding: 20px;
}
.button {
  display: flex;
  padding: 10px;
  margin: 10px;
  color: #fff;
  background-color: #007bff;
  font: 17px Times New Roman, sans-serif;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #000094;
}
</style>
