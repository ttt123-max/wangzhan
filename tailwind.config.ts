import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        foreground: 'var(--foreground)',
        'foreground-soft': 'var(--foreground-soft)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        brand: {
          blue: 'var(--primary)',
          blueStrong: 'var(--primary-strong)',
          blueSoft: 'var(--primary-soft)',
          gold: 'var(--gold)',
          goldSoft: 'var(--gold-soft)',
          teal: 'var(--teal)',
          tealSoft: 'var(--teal-soft)',
          danger: 'var(--danger)',
          dangerSoft: 'var(--danger-soft)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        soft: '0 1px 2px rgba(13, 27, 61, 0.04), 0 8px 24px rgba(13, 27, 61, 0.06)',
        lift: '0 2px 6px rgba(13, 27, 61, 0.06), 0 14px 36px rgba(13, 27, 61, 0.1)'
      }
    }
  },
  plugins: []
};

export default config;
