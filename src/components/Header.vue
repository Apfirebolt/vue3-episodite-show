<template>
  <Disclosure as="nav" class="shrink-0 bg-primary text-secondary-100 border-b border-secondary-300/30" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <!-- Brand / Logo Area -->
        <div class="flex items-center">
          <router-link to="/" class="text-xl font-heading font-bold text-secondary-100 hover:text-white transition-colors">
            Episodite
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="flex lg:hidden">
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-lg bg-secondary-300/20 text-secondary-100 hover:text-white hover:bg-secondary-300/40 focus:outline-none focus:ring-2 focus:ring-secondary-200 transition-colors"
          >
            <span class="sr-only">Toggle main menu</span>
            <Bars3BottomLeftIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>

        <!-- Desktop Navigation Links -->
        <div class="hidden lg:flex lg:items-center lg:space-x-4">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            class="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            :class="[
              item.current
                ? 'bg-secondary-300/30 text-white font-semibold'
                : 'text-secondary-200 hover:text-white hover:bg-secondary-300/20'
            ]"
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <DisclosurePanel class="lg:hidden bg-primary/95 border-b border-secondary-300/20">
      <div class="px-4 pt-2 pb-3 space-y-1">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="template"
        >
          <router-link
            :to="item.to"
            class="block px-3 py-2 rounded-lg text-base font-medium transition-colors"
            :class="[
              item.current
                ? 'bg-secondary-300 text-white font-semibold'
                : 'text-secondary-200 hover:text-white hover:bg-secondary-300/30'
            ]"
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ item.name }}
          </router-link>
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const navigation = [
  { name: "Home", to: { name: "Home" }, current: true },
  { name: "Composable", to: { name: "ComposableExample" }, current: false },
];
</script>