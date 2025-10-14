/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#FF6B35', // Vibrant orange from the logo
        'primary-blue': '#1E40AF',   // Existing blue for reference
      },
    },
  },
  plugins: [],
};
