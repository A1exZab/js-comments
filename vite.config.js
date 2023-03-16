import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		open: '/src/index.html',
		port: 8080
	},

	build: {
		rollupOptions: {
			input: 'src/index.html'
		}
	}
})
