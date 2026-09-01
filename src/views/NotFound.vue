<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-16 bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-secondary-100">
    <div class="max-w-xl w-full text-center space-y-8">
      <!-- Error Badge & Title -->
      <div class="space-y-3">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary-300/10 text-secondary-300 border border-secondary-300/20">
          <ExclamationTriangleIcon class="w-4 h-4" />
          Error 404
        </span>
        <h1 class="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white">
          Looking for something?
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          We couldn't locate that page. Try one of the links below to continue browsing.
        </p>
      </div>

      <!-- Quick Destination Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        <router-link
          to="/"
          class="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-secondary-300 transition-all shadow-sm flex items-start gap-4"
        >
          <div class="p-3 rounded-xl bg-primary text-secondary-100 shrink-0 group-hover:scale-105 transition-transform">
            <TvIcon class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-secondary-300 transition-colors">
              Browse Shows
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Explore top-rated and trending TV series.
            </p>
          </div>
        </router-link>

        <router-link
          to="/"
          class="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-secondary-300 transition-all shadow-sm flex items-start gap-4"
        >
          <div class="p-3 rounded-xl bg-secondary-100 dark:bg-neutral-800 text-primary dark:text-secondary-200 shrink-0 group-hover:scale-105 transition-transform">
            <MagnifyingGlassIcon class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-secondary-300 transition-colors">
              Search Database
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Find specific episodes and air schedules.
            </p>
          </div>
        </router-link>
      </div>

      <!-- Bottom Button -->
      <div class="pt-2">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-secondary-200 transition-colors"
        >
          <span>&larr; Return to main dashboard</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ExclamationTriangleIcon,
  TvIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/20/solid";
</script>