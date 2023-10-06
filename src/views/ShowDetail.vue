<template>
  <div class="fixed top-0 left-0 w-1/2 h-full bg-white" aria-hidden="true" />
  <div class="fixed top-0 right-0 w-1/2 h-full bg-gray-50" aria-hidden="true" />
  <div class="relative min-h-full flex flex-col">
    <!-- Navbar -->
    <Disclosure as="nav" class="flex-shrink-0 bg-indigo-600" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
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
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="{ name: item.name}"
                  class="px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:text-white"
                  >{{ item.name }}
                </router-link>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Shows List -->
        <div v-if="data" class="bg-white lg:min-w-0 lg:flex-1">
          <div
            class="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0"
          >
            <div class="flex items-center">
              <img :src="data.image_path" class="h-16 w-16 mr-5" alt="">
              <h1 class="flex-1 text-lg font-medium">{{ data.name }}</h1>
              <div>
                <p>
                  <span class="text-sm text-gray-500">Status : {{ data.status }}</span>
                </p>
                <p>
                  <span class="text-sm text-gray-500">Country : {{ data.country }}</span>
                </p>
                <p>
                  Start Date - {{ data.start_date }}
                </p>
                <p>
                  End Date - {{ data.end_date }}
                </p>
              </div>
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
              v-for="episode in data.episodes"
              :key="episode.air_date"
              class="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
            >
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
                  <span
                    class="text-sm text-gray-500 group-hover:text-gray-900 font-medium"
                    >Season - {{ episode.season }}</span
                  >
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
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import moment from "moment";
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
  { name: "Home", href: "#", current: true },
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
    Loader,
  },
  setup() {
    const data = ref(null);
    const page = ref(1);

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

    onMounted(async () => {
      const route = useRoute();
      await getShowDetail(route.params.id);
    });
    return {
      navigation,
      userNavigation,
      formatDate,
      data,
      page,
    };
  },
};
</script>
