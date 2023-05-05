const plugin = require('tailwindcss/plugin')
// const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    colors: {
      blue: "#30B1FD",
      black: "#232020",
      offBlack: "#363B3E",
      white: "#FFFFFF",
      offWhite: "#FFF4F3",
      yellow: "#EBEA67",
      red: "#F7766A",
      green: "#00B689",
      grey: "#747C81",
      silver: "#B8B8B8"
    },
    extend: {
      screens: {
        '2xl': { 'max': '1535px' },
        // => @media (max-width: 1535px) { ... }
        'xl': { 'min': '1600px', 'max': '3840px' },
        // => @media (max-width: 1279px) { ... }
        'lg': { 'max': '1100px' },
        // => @media (max-width: 1023px) { ... }
        'sm': { 'max': '400px' },
        // => @media (max-width: 639px) { ... }
        'md': { 'max': '865px' },
        // => @media (max-width: 767px) { ... }
        'm_lg': '1440px',
        'm_lg1': '1920px',
        'm_md': '865px',
        'm_sm': '393px',        
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        })
        isFirefoxRule.append(container.nodes)
        container.append(isFirefoxRule)
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(`firefox${separator}${rule.selector.slice(1)}`)}`
        })
      })
    }),
  ],
}