/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./public/**/*.{html,js}", 
  "./views/*.{html,js}", './views/index.html',
  "./node_modules/flowbite/**/*.js"
],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

