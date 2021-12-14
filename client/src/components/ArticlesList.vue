<template>
	<q-list v-for="item in list" :key="item?.id">
		<q-item>
			<q-item-section>
				<router-link :to="{name:'article', params: {slug:item?.slug}}">
					<span v-html="item?.title" />
				</router-link>
			</q-item-section>
			<q-item-section side top>
				<span>обновлена</span>
				{{ moment(item.updated).format("DD MMM YYYY") }}
			</q-item-section>
		</q-item>
	</q-list>
</template>

<script setup>
	import moment from 'moment/moment'
	import {useStore} from 'vuex'
	import {useRouter} from 'vue-router'

	defineProps({
		list: Array
	})
	let store = useStore()
	let router = useRouter()

</script>
