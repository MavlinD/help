<template>
	<div class="q-gutter-sm">
		<q-list bordered class="rounded-borders">
			<tree-item v-for="item in store.state?.categories?.list" :key="item.id" :data="item"
				:insert-level="item.level"
			/>
		</q-list>
	</div>
</template>

<script setup>
	import TreeItem from '@/components/TreeItem.vue'
	import {useStore} from 'vuex'

	let store=useStore()

</script>
