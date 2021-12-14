require('colors')

console.log('babel-node run from api'.magenta)

module.exports = {

	// filename: 'tst',
	presets: [
		'@vue/cli-plugin-babel/preset',
		'@babel/preset-env',
		'@babel/preset-typescript',
	],
	// sourceMaps: 'inline',

	plugins: [
		'@babel/plugin-transform-runtime',
		['@babel/plugin-proposal-decorators', {
		legacy: true,
			// decoratorsBeforeExport: true,
	},
	],
		['@babel/plugin-proposal-class-properties'],
		['@babel/plugin-proposal-private-property-in-object'],
		['@babel/plugin-proposal-private-methods'],
	],
	// only: only(),
}
