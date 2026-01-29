/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'excel-green': '#217346',
        'excel-blue': '#2B579A',
        'excel-gray': '#F5F5F5',
        'excel-border': '#D6D6D6',
        'excel-hover': '#E8E8E8',
      },
    },
  },
  plugins: [],
}
