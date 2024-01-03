import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import jsconfigPaths from 'vite-jsconfig-paths';
import eslint from 'vite-plugin-eslint'
import path from 'path';

export default defineConfig({
   plugins: [
      react(),
      jsconfigPaths(),
      eslint({
         cache: false,
         include: ['./src/**/*.js', './src/**/*.jsx'],
         exclude: []
      })
   ],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      }
   },
   base: 'bygglett-3.0-mapbox/',
      root: '',
      build: {
        outDir: 'docs'
      }
});