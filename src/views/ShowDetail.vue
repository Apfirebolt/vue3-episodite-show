<template>
  <div class="fixed top-0 left-0 w-1/2 h-full bg-white" aria-hidden="true" />
  <div class="fixed top-0 right-0 w-1/2 h-full bg-gray-50" aria-hidden="true" />
  <div class="relative min-h-full flex flex-col">
    <!-- Navbar -->
    <Header />

    <!-- 3 column wrapper -->
    <div class="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
      <!-- Left sidebar & main wrapper -->
      <div class="flex-1 min-w-0 bg-secondary-100 text-primary xl:flex">
        <!-- Account profile -->

        <!-- Shows List -->
        <div v-if="data" class="lg:min-w-0 lg:flex-1">
          <!-- Header Section -->
          <div class="bg-white shadow-sm">
            <div class="px-6 py-6 border-b border-gray-200">
              <div class="flex items-start gap-6">
                <img
                  :src="data.image_path"
                  class="h-32 w-32 rounded-lg object-cover shadow-md"
                  alt=""
                />
                <div class="flex-1">
                  <h1 class="text-3xl font-bold text-gray-900 mb-4">
                    {{ data.name }}
                  </h1>
                  <div class="flex flex-wrap gap-3 mb-4">
                    <span
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {{ data.status }}
                    </span>
                    <span
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {{ data.country }}
                    </span>
                    <span
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                    >
                      ⭐ {{ data.rating }} ({{ data.rating_count }})
                    </span>
                  </div>
                  <div class="space-y-1 text-sm text-gray-600">
                    <p>
                      <span class="font-medium text-gray-700">Started:</span>
                      {{ data.start_date }}
                    </p>
                    <p>
                      <span class="font-medium text-gray-700">Ended:</span>
                      {{ data.end_date || "Ongoing" }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="px-6 py-5 bg-gray-50">
              <h2 class="text-lg font-semibold text-gray-900 mb-3">About</h2>
              <p class="text-gray-700 leading-relaxed">
                {{ data.description }}
              </p>
            </div>
          </div>

          <!-- Gallery Slideshow -->
          <div
            v-if="data.pictures && data.pictures.length"
            class="bg-white mt-6 shadow-sm"
          >
            <div class="px-6 py-5 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900">Gallery</h2>
            </div>
            <div class="relative p-6">
              <!-- Main Image -->
              <div
                class="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
              >
                <img
                  :src="data.pictures[currentSlide]"
                  class="w-full h-full object-cover"
                  alt=""
                />

                <!-- Navigation Buttons -->
                <button
                  @click="prevSlide"
                  class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  @click="nextSlide"
                  class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <!-- Slide Counter -->
                <div
                  class="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm"
                >
                  {{ currentSlide + 1 }} / {{ data.pictures.length }}
                </div>
              </div>

              <!-- Thumbnails -->
              <div class="mt-4 grid grid-cols-6 gap-3">
                <img
                  v-for="(image, index) in data.pictures"
                  :key="image"
                  :src="image"
                  @click="currentSlide = index"
                  :class="[
                    'w-full h-20 object-cover rounded-lg cursor-pointer transition-all',
                    currentSlide === index
                      ? 'ring-4 ring-blue-500 opacity-100'
                      : 'opacity-60 hover:opacity-100',
                  ]"
                  alt=""
                />
              </div>
            </div>
          </div>

          <!-- Episodes List -->
          <div class="bg-white mt-6 shadow-sm">
            <div class="px-6 py-5 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900">Episodes</h2>
            </div>
            <ul role="list" class="divide-y divide-gray-200">
              <li
                v-for="(episode, index) in data.episodes.slice(0, itemCount)"
                :key="episode.air_date"
                class="px-6 py-5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-3 mb-2">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        Episode {{ index + 1 }}
                      </span>
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        Season {{ episode.season }}
                      </span>
                    </div>
                    <h3 class="text-base font-semibold text-gray-900 truncate">
                      {{ episode.name }}
                    </h3>
                  </div>
                  <div class="ml-6 flex-shrink-0 text-right">
                    <p class="text-sm text-gray-500">
                      {{ formatDate(episode.air_date) }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="bg-white lg:min-w-0 lg:flex-1">
          <Loader />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpClient from "../plugins/interceptor";
import Loader from "../components/Loader.vue";
import Header from "../components/Header.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import moment from "moment";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Loader,
    Header,
  },
  setup() {
    const data = ref(null);
    const page = ref(1);
    const itemCount = ref(10);
    const currentSlide = ref(0);

    const getShowDetail = async (id) => {
      try {
        const response = await httpClient.get("show-details?q=" + id);
        data.value = response.data.tvShow;
      } catch (error) {
        console.error(error);
      }
    };

    const formatDate = (date) => {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    };

    const nextSlide = () => {
      if (data.value && data.value.pictures) {
        currentSlide.value =
          (currentSlide.value + 1) % data.value.pictures.length;
      }
    };

    const prevSlide = () => {
      if (data.value && data.value.pictures) {
        currentSlide.value =
          currentSlide.value === 0
            ? data.value.pictures.length - 1
            : currentSlide.value - 1;
      }
    };

    const scrollHandler = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight ||
        window.innerHeight + window.scrollY >=
          document.documentElement.offsetHeight
      ) {
        setTimeout(() => {
          itemCount.value = itemCount.value + 10;
        }, 500);
      }
      return;
    };

    onMounted(async () => {
      const route = useRoute();
      await getShowDetail(route.params.id);

      window.addEventListener("scroll", scrollHandler);
    });

    return {
      formatDate,
      scrollHandler,
      itemCount,
      data,
      page,
      currentSlide,
      nextSlide,
      prevSlide,
    };
  },
};
</script>
