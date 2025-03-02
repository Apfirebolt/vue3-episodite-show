<script setup>
import Footer from './components/Footer.vue';
</script>

<template>
  <router-view />
  <Footer />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}
</style>