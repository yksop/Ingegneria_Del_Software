import{L as t}from"./leaflet-src-DJNHV9I0.js";import{_ as o,c as e,o as i,A as n}from"./index-C6X_6u4j.js";import"./_commonjsHelpers-Cpj98o6Y.js";const s="/assets/img_azienda-hP6fCdQn.jpeg",c={name:"ContactView",mounted(){const a=t.map("map").setView([46.067981,11.150299],17);t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(a),t.marker([46.067981,11.150299]).addTo(a).bindPopup("VTC, Povo, Italia").openPopup()}},f={class:"contact-section"},p=n('<h2 data-v-b1f4a3f4>CONTATTACI</h2><section class="contact-info" data-v-b1f4a3f4><h3 data-v-b1f4a3f4>INFORMAZIONI</h3><p data-v-b1f4a3f4>Telefono: 0461 281567</p><p data-v-b1f4a3f4>Email: <a href="mailto:volontaritrentiniconnessi@gmail.com" data-v-b1f4a3f4>volontaritrentiniconnessi@gmail.com</a></p></section><section class="time-section" data-v-b1f4a3f4><h3 data-v-b1f4a3f4>ORARI DI APERTURA</h3><p data-v-b1f4a3f4>Lunedì - Venerdì: 7:30 - 20:00</p><p data-v-b1f4a3f4>Sabato: 8:00 - 13:00</p></section><section class="map-section" data-v-b1f4a3f4><h3 data-v-b1f4a3f4>MAPPA</h3><p data-v-b1f4a3f4>Indirizzo: Via Sommarive, 9, Trento, Italy</p><div id="map" data-v-b1f4a3f4></div></section><section class="location-section" data-v-b1f4a3f4><h3 data-v-b1f4a3f4>LA NOSTRA SEDE OPERATIVA</h3><img src="'+s+'" alt="Sede Operativa" data-v-b1f4a3f4></section>',5),d=[p];function r(a,m,v,b,l,h){return i(),e("div",f,d)}const T=o(c,[["render",r],["__scopeId","data-v-b1f4a3f4"]]);export{T as default};