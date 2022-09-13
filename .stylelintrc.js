module.exports = {
  extends: ['stylelint-config-recommended'],
  plugins: ['stylelint-order', 'stylelint-prettier'],
  ignoreFiles: ['**/*.ts', '**/*.tsx'],
  rules: {
    'prettier/prettier': [true, { singleQuote: true, tabWidth: 4 }],
    'order/properties-alphabetical-order': true,
    'selector-no-qualifying-type': [
      true,
      { ignore: ['attribute', 'class', 'id'] },
    ],
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
          'svg-load',
        ],
      },
    ],
    'no-descending-specificity': null,
  },
};
