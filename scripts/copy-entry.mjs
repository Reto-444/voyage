import { copyFile } from 'node:fs/promises'

// GitHub Pages serving the repository root follows this redirect to dist/index.html.
await copyFile(new URL('../dist/app.html', import.meta.url), new URL('../dist/index.html', import.meta.url))
