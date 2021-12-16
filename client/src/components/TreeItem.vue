<template>
	<q-expansion-item
		expand-separator
		default-opened
		:header-inset-level="props.insertLevel*0.25-0.15"
		:icon="props.data?.icon" :label="props.data?.label"
		:to="{name: 'category', params:{slug: props.data?.slug}}"
	>
		<q-card v-for="article in props?.data?.articles" :key="article.id">
			<q-card-section v-html="article?.title" />
		</q-card>
		<tree-item v-for="sub in props.data?.children" :key="sub.id" :data="sub" :insert-level="sub.level" />
	</q-expansion-item>
</template>

<script setup>
	import {onMounted, reactive, ref} from 'vue'
	import {useStore} from 'vuex'

	let store=useStore()

	let props=defineProps({
		data:Object,
		insertLevel: Number
	})

</script>
