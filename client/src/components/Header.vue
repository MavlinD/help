<template>
	<q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
		<q-toolbar>
			<q-btn
				v-if="leftSidebar"
				flat
				dense
				round
				aria-label="Menu"
				icon="menu"
				@click="$emit('toggle-left')"
			/>
			<router-link :to="{name:'home'}" class="text-decoration-none">
				<q-btn v-if="$q.screen.gt.xs" flat no-caps no-wrap class="q-ml-xs">
					<q-icon name="support" color="accent" size="28px" />
					<q-toolbar-title shrink class="text-weight-bold">
						{{VITE_app_name}}
					</q-toolbar-title>
				</q-btn>
			</router-link>
			<q-space />
			<q-space />

			<div class="YL__toolbar-input-container row no-wrap">
				<GlobalEvents @keyup.ctrl.enter="searchFocus" />
				<q-input ref="search_field" v-model="search" dense outlined square
					placeholder="Поиск <Enter>" class="bg-white col" clearable
					@keypress.enter="filter"
				>
					<template #append>
						<span class="text-body2">ctrl + </span><q-icon name="keyboard_return" size="xs" />
					</template>
				</q-input>
				<q-btn class="YL__toolbar-input-btn" color="grey-3" text-color="grey-8"
						 icon="search" :disable="search?.length < 3 || !search" @click="filter"
					unelevated
				/>
			</div>

			<q-space />
			<q-space />
			<q-space />
			<div class="q-gutter-sm row items-center no-wrap">
				<q-btn v-if="$q.screen.gt.sm && isStaff()" round dense flat color="grey-8" :icon="fasPlusCircle" :to="{name:'article-add'}">
					<q-tooltip>Добавить статью</q-tooltip>
				</q-btn>
				<q-btn dense flat no-wrap>
					<q-avatar rounded size="25px">
						<img src="https://cdn.quasar.dev/img/boy-avatar.png">
					</q-avatar>
					<q-icon name="arrow_drop_down" size="20px" />
					<q-menu auto-close>
						<q-list v-if="user?.username" dense>
							<q-item class="GL__menu-link-signed-in">
								<q-item-section>
									<div>Опознан как <strong>{{ user?.username }}</strong></div>
								</q-item-section>
							</q-item>
							<q-separator />
							<q-item clickable class="GL__menu-link" @click="logout">
								Выйти
							</q-item>
						</q-list>
						<q-list v-else dense>
							<q-item clickable class="GL__menu-link">
								<router-link :to="{name:'login'}">Войти</router-link>
							</q-item>
						</q-list>
					</q-menu>
				</q-btn>
			</div>
			<q-btn
				v-if="rightSidebar"
				flat
				dense
				round
				aria-label="Menu"
				icon="menu"
				@click="$emit('toggle-right')"
			/>
		</q-toolbar>
	</q-header>
</template>

<script setup>
	import {computed, ref} from 'vue'
	import {useStore} from 'vuex'
	import {fasPlusCircle} from '@quasar/extras/fontawesome-v5'
	import {useQuasar} from 'quasar'
	import {logout} from '@/components/basis'
	import {isStaff} from '@/middleware'
	import {useRouter} from 'vue-router'

	const { VITE_app_name } = import.meta.env

	let router = useRouter()
	let store=useStore()
	const $q = useQuasar()
	const search = ref(router.currentRoute?.value?.query?.q)

	defineProps({
		leftSidebar: {
			type: Boolean,
			default: true
		},
		rightSidebar: {
			type: Boolean,
			default: true
		}
	})

	const user = computed({
		get: () => $q.localStorage.getItem('user'),
	})

	let search_field=ref()

	function searchFocus(){
		search_field.value.focus()
	}

	let filter = async () => {
		await store.dispatch('articles/filterArticles', search.value)
		await router.push({name:'search', query:{q: search.value}})
	}

</script>
