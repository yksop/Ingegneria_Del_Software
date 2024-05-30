<script>
import {isLoggedIn, isVolunteer, isCertifier, isOperator118 } from "@/services/tokenManagement.js";


export default {
  data() {
    return {
      isVolunteer: isVolunteer(),
      isCertifier: isCertifier(),
      isOperator118: isOperator118(),
      isLoggedIn: isLoggedIn(),
    };
  }
};
</script>

<template>
<div class="profile-section">
  <h2>PROFILE</h2>
  <p>Here you can see your profile</p>
  <p>Is Volunteer: {{ isVolunteer ? 'Yes' : 'No' }}</p>
  <p>Is Certifier: {{ isCertifier ? 'Yes' : 'No' }}</p>
  <p>Is Operator118: {{ isOperator118 ? 'Yes' : 'No' }}</p>
  <p>Is Logged In: {{ isLoggedIn ? 'Yes' : 'No' }}</p>
</div>
<div class="button_universal">
  <router-link to="/changeCredentials" class="button_text_universal">CHANGE CREDENTIALS</router-link>
</div>
</template>

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
</style>
