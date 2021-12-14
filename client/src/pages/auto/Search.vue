<template>
	<layout>
		<q-page class="q-pl-xl">
			<h2 class="text-primary">Результаты поиска</h2>
			<article-list :list="store.state?.articles?.saveSearchResult" />
		</q-page>
	</layout>
</template>

<script setup>
	import {setTitle} from '@/middleware'
	import Layout from '@/layouts/default.vue'
	import ArticleList from '@/components/ArticlesList.vue'
	import {useStore} from 'vuex'
	import {useRouter} from 'vue-router'
	import {onMounted} from 'vue'

	defineProps({
		query: String
	})
	// todo если переходим на эту страницу с любого иного адреса, то запрос вып-ся дважды
	setTitle('Поиск')
	let store = useStore()
	let router = useRouter()

	onMounted(async ()=>{
		let queryStr = router.currentRoute.value?.query?.q
		if (queryStr){
			await store.dispatch('articles/filterArticles', queryStr)
		}
	})

</script>
