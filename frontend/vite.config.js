import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api/":"https://custom-e-commerce-backend.onrender.com/" || "localhost:5000" || "localhost:5001",
    }
  }
})
