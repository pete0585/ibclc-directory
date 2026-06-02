import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF7F2',
          50: '#FDFCFA',
          100: '#FAF7F2',
          200: '#F4EDE0',
          300: '#EDE0CA',
        },
        sage: {
          DEFAULT: '#C9883C',
          50: '#FBF5EC',
          100: '#F5E3C5',
          200: '#ECC99A',
          300: '#E2AE6E',
          400: '#D89850',
          500: '#C9883C',
          600: '#A06829',
        },
        rose: {
          DEFAULT: '#E8A898',
          50: '#FDF5F3',
          100: '#F9E4DE',
          200: '#F2C9BC',
          300: '#E8A898',
          400: '#D98070',
          500: '#C45E4E',
          600: '#A04338',
        },
        charcoal: {
          DEFAULT: '#3D3535',
          50: '#F5F3F3',
          100: '#E0DBDB',
          200: '#B8AFAF',
          300: '#8F8484',
          400: '#675D5D',
          500: '#4E4444',
          600: '#3D3535',
          700: '#2C2626',
          800: '#1C1818',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Nunito', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-ivory': 'linear-gradient(135deg, #FAF7F2 0%, #F4EDE0 100%)',
        'gradient-sage': 'linear-gradient(135deg, #F5E3C5 0%, #C9883C 100%)',
      },
      boxShadow: {
        soft: '0 2px 16px rgba(61,53,53,0.06)',
        card: '0 4px 24px rgba(61,53,53,0.08)',
        'card-hover': '0 8px 32px rgba(61,53,53,0.12)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
