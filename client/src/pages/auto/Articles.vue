<template>
	<layout>
		<q-page class="q-px-lg">
			<h2 class="q-ml-xl text-primary">Статьи</h2>
			<article-list :list="store.state?.articles?.items" />
		</q-page>
	</layout>
</template>

<script setup>

	import Layout from '@/layouts/default.vue'
	import ArticleList from '@/components/ArticlesList.vue'
	import {useStore} from 'vuex'
	import {setTitle} from '@/middleware'

	const store = useStore()

	setTitle(`Статьи`)

</script>
