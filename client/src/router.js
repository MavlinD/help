import {createRouter, createWebHistory} from 'vue-router'
import {middlewarePipeline, canUserAccess, getCommonData} from '@/middleware'

// https://vitejs.dev/guide/features.html#glob-import
// все компоненты в папке pages/auto создают автоматические маршруты
const pages = import.meta.glob('./pages/auto/*.vue')

// метаданные адресов
let meta = {
	home: {
		requiresAuth: true,
		middleware: [getCommonData]
	},
	about: {
		requiresAuth: true,
	},
	search: {
		requiresAuth: true,
		props: true
	},
	articles: {
		requiresAuth: true,
		middleware: [getCommonData]
	},
}

const routes = Object.keys(pages).map((path) => {
	const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase().slice(1,).split('/')[1]
	// console.log(name)
	return {
		path: name === 'home' ? '/' : '/' + name,
		name,
		component: pages[path], // () => import('./pages/*.vue')
		meta: meta[name],
	}
})

// https://tproger.ru/articles/routing-in-vue/
// https://paths.esm.dev/?p=AAMeJSyAwR4UbFDAFxAcAGAIJXMAAA..

// 404 страница
routes.push(
	{
		name: 'article',
		path: '/article/:slug',
		props: true,
		meta: {
			requiresAuth: true,
		},
		component: () => import('./pages/Article.vue'),
	},
	{
		name: 'category',
		path: '/category/:slug',
		props: true,
		meta: {
			requiresAuth: true,
		},
		component: () => import('./pages/Category.vue'),
	},
	{
		name: 'article-edit',
		path: '/article/edit/:slug',
		props: true,
		meta: {
			requiresStaff: true,
		},
		component: () => import('./pages/ArticleEdit.vue'),
	},
	{
		name: 'article-add',
		path: '/article/add',
		meta: {
			requiresStaff: true,
		},
		component: () => import('./pages/ArticleAdd.vue'),
	},
	{
		path: '/:catchAll(.*)*',
		meta: {
			requiresAuth: true,
		},
		component: () => import('./pages/Error404.vue'),
	},
)

/**
 * обработчик переходов на защищенные адреса
 * разрешено только то, что разрешено явно
 * @param router vue-router instanse
 * @param store vuex instanse
 */
export function routerGuard(router, store) {
	router.beforeEach(async (to, from, next) => {

		const middleware = to.meta?.middleware
		const context = { to, from, next, store }

		const canAccess = await canUserAccess(to, from)

		if (canAccess) {
			// console.log('can access')
			middlewarePipeline(context, middleware)
			next()
		} else {
			// console.log('cant access')
			// редиректим на стр логина если адрес требует авторизации
			next({ name: 'login', query: { from: to.fullPath } })
		}

	})

}

/**
 * собственно роутер
 * @returns {Router}
 */
export function router() {
	return createRouter({
		history: createWebHistory(),
		routes,
	})
}
