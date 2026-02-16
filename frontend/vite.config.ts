import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ✅ CORRECT - loads .env files first
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: { port: parseInt(env.PORT || '4545') },
    plugins: [react(), tailwindcss()],
  }
})