const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: true,
    content: [
      //'./public/**/*.html',
      './public/*.html',
      './public/*.ejs',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        mainblue: '#54b4f8',
      }
    }
    /*extend: {
    	transitionProperty: {
            'width': 'width'
        },
    },*/
  },
  variants: {
    extend: {
    	translate: ['group-hover']
    },
  },
  plugins: [],
}
