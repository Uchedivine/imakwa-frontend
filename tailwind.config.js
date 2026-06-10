/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream:          '#FDFBF7',
        'cream-dark':   '#F5F0E8',
        'cream-warm':   '#EDE6D8',
        terracotta:     '#C1623F',
        'terra-light':  '#D4774F',
        'terra-pale':   '#F2E0D8',
        charcoal:       '#1C1915',
        'charcoal-mid': '#3A3530',
        'charcoal-soft':'#6B6058',
        gold:           '#B8943B',
        'gold-light':   '#D4AC52',
        'gold-pale':    '#F5EDD4',
        teal:           '#2E7A74',
        pitch:          '#0D2B1E',
        'pitch-mid':    '#164030',
        'pitch-accent': '#1E5C42',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}