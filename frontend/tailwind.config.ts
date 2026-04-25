import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores extraídas da imagem real da Eletrogate
        'eletro-blue': '#1238D1',   // Azul vibrante (Botão MENU)
        'eletro-yellow': '#FFD600', // Amarelo vivo (Banner/Ofertas)
        'eletro-dark': '#212121',   // Texto e logo principal
        'eletro-light': '#F9FAFB',  // Fundo de área de chat
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;