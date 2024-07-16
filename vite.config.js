import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],

  resolve: {
    alias: {
      'sql': '/node_modules/@codemirror/lang-sql',
    },
  },



  optimizeDeps: {
    exclude: ["svelte-codemirror-editor", "codemirror", "@codemirror/language-sql" /* ... */],
  },
})
