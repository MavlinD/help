export function saveCategories (state, payload) {
	console.log(payload)
	state.list = payload.response
}

/**
 * сохраняет одну категорию
 * @param state
 * @param payload
 */
export function saveCategory (state, payload) {
	console.log(payload)
	state.currCategory = payload.response
}

/**
 * сохраняет путь от корня, для хлебных крошек
 * @param state
 * @param payload
 */
export function saveCategoryBrCrumbs (state, payload) {
	console.log(payload)
	state.fullPath = payload.response
}
