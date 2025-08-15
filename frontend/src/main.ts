import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// PrimeVue
import PrimeVue from 'primevue/config'
// import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primevue/resources/themes/aura-dark-noir/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// Global styles
import '@/assets/styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: "Aura"
    }
});

app.mount('#app')