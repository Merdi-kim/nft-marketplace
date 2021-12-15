module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
        'merkim': ['Sora', 'sans-serif'],
        'tt': ['Kanit', 'sans-serif'],
        'sm-tt': ['Source Sans 3', 'sans-serif']

      }, 
  
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
