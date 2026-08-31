<template>
  <div class="relative min-h-screen flex flex-col bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-secondary-100">
    <!-- Navbar -->
    <Header />

    <!-- 2/3 Column Main Wrapper -->
    <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8 items-start">
        
        <!-- Sidebar: Search & Pagination Controls -->
        <aside class="w-full lg:w-64 shrink-0 space-y-6 bg-white dark:bg-neutral-900/60 p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-sm backdrop-blur-md sticky top-6">
          <!-- Search Box -->
          <div>
            <label for="search" class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Search Shows
            </label>
            <form @submit.prevent="searchShow" class="relative">
              <input
                id="search"
                v-model.trim="searchStr"
                type="search"
                placeholder="e.g. Breaking Bad..."
                class="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-neutral-800 border border-transparent dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:border-secondary-300 focus:bg-white dark:focus:bg-neutral-900 transition-colors"
              />
              <button
                type="submit"
                aria-label="Search"
                class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 hover:text-secondary-300 transition-colors"
              >
                <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </form>
          </div>

          <!-- Quick Actions & Pagination -->
          <div class="space-y-2.5 pt-4 border-t border-slate-200 dark:border-neutral-800">
            <span class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Navigation (Page {{ page }})
            </span>
            <button
              @click="searchShow"
              type="button"
              class="w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-primary text-secondary-100 hover:opacity-90 active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <MagnifyingGlassIcon class="h-4 w-4" />
              <span>Submit Search</span>
            </button>
            <button
              @click="getNextPage"
              type="button"
              class="w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-secondary-100 dark:bg-neutral-800 text-primary dark:text-secondary-100 hover:bg-secondary-200 dark:hover:bg-neutral-700 active:scale-[0.99] transition-all border border-slate-200 dark:border-neutral-700"
            >
              Next Page &rarr;
            </button>
            <button
              @click="getPreviousPage"
              :disabled="page <= 1"
              type="button"
              class="w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-secondary-100 dark:bg-neutral-800 text-primary dark:text-secondary-100 hover:bg-secondary-200 dark:hover:bg-neutral-700 active:scale-[0.99] transition-all border border-slate-200 dark:border-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              &larr; Previous Page
            </button>
          </div>
        </aside>

        <!-- Main Content Area: Shows Grid -->
        <section class="flex-1 min-w-0 w-full">
          <!-- Section Header & Sorting -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-neutral-800 gap-4">
            <div>
              <h1 class="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
                {{ isSearching ? `Search Results for "${searchStr}"` : "Top Rated Shows" }}
              </h1>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Showing {{ data?.tv_shows?.length || 0 }} series
              </p>
            </div>

            <!-- Sort Menu -->
            <Menu as="div" class="relative inline-block text-left self-start sm:self-auto">
              <MenuButton
                class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors shadow-sm"
              >
                <BarsArrowUpIcon class="h-4 w-4 text-secondary-300" />
                <span>Sort Shows</span>
                <ChevronDownIcon class="h-3.5 w-3.5 opacity-60" />
              </MenuButton>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-neutral-900 shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-1.5 focus:outline-none text-xs"
                >
                  <MenuItem v-for="sort in ['Name', 'Date Created', 'Rating']" :key="sort" v-slot="{ active }">
                    <button
                      type="button"
                      :class="[
                        active ? 'bg-secondary-100 dark:bg-neutral-800 text-primary dark:text-white' : 'text-slate-700 dark:text-slate-300',
                        'w-full text-left px-3 py-2 rounded-lg font-medium transition-colors'
                      ]"
                    >
                      {{ sort }}
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="py-20 flex justify-center items-center">
            <Loader />
          </div>

          <!-- Empty State -->
          <div
            v-else-if="!data?.tv_shows?.length"
            class="text-center py-20 bg-white dark:bg-neutral-900/40 rounded-2xl border border-slate-200 dark:border-neutral-800 mt-6"
          >
            <p class="text-base font-semibold text-slate-700 dark:text-slate-300">No shows found</p>
            <p class="text-xs text-slate-400 mt-1">Try searching with a different title or keyword.</p>
          </div>

          <!-- Card Grid -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pt-6">
            <article
              v-for="show in data.tv_shows"
              :key="show.id"
              class="group flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-secondary-300/40 transition-all duration-300"
            >
              <!-- Poster Image & Status Pill -->
              <div class="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-neutral-950">
                <img
                  :src="show.image_thumbnail_path"
                  :alt="show.name"
                  loading="lazy"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span
                  class="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md shadow-md text-white"
                  :class="show.status === 'Running' ? 'bg-emerald-600/90' : 'bg-primary/90'"
                >
                  {{ show.status }}
                </span>
              </div>

              <!-- Content Body -->
              <div class="p-5 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h2 class="text-lg font-heading font-bold truncate text-slate-900 dark:text-white" :title="show.name">
                    {{ show.name }}
                  </h2>
                  <dl class="mt-2.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <div class="flex justify-between">
                      <dt class="font-medium text-slate-400">Network</dt>
                      <dd class="font-semibold text-slate-700 dark:text-slate-200">{{ show.network || 'N/A' }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="font-medium text-slate-400">Country</dt>
                      <dd class="font-semibold text-slate-700 dark:text-slate-200">{{ show.country || 'N/A' }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="font-medium text-slate-400">Air Schedule</dt>
                      <dd class="font-semibold text-slate-700 dark:text-slate-200">
                        {{ show.start_date || '?' }} &mdash; {{ show.end_date || "Ongoing" }}
                      </dd>
                    </div>
                  </dl>
                </div>

                <!-- Action CTA Buttons -->
                <div class="flex gap-2.5 pt-2 border-t border-slate-100 dark:border-neutral-800/80">
                  <a
                    :href="getFullLink(show.permalink)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 text-center py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    EpisoDate
                  </a>
                  <router-link
                    :to="{ name: 'ShowDetail', params: { id: show.id } }"
                    class="flex-1 text-center py-2 px-3 rounded-xl text-xs font-semibold bg-primary text-secondary-100 hover:opacity-90 transition-opacity shadow-sm"
                  >
                    View Show
                  </router-link>
                </div>
              </div>
            </article>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import httpClient from "../plugins/interceptor";
import Header from "../components/Header.vue";
import Loader from "../components/Loader.vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  BarsArrowUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/20/solid";

const data = ref(null);
const page = ref(1);
const searchStr = ref("");
const loading = ref(false);
const isSearching = ref(false);

const fetchShows = async (endpoint) => {
  loading.value = true;
  try {
    const response = await httpClient.get(endpoint);
    data.value = response.data;
  } catch (error) {
    console.error("Failed to fetch shows:", error);
  } finally {
    loading.value = false;
  }
};

const getMostPopular = async () => {
  isSearching.value = false;
  await fetchShows(`most-popular?page=${page.value}`);
};

const searchShow = async () => {
  if (!searchStr.value) {
    page.value = 1;
    await getMostPopular();
    return;
  }
  isSearching.value = true;
  page.value = 1;
  await fetchShows(`search?q=${encodeURIComponent(searchStr.value)}&page=1`);
};

const getNextPage = async () => {
  page.value += 1;
  if (isSearching.value && searchStr.value) {
    await fetchShows(`search?q=${encodeURIComponent(searchStr.value)}&page=${page.value}`);
  } else {
    await getMostPopular();
  }
};

const getPreviousPage = async () => {
  if (page.value > 1) {
    page.value -= 1;
    if (isSearching.value && searchStr.value) {
      await fetchShows(`search?q=${encodeURIComponent(searchStr.value)}&page=${page.value}`);
    } else {
      await getMostPopular();
    }
  }
};

const getFullLink = (link) => `https://www.episodate.com/tv-show/${link}`;

onMounted(getMostPopular);
</script>