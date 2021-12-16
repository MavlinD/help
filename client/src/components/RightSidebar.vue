<template>
	<q-drawer
		 :model-value="isOpen"
		 show-if-above
		 bordered
		 side="right"
		 class="bg-grey-2"
		 :width="300"
	>
		<q-scroll-area class="fit">
			<q-list padding>
				<q-item v-for="link in state.links1" :key="link.text" v-ripple clickable>
					<q-item-section avatar>
						<q-icon color="grey" :name="link.icon"/>
					</q-item-section>
					<q-item-section>
						<a :href="link.path" target="_blank">{{ link.text }}</a>
					</q-item-section>
				</q-item>

				<q-separator class="q-my-md"/>
				<template v-for="link in state.links2" :key="link.text">
				<q-item v-if="link.access()"  v-ripple clickable>
						<q-item-section avatar>
							<q-icon color="grey" :name="link.icon"/>
						</q-item-section>
						<q-item-section>
							<a :href="link.path" target="_blank">{{ link.text }}</a>
						</q-item-section>
				</q-item>
				</template>
			</q-list>
		</q-scroll-area>
	</q-drawer>
</template>

<script setup>
	import {reactive} from 'vue'
	import {isStaff} from '@/middleware'

	const { VITE_api_ext_port, VITE_erp_ext_port, VITE_ksb_ext_port } = import.meta.env

	defineProps({
		isOpen: {
			type: Boolean,
			default: false
		}
	})

	let { protocol, hostname } = document.location

	const state = reactive({
		links1: [
			{ icon: 'home', text: 'В макробанк (ERP)', path: `${protocol}//${hostname}:${VITE_erp_ext_port}/`},
			{ icon: 'show_chart', text: 'В макробанк (KSB)', path: `${protocol}//${hostname}:${VITE_ksb_ext_port}/`},
		],
		links2: [
			{
				icon: 'door_back',
				access: () => isStaff(),
				text: `Бекенд`,
				path: `${protocol}//${hostname}:${VITE_api_ext_port}/`
			},
			{
				icon: 'admin_panel_settings',
				access: () => isStaff(),
				text: `Админко`,
				path: `${protocol}//${hostname}:${VITE_api_ext_port}/admin-help/`
			},
			{
				icon: 'insert_emoticon',
				access: () => true,
				text: 'Доступные иконки',
				path: 'https://fonts.google.com/icons'
			},
		],
	})

</script>
