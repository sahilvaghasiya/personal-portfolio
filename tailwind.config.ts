import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        canvas: 'var(--canvas)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        wash: 'var(--wash)',
        danger: 'var(--danger)',
        success: 'var(--success)',
      },
      borderRadius: {
        lg: '0.5rem',
        '2xl': '1rem',
      },
      maxWidth: {
        page: '72rem',
      },
    },
  },
  plugins: [],
}

export default config
