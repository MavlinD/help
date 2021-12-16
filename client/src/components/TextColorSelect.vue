<template>
	<q-btn-dropdown ref="color" dense no-caps no-wrap unelevated color="white"
		text-color="black" label="Цвет" size="sm"
	>
		<q-list dense>
			<q-item tag="label"
				clickable
				@click="setColor('backColor', state?.highlight)"
			>
				<q-item-section side>
					<q-icon name="highlight" />
				</q-item-section>
				<q-item-section>
					<q-color v-model="state.highlight"
						default-view="palette"
						no-header
						no-footer
						:palette="state.paletteHighlight"
					/>
				</q-item-section>
			</q-item>
			<q-item tag="label"
				clickable
				@click="setColor('foreColor', state?.foreColor)"
			>
				<q-item-section side>
					<q-icon name="format_paint" />
				</q-item-section>
				<q-item-section>
					<q-color v-model="state.foreColor"
						no-header
						no-footer
						default-view="palette"
						:palette="state.palletteFore"
					/>
				</q-item-section>
			</q-item>
		</q-list>
	</q-btn-dropdown>
</template>

<!--https://github.com/quasarframework/quasar/issues/3269-->

<script setup>
	import {defineComponent, reactive, ref} from 'vue'

	defineComponent({
		name: 'TextColorSelect'
	})

	let props = defineProps({
		reference: Object
	})

	let state = reactive({
		paletteHighlight: [
			'#ffccccaa', '#ffe6ccaa', '#ffffccaa', '#ccffccaa',
			'#ccffe6aa', '#ccffffaa', '#cce6ffaa', '#ccccffaa', '#e6ccffaa', '#ffccffaa', '#ff0000aa', '#ff8000aa', '#ffff00aa', '#00ff00aa', '#00ff80aa', '#00ffffaa', '#0080ffaa', '#0000ffaa', '#8000ffaa', '#ff00ffaa'
		],
		palletteFore: ['#000000', '#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff'],
		foreColor: '#000000',
		highlight: '#ffff00aa'
	}
	)

	let color = ref()

	let setColor = (cmd, name) => {
		let edit = props.reference
		color.value.hide()
		edit.caret.restore()
		edit.runCmd(cmd, name)
		edit.focus()
	}

</script>
