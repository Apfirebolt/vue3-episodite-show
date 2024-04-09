<template>
  <div class="relative min-h-full flex flex-col">
    <!-- Navbar -->
    <Header />
    <!-- 3 column wrapper -->
    <div class="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
      <!-- Left sidebar & main wrapper -->
      <div class="flex-1 min-w-0 xl:flex">
        <!-- Account profile -->
        <div class="xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200">
          <div class="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
            <div class="flex items-center justify-between">
              <div class="flex-1 space-y-8">
                <div class="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
                  <!-- Profile -->
                  
                  <!-- Action buttons -->
                  <div class="flex flex-col sm:flex-row xl:flex-col">
                    <div class="flex-1 flex justify-center lg:justify-end">
                      <div class="w-full my-2">
                        <label for="search" class="sr-only">Search Shows</label>
                        <div class="relative text-indigo-200 focus-within:text-gray-400">
                          <div @click="searchShow"
                            class="absolute cursor-pointer inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon class="h-5 w-5 cursor-pointer" aria-hidden="true" />
                          </div>
                          <input id="search" v-model="searchStr" name="search"
                            class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
                            placeholder="Search shows" type="search" />
                        </div>
                      </div>
                    </div>
                    <button @click="searchShow" type="button"
                      class="inline-flex m-1 items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-700 hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:w-full">
                      Search
                    </button>
                    <button @click="getNextPage" type="button"
                      class="inline-flex m-1 items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-700 hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:w-full">
                      Next Page
                    </button>
                    <button @click="getPreviousPage" type="button"
                      class="inline-flex m-1 items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-700 hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:w-full">
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
            class="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
            <div class="flex items-center">
              <h1 class="flex-1 text-lg font-medium">Top Rated Shows</h1>
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
          <ul role="list" class="relative z-0 divide-y divide-gray-200 border-b border-gray-200">
            <li v-for="show in data.tv_shows" :key="show.id"
              class="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6">
              <div class="flex items-center justify-between space-x-4">
                <!-- Repo name and link -->
                <div class="min-w-0 space-y-3">
                  <div class="flex items-center space-x-3">
                    <span class="block">
                      <h2 class="text-sm font-medium">
                        <a :href="show.permalink">
                          <span class="absolute inset-0" aria-hidden="true" />
                          {{ show.name }}
                        </a>
                      </h2>
                    </span>
                  </div>
                  <a :href="show.permalink" class="relative group flex items-center space-x-2.5">
                    <img class="h-16 w-16" :src="show.image_thumbnail_path" alt="Workflow" />
                    <span class="text-sm text-gray-500 group-hover:text-gray-900 font-medium">{{ show.name }}</span>
                  </a>
                </div>
                <div class="sm:hidden">
                  <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <!-- Repo meta info -->
                <div class="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3">
                  <p class="flex items-center space-x-4">
                    <router-link class="relative text-sm text-gray-500 hover:text-gray-900 font-medium"
                      :to="{ name: 'ShowDetail', params: { id: show.id } }">View</router-link>
                    <span :class="show.status === 'Ended' ? 'bg-red-200' : 'bg-green-200'
                      " class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-green-800">
                      {{ show.status }}
                    </span>
                  </p>
                  <p class="flex text-gray-500 text-sm space-x-2">
                    <span> Start Date - {{ show.start_date }}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>End Date -
                      {{ show.end_date ? show.end_date : "On-going" }}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{{ show.country }}</span>
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
import { onMounted, ref } from "vue";
import Loader from "../components/Loader.vue";
import Header from "../components/Header.vue";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
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
    Header
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

    onMounted(async () => {
      await getMostPopular();
    });
    return {
      getNextPage,
      getPreviousPage,
      searchShow,
      data,
      searchStr,
    };
  },
};
</script>
