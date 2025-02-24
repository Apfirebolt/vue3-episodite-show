<template>
  <Disclosure as="nav" class="flex-shrink-0 bg-rose-500" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <!-- Search section -->

        <div class="flex lg:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="bg-rose-500 inline-flex items-center justify-center p-2 rounded-md text-neutral-100 hover:text-white hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-600 focus:ring-white"
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
                :to="{ name: item.name }"
                class="px-3 py-2 rounded-md text-lg font-semibold text-neutral-200 hover:text-white"
                >{{ item.name }}
              </router-link>
            </div>
            <!-- Profile dropdown -->
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
              ? 'text-white bg-rose-800'
              : 'text-red-500 hover:text-gray-100 hover:bg-rose-500',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
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

const navigation = [{ name: "Home", href: "#", current: true }];

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
    return {
      navigation,
    };
  },
};
</script>
