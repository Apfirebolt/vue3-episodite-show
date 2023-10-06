<template>
  <div class="fixed top-0 left-0 w-1/2 h-full bg-white" aria-hidden="true" />
  <div class="fixed top-0 right-0 w-1/2 h-full bg-gray-50" aria-hidden="true" />
  <div class="relative min-h-full flex flex-col">
    <!-- Navbar -->
    <Disclosure as="nav" class="flex-shrink-0 bg-indigo-600" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <!-- Search section -->
          <div class="flex-1 flex justify-center lg:justify-end">
            <div class="w-full px-2 lg:px-6">
              <label for="search" class="sr-only">Search Shows</label>
              <div class="relative text-indigo-200 focus-within:text-gray-400">
                <div
                  @click="searchShow"
                  class="absolute cursor-pointer inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <SearchIcon class="h-5 w-5 cursor-pointer" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  v-model="searchStr"
                  name="search"
                  class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-indigo-400 bg-opacity-25 text-indigo-100 placeholder-indigo-200 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
                  placeholder="Search shows"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div class="flex lg:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-400 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <MenuAlt1Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <!-- Links section -->
          <div class="hidden lg:block lg:w-80">
            <div class="flex items-center justify-end">
              <div class="flex">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  class="px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:text-white"
                  :aria-current="item.current ? 'page' : undefined"
                  >{{ item.name }}</a
                >
              </div>
              <!-- Profile dropdown -->
              <Menu as="div" class="ml-4 relative flex-shrink-0">
                <div>
                  <MenuButton
                    class="bg-indigo-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                      alt=""
                    />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem
                      v-for="item in userNavigation"
                      :key="item.name"
                      v-slot="{ active }"
                    >
                      <a
                        :href="item.href"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >{{ item.name }}</a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel class="lg:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              item.current
                ? 'text-white bg-indigo-800'
                : 'text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
        <div class="pt-4 pb-3 border-t border-indigo-800">
          <div class="px-2 space-y-1">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              :href="item.href"
              class="block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600"
              >{{ item.name }}</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <!-- 3 column wrapper -->
    <div class="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
      <!-- Left sidebar & main wrapper -->
      <div class="flex-1 min-w-0 bg-white xl:flex">
        <!-- Account profile -->
        <div
          class="xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white"
        >
          <div class="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
            <div class="flex items-center justify-between">
              <div class="flex-1 space-y-8">
                <div
                  class="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8"
                >
                  <!-- Profile -->
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0 h-12 w-12">
                      <img
                        class="h-12 w-12 rounded-full"
                        src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div class="space-y-1">
                      <div class="text-sm font-medium text-gray-900">
                        Debbie Lewis
                      </div>
                      <a href="#" class="group flex items-center space-x-2.5">
                        <svg
                          class="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span
                          class="text-sm text-gray-500 group-hover:text-gray-900 font-medium"
                          >debbielewis</span
                        >
                      </a>
                    </div>
                  </div>
                  <!-- Action buttons -->
                  <div class="flex flex-col sm:flex-row xl:flex-col">
                    <button
                      @click="getNextPage"
                      type="button"
                      class="inline-flex m-1 items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:w-full"
                    >
                      Next Page
                    </button>
                    <button
                      @click="getPreviousPage"
                      type="button"
                      class="inline-flex m-1 items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:w-full"
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
          <ul
            role="list"
            class="relative z-0 divide-y divide-gray-200 border-b border-gray-200"
          >
            <li
              v-for="show in data.tv_shows"
              :key="show.id"
              class="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
            >
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
                  <a
                    :href="show.permalink"
                    class="relative group flex items-center space-x-2.5"
                  >
                    <img
                      class="h-16 w-16"
                      :src="show.image_thumbnail_path"
                      alt="Workflow"
                    />
                    <span
                      class="text-sm text-gray-500 group-hover:text-gray-900 font-medium"
                      >{{ show.name }}</span
                    >
                  </a>
                </div>
                <div class="sm:hidden">
                  <ChevronRightIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <!-- Repo meta info -->
                <div
                  class="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3"
                >
                  <p class="flex items-center space-x-4">
                    <a
                      :href="show.permalink"
                      class="relative text-sm text-gray-500 hover:text-gray-900 font-medium"
                    >
                      View
                    </a>
                    <span :class="show.status === 'Ended' ? 'bg-red-200' : 'bg-green-200'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-green-800">
                      {{ show.status }}
                    </span>
                  </p>
                  <p class="flex text-gray-500 text-sm space-x-2">
                    <span> Start Date - {{ show.start_date }}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>End Date - {{ show.end_date ? show.end_date : "On-going" }}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{{ show.country }}</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpClient from "../plugins/interceptor";
import { onMounted, ref } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
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

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Domains", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
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
        const response = await httpClient.get("most-popular?page=" + page.value);
        data.value = response.data;

      } catch (error) {
        console.error(error);
      }
    };

    const searchShow = async () => {
      try {
        console.log('Searching now ', searchStr.value)
        const response = await httpClient.get(`search?q=${searchStr.value}&page=1`);
        data.value = response.data;

      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      await getMostPopular();
    });
    return {
      navigation,
      userNavigation,
      getNextPage,
      getPreviousPage,
      searchShow,
      data,
      searchStr
    };
  },
};
</script>
