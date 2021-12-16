<template>
	<layout>
		<q-breadcrumbs class="q-pt-lg q-ml-xl">
			<template #separator>
				<q-icon
					size="1.5em"
					name="chevron_right"
					color="primary"
				/>
			</template>
			<q-breadcrumbs-el v-for="crumb in categoryBrCrumb" :key="crumb.id" :label="crumb.label"
				:icon="crumb.icon" :to="{name:'category', params:{slug: crumb.slug}}"
			/>
		</q-breadcrumbs>
		<h1 class="q-ml-xl text-primary">Статьи по {{ category?.label }}</h1>
		<article-list :list="articles" />
	</layout>
</template>

<script setup>
	import Layout from '@/layouts/default.vue'
	import ArticleList from '@/components/ArticlesList.vue'
	import {watch, computed, onMounted, reactive, ref} from 'vue'
	import {setTitle} from '@/middleware'
	import {useStore} from 'vuex'
	import {brCrumbs} from '@/store/categories/getters'

	let store = useStore()

	let props = defineProps({
		slug: String
	})

	let articles = computed(() => store.state?.articles.current_articles_by_category)
	let category = computed(() => store.state.categories?.currCategory)
	let categoryBrCrumb = computed(brCrumbs(store))

	async function getData(slug) {
		await store.dispatch('categories/fetchArticlesByCategory', slug)
		await store.dispatch('categories/fetchCategoryBrCrumbs', slug)
		await store.dispatch('categories/fetchCategory', slug)
		setTitle(`Категория ${category.value.id}`)
	}

	watch(() => props?.slug,
		async (slug) => getData(slug)
	)

	onMounted(async () => {
		await getData(props?.slug)
	})

</script>
