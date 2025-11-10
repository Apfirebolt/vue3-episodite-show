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
              <h1 class="flex-1 text-2xl font-bold text-gray-800">
                Top Rated Shows
              </h1>
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
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            <div
              v-for="show in data.tv_shows"
              :key="show.id"
              class="bg-white dark:bg-gray-800 dark:text-white shadow-xl rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div class="relative overflow-hidden">
                <img
                  :src="show.image_thumbnail_path"
                  alt="Show Thumbnail"
                  class="w-full h-64 object-cover transition duration-300 transform hover:scale-110"
                />
                <div
                  class="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {{ show.status }}
                </div>
              </div>
              <div class="p-5">
                <h2
                  class="text-xl font-bold mb-2 text-gray-800 dark:text-white truncate"
                >
                  {{ show.name }}
                </h2>
                <div class="space-y-2 text-sm">
                  <p class="text-gray-600 dark:text-gray-300 flex items-center">
                    <span class="font-semibold mr-2">Network:</span
                    >{{ show.network }}
                  </p>
                  <p class="text-gray-600 dark:text-gray-300 flex items-center">
                    <span class="font-semibold mr-2">Country:</span
                    >{{ show.country }}
                  </p>
                  <p class="text-gray-600 dark:text-gray-300 flex items-center">
                    <span class="font-semibold mr-2">Start:</span
                    >{{ show.start_date }}
                  </p>
                  <p class="text-gray-600 dark:text-gray-300 flex items-center">
                    <span class="font-semibold mr-2">End:</span
                    >{{ show.end_date || "Ongoing" }}
                  </p>
                </div>
                <div class="flex gap-3 mt-5">
                  <a
                    :href="getFullLink(show.permalink)"
                    class="flex-1 text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-lg font-medium transition duration-300 ease-in-out transform hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg"
                    >Details</a
                  >
                  <router-link
                    :to="{ name: 'ShowDetail', params: { id: show.id } }"
                    class="flex-1 text-center bg-gradient-to-r from-pink-500 to-rose-600 text-white py-2.5 rounded-lg font-medium transition duration-300 ease-in-out transform hover:from-pink-600 hover:to-rose-700 hover:shadow-lg"
                    >View Show</router-link
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
