// @ts-check
/**
* @type {import('@stryker-mutator/api/core').PartialStrykerOptions}
*/
module.exports = {
      mutate: ['src/services/*.ts'],
      testRunner: 'jest',
      reporter: ['clear-text', 'html'], 
      coverageAnalysis: 'off',
  };
  