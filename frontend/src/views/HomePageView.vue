<template>
    <section class="map-section">
      <h3>MAPPA</h3>
      <div id="map"></div>
    </section>

</template>

<script>
import L from 'leaflet';
import axios from "axios";
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.js';


export default {
  name: 'HomePageView',
  mounted() {
    const map = L.map('map').setView([46.065, 11.124], 14); // Imposta le coordinate e lo zoom iniziale

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Crea un'icona personalizzata verde
    const greenIcon = L.AwesomeMarkers.icon({
      icon: 'info-sign',
      markerColor: 'green',
      prefix: 'glyphicon'
    });

    // Recupera i dati dal backend e aggiungi i marker
    axios.get('http://localhost:3000/api/v1/dae')
      .then(response => {
        const points = response.data;
        points.forEach(point => {
            console.log(point);
            console.log("\n")
          L.marker([point.latitudine, point.longitudine], {icon: greenIcon})
            .addTo(map)
            .bindPopup(point.fumetto);
        });
      })
      .catch(error => {
        console.error('Errore nel recupero dei punti:', error);
      });
  }
}

</script>


<style scoped>
.map-section{
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
}
</style>
