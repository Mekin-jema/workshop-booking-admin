import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// vite.config.ts
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    chunkSplitPlugin(),
        tailwindcss()
        ,react()],
})



