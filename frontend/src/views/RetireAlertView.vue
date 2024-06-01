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
            <button class="small-button" @click="removeAlert(index)">
              Retire
            </button>
          </li>
        </ol>
      </div>
      <router-link to="/logged">
        <button class="logged-button">Go back</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      alerts: [],
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/v1/alerts")
      .then((response) => {
        this.alerts = response.data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
  methods: {
    removeAlert(index) {
      axios
        .patch(
          `http://localhost:3000/api/v1/alerts/${this.alerts[index]._id}`,
          { isActive: false }
        )
        .then(() => {
          this.alerts.splice(index, 1);
        })
        .catch((error) => {
          console.error("Error deleting alert:", error);
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
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
}

.logged-button {
  margin-top: 10px;
  align-self: center;
  margin-bottom: 20px;
}
</style>
