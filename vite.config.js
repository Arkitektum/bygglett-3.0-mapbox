import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import jsconfigPaths from 'vite-jsconfig-paths';
import path from 'path';

export default defineConfig(({ mode }) => {
   return {
      plugins: [
         react(),
         jsconfigPaths()
      ],
      resolve: {
         alias: {
            '@': path.resolve(__dirname, './src'),
         }
      }
   }
});