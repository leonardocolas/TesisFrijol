import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'veyard-ip-79-127-147-92.tunnelmole.net',
      '.tunnelmole.net' // Esto permite cualquier subdominio de tunnelmole.net
    ]
  }
})
