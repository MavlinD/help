<template>
	<q-btn class="col-md-2" v-if="isStaff()" push icon="delete" :loading="submitting"
		style="background: goldenrod; color: white" label="Удалить" @click="removeArticle(props.id)"
	>
		<template #loading>
			<q-spinner-facebook />
		</template>
	</q-btn>
</template>

<script setup>
	import {toRefs} from 'vue'
	import {deleteArticle} from '@/pages/article'
	import {isStaff} from '@/middleware'
	import {useRouter} from 'vue-router'

	let router = useRouter()
	let props = defineProps({
		id: Number
	})

	let {article, category, removeArticle, submitting} = toRefs(deleteArticle(router))

</script>

