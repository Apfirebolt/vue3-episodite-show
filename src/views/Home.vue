<template>
  <div class="relative min-h-full flex flex-col">
    <!-- Navbar -->
    <Header />
    <!-- 3 column wrapper -->
    <div class="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
      <!-- Left sidebar & main wrapper -->
      <div class="flex-1 min-w-0 xl:flex">
        <!-- Account profile -->
        <div class="xl:flex-shrink-0 xl:w-48 xl:border-r xl:border-gray-200">
          <div class="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
            <div class="flex items-center justify-between">
              <div class="flex-1 space-y-8">
                <div
                  class="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8"
                >
                  <!-- Profile -->

                  <!-- Action buttons -->
                  <div class="flex flex-col sm:flex-row xl:flex-col">
                    <div class="flex-1 flex justify-center lg:justify-end">
                      <div class="w-full my-2">
                        <label for="search" class="sr-only">Search Shows</label>
                        <div
                          class="relative text-indigo-200 focus-within:text-gray-400"
                        >
                          <div
                            @click="searchShow"
                            class="absolute cursor-pointer inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                          >
                            <SearchIcon
                              class="h-5 w-5 cursor-pointer"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            id="search"
                            v-model="searchStr"
                            name="search"
                            class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
                            placeholder="Search shows"
                            type="search"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      @click="searchShow"
                      type="button"
                      class="inline-flex m-1 items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary bg-secondary-100 hover:bg-secondary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:w-full"
                    >
                      Search
                    </button>
                    <button
                      @click="getNextPage"
                      type="button"
                      class="inline-flex m-1 items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary bg-secondary-100 hover:bg-secondary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:w-full"
                    >
                      Next Page
                    </button>
                    <button
                      @click="getPreviousPage"
                      type="button"
                      class="inline-flex m-1 items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary bg-secondary-100 hover:bg-secondary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:w-full"
                    >
                      Previous Page
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Shows List -->
        <div v-if="data && data.tv_shows" class="bg-white lg:min-w-0 lg:flex-1">
          <div
            class="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0"
          >
            <div class="flex items-center">
              <h1 class="flex-1 text-lg font-medium">Top Rated Shows</h1>
              <Menu as="div" class="relative">
                <MenuItems
                  class="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Name</a
                      >
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Date modified</a
                      >
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Date created</a
                      >
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <div
              v-for="show in data.tv_shows"
              :key="show.id"
              class="bg-secondary-200 shadow-md rounded-lg overflow-hidden"
            >
              <img
                :src="show.image_thumbnail_path"
                alt="Show Thumbnail"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h2 class="text-lg font-semibold">{{ show.name }}</h2>
                <p class="text-gray-600">{{ show.network }}</p>
                <p class="text-gray-600">Country: {{ show.country }}</p>
                <p class="text-gray-600">Start Date: {{ show.start_date }}</p>
                <p class="text-gray-600">End Date: {{ show.end_date }}</p>
                <p class="text-gray-600">
                  Running: {{ show.status === "Running" ? "Yes" : "No" }}
                </p>
                <div class="flex space-x-2 my-3">
                  <a
                  :href="getFullLink(show.permalink)"
                  class="w-32 block text-center bg-secondary-300 text-white py-2 rounded transition duration-300 ease-in-out transform hover:bg-danger hover:scale-105"
                  >Details</a
                  >
                  <router-link
                  :to="{ name: 'ShowDetail', params: { id: show.id } }"
                  class="w-32 block text-center bg-secondary-100 text-black py-2 rounded transition duration-300 ease-in-out transform hover:bg-danger hover:scale-105"
                  >Show</router-link
                  >
                </div>
              </div>
            </div>
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
import { onMounted, ref } from "vue";
import Loader from "../components/Loader.vue";
import Header from "../components/Header.vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  BadgeCheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CollectionIcon,
  SearchIcon,
  SortAscendingIcon,
  StarIcon,
} from "@heroicons/vue/solid";
import { MenuAlt1Icon, XIcon } from "@heroicons/vue/outline";

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BadgeCheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CollectionIcon,
    MenuAlt1Icon,
    SearchIcon,
    SortAscendingIcon,
    StarIcon,
    XIcon,
    Loader,
    Header,
  },
  setup() {
    const data = ref(null);
    const page = ref(1);
    const searchStr = ref("");

    const getNextPage = async () => {
      page.value = page.value + 1;
      await getMostPopular();
    };

    const getPreviousPage = async () => {
      if (page.value > 1) {
        page.value = page.value - 1;
        await getMostPopular();
      }
    };

    const getMostPopular = async () => {
      try {
        const response = await httpClient.get(
          "most-popular?page=" + page.value
        );
        data.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const searchShow = async () => {
      try {
        const response = await httpClient.get(
          `search?q=${searchStr.value}&page=1`
        );
        data.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const getFullLink = (link) => {
      return "https://www.episodate.com/tv-show/" + link;
    };

    onMounted(async () => {
      await getMostPopular();
    });
    return {
      getNextPage,
      getPreviousPage,
      searchShow,
      getFullLink,
      data,
      searchStr,
    };
  },
};
</script>
