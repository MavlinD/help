<template>
	<q-drawer
		:model-value="isOpen"
		show-if-above
		bordered
		side="left"
		class="bg-grey-2"
		:width="300"
	>
		<q-scroll-area class="fit">
			<q-list padding>
				<router-link v-for="link in state.links1" :key="link.text" class="text-body1" :to="link.path">
					<q-item v-ripple clickable>
						<q-item-section avatar>
							<q-icon color="grey" :name="link.icon" />
						</q-item-section>
						<q-item-section>
							{{ link.text }}
						</q-item-section>
					</q-item>
				</router-link>

				<q-separator class="q-my-md" />

				<router-link v-for="link in state.links2" :key="link.text" :to="{name: link.path}">
					<q-item v-ripple clickable>
						<q-item-section avatar>
							<q-icon color="grey" :name="link.icon" />
						</q-item-section>
						<q-item-section>
							{{ link.text }}
						</q-item-section>
					</q-item>
				</router-link>
			</q-list>
			<ArticlesTree />
		</q-scroll-area>
	</q-drawer>
</template>

<script setup>
	import {computed, reactive} from 'vue'
	import {useStore} from 'vuex'
	import ArticlesTree from '@/components/ArticlesTree.vue'

	let store=useStore()
	let props = defineProps({
		isOpen: {
			type: Boolean,
			default: false
		}
	})

	const state = reactive({
		links1: [
			{ icon: 'home', text: 'В макробанк', path: '#' },
		],
		links2: [
			{ icon: 'home', text: 'Домой', path: 'home'},
			{ icon: 'verified', text: 'О нас', path: 'about' },
			{ icon: 'pages', text: 'Статьи', path: 'articles' },
		],
	})

</script>
