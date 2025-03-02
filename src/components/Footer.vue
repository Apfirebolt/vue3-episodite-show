<template>
    <footer class="bg-primary text-white py-4 dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <p class="text-center text-sm">
                &copy; 2025 Episodate. All rights reserved.
            </p>
            <div class="flex justify-center my-3">
                <button class="btn bg-secondary-100 text-primary hover:cursor-pointer btn-sm py-2 px-3 shadow rounded-md" @click="toggleDarkMode">
                    Enable Dark Mode
                </button>
            </div>
        </div>
    </footer>
</template>

<script setup>
import useDarkMode from '../composables/useDarkMode';

const { darkMode, toggleDarkMode } = useDarkMode();

</script>
