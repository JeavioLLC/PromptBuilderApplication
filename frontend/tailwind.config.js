/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'sarathi': {
          'primary': 'var(--sarathi-primary)',
          'primary-hover': 'var(--sarathi-primary-hover)',
          'bg-main': 'var(--sarathi-bg-main)',
          'bg-gray': 'var(--sarathi-bg-gray)',
          'text-primary': 'var(--sarathi-text-primary)',
          'text-secondary': 'var(--sarathi-text-secondary)',
          'border': 'var(--sarathi-border)',
          'active-bg': 'var(--sarathi-active-bg)',
          'selected-bg': 'var(--sarathi-selected-bg)',
          'selected-border': 'var(--sarathi-selected-border)',
          'code-bg': 'var(--sarathi-code-bg)',
          'code-text': 'var(--sarathi-code-text)',
        },
        'sarathi-blue': '#3b82f6',
        'sarathi-gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
