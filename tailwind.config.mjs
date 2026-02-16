/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0b2c3c',
        'sea-glass': '#7FD1C8',
        'cuba-red': '#D13438',
        'accent-gold': '#c5a059',
        cream: '#F9F7F2',
        'background-light': '#f6f7f8',
        'background-dark': '#121b20',
        'card-light': '#ffffff',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
