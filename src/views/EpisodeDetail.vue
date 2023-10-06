<script setup>
import { ref, onMounted } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
const days = ref([]);

</script>

<template>
  <div class="card">
    <p>
        Episode Detail Page
    </p>
  </div>
</template>

