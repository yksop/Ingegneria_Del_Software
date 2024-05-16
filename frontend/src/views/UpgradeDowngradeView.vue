<template>
    <div class="upgradeDowngrade-container">
      <form @submit.prevent="checkAction" class="upgradeDowngradeForm">
        <h2>Upgrade or downgrade a user</h2>
        <div class="input-group">
          <label for="id">id</label>
          <input type="text" id="id" v-model="formData.id" required />
        </div>
        <div class="input-group">
          <label for="certificateCode">certificateCode</label>
          <input
            type="text"
            id="certificateCode"
            v-model="formData.certificateCode"
            required
          />
        </div>
        <div class="input-group">
          <label for="upgrade">Upgrade</label>
          <input
            type="radio"
            id="upgrade"
            v-model="formData.action"
            value="upgrade"
          />
          <br />
        </div>
        <div class="input-group">
          <label for="downgrade">Downgrade</label>
          <input
            type="radio"
            id="downgrade"
            v-model="formData.action"
            value="downgrade"
          />
          <br />
        </div>
        <button type="submit">Modify</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  // TODO: implementare AUTORIZZAZIONE tramite token da localstorage
  
  export default {
    data() {
      return {
        formData: {
          id: "",
          action: "",
        },
      };
    },
  
    methods: {
      checkAction() {
        if (this.formData.action) {
          this.upgradeDowngradeUser();
        } else {
          alert(
            "Please select an action (Upgrade or Downgrade) before submitting."
          );
        }
      },
  
      upgradeDowngradeUser() {
        switch (this.formData.action) {
          case "upgrade":
            this.formData.action = true;
            break;
          case "downgrade":
            this.formData.action = false;
            break;
        }
  
        const upgradeDowngradeUserStatus = {
          isVolunteer: this.formData.action,
          certificateCode: this.formData.certificateCode,
        };
  
        this.formData.action = "";
  
        axios
          .put(
            `http://localhost:3000/api/v1/users/volunteers/${this.formData.id}`,
            upgradeDowngradeUserStatus
          )
          .then(
            (response) => {
              console.log("User modified:", response.data);
              this.$router.push("/home");
            },
            (error) => {
              console.error("Error modifying user:", error);
            }
          );
      },
    },
  };
  </script>
  
  <style>
  .upgradeDowngrade-container {
    justify-content: left;
  }
  
  .upgradeDowngradeForm {
    padding: 2rem;
    background: white;
    margin: 100px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 350px;
  }
  
  h2 {
    text-align: center;
    color: #333;
  }
  
  .input-group {
    margin-bottom: 1rem;
  }
  
  .input-group label {
    display: inline-block;
  
    margin-right: 0.5rem;
  }
  .input-group input[type="text"] {
    width: 100%;
    font-size: 18px;
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
  