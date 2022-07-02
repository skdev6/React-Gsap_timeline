module.exports = {

	/**
	 * React plugin JSX rules
	 * @see https://github.com/yannickcr/eslint-plugin-react#jsx-specific-rules
	 */
	rules: {

		/**
		 * Enforce boolean attributes notation in JSX
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
		 * @fixable
		 */
		'react/jsx-boolean-value': 'off',

		/**
		 * Validate closing bracket location in JSX
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
		 * @fixable
		 */
		'react/jsx-closing-bracket-location': [
			'error',
			{
				nonEmpty: 'after-props',
				selfClosing: 'after-props'
			}
		],

		/**
		 * Validate closing tag location in JSX
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md
		 * @fixable
		 */
		'react/jsx-closing-tag-location': 'error',

		/**
		 * Enforce or disallow spaces inside of curly braces in JSX attributes
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
		 * @fixable
		 */
		'react/jsx-curly-spacing': ['error', 'never'],

		/**
		 * Enforce or disallow spaces around equal signs in JSX attributes
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
		 * @fixable
		 */
		'react/jsx-equals-spacing': ['error', 'never'],

		/**
		 * Restrict file extensions that may contain JSX
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
		 */
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: ['.js']
			}
		],

		/**
		 * Enforce position of the first prop in JSX
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
		 */
		'react/jsx-first-prop-new-line': 'off',

		/**
		 * Enforce event handler naming conventions in JSX
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
		 */
		'react/jsx-handler-names': [
			'warn',
			{
				eventHandlerPrefix: 'handle',
				eventHandlerPropPrefix: 'on'
			}
		],

		/**
		 * Validate JSX indentation
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
		 */
		// 'react/jsx-indent': [ 'error', 2 ],

		/**
		 * Validate props indentation in JSX
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
		 * @fixable
		 */
		// 'react/jsx-indent-props': [ 'error', 2 ],

		/**
		 * Validate JSX has key prop when in array or iterator
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
		 */
		'react/jsx-key': 'error',

		/**
		 * Limit maximum of props on a single line in JSX
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
		 */
		'react/jsx-max-props-per-line': 'off',

		/**
		 * Prevent usage of .bind() and arrow functions in JSX props
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
		 */
		'react/jsx-no-bind': [
			'error',
			{
				allowArrowFunctions: false,
				allowBind: false,
				ignoreRefs: false
			}
		],

		/**
		 * Prevent comments from being inserted as text nodes
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md
		 */
		'react/jsx-no-comment-textnodes': 'error',

		/**
		 * Prevent duplicate props in JSX
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
		 */
		'react/jsx-no-duplicate-props': [
			'error',
			{
				ignoreCase: false
			}
		],

		/**
		 * Prevent usage of unwrapped JSX strings
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md
		 */
		'react/jsx-no-literals': 'error',

		/**
		 * Prevent usage of unsafe target='_blank'
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
		 */
		'react/jsx-no-target-blank': 'error',

		/**
		 * Disallow undeclared variables in JSX
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
		 */
		'react/jsx-no-undef': 'error',

		/**
		 * Enforce PascalCase for user-defined JSX components
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
		 */
		'react/jsx-pascal-case': [
			'error',
			{
				allowAllCaps: true
			}
		],

		/**
		 * Enforce props alphabetical sorting
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
		 */
		'react/jsx-sort-props': 'off',

		/**
		 * Validate whitespace in and around the JSX opening and closing brackets
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
		 * @fixable
		 */
		// 'react/jsx-tag-spacing': [
		// 	'allow',
		// 	{
		// 		beforeSelfClosing: 'always',
		// 		afterOpening: 'always',
		// 		closingSlash: 'always'
		// 	}
		// ],

		/**
		 * Prevent React to be incorrectly marked as unused
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
		 */
		'react/jsx-uses-react': 'error',

		/**
		 * Prevent variables used in JSX to be incorrectly marked as unused
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
		 */
		'react/jsx-uses-vars': 'error',

		/**
		 * Prevent missing parentheses around multilines JSX
		 * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
		 * @fixable
		 */
		'react/jsx-wrap-multilines': 'error'
	}
}
