import { ref, watch, onMounted } from 'vue';

export default function useDarkMode() {
    const isDarkMode = ref(false);

    const setDarkMode = (value) => {
        console.log('setDarkMode', value);
        isDarkMode.value = value;
        if (value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', value);
    };

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode.value);
    };

    onMounted(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
            setDarkMode(savedDarkMode === 'true');
        } else {
            setDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    });

    watch(isDarkMode, (newValue) => {
        setDarkMode(newValue);
    });

    return {
        isDarkMode,
        toggleDarkMode,
    };
}