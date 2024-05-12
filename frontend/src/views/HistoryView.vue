<template>
  <div class="history-section">
    <section id="genesis">
      <h2>LA GENESI</h2>
      <p>
        VTC é una associazione sorta nel 2024 nata dalla mente di tre brillanti
        Software Engineer dell’Università di Trento che, per un progetto del
        corso di Ingegneria del software tenuto dal professore Fiore, si sono
        trovati ad identificare, studiare e sviluppare nuove soluzioni per
        risolvere criticità del comune di Trento, partecipante attivo del
        progetto.
      </p>
      <br />
      <p>La problematica scelta è stata subito identificata dal gruppo.</p>
      <br />
      <p>
        Alberto, uno dei fondatori nonché volontario della CRI della sede di
        Pergine Valsugana, commenta:
      </p>
      <blockquote>
        “Qualche mese prima di venire a conoscenza del progetto ero a cena con
        Federica e Jacopo e discutevo con loro, dopo una lezione sul BLSD tenuta
        dal monitore Claudio, su quanto fosse importante reagire nel minor tempo
        possibile a certe emergenze sanitarie. <br />Per un infarto si hanno
        pochi minuti, come anche per un ictus e per una emorragia.”
      </blockquote>
      <p>Aggiunge anche:</p>
      <blockquote>
        “Queste emergenze avvengono sempre più frequentemente e, nella maggior
        parte dei casi, portano a gravissime conseguenze (se non a decesso) a
        causa l’impossibilità per le istituzioni sanitarie di raggiungere questi
        infortunati in tempo utile all’azione.”
      </blockquote>
      <p>
        <br />È così che quella sera è maturata in loro una possibile idea su
        come risolvere quella problematica.<br /><br />
        Questa idea primordiale con il tempo si è evoluta nella mente dei tre
        ragazzi e, il giorno della proposta da parte del Comune, la scintilla
        latente da mesi si é accesa definitivamente portando ad una evoluzione
        concreta della problematica.
      </p>
      <p>
        L’idea di base, meglio dettagliata nella sezione ABOUT, è quella di
        rendere attivi i volontari della CRI (estendendola in futuro anche ad
        altre associazioni di volontariato) anche fuori servizio, in modo da
        avere una rete interconnessa ed estesa di volontari che intervengono
        prima dell’arrivo dell’ambulanza e che fungono, quindi, da tampone prima
        dell’arrivo dei soccorsi, riducendo drasticamente gli esiti negativi
        dell’emergenza.
      </p>
      <p>
        <br />Nel 2024 Trento è diventata capitale Europea del Volontariato
        (https://www.trentovolo.capital/it).
      </p>
      <p>
        Questo è il terreno fertile perfetto per testare realmente il nostro
        innovativo servizio.
      </p>
    </section>

    <section id="founders">
      <h2><br />I FONDATORI</h2>
      <div class="image-gallery">
        <figure>
          <img src="@/assets/alberto_TO_CHANGE.jpeg" alt="Fondatore 1" />
          <figcaption>Alberto Dal Bosco</figcaption>
        </figure>
        <figure>
          <img src="@/assets/posky_TO_CHANGE.jpeg" alt="Fondatore 2" />
          <figcaption>Jacopo Veronese</figcaption>
        </figure>
        <figure>
          <img src="@/assets/fede_TO_CHANGE.jpeg" alt="Fondatore 3" />
          <figcaption>Federica Lorenzini</figcaption>
        </figure>
      </div>
    </section>

    <div class="photo-slider">
      <h2>IMMAGINI</h2>
      <button @click="prevImage">←</button>
      <figure>
        <img
          :src="currentImage.src"
          :alt="currentImage.alt"
          class="single_image"
        />
        <figcaption>{{ currentImage.description }}</figcaption>
      </figure>
      <button @click="nextImage">→</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          src: "/src/assets/img1.jpg",
          alt: "Foto evento 0",
          description: "Descrizione evento 0",
        },
        {
          src: "/src/assets/img2.jpg",
          alt: "Foto evento 1",
          description: "Descrizione evento 1",
        },
        {
          src: "/src/assets/img3.jpg",
          alt: "Foto evento 2",
          description: "Descrizione evento 2",
        },
        {
          src: "/src/assets/img4.jpg",
          alt: "Foto evento 3",
          description: "Descrizione evento 3",
        },
      ],
      currentIndex: 0,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    },
  },
  methods: {
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.images.length - 1;
      }
    },
    nextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
    },
  },
};
</script>

<style scoped>
.history-section {
  padding-top: 30px;
  padding-bottom: 60px;
  padding-left: 20px;
  padding-right: 20px;
}

.history-section h2 {
  color: #333;
  text-align: center;
}

#genesis p,
blockquote {
  margin: 0 20px;
}

blockquote {
  font-style: italic;
  margin: 10px 30px;
  padding: 10px;
  border-left: 3px solid #ccc;
}

.image-gallery {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.image-gallery figure {
  margin: 0;
  text-align: center;
}

.image-gallery img {
  width: 15rem;
  height: auto;
  border: 1px solid #ccc;
}

.image-gallery figcaption {
  margin-top: 5px;
  color: #666;
}

.photo-slider {
  padding-top: 20px;
  text-align: center;
  position: relative;
  width: 100%;
  margin: auto;
}

.photo-slider img {
  width: 80%;
  height: auto;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  border: none;
  cursor: pointer;
}

button:first-of-type {
  left: 10px;
}

button:last-of-type {
  right: 10px;
}
</style>
