<script setup>
import { ref, onMounted } from "vue";
import dayjs from "dayjs";

defineProps({
  msg: String,
});

const count = ref(0);
const days = ref([]);

onMounted(() => {
  let now = dayjs();

  for (let i = 0; i < 30; i += 1) {
    let currentDate = now.add(i, "day");
    days.value.push(currentDate.format("MMMM D, YYYY"));
  }
});
</script>

<template>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p class="text-3xl text-red-300">
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  {{ days }}
  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
