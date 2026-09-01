<template>
  <div class="w-full space-y-6 animate-pulse" role="status" aria-live="polite">
    <!-- Header skeleton -->
    <div class="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-neutral-800">
      <div class="space-y-2">
        <div class="h-7 w-48 bg-slate-200 dark:bg-neutral-800 rounded-lg"></div>
        <div class="h-4 w-32 bg-slate-100 dark:bg-neutral-800/60 rounded-md"></div>
      </div>
      <div class="h-9 w-28 bg-slate-200 dark:bg-neutral-800 rounded-xl"></div>
    </div>

    <!-- Cards grid skeleton -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pt-2">
      <div
        v-for="i in count"
        :key="i"
        class="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 shadow-sm flex flex-col"
      >
        <!-- Poster image placeholder -->
        <div class="aspect-[3/4] bg-slate-200 dark:bg-neutral-800 w-full relative">
          <div class="absolute top-3 right-3 h-5 w-16 bg-slate-300 dark:bg-neutral-700 rounded-full"></div>
        </div>

        <!-- Content details placeholder -->
        <div class="p-5 space-y-4 flex-1 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="h-5 w-3/4 bg-slate-200 dark:bg-neutral-800 rounded-md"></div>
            <div class="space-y-2 pt-1">
              <div class="flex justify-between">
                <div class="h-3 w-14 bg-slate-100 dark:bg-neutral-800 rounded"></div>
                <div class="h-3 w-20 bg-slate-200 dark:bg-neutral-800 rounded"></div>
              </div>
              <div class="flex justify-between">
                <div class="h-3 w-14 bg-slate-100 dark:bg-neutral-800 rounded"></div>
                <div class="h-3 w-16 bg-slate-200 dark:bg-neutral-800 rounded"></div>
              </div>
              <div class="flex justify-between">
                <div class="h-3 w-20 bg-slate-100 dark:bg-neutral-800 rounded"></div>
                <div class="h-3 w-24 bg-slate-200 dark:bg-neutral-800 rounded"></div>
              </div>
            </div>
          </div>

          <!-- Buttons placeholder -->
          <div class="flex gap-2.5 pt-3 border-t border-slate-100 dark:border-neutral-800/80">
            <div class="h-8 flex-1 bg-slate-200 dark:bg-neutral-800 rounded-xl"></div>
            <div class="h-8 flex-1 bg-secondary-300/30 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
    <span class="sr-only">Loading shows content...</span>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 6,
  },
});
</script>