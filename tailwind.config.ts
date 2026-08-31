import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1E5EFF',
          gold: '#F5B60D',
          teal: '#12B5A5'
        }
      }
    }
  },
  plugins: []
};

export default config;
