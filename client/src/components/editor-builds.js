import {useQuasar} from 'quasar'

/**
 * редактор для заголовков
 * @param props
 * @param emit
 * @param $q
 * @returns {{toolbar: (string[]|[{icon: string, fixedLabel: boolean, options: string[], list: string}, {icon: string, options: string[], label: string, list: string}, {fixedIcon: boolean, icon: string, fixedLabel: boolean, options: string[], label: string, list: string}, {fixedIcon: boolean, icon: string, options: string[], label: string, list: string}, string])[], editor, fonts: {lucida_grande: string, comic_sans: string, arial_black: string, impact: string, times_new_roman: string, verdana: string, courier_new: string, arial: string}, definitions: {save: {handler: (function(): *), icon: string, tip: string, label: string}}}}
 */
export function titleEditor({ props, emit, $q = useQuasar() }) {

	let state = {
		editor: props.content,
		definitions: {
			// save: {
			// 	tip: 'Save your work',
			// 	icon: 'save',
			// 	label: 'Save',
			// 	handler: () => emit('saveWork', state.editor)
			// },
		},
		toolbar: [
			// ['save'],
			['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
			[
				{
					icon: $q.iconSet.editor.align,
					fixedLabel: true,
					list: 'only-icons',
					options: ['left', 'center', 'right', 'justify']
				},
				{
					label: $q.lang.editor.formatting,
					icon: $q.iconSet.editor.formatting,
					list: 'no-icons',
					options: [
						'p',
						'h1',
						'h2',
						'h3',
						'h4',
						'h5',
						'h6',
						'code'
					]
				},
				{
					label: $q.lang.editor.fontSize,
					icon: $q.iconSet.editor.fontSize,
					fixedLabel: true,
					fixedIcon: true,
					list: 'no-icons',
					options: [
						'size-1',
						'size-2',
						'size-3',
						'size-4',
						'size-5',
						'size-6',
						'size-7'
					]
				},
				{
					label: $q.lang.editor.defaultFont,
					icon: $q.iconSet.editor.font,
					fixedIcon: true,
					list: 'no-icons',
					options: [
						'default_font',
						'arial',
						'arial_black',
						'comic_sans',
						'courier_new',
						'impact',
						'lucida_grande',
						'times_new_roman',
						'verdana'
					]
				},
				'removeFormat'
			],
			['undo', 'redo'],
			['viewsource']
		],
		fonts: {
			arial: 'Arial',
			arial_black: 'Arial Black',
			comic_sans: 'Comic Sans MS',
			courier_new: 'Courier New',
			impact: 'Impact',
			lucida_grande: 'Lucida Grande',
			times_new_roman: 'Times New Roman',
			verdana: 'Verdana'
		},
		// editorColors: {
		// 	foreColor: '#000000',
		// 	highlight: '#ffff00aa',
		// },
	}
	return state
}

/**
 * редактор для тела статьи
 * @param props
 * @param emit
 * @param $q
 * @returns {{toolbar: (string[]|[{icon: string, fixedLabel: boolean, options: string[], list: string}, {icon: string, options: string[], label: string, list: string}, {fixedIcon: boolean, icon: string, fixedLabel: boolean, options: string[], label: string, list: string}, {fixedIcon: boolean, icon: string, options: string[], label: string, list: string}, string])[], editor, fonts: {lucida_grande: string, comic_sans: string, arial_black: string, impact: string, times_new_roman: string, verdana: string, courier_new: string, arial: string}, definitions: {save: {handler: (function(): *), icon: string, tip: string, label: string}}}}
 */
export function bodyEditor({ props, emit, $q = useQuasar() }) {

	let state = {
		editor: props.content,
		definitions: {
			// save: {
			// 	tip: 'Save your work',
			// 	icon: 'save',
			// 	label: 'Save',
			// 	handler: () => emit('saveWork', state.editor)
			// },
		},
		toolbar: [
			// ['save'],
			['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
			['hr', 'link', 'color'],
			['print', 'fullscreen'],
			[
				{
					icon: $q.iconSet.editor.align,
					fixedLabel: true,
					list: 'only-icons',
					options: ['left', 'center', 'right', 'justify']
				},
				{
					label: $q.lang.editor.formatting,
					icon: $q.iconSet.editor.formatting,
					list: 'no-icons',
					options: [
						'p',
						'h1',
						'h2',
						'h3',
						'h4',
						'h5',
						'h6',
						'code'
					]
				},
				{
					label: $q.lang.editor.fontSize,
					icon: $q.iconSet.editor.fontSize,
					fixedLabel: true,
					fixedIcon: true,
					list: 'no-icons',
					options: [
						'size-1',
						'size-2',
						'size-3',
						'size-4',
						'size-5',
						'size-6',
						'size-7'
					]
				},
				{
					label: $q.lang.editor.defaultFont,
					icon: $q.iconSet.editor.font,
					fixedIcon: true,
					list: 'no-icons',
					options: [
						'default_font',
						'arial',
						'arial_black',
						'comic_sans',
						'courier_new',
						'impact',
						'lucida_grande',
						'times_new_roman',
						'verdana'
					]
				},
				'removeFormat'
			],
			['quote', 'unordered', 'ordered', 'outdent', 'indent'],
			['undo', 'redo'],
			['viewsource']
		],
		fonts: {
			arial: 'Arial',
			arial_black: 'Arial Black',
			comic_sans: 'Comic Sans MS',
			courier_new: 'Courier New',
			impact: 'Impact',
			lucida_grande: 'Lucida Grande',
			times_new_roman: 'Times New Roman',
			verdana: 'Verdana'
		},
		// editorColors: {
		// 	foreColor: '#000000',
		// 	highlight: '#ffff00aa',
		// },
	}
	return state
}
