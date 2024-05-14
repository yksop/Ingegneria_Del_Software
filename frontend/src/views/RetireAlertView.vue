<template>
  <div>
    <ul>
      <li v-for="(alert, index) in alerts" :key="index">
        <span class="alert-info">Alert ID:</span> {{ alert._id }} |
        <span class="alert-info">Latitude:</span> {{ alert.latitude }} |
        <span class="alert-info">Longitude:</span> {{ alert.longitude }} |
        <span class="alert-info">Description:</span> {{ alert.description }}
        <button class="small-button" @click="removeAlert(index)">Retire</button>
      </li>
    </ul>
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
        .put(`http://localhost:3000/api/v1/alerts/${this.alerts[index]._id}`)
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
li {
  margin-bottom: 10px;
}

.small-button {
  margin-left: 10px;
}

.alert-info {
  color: red;
}
</style>