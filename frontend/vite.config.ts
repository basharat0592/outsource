import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 1600,       // <-- set dev server port here
    strictPort: true, // optional: fail if port 1600 is already in use
  },
})
