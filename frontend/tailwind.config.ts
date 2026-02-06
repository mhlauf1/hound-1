import type {Config} from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2.5rem',
    },
    extend: {
      colors: {
        cream: '#fef1e1',
        'cream-dark': '#f2e9dd',
        green: '#003005',
        yellow: '#ffda00',
        white: '#fff',
        black: '#000',
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
      },
      borderRadius: {
        DEFAULT: '12px',
        pill: '9999px',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config
