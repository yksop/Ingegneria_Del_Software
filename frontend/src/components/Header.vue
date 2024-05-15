<script>
import { RouterLink, RouterView } from "vue-router";
import { isLoggedIn, isVolunteer, isCertifier, isOperator118 } from "@/services/tokenManagement.js";

export default{
  methods: {
    VolunteerAccessHandler() {
      if (!isVolunteer()) {
        alert("You must be logged as volunteer to access this page");
        this.$router.push("/login");
      }
    },
    CertifierAccessHandler() {
      if (!isCertifier()) {
        alert("You must be logged as certifier to access this page");
        this.$router.push("/login");
      }
    },
    Op118AccessHandler() {
      if (!isOperator118()) {
        alert("You must be logged as 118 operator to access this page");
        this.$router.push("/login");
      }
    },
  },
}
</script>


<template>
  <div class="head">
    <div class="header-content">
      <div class="header-group left">
        <a href="https://cri.it" class="image-with-link">
          <img
            src="@/assets/emblema_CRI.png"
            alt="Left Image"
            class="img-left"
          />
          <!-- Only one image on the left -->
        </a>
      </div>
      <div class="header-logo">
        <img
          src="@/assets/logo_final.jpg"
          alt="Website Logo"
          class="logo-img"
        />
      </div>
      <div class="header-group right">
        <a href="https://www.comune.trento.it" class="image-with-link">
          <img
            src="@/assets/comune-di-Trento.jpg"
            alt="Right Image 1"
            class="small-img"
          />
        </a>
        <a href="https://www.unitn.it" class="image-with-link">
          <img src="@/assets/unitn.jpg" alt="Right Image 2" class="small-img" />
        </a>
      </div>
    </div>
    <nav class="navbar">
      <ul>
        <li>
          <RouterLink to="/about">About</RouterLink>
        </li>
        <li>
          <RouterLink to="/registration">Registration</RouterLink>
        </li>
        <li>
          <RouterLink to="/login">Login</RouterLink>
        </li>
        <li>
          <RouterLink to="/history">History</RouterLink>
        </li>
        <li>
          <RouterLink to="/contact">Contact</RouterLink>
        </li>
        <li>
          <RouterLink to="/profile">Profile</RouterLink>
        </li>
        <li>
          <RouterLink @click.native="Op118AccessHandler" to="/action118">Action_118</RouterLink>
        </li>
        <li>
          <RouterLink @click.native="CertifierAccessHandler" to="/actionCert">Action_Cert</RouterLink>
        </li>
        <li>
          <RouterLink @click.native="VolunteerAccessHandler" to="/actionVol">Action_Vol</RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>


<style scoped>
.head {
  background-color: white;
  color: #fff;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.header-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.small-img {
  width: relative; /* Adjust width as needed */
  height: 100px; /* Adjust height as needed */
}

.img-left {
  width: relative;
  height: 200px;
}

.logo-img {
  max-width: 100%;
  height: auto;
  transition: width 0.5s ease; /* Smooth transition for logo resize */
}

.header-logo {
  flex: 1;
  text-align: center;
  max-width: 500px; /* Maximum logo width */
}

nav.navbar {
  width: 100%;
  background-color: #444; /* Slightly darker than header for contrast */
  padding: 10px 0;
}

nav.navbar ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
}

nav.navbar li a {
  text-decoration: none;
  color: white;
  padding: 10px 20px;
  transition: background-color 0.3s;
}

nav.navbar li a:hover {
  background-color: #555;
}

.image-with-link:hover {
  transform: scale(1.1);
  transition: 0.5s;
}

@media (max-width: 768px) {
  .logo-img {
    height: 80%; /* Smaller logo on smaller screens */
  }
}
</style>
