<template>
	<layout>
		<q-page class="q-pa-lg">
			<h2 class="text-primary q-pl-lg">Домашняя страница</h2>
		</q-page>
	</layout>
</template>

<script setup>
	import {setTitle} from '@/middleware'
	import Layout from '@/layouts/default.vue'

	setTitle('Начало')
</script>
