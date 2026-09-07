import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Repo is served from https://kiichikatsu.github.io/Portfolio-Website/
// so every asset URL must be prefixed with the repo name.
export default defineConfig({
  base: '/Portfolio-Website/',
  plugins: [react(), tailwindcss()],
})
