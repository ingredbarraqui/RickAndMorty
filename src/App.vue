<script setup>
import { RouterView } from 'vue-router';
import Footer from './components/Footer.vue';
import HeaderNav from './components/HeaderNav.vue';
</script>

<template>
  <HeaderNav />
  <main>
    <RouterView class="my-5" />
  </main>
  <Footer />
</template>
