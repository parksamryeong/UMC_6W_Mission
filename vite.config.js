import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styledComponents from 'vite-plugin-styled-components'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), styledComponents(),],
})
