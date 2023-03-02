import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import { createPinia } from 'pinia'

import Vue3Tour from 'vue3-tour'

import 'vue3-tour/dist/vue3-tour.css'

const pinia = createPinia()

loadFonts()

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(pinia)
app.use(Vue3Tour)

router.isReady().then(() => {
    app.mount('#app')
})
// app.mount('#app')
