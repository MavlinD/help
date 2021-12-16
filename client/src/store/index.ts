import {createStore} from 'vuex'

import state from '@/store/state'
import * as mutations from '@/store/mutations'
import * as actions from '@/store/actions'
import * as getters from '@/store/getters'
import articles from './articles'
import categories from './categories'

const { VITE_debugging } = import.meta.env


export function Store() {
	return createStore({
		mutations,
		state,
		actions,
		getters,
		modules: {
			articles,
			categories
		},
		strict: !!VITE_debugging
	})
}
