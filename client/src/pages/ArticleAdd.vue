<template>
	<article-tpl :key="article" :article="article" :submit="createArticle" :submitting="submitting" />
</template>

<script setup>
	import ArticleTpl from '@/pages/ArticleTpl.vue'
	import {toRefs} from 'vue'
	import {addArticle} from '@/pages/article'
	import {useRouter} from 'vue-router'

	let router = useRouter()

	let {article, createArticle, submitting} = toRefs(addArticle(router))

</script>
