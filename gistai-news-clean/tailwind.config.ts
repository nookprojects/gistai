import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        accent: '#d4f542',
        'body-bg': '#f7f5f0',
        'body-surface': '#ffffff',
        'body-border': '#e2ddd6',
        'body-text': '#1a1816',
        'body-secondary': '#6b6560',
        'body-muted': '#a09890',
        'hdr-bg': '#0a0a0a',
      },
    },
  },
  plugins: [],
}
export default config
