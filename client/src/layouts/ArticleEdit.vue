<template>
	<q-layout view="hHh LpR fFf" class="bg-grey-1 row justify-center">
		<slot name="header">
			<Header :left-sidebar="false" :right-sidebar="false" />
		</slot>
		<q-page-container class="col-8">
			<q-page class="q-pt-sm">
				<slot />
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
	import tpl from '@/layouts/default.vue'
	import Header from '@/components/Header.vue'

	export default {
		components:{
			Header
		},
		extends: tpl
	}
</script>
