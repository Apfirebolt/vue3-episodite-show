<script setup>

import { useGetData } from "../composables/getData";
import Loader from "../components/Loader.vue";

const { data, loading, getData, errorData } = useGetData();

getData("https://pokeapi.co/api/v2/pokemon");
</script>

<template>
  <h1>Pokemons Composables</h1>
  <Loader v-if="loading" />
  <div class = "alert alert-danger mt-3" v-if="errorData">{{ errorData }}</div>
  <div v-if="data">
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="poke in data.results"
        :key="poke.id"
      >
      {{ poke.name }}
      </li>
    </ul>
    <div class="mt-3">
      <button
        :disabled="!data.previous"
        class="btn btn-warning mx-2"
        @click="getData(data.previous)"
      >
        Previous
      </button>
      <button
        :disabled="!data.next"
        class="btn btn-success"
        @click="getData(data.next)"
      >
        Next
      </button>
    </div>
  </div>
</template>
