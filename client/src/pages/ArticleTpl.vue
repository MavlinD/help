<template>
	<layout>
		<slot name="header">
			<h2 class="q-ml-xl text-primary">Страница добавления статьи</h2>
		</slot>
		<div class="q-pa-md q-gutter-sm">
			<editor :key="hex(title)" :editor-build="titleEditor" :content="title"
					  @saveContent="saveTitle" @input="btnStateChange"/>
		</div>
		<div class="row q-gutter-md">
			<q-select class="col-md-3 col-12"
						 v-model="categoryModel"
						 transition-show="jump-up"
						 transition-hide="jump-up"
						 filled
						 :options="categories"
						 style="width: 250px"
			/>
			<q-btn class="col-md-2" v-if="isStaff()" push icon="save" :loading="submitting"
					 color="blue" label="Сохранить" :disable="!btnState"
					 @click="props.submit(state, btnStateChange)"
			>
				<template #loading>
					<q-spinner-facebook/>
				</template>
			</q-btn>
		<slot name="delete"/>
		</div>
		<div class="q-pa-md q-gutter-sm">
			<editor :key="hex(body)" :editor-build="bodyEditor" :content="body" @saveContent="saveBody"
					  @input="btnStateChange"/>
		</div>
		<div class="row">
			<p class="col">
				<span>Разрешенные атрибуты</span>
			<ol>
				<li v-for="item in settings.allowed_attributes" :key="item">
					{{ item }}
				</li>
			</ol>
			</p>
			<p class="col">
				<span>Разрешенные теги</span>
			<ol>
				<li v-for="item in settings.allowed_tags" :key="item">
					{{ item }}
				</li>
			</ol>
			</p>
			<p class="col">
				<span>Разрешенные стили</span>
			<ol>
				<li v-for="item in settings.allowed_styles" :key="item">
					{{ item }}
				</li>
			</ol>
			</p>
		</div>
	</layout>
</template>

<script setup>
	import Layout from '@/layouts/ArticleEdit.vue'
	import {computed, nextTick, onMounted, reactive, ref, toRefs} from 'vue'
	import {isStaff, setTitle} from '@/middleware'
	import editor from '@/components/editor.vue'
	import {useStore} from 'vuex'
	import hex from 'hash-sum'
	import {titleEditor, bodyEditor} from '@/components/editor-builds'

	let props = defineProps({
		category: Object,
		article: Object,
		submit: Function,
		submitting: Boolean
	})

	let store = useStore()
	let categories = computed(() => store.state.categories?.list)

	let title = ref(props.article?.title)
	let category = ref(props?.category)
	let body = ref(props.article?.body)
	let btnState = ref(false)
	let settings = computed(() => store.state?.articles?.settings)
	let state = {}

	/**
	 * управляет статусом кнопки сохранить
	 * @param a
	 */
	function btnStateChange(a) {
		btnState.value = a ?? !!Object.keys(state)
	}

	function saveTitle(a) {
		if (a !== title.value) state.title = a
	}

	function saveBody(a) {
		if (a !== body.value) state.body = a
	}

	let categoryModel = computed({
		get() {
			return category.value
		},
		set(a) {
			category.value = a
			state.category = a.id
			btnStateChange()
		}
	})

	onMounted(async () => {
		await store.dispatch('articles/fetchSettings')
	})

</script>

