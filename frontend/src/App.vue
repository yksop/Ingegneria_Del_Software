<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

// At first, there are no tokens saved in the local storage
const token = localStorage.removeItem('token')

</script>


<template>
<body>
  <div class="container">
    <header>
      <Header msg="VTC: Volontari Trentini Connessi" />
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</body>
</template>
