<template>
  <div class="fixed top-0 left-0 w-1/2 h-full bg-white" aria-hidden="true" />
  <div class="fixed top-0 right-0 w-1/2 h-full bg-gray-50" aria-hidden="true" />
  <div class="relative min-h-full flex flex-col">
    <!-- Navbar -->
    <Header />

    <!-- 3 column wrapper -->
    <div class="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
      <!-- Left sidebar & main wrapper -->
      <div class="flex-1 min-w-0 bg-white xl:flex">
        <!-- Account profile -->
        

        <!-- Shows List -->
        <div v-if="data" class="bg-white lg:min-w-0 lg:flex-1">
          <div
            class="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
            <div class="flex items-center">
              <img :src="data.image_path" class="h-16 w-16 mr-5" alt="">
              <h1 class="flex-1 text-lg font-medium">{{ data.name }}</h1>
              <div>
                <p>
                  <span class="text-sm text-gray-500">Status : {{ data.status }}</span>
                </p>
                <p>
                  <span class="text-sm text-gray-500">Ratings : {{ data.rating }}</span>
                </p>
                <p>
                  <span class="text-sm text-gray-500">Rating Count : {{ data.rating_count }}</span>
                </p>
                <p>
                  <span class="text-sm text-gray-500">Country : {{ data.country }}</span>
                </p>
                <p>
                  <span class="text-sm text-gray-500">Start Date : {{ data.start_date }}</span>
                </p>
                <p>
                  <span class="text-sm text-gray-500">End Date : {{ data.end_date }}</span>
                </p>
              </div>
              <Menu as="div" class="relative">
                <MenuItems
                  class="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                    <a href="#" :class="[
                      active
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]">Name</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <a href="#" :class="[
                      active
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]">Date modified</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <a href="#" :class="[
                      active
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700',
                      'block px-4 py-2 text-sm',
                    ]">Date created</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>

          <div class="px-3 py-2 my-2">
            <p class="text-gray-700">
            {{ data.description }}
          </p>
          </div>
          <div class="grid grid-cols-3">
            <img v-for="image in data.pictures" :key="image" :src="image"
            class="max-w-sm rounded border bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800" alt="..." />
          </div>

          <ul role="list" class="relative z-0 divide-y divide-gray-200 border-b border-gray-200">
            <li v-for="(episode, index) in data.episodes.slice(0, itemCount)" :key="episode.air_date"
              class="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6">
              <div class="flex items-center justify-between space-x-4">
                <!-- Repo name and link -->
                <div class="min-w-0 space-y-3">
                  <div class="flex items-center space-x-3">
                    <span class="block">
                      <h2 class="text-sm font-medium">
                        {{ episode.name }}
                      </h2>
                    </span>
                  </div>
                  <span class="text-sm text-gray-500 group-hover:text-gray-900 font-medium">Season - {{ episode.season
                  }}</span>
                </div>
              
                <!-- Repo meta info -->
                <div class="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3">
                  <p class="flex text-gray-500 text-sm space-x-2">
                    <span> Air Date - {{ formatDate(episode.air_date) }}</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
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
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Loader,
    Header
  },
  setup() {
    const data = ref(null);
    const page = ref(1);
    const itemCount = ref(10);

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

    const scrollHandler = () => {
      if (
        // check if bottom of the page
        window.innerHeight + window.scrollY >= document.body.offsetHeight ||
        window.innerHeight + window.scrollY >= document.documentElement.offsetHeight
      ) {
        // pause for 500 ms and then increase the itemCount by 10
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
    };
  },
};
</script>
