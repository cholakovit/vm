/// <reference types="vite/client" />

// Additional config operations on top of normal config

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import eslint from '@rollup/plugin-eslint'
import { visualizer } from "rollup-plugin-visualizer"

export default defineConfig({
    plugins: [
        react(),
        { ...eslint({ include: 'src/**/*.+(js|jsx|ts|tsx)'}), enforce: 'pre'  },
        reactRefresh(),
        visualizer(),
    ],
    // remove possible inline test code from generated files after npm run build
    // define: {
    //     "import.meta.vitest": "undifined"
    // },
    test: {
        globals: true,
        environment: 'jsdom', // or 'jsdom', 'node', 'happy-dom'
        setupFiles: '/src/test/test-setup.ts',

        // //check in src js or ts for inline testing
        // includeSource: ["src/**/*.{js,ts}"],
        // coverage: {

        //     // Additional ways to receive report: text, json, html and etc.
        //     // generate outdoorsy/coverage/index.html
        //     reporter: ['text', 'html']
        // },
    }
})

