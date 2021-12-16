import {Transport} from '@/store/lib'

/**
 * получает все категории
 * @param context
 */
export async function fetchCategories(context) {
	let transport = new Transport()
	transport.authorize()
	let response = await transport.get(`categories/list/`)
	context.commit('saveCategories', response.data)
}

/**
 * получает все статьи в категории по слагу
 * @param context
 * @param slug
 */
export async function fetchArticlesByCategory(context, slug) {
	let transport = new Transport()
	transport.authorize()
	let response = await transport.get(`categories/${slug}/`)
	context.commit('articles/saveArticlesByCategory', response.data, { root: true })
	return response.data
}

/**
 * получает отдельно взятую категорию по слагу
 * @param context
 * @param slug
 */
export async function fetchCategory(context, slug) {
	let transport = new Transport()
	transport.authorize()
	let response = await transport.get(`categories/only/${slug}/`)
	context.commit('saveCategory', response.data)
	return response.data
}

/**
 * получает полный путь от корня до выбранной категории
 * @param context
 * @param slug
 */
export async function fetchCategoryBrCrumbs(context, slug) {
	let transport = new Transport()
	transport.authorize()
	let response = await transport.get(`categories/slug/${slug}/`)
	context.commit('saveCategoryBrCrumbs', response.data)
	return response.data
}
