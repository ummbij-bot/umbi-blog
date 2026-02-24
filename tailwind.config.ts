import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography'; // 👈 1. 여기서 import 하세요

const config: Config = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography, // 👈 2. require 대신 import한 변수를 사용하세요
  ],
};

export default config;