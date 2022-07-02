module.exports = exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false
	},
	env: {
		es6: true,
		browser: true,
		node: true,
		jest: true
	},
	globals: {
		shallow: true,
		render: true,
		mount: true,
		globalThis: false
	},
	plugins: ['react', 'import', '@babel', 'react-hooks'],
	extends: [
		'eslint:recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',

		/* ESLint base rules */
		'./rules/eslint/best-practices.js',
		'./rules/eslint/errors.js',
		'./rules/eslint/es6.js',
		'./rules/eslint/node.js',
		'./rules/eslint/strict.js',
		'./rules/eslint/stylistic.js',
		'./rules/eslint/variables.js',

		/* Import plugin rules */
		'./rules/import/helpful-warnings.js',
		'./rules/import/module-systems.js',
		'./rules/import/static-analysis.js',
		'./rules/import/style-guide.js',

		/* React */
		'./rules/react/react.js',
		'./rules/react/jsx.js'
	],
	rules: {
		'@babel/no-invalid-this': 1,
		'max-len': 'off',
		'template-curly-spacing': 'off',
		'import/extensions': 'off',
		'multiline-comment-style': 'off',
		'import/order': 'off',
	},
	settings: {
		'import/core-modules': [],
		'react': {
			version: 'detect'
		}
	}
}
