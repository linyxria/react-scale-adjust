import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'ReactScaleAdjust',
      fileName: 'react-scale-adjust',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'ReactJsxRuntime',
        },
      },
    },
    copyPublicDir: false,
  },
  plugins: [react(), dts({ rollupTypes: true })],
})
