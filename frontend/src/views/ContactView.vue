<template>
  <div class="contact-section">
    <h2>CONTATTACI</h2>
    <section class="contact-info">
      <h3>INFORMAZIONI</h3>
      <p>Telefono: 0461 281567</p>
      <p>Email: <a href="mailto:info@vtc.com">info@vtc.com</a></p>
    </section>
    <section class="time-section">
      <h3>ORARI DI APERTURA</h3>
      <p>Lunedì - Venerdì: 7:30 - 20:00</p>
      <p>Sabato: 8:00 - 13:00</p>
    </section>
    <section class="map-section">
      <h3>MAPPA</h3>
      <p>Indirizzo: Via Sommarive, 9, Trento, Italy</p>
      <div id="map"></div>
    </section>
    <section class="location-section">
      <h3>LA NOSTRA SEDE OPERATIVA</h3>
      <img src="@/assets/img_azienda.jpeg" alt="Sede Operativa" />
    </section>
  </div>
</template>

<script>
import L from 'leaflet';

export default {
  name: 'ContactView',
  mounted() {
    const map = L.map('map').setView([46.067981, 11.150299], 17); // Imposta le coordinate e lo zoom iniziale

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([46.067981, 11.150299]).addTo(map)
      .bindPopup('VTC, Povo, Italia')
      .openPopup(); 
  }
}
</script>


<style scoped>
.contact-section h2 {
  color: #333;
  text-align: center;
}

.contact-section {
  padding-top: 30px;
  padding-bottom: 60px;
  padding-left: 20px;
  padding-right: 20px;
}

.contact-info{
  padding-bottom: 20px;
}

.time-section {
  padding-bottom: 20px;
}

.contact-section h3 {
  color: #333;
  text-align: left;
}

.location-section img {
  width: 80%;
  display: block;
  margin: auto;
}

#map {
  display: block;
  margin: auto;
  width: 80%; /* Altezza desiderata della mappa */
  height: 400px; /* Larghezza desiderata della mappa */
}
</style>
