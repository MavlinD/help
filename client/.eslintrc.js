// https://webinmind.ru/nuxtjs/moduli/airbnb-eslint-vuejs-nuxtjs-typescript

module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
	},
	extends: [
		'plugin:import/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'eslint:recommended',
		// '@vue/airbnb',
		// 'airbnb-base',
		'plugin:vue/vue3-recommended',
		'plugin:vue/vue3-essential',
	],
	parser: 'vue-eslint-parser',
	// parser: '@babel/eslint-parser',
	parserOptions: {
		// parser: '@babel/eslint-parser',
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
		ecmaVersion: 2021,
	},
	plugins: [
		'@typescript-eslint',
	],
	// https://www.npmjs.com/package//eslint-plugin-import
	rules: {
		'no-mixed-operators': 0,
		'operator-linebreak': [
			1, 'before',
			// { "overrides": { "+=": "before" } }
		],
		'global-require': 1,
		'import/no-unresolved': 0,
		'import/extensions': 0,
		'import/prefer-default-export': 'off',
		'import/no-extraneous-dependencies': 'off',
		'object-curly-newline': [
			'error', {
				// "ObjectExpression": "always",
				// "ObjectPattern": { "multiline": true },
				ImportDeclaration: 'never',
				ExportDeclaration: { multiline: true, minProperties: 3 },
			}],
		indent: 'off',
		'no-tabs': 'off',
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		semi: [1, 'never'],
		'no-use-before-define': ['warn', { functions: true, classes: true }],
		'no-undef': 'warn',
		'max-len': ['warn', { ignoreTrailingComments: true }, { code: 120 }],
		'no-unused-vars': [
			'warn',
			{ vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
		'no-return-assign': 'off', // for forEach without return
		'no-unused-expressions': [
			'warn', {
				allowShortCircuit: true,
				allowTernary: true,
			}],
		/* allow first letter for a new instance */
		'new-cap': [
			'warn',
			{
				newIsCapExceptions: ['moment'],
			},
		],
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/singleline-html-element-content-newline': 0,
		'spaced-comment': 0,
		'prefer-const': 0,
		camelcase: 0,
		eqeqeq: 0,
		'no-useless-return': 0,
		'vue/max-attributes-per-line': 0,
		/* Заполнение внутри блоков js */
		'padded-blocks': 0,
		/* Отступы в html */
		'vue/html-indent': [
			'error', 'tab', {
				attribute: 1,
				baseIndent: 1,
				alignAttributesVertically: true,
				ignores: [],
			}],
		'vue/script-indent': ['error', 'tab', { baseIndent: 1 }],
	},
	// overrides: [
	// 	{
	// 		extends: [
	// 			// 'eslint:recommended',
	// 			    'eslint:recommended',
	// 			'airbnb-base',
	//
	// 			// '@vue/typescript',
	// 			'plugin:@typescript-eslint/recommended',
	// 			'plugin:vue/essential',
	// 			// '@vue/airbnb',
	// 			// 'plugin:vue/vue3-recommended',
	// 		],
	// 		// files: ['*/**/*.js', './*.js', '**/*.js', '**.js', './server.js', './**/*.js'],
	// 		files: ['*/**/*.vue', './*.vue', '**/*.vue', '**.vue', './server.vue', './**/*.vue'],
	// 		// files: ['src/components/Impo'],
	// 		// parser: '@babel/eslint-parser',
	// 		parser: '@typescript-eslint/parser',
	//
	// 	},
	// ],
	settings: {
		'import/resolver': {
			alias: {
			  map: [
			    ['@/components', './src/components'],
			  ],
			  extensions: ['.ts', '.js', '.jsx', '.json', '.vue'],
			},
		},
		// 'import/resolver': {
		//   nuxt: {
		//     extensions: ['.js', '.vue', '.jsx'],
		//   },
		// },
	},
}
