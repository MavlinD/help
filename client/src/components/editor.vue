<template>
	<q-editor ref="editor" v-model="state.editor" :definitions="state.definitions"
		:toolbar="state.toolbar" :fonts="state.fonts" min-height="5rem" @blur="$emit('saveContent', state.editor)"
		@input="$emit('input')"
	>
		<template #color>
			<text-color-select :reference="$refs.editor" />
		</template>
	</q-editor>
</template>

<script setup>
	import {onMounted, reactive, ref} from 'vue'
	import TextColorSelect from '@/components/TextColorSelect.vue'

	let props = defineProps({
		content: {
			type: String,
			default: '',
		},
		editorBuild: Function
	})

	const emit = defineEmits(['saveContent', 'input'])

	let state = reactive(props.editorBuild({ props, emit }))

</script>
