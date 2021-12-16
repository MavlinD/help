import {LocalStorage, Cookies} from 'quasar'
import {Transport} from '@/store/lib'

const { VITE_token_name } = import.meta.env

// флаг, что запрос на аутентификацию уже отправлен
let isReq = false

/**
 * определяет аутентифицирован ли пользователь
 * @returns {boolean}
 */
export async function isAuth() {
	let token = Cookies.get(VITE_token_name)
	if (token && LocalStorage.getItem('user')) return true
	if (token && !isReq) {
		let transport = new Transport()
		transport.authorize()
		isReq = true
		let resp = await transport.get('user')
		isReq = false
		// console.log(resp)
		if (resp.status === 200) {
			LocalStorage.set('user', resp.data)
			return true
		}
	}
	return false
}

/**
 * определяет является ли пользователь представителем персонала
 * @returns {boolean}
 */
export function isStaff() {
	// console.log(LocalStorage.getItem('user')?.is_staff)
	return LocalStorage.getItem('user')?.is_staff
}

/**
 * определяет может ли юзер получить доступ
 * @param to
 * @param from
 * @returns Boolean
 */
export async function canUserAccess(to, from) {
	// console.log(to)
	// console.log(from)
	if (to.meta.requiresAuth) {
		return await isAuth()
	}
	if (to.meta.requiresStaff) {
		// console.log(isStaff())
		return isStaff()
	}
	return to.name === 'login'
}

/**
 * рекурсивно выполнит все мидллверы указанные в маршруте
 * @param context
 * @param middleware массив из мидлварей
 * @param index число, для рекурсии
 */
export function middlewarePipeline(context, middleware, index = 0) {
	const nextMiddleware = middleware?.[index]
	if (!nextMiddleware) {
		return
	}
	nextMiddleware(context)
	middlewarePipeline(
		context, middleware, index + 1
	)
}

/**
 * получает стартовые данные приложения
 * @param store
 * @returns {Promise<void>}
 */
export const getCommonData = async ({ store }) => {
	await store.dispatch('categories/fetchCategories')
	await store.dispatch('articles/fetchArticles')
}

/**
 * просто логгер маршрутов, для примера
 * @param to
 * @param from
 */
export const log = ({ to, from }) => {
	console.log(to)
	console.log(from)
}

/**
 * setter of title document
 * @param title str
 */
export const setTitle = title => {
	const brand = 'FAQ Макробанк'
	document.title = `${title ? title : brand}`
}
