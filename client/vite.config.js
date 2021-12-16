import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// import eslintPlugin from 'vite-plugin-eslint'
import babel from "vite-babel-plugin"
import {quasar, transformAssetUrls} from '@quasar/vite-plugin'
import pugPlugin from "vite-plugin-pug"
const options = {} // FIXME: pug pretty is deprecated!
const locals = { name: "My Pug" }

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({template: {
				transformAssetUrls,
				// compilerOptions: {
				//   isCustomElement: tag => tag === 'q-btn'
				// }}
			}}),
		quasar({
			autoImportComponentCase: 'combined',
			sassVariables: 'src/quasar-variables.sass',
			plugins:[]
		}),
		pugPlugin(options, locals),
		babel({
			parserOpts: {
			      plugins: ['decorators-legacy']
			    }
		}),

	],
	resolve: {
		alias: {
			'@': '/src/'
		}
	},
	build: {
		minify: true,
	},

})
