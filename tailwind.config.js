/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text: '#171f24', // Dark text
        text2: '#fffff', // Light text
        background: '#f7f7f7', // Light gray background #e6e7e8
        primary: '#0c4242', // Blue accent
        secondary: '#4c4c5e', // Darker blue accent
        accent: '#232F3E', // Dark blue accent
        button: '#0c4242', // Button color #a61919  Pauliaus: #c12e26  #c13932

        hover3: '#057a7a', // Button color on hover
        banner: '#f7f7f7',
        redmine: '#ec1c23',
        redmine2: '#c12e26',
        redmine3: '#c13932',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
