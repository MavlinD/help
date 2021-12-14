/**
 * сохраняет рез-ты поиска
 * @param state
 * @param payload
 */
export function saveSearchResult (state, payload) {
	console.log(payload)
	state.saveSearchResult = payload
}

/**
 * сохраняет список допустимых тегов, атрибутов и стилей
 * @param state
 * @param payload
 */
export function saveSettings (state, payload) {
	console.log(payload.response)
	state.settings = payload.response
}

/**
 * сохраняет статьи по категории
 * @param state
 * @param payload
 */
export function saveArticlesByCategory (state, payload) {
	console.log(payload)
	state.current_articles_by_category = payload.response
}

export function saveArticles (state, payload) {
	console.log(payload)
	state.items = payload
}

/**
 * save the one article
 * @param state
 * @param payload
 */
export function saveArticle (state, payload) {
	console.log(payload)
	state.current_article = payload.response
}
