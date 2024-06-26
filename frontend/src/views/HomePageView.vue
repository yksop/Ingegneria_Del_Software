<template>
  <section class="map-section">
    <h2>MAPPA</h2>
    <div id="map"></div>
    <select v-model="selectedMap" @change="changeMap" class="selector">
      <option value="osm">OpenStreetMap</option>
      <option value="otm">OpenTopoMap</option>
    </select>
  </section>
</template>

<script>
import L from "leaflet";
import axios from "axios";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.js";
import {
  getUserId,
  isVolunteer,
  isLoggedIn,
} from "@/services/tokenManagement.js";

export default {
  name: "HomePageView",
  data() {
    return {
      selectedMap: "osm", // Tipo di mappa selezionata
      map: null,
      markers: [],
      tileLayer: null,
    };
  },
  mounted() {
    this.map = L.map("map").setView([46.065, 11.124], 14); // Imposta le coordinate e lo zoom iniziale
    this.changeMap(); // Carica la mappa iniziale

    // Crea un'icona personalizzata verde
    const greenIcon = L.AwesomeMarkers.icon({
      icon: "info-sign",
      markerColor: "green",
      prefix: "glyphicon",
    });

    const purpleIcon = L.AwesomeMarkers.icon({
      icon: "info-sign",
      markerColor: "purple",
      prefix: "glyphicon",
    });

    const orangeIcon = L.AwesomeMarkers.icon({
      icon: "info-sign",
      markerColor: "orange",
      prefix: "glyphicon",
    });

    const redIcon = L.AwesomeMarkers.icon({
      icon: "info-sign",
      markerColor: "red",
      prefix: "glyphicon",
    });

    const blueIcon = L.AwesomeMarkers.icon({
      icon: "info-sign",
      markerColor: "blue",
      prefix: "glyphicon",
    });

    // Recupera i dati dal backend e aggiungi i marker
    axios
      .get(axios.defaults.baseURL + "/api/v2/daes")
      .then((response) => {
        const points = response.data;
        points.forEach((point) => {
          // create text for popup
          var popupText =
            "<b>" +
            point.fumetto +
            "</b><br>" +
            "<a href='https://www.google.com/maps/dir//" +
            point.latitudine +
            "," +
            point.longitudine +
            "'>Navigate with Google Maps</a>";

          const marker = L.marker([point.latitudine, point.longitudine], {
            icon: greenIcon,
          })
            .addTo(this.map)
            .bindPopup(popupText);
          this.markers.push(marker);
        });
      })
      .catch((error) => {
        console.error("Errore nel recupero dei punti:", error);
        alert("Errore nel recupero dei defibrillatori");
      });

    axios
      .get(axios.defaults.baseURL + "/api/v2/clinics")
      .then((response) => {
        const points = response.data;
        points.forEach((point) => {
          var popupText =
            "<b>" +
            point.fumetto +
            "</b><br>" +
            "<a href='https://www.google.com/maps/dir//" +
            point.latitudine +
            "," +
            point.longitudine +
            "'>Navigate with Google Maps</a>";

          const marker = L.marker([point.latitudine, point.longitudine], {
            icon: purpleIcon,
          })
            .addTo(this.map)
            .bindPopup(popupText);
          this.markers.push(marker);
        });
      })
      .catch((error) => {
        console.error("Errore nel recupero dei punti:", error);
        alert("Errore nel recupero degli ambulatori");
      });

    axios
      .get(axios.defaults.baseURL + "/api/v2/hospitals")
      .then((response) => {
        const points = response.data;
        points.forEach((point) => {
          var popupText =
            "<b>" +
            point.nome +
            "</b><br>" +
            "<a href='https://www.google.com/maps/dir//" +
            point.latitudine +
            "," +
            point.longitudine +
            "'>Navigate with Google Maps</a>";
          const marker = L.marker([point.latitudine, point.longitudine], {
            icon: orangeIcon,
          })
            .addTo(this.map)
            .bindPopup(popupText);
          this.markers.push(marker);
        });
      })
      .catch((error) => {
        console.error("Errore nel recupero dei punti:", error);
        alert("Errore nel recupero degli ospedali");
      });

    if (isLoggedIn()) {
      // get user Id
      const userId = getUserId();
      // get user data and ping him in the map
      axios
        .get(axios.defaults.baseURL + `/api/v2/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          const user = response.data;
          console.log(user);
          const popupText =
            "<a href='https://www.google.com/maps/dir//" +
            user.latitude +
            "," +
            user.longitude +
            "'>" +
            user.name +
            " " +
            user.surname +
            "</a>";
          const marker = L.marker([user.latitude, user.longitude], {
            icon: blueIcon,
          })
            .addTo(this.map)
            .bindPopup(popupText);
          this.markers.push(marker);
          const alertId = user.volunteer.acceptedAlert;

          if (alertId != null) {
            axios
              .get(axios.defaults.baseURL + `/api/v2/alerts/${alertId}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
              .then((response) => {
                const alert = response.data;
                console.log(alert);
                const popupText =
                  "<b>" +
                  alert.description +
                  "</b><br>" +
                  "<a href='https://www.google.com/maps/dir//" +
                  alert.latitude +
                  "," +
                  alert.longitude +
                  "'>Navigate with Google Maps</a>";
                const marker = L.marker([alert.latitude, alert.longitude], {
                  icon: redIcon,
                })
                  .addTo(this.map)
                  .bindPopup(popupText);
                this.markers.push(marker);
                // Crea un cerchio sfumato
                this.createGradientCircle(
                  [alert.latitude, alert.longitude],
                  alert.radius * 1000,
                  1
                );
              })
              .catch((error) => {
                console.error("Errore nel recupero dei punti:", error);
                alert("Errore nel recupero dell'alert");
              });
          }
        })
        .catch((error) => {
          console.error("Errore nel recupero dei punti:", error);
          alert("Errore nel recupero dell'utente");
        });
    }

    // Aggiungi la legenda alla mappa
    const legend = L.control({ position: "topright" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Legenda</h4>";
      div.innerHTML +=
        '<div><i style="background: green; width: 18px; height: 18px; display: inline-block; border-radius: 50%; margin-right: 8px;"></i> DAE  </div>';
      div.innerHTML +=
        '<div><i style="background: purple; width: 18px; height: 18px; display: inline-block; border-radius: 50%; margin-right: 8px;"></i> Ambulatori</div>';
      div.innerHTML +=
        '<div><i style="background: orange; width: 18px; height: 18px; display: inline-block; border-radius: 50%; margin-right: 8px;"></i> Ospedali</div>';
      div.innerHTML +=
        '<div><i style="background: red; width: 18px; height: 18px; display: inline-block; border-radius: 50%; margin-right: 8px;"></i> Alert</div>';
      div.innerHTML +=
        '<div><i style="background: blue; width: 18px; height: 18px; display: inline-block; border-radius: 50%; margin-right: 8px;"></i> Utente</div>';
      div.style.backgroundColor = "white";
      div.style.padding = "10px";
      div.style.borderRadius = "10px";
      div.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
      div.style.textAlign = "left";
      return div;
    };

    legend.addTo(this.map);
  },
  methods: {
    changeMap() {
      if (this.tileLayer) {
        this.map.removeLayer(this.tileLayer);
      }

      if (this.selectedMap === "osm") {
        this.tileLayer = L.tileLayer(
          "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }
        );
      } else if (this.selectedMap === "otm") {
        this.tileLayer = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }
        );
      }

      this.tileLayer.addTo(this.map);
    },
    createGradientCircle(center, radius) {
      L.circle(center, {
        color: "red", // Colore del bordo
        fillColor: "black", // Colore di riempimento
        fillOpacity: 0.1, // Opacità del riempimento (leggermente opaco)
        radius: radius, // Raggio del cerchio
      }).addTo(this.map);
    },
  },
};
</script>


<style scoped>
.map-section {
  color: #333;
  text-align: center;
  padding-top: 30px;
  height: 800px;
  padding-bottom: 60px;
}

#map {
  display: block;
  margin: auto;
  width: 90%;
  height: 90%; /* Larghezza desiderata della mappa */
  border: 1px solid #333;
}

.selector {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
}
</style>
