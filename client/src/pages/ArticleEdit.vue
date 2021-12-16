<template>
	<article-tpl :key="article" :article="article" :category="category" :submit="saveArticle">
		<template #header>
			<h2 class="q-ml-xl text-primary">Страница редактирования статьи</h2>
		</template>
		<template #delete>
			<article-delete :id="article?.id" />
		</template>
	</article-tpl>
</template>

<script setup>
	import ArticleTpl from '@/pages/ArticleTpl.vue'
	import ArticleDelete from '@/pages/ArticleDelete.vue'
	import {toRefs} from 'vue'
	import {editArticle} from '@/pages/article'

	let props = defineProps({
		slug: {
			type: String,
			default: '',
		}
	})

	let {article, category, saveArticle, submitting} = toRefs(editArticle(props.slug))

</script>

