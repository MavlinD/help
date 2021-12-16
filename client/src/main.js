import {createApp} from 'vue'
import {Quasar, Cookies, LoadingBar, LocalStorage, QEditor, Notify} from 'quasar'
import quasarLang from 'quasar/lang/ru'
import {router as createRouter, routerGuard} from './router'
import {Store} from './store'

// Import icon libraries
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'
// https://fonts.google.com/icons?selected=Material+Icons

// A few examples for animations from Animate.css:
import '@quasar/extras/animate/fadeIn.css'
import '@quasar/extras/animate/fadeOut.css'

import 'quasar/src/css/index.sass'
import App from './App.vue'
import 'moment/locale/ru'
import { GlobalEvents } from 'vue-global-events'

const app = createApp(App)

app.use(Quasar, {
	plugins: {
		Cookies,
		LoadingBar,
		LocalStorage,
		QEditor,
		Notify
	},
	config: {
		loadingBar: {},
		notify: { /* look at QuasarConfOptions from the API card */ }
	},
	lang: quasarLang,
})

const store = Store()
const router = createRouter()
routerGuard(router, store)

app.use(router)
app.use(store)
app.component('GlobalEvents', GlobalEvents)

router.isReady().then(() => {
	app.mount('#app')
})

// todo
/**
 * добавить черновик для статей
 */
