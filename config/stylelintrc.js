module.exports = exports = {
	extends: [ 'stylelint-config-recommended-scss', 'stylelint-config-sass-guidelines' ],
	plugins: [ 'stylelint-scss', 'stylelint-declaration-use-variable' ],
	rules: {
		'at-rule-empty-line-before': null,
		'indentation': 'tab',
		'selector-pseudo-element-colon-notation': 'single',
		'declaration-empty-line-before': 'never',
		'value-no-vendor-prefix': true,
		'selector-no-vendor-prefix': true,
		'property-no-vendor-prefix': true,
		'at-rule-no-vendor-prefix': true,
		'media-feature-name-no-vendor-prefix': true,
		'declaration-no-important': true,
		'selector-max-compound-selectors': 5,
		'max-nesting-depth': 5,
		'block-opening-brace-space-before': 'always',
		'at-rule-no-unknown': null,
		'order/order': null,
		'order/properties-alphabetical-order': null,
		'selector-no-qualifying-type': null,
		'sh-waqar/declaration-use-variable': [
			[ '/color/', 'background-color', { ignoreValues: [ 'transparent', 'inherit' ] }]
		],
		'no-descending-specificity': null,
		'string-quotes': 'single',
		'scss/selector-no-redundant-nesting-selector': [
			true,
			{
				severity: 'warning'
			}
		]
	}
}
