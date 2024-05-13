<template>
  <div class="contact-section">
    <section class="contact-info">
      <h2>INFORMAZIONI DI CONTATTO</h2>
      <p>Telefono: 0461 281567</p>
      <p>Email: <a href="mailto:info@vtc.com">info@vtc.com</a></p>
    </section>
    <section class="time-section">
      <h2>ORARI DI APERTURA</h2>
      <p>Lunedì - Venerdì: 7:30 - 20:00</p>
      <p>Sabato: 8:00 - 13:00</p>
    </section>
    <section class="map-section">
      <h2>MAPPA</h2>
      <p>Indirizzo: Via Sommarive, 9, Trento, Italy</p>
      <div id="map"></div>
    </section>
    <section class="location-section">
      <h2>LA NOSTRA SEDE OPERATIVA</h2>
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

.contact-section h2 {
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
