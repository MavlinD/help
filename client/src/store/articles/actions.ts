import {Transport} from '@/store/lib'

/**
 * поиск по статьям
 * @param context
 * @param str
 * @returns {Promise<void>}
 */
export async function filterArticles(context, str) {
	let transport = new Transport()
	transport.authorize()
	let response = await transport.get(`articles/filter/?body__in=${str}`)
	context.commit('saveSearchResult', response.data)
}

/**
 * получить все доступные статьи
 * @param context
 * @returns {Promise<void>}
 */
export async function fetchArticles(context) {
	let transport = new Transport()
	transport.authorize()
	let response = await transport.get(`articles`)
	context.commit('saveArticles', response.data)
}

/**
 * получить одну определенную статью
 * @param context
 * @param slug String
 * @returns {Promise<void>}
 */
export async function fetchArticle(context, slug) {
	let transport = new Transport()
	transport.authorize()
	let response = await transport.get(`articles/${slug}/`)
	context.commit('saveArticle', response.data)
}

/**
 * сохранить статью
 * @param context
 * @param article
 * @returns {Promise<void>}
 */
export async function saveArticle(context, article) {
	let transport = new Transport()
	return await transport.patch(`articles/update/${article.id}/`, article)
}

/**
 * добавить статью
 * @param context
 * @param article
 * @returns {Promise<void>}
 */
export async function createArticle(context, article) {
	let transport = new Transport()
	return await transport.put(`articles/create/`, article)
}

/**
 * удалить статью
 * @param context
 * @param id String
 * @returns {Promise<void>}
 */
export async function deleteArticle(context, id) {
	let transport = new Transport()
	return await transport.delete(`articles/delete/${id}/`)
}

/**
 * получить список допустимых тегов, атрибутов и стилей
 * @param context
 * @returns {Promise<void>}
 */
export async function fetchSettings(context) {
	let transport = new Transport()
	transport.authorize()
	let response = await transport.get(`articles/settings/`)
	context.commit('saveSettings', response.data)
	return response
}
