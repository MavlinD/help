<template>
	<layout>
		<q-page class="q-pa-lg">
			<h2 class="q-ml-xl text-brown" v-html="article?.title" />
			<p>{{ moment(article?.updated).format("DD MMMM YYYY") }} года</p>
			<div class="row q-gutter-lg">
			<q-btn class="col-2" v-if="isStaff()" :to="{name:'article-edit', params:{slug}}" push
				icon="edit" color="blue" label="Редактировать"
			/>
			<article-delete :id="article?.id" class="col-3"/>
			</div>
			<p v-html="article?.body" />
		</q-page>
	</layout>
</template>

<script setup>
	import moment from 'moment/moment'
	import Layout from '@/layouts/default.vue'
	import ArticleDelete from '@/pages/ArticleDelete.vue'
	import {watch, computed, onMounted} from 'vue'
	import {isStaff, setTitle} from '@/middleware'
	import {useStore} from 'vuex'
	let store = useStore()

	let props = defineProps({
		slug: String
	})

	watch(() => props?.slug,
		async (slug) => {
			await store.dispatch('articles/fetchArticle', slug)
		}
	)

	let article = computed(() => store.state?.articles.current_article)

	onMounted(async () => {
		await store.dispatch('articles/fetchArticle', props?.slug)
		setTitle(`Статья №${store.state?.articles.current_article?.id}`)
	})

</script>
