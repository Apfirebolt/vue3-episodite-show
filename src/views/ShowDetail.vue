<template>
  <div class="relative min-h-screen flex flex-col bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-secondary-100 antialiased">
    <!-- Navbar -->
    <Header />

    <!-- Main Container -->
    <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="py-24 flex justify-center items-center">
        <Loader message="Loading show details and episodes..." />
      </div>

      <!-- Show Details Content -->
      <div v-else-if="data" class="space-y-10">
        
        <!-- Hero & Overview Card -->
        <section class="relative bg-white dark:bg-neutral-900/80 rounded-3xl border border-slate-200 dark:border-neutral-800 shadow-sm overflow-hidden backdrop-blur-md">
          <!-- Ambient Backdrop Tint (if available) -->
          <div
            v-if="data.image_thumbnail_path || data.image_path"
            class="absolute inset-0 bg-cover bg-center opacity-10 filter blur-3xl pointer-events-none"
            :style="{ backgroundImage: `url(${data.image_path || data.image_thumbnail_path})` }"
          ></div>

          <div class="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start gap-8 border-b border-slate-100 dark:border-neutral-800">
            <!-- Poster -->
            <div class="aspect-[3/4] w-40 sm:w-52 shrink-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-neutral-950 shadow-xl border border-slate-200/60 dark:border-neutral-700/60">
              <img
                :src="data.image_path || data.image_thumbnail_path"
                :alt="data.name"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Main Meta Content -->
            <div class="flex-1 min-w-0 space-y-5">
              <div>
                <!-- Badges -->
                <div class="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    :class="data.status === 'Running' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-primary/10 text-primary dark:text-secondary-200 border border-primary/20'"
                  >
                    {{ data.status || 'Status Unknown' }}
                  </span>
                  <span class="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-neutral-700">
                    {{ data.country || 'Global' }}
                  </span>
                  <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <StarIcon class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{{ Number(data.rating || 0).toFixed(1) }} ({{ data.rating_count || 0 }} reviews)</span>
                  </span>
                </div>

                <h1 class="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {{ data.name }}
                </h1>
                
                <div class="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-medium text-slate-500 dark:text-slate-400 mt-2">
                  <span v-if="data.network">Network: <strong class="text-slate-800 dark:text-slate-200">{{ data.network }}</strong></span>
                  <span v-if="data.runtime">&bull; Runtime: <strong class="text-slate-800 dark:text-slate-200">{{ data.runtime }} min</strong></span>
                  <span v-if="data.episodes?.length">&bull; Total Episodes: <strong class="text-slate-800 dark:text-slate-200">{{ data.episodes.length }}</strong></span>
                </div>
              </div>

              <!-- Air Timeline & Quick Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4.5 rounded-2xl bg-slate-50 dark:bg-neutral-800/60 border border-slate-200/60 dark:border-neutral-800 text-xs">
                <div>
                  <span class="block text-slate-400 font-medium">First Aired</span>
                  <span class="font-semibold text-slate-800 dark:text-slate-200 text-sm">{{ data.start_date || 'N/A' }}</span>
                </div>
                <div>
                  <span class="block text-slate-400 font-medium">Last Aired</span>
                  <span class="font-semibold text-slate-800 dark:text-slate-200 text-sm">{{ data.end_date || "Ongoing" }}</span>
                </div>
                <div v-if="genresList.length" class="col-span-2 sm:col-span-1">
                  <span class="block text-slate-400 font-medium">Genres</span>
                  <div class="flex flex-wrap gap-1 mt-1">
                    <span
                      v-for="g in genresList"
                      :key="g"
                      class="px-2 py-0.5 rounded-md bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                    >
                      {{ g }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- External URL Button -->
              <div v-if="data.url || data.permalink" class="pt-1 flex gap-3">
                <a
                  :href="data.url || `https://www.episodate.com/tv-show/${data.permalink}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-secondary-100 hover:opacity-90 active:scale-95 transition-all shadow-sm"
                >
                  <span>View Official Source</span>
                  <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <!-- Description Section -->
          <div class="p-6 sm:p-8 bg-slate-50/60 dark:bg-neutral-900/40">
            <h2 class="text-xs font-heading font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Synopsis
            </h2>
            <p class="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
              {{ data.description || "No description provided for this series." }}
            </p>
          </div>
        </section>

        <!-- Gallery Section -->
        <section
          v-if="data.pictures?.length"
          class="bg-white dark:bg-neutral-900/80 rounded-3xl border border-slate-200 dark:border-neutral-800 shadow-sm p-6 sm:p-8 backdrop-blur-md space-y-6"
        >
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-heading font-bold text-slate-900 dark:text-white">
                Stills & Media Gallery
              </h2>
              <p class="text-xs text-slate-400 mt-0.5">High-definition production stills</p>
            </div>
            <span class="text-xs font-mono font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300">
              {{ currentSlide + 1 }} / {{ data.pictures.length }}
            </span>
          </div>

          <!-- Main Stage -->
          <div class="relative aspect-video rounded-2xl overflow-hidden bg-neutral-950 shadow-inner group">
            <img
              :src="data.pictures[currentSlide]"
              :alt="`${data.name} slide ${currentSlide + 1}`"
              class="w-full h-full object-cover transition-all duration-300"
            />

            <!-- Nav Controls -->
            <button
              @click="prevSlide"
              aria-label="Previous Slide"
              class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105"
            >
              <ChevronLeftIcon class="w-6 h-6" />
            </button>
            <button
              @click="nextSlide"
              aria-label="Next Slide"
              class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105"
            >
              <ChevronRightIcon class="w-6 h-6" />
            </button>
          </div>

          <!-- Thumbnails -->
          <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            <button
              v-for="(image, index) in data.pictures"
              :key="image"
              type="button"
              @click="currentSlide = index"
              class="relative w-24 sm:w-28 aspect-video shrink-0 rounded-xl overflow-hidden border-2 transition-all"
              :class="currentSlide === index ? 'border-secondary-300 ring-2 ring-secondary-300/40 opacity-100 scale-95' : 'border-transparent opacity-50 hover:opacity-100'"
            >
              <img :src="image" class="w-full h-full object-cover" alt="" />
            </button>
          </div>
        </section>

        <!-- Episodes Guide with Season Filtering & Search -->
        <section class="bg-white dark:bg-neutral-900/80 rounded-3xl border border-slate-200 dark:border-neutral-800 shadow-sm p-6 sm:p-8 backdrop-blur-md space-y-6">
          <!-- Section Title & Controls Bar -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-neutral-800">
            <div>
              <h2 class="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white">
                Episodes Guide
              </h2>
              <p class="text-xs text-slate-400 mt-0.5">
                Showing {{ filteredEpisodes.length }} of {{ data.episodes?.length || 0 }} total airings
              </p>
            </div>

            <!-- Episode Search Box -->
            <div class="relative w-full md:w-64">
              <input
                v-model.trim="episodeQuery"
                type="text"
                placeholder="Search episodes..."
                class="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 dark:bg-neutral-800 border border-transparent dark:border-neutral-700 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-secondary-300 focus:bg-white dark:focus:bg-neutral-900 transition-colors"
              />
              <MagnifyingGlassIcon class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <!-- Season Tabs Navigation -->
          <div v-if="availableSeasons.length > 1" class="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              type="button"
              @click="selectedSeason = null"
              class="px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all"
              :class="selectedSeason === null ? 'bg-primary text-secondary-100 shadow-sm' : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-700'"
            >
              All Seasons
            </button>
            <button
              v-for="s in availableSeasons"
              :key="s"
              type="button"
              @click="selectedSeason = s"
              class="px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all"
              :class="selectedSeason === s ? 'bg-primary text-secondary-100 shadow-sm' : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-700'"
            >
              Season {{ s }}
            </button>
          </div>

          <!-- Empty Episode State -->
          <div
            v-if="!filteredEpisodes.length"
            class="text-center py-12 bg-slate-50 dark:bg-neutral-950/40 rounded-2xl border border-dashed border-slate-200 dark:border-neutral-800"
          >
            <p class="text-sm font-semibold text-slate-600 dark:text-slate-400">No matching episodes found</p>
            <p class="text-xs text-slate-400 mt-0.5">Try searching for another title or selecting a different season.</p>
          </div>

          <!-- Interactive Episode Cards Accordion List -->
          <div v-else class="space-y-3">
            <div
              v-for="(episode, idx) in visibleEpisodes"
              :key="`${episode.season}-${episode.episode}-${idx}`"
              class="group rounded-2xl border transition-all duration-200 overflow-hidden"
              :class="expandedEpisodeKey === `${episode.season}-${episode.episode}` ? 'bg-slate-50 dark:bg-neutral-800/80 border-secondary-300/40 shadow-sm' : 'bg-white dark:bg-neutral-900 border-slate-200/80 dark:border-neutral-800/80 hover:border-slate-300 dark:hover:border-neutral-700'"
            >
              <!-- Card Header Row -->
              <div
                @click="toggleExpand(`${episode.season}-${episode.episode}`)"
                class="p-4 sm:px-5 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div class="flex items-center gap-3.5 min-w-0">
                  <!-- Season / Ep Badge -->
                  <span class="shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-primary text-secondary-100 dark:bg-secondary-300/20 dark:text-secondary-200">
                    S{{ padNumber(episode.season) }}E{{ padNumber(episode.episode) }}
                  </span>

                  <!-- Title -->
                  <div class="min-w-0">
                    <h3 class="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {{ episode.name || `Episode ${episode.episode}` }}
                    </h3>
                  </div>
                </div>

                <div class="flex items-center gap-4 shrink-0">
                  <span class="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                    {{ formatDate(episode.air_date) }}
                  </span>
                  <ChevronDownIcon
                    class="w-4 h-4 text-slate-400 transition-transform duration-200"
                    :class="{ 'rotate-180 text-secondary-300': expandedEpisodeKey === `${episode.season}-${episode.episode}` }"
                  />
                </div>
              </div>

              <!-- Collapsible Body Details -->
              <div
                v-if="expandedEpisodeKey === `${episode.season}-${episode.episode}`"
                class="px-5 pb-5 pt-1 text-xs border-t border-slate-200/60 dark:border-neutral-700/60 space-y-3"
              >
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-slate-600 dark:text-slate-300">
                  <div>
                    <span class="block text-slate-400">Air Date</span>
                    <span class="font-semibold">{{ formatDate(episode.air_date, true) }}</span>
                  </div>
                  <div>
                    <span class="block text-slate-400">Season</span>
                    <span class="font-semibold">Season {{ episode.season }}</span>
                  </div>
                  <div>
                    <span class="block text-slate-400">Episode Number</span>
                    <span class="font-semibold">#{{ episode.episode }}</span>
                  </div>
                  <div v-if="episode.rating">
                    <span class="block text-slate-400">Rating</span>
                    <span class="font-semibold text-amber-500">&star; {{ episode.rating }}</span>
                  </div>
                </div>

                <div v-if="episode.overview" class="pt-2">
                  <span class="block text-slate-400 font-medium mb-1">Episode Overview</span>
                  <p class="leading-relaxed text-slate-700 dark:text-slate-300 text-xs">
                    {{ episode.overview }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Load More Trigger (when paginated by slice) -->
          <div v-if="hasMoreFilteredEpisodes" class="pt-4 text-center">
            <button
              @click="itemCount += 15"
              type="button"
              class="px-6 py-2.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors"
            >
              Load More Episodes ({{ filteredEpisodes.length - visibleEpisodes.length }} remaining)
            </button>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import httpClient from "../plugins/interceptor";
import Header from "../components/Header.vue";
import Loader from "../components/Loader.vue";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  StarIcon,
  MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/vue/20/solid";

const route = useRoute();
const data = ref(null);
const loading = ref(false);
const itemCount = ref(15);
const currentSlide = ref(0);
const selectedSeason = ref(null);
const episodeQuery = ref("");
const expandedEpisodeKey = ref(null);

const genresList = computed(() => {
  if (!data.value?.genres) return [];
  if (Array.isArray(data.value.genres)) return data.value.genres;
  if (typeof data.value.genres === "string") {
    return data.value.genres.split(",").map((g) => g.trim()).filter(Boolean);
  }
  return [];
});

const availableSeasons = computed(() => {
  if (!data.value?.episodes?.length) return [];
  const seasons = new Set(data.value.episodes.map((e) => Number(e.season)).filter(Boolean));
  return Array.from(seasons).sort((a, b) => a - b);
});

const filteredEpisodes = computed(() => {
  if (!data.value?.episodes) return [];
  let eps = data.value.episodes;

  if (selectedSeason.value !== null) {
    eps = eps.filter((e) => Number(e.season) === selectedSeason.value);
  }

  if (episodeQuery.value) {
    const q = episodeQuery.value.toLowerCase();
    eps = eps.filter(
      (e) =>
        e.name?.toLowerCase().includes(q) ||
        `s${e.season}e${e.episode}`.toLowerCase().includes(q) ||
        String(e.episode) === q
    );
  }

  return eps;
});

const visibleEpisodes = computed(() => {
  return filteredEpisodes.value.slice(0, itemCount.value);
});

const hasMoreFilteredEpisodes = computed(() => {
  return filteredEpisodes.value.length > visibleEpisodes.value.length;
});

const padNumber = (num) => (num != null ? String(num).padStart(2, "0") : "00");

const toggleExpand = (key) => {
  expandedEpisodeKey.value = expandedEpisodeKey.value === key ? null : key;
};

const getShowDetail = async (id) => {
  loading.value = true;
  try {
    const response = await httpClient.get(`show-details?q=${id}`);
    data.value = response.data?.tvShow ?? null;
  } catch (error) {
    console.error("Failed to load show details:", error);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateStr, includeTime = false) => {
  if (!dateStr) return "TBA";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(includeTime && { hour: "numeric", minute: "numeric" }),
  }).format(date);
};

const nextSlide = () => {
  if (data.value?.pictures?.length) {
    currentSlide.value = (currentSlide.value + 1) % data.value.pictures.length;
  }
};

const prevSlide = () => {
  if (data.value?.pictures?.length) {
    currentSlide.value =
      currentSlide.value === 0
        ? data.value.pictures.length - 1
        : currentSlide.value - 1;
  }
};

// Keyboard navigation for gallery
const handleKeyDown = (e) => {
  if (!data.value?.pictures?.length) return;
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
};

onMounted(async () => {
  await getShowDetail(route.params.id);
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>