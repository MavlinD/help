/**
 * формирует объект для передачи хлебным крошкам
 * @param store
 * @returns {function(): *[]}
 */
export const brCrumbs = (store) => () => {
	let category = store.state.categories.fullPath
	let arr =[]
	category.ancestors?.forEach(el=>{
		arr.push(el)
	})
	arr.push(category)
	return arr
}
