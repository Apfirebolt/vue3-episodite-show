<template>
  <div class="fixed top-16 w-56 text-right">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Options
          <ChevronDownIcon
            class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
            @click="toggleShow"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-0 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="show"
          class="absolute right-0 mt-2 p-5 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none px-1 py-1 text-gray-700"
        >
          <p>
            Amit take this
          </p>
        </div>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Menu, MenuButton } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

let show = ref(false);

const toggleShow = () => {
  show.value = !show.value;
};
</script>
