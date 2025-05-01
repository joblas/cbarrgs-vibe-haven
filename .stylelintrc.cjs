module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
          'import',
        ],
      },
    ],
    'no-duplicate-selectors': null,
    'function-no-unknown': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'selector-class-pattern': null,
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
  },
}
