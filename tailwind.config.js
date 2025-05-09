/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary) / <alpha-value>)",
      },
    },
  },
  plugins: [],
}
