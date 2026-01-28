/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapear 'primary' a las variables CSS (Azul Corporativo)
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        },
        // Sobrescribir 'blue' para usar nuestra paleta primary
        // Esto automáticamente actualiza todos los componentes que usan bg-blue-*, text-blue-*, etc.
        blue: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        },
        // Configurar grises del sistema
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
        // Acentos y estados con variantes de color
        accent: {
          50: 'rgba(245, 158, 11, 0.1)',
          100: 'rgba(245, 158, 11, 0.2)',
          200: 'rgba(245, 158, 11, 0.3)',
          300: 'rgba(245, 158, 11, 0.5)',
          400: 'rgba(245, 158, 11, 0.7)',
          500: 'var(--accent-500)',
          600: 'var(--accent-600)',
          700: 'rgba(217, 119, 6, 0.8)',
          800: 'rgba(217, 119, 6, 0.9)',
          900: 'rgb(217, 119, 6)',
        },
        // Colores de estado
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        // Mapear colores de Tailwind a nuestros colores funcionales
        red: {
          50: 'rgba(239, 68, 68, 0.05)',
          100: 'rgba(239, 68, 68, 0.1)',
          200: 'rgba(239, 68, 68, 0.2)',
          300: 'rgba(239, 68, 68, 0.3)',
          400: 'rgba(239, 68, 68, 0.5)',
          500: 'var(--error)',
          600: 'var(--error)',
          700: 'rgba(239, 68, 68, 0.9)',
          800: 'rgba(220, 38, 38, 0.9)',
          900: 'rgb(127, 29, 29)',
        },
        green: {
          50: 'rgba(16, 185, 129, 0.05)',
          100: 'rgba(16, 185, 129, 0.1)',
          200: 'rgba(16, 185, 129, 0.2)',
          300: 'rgba(16, 185, 129, 0.3)',
          400: 'rgba(16, 185, 129, 0.5)',
          500: 'var(--success)',
          600: 'var(--success)',
          700: 'rgba(5, 150, 105, 0.9)',
          800: 'rgba(4, 120, 87, 0.9)',
          900: 'rgb(6, 78, 59)',
        },
        yellow: {
          50: 'rgba(245, 158, 11, 0.05)',
          100: 'rgba(245, 158, 11, 0.1)',
          200: 'rgba(245, 158, 11, 0.2)',
          300: 'rgba(245, 158, 11, 0.3)',
          400: 'rgba(245, 158, 11, 0.5)',
          500: 'var(--warning)',
          600: 'var(--warning)',
          700: 'rgba(217, 119, 6, 0.9)',
          800: 'rgba(180, 83, 9, 0.9)',
          900: 'rgb(120, 53, 15)',
        },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
}
