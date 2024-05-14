<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Header from "./components/Header.vue";
import HeaderReservedArea from "./components/HeaderReservedArea.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();

const reservedRoutes = ["/logged", "/upgradeDowngrade"];
const headerComponent = computed(() => {
  return reservedRoutes.includes(route.path) ? HeaderReservedArea : Header;
});
</script>

<template>
  <body>
    <div class="container">
      <header>
        <component
          :is="headerComponent"
          msg="VTC: Volontari Trentini Connessi"
        />
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
