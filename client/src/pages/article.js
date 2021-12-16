import {computed, onMounted, ref, reactive} from 'vue'
import {setTitle} from '@/middleware'
import {useStore} from 'vuex'
import {Notify} from 'quasar'
import {sleep} from '@/tools'
import {goToArticle} from '@/components/basis'

function scope() {
	let store = useStore()
	let article = ref()
	let category = ref()
	let submitting = ref()
	let categories = computed(() => store.state.categories?.list)
	return {
		store, article, category, categories, submitting
	}
}

/**
 * редактирует статью, выделенный модуль для композиции
 * @param slug
 * @returns {UnwrapNestedRefs<{saveArticle: ((function(*, *): Promise<void>)|*), category: Ref<any>, article: Ref<any>}>}
 */
export const editArticle = (slug) => {

	let { store, article, category, categories, submitting } = scope()

	onMounted(async () => {
		await store.dispatch('articles/fetchArticle', slug)
		await store.dispatch('categories/fetchCategories')

		article.value = store.state?.articles.current_article
		category.value = categories.value.find(el => el.id === article.value.category)
		setTitle(`Статья №${article.value?.id} | Up`)
	})

	async function saveArticle(state, btnStateChange) {
		submitting.value = true
		let response = await store.dispatch('articles/saveArticle', { id: article.value.id, ...state })
		submitting.value = false
		if (response?.status === 200) {
			if (btnStateChange instanceof Function) {
				btnStateChange(false)
			}
			Notify.create({
				message: 'Статья сохранена',
				color: 'green',
				textColor: 'white',
				timeout: 3 * 1000,
			})
		}
	}

	return reactive({
		article, category, saveArticle, submitting
	})
}

/**
 * создает статью, выделенный модуль для композиции
 * @returns {UnwrapNestedRefs<{createArticle: ((function(*=, *): Promise<void>)|*), category: Ref<any>, article: Ref<any>}>}
 */
export const addArticle = router => {

	let { store, article, category, submitting } = scope()

	onMounted(async () => {
		await store.dispatch('categories/fetchCategories')
		setTitle(`Добавить статью`)
	})

	async function createArticle(state, btnStateChange) {
		submitting.value = true
		// await sleep(5000)
		let response = await store.dispatch('articles/createArticle', state)
		submitting.value = false
		if (response?.status === 201) {
			if (btnStateChange instanceof Function) {
				btnStateChange(false)
			}
			// console.log(response)
			Notify.create({
				message: 'Статья сохранена',
				color: 'brown',
				textColor: 'white',
				actions: [
					{
						label: 'Перейти к статье',
						icon: 'article',
						color: 'white',
						handler: () => { goToArticle(router, response.data.slug) }
					},
					{
						icon: 'close',
						color: 'white',
					}
				],
				timeout: 5 * 1000,
			})
		}
	}

	return reactive({
		article, category, submitting, createArticle
	})
}

/**
 * удаляет статью, выделенный модуль для композиции
 * @returns {UnwrapNestedRefs<{createArticle: ((function(*=, *): Promise<void>)|*), category: Ref<any>, article: Ref<any>}>}
 */
export const deleteArticle = router => {

	let { store, article, category, submitting } = scope()

	async function removeArticle(id) {
		submitting.value = true
		// await sleep(5000)
		let response = await store.dispatch('articles/deleteArticle', id)
		submitting.value = false
		if (response?.status === 204) {
			// console.log(response)
			await router.push({name: 'articles'})
			Notify.create({
				message: 'Статья удалена',
				color: 'brown',
				textColor: 'white',
				timeout: 3 * 1000,
			})
		}
	}

	return reactive({
		article, category, submitting, removeArticle
	})
}
