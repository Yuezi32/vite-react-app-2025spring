import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import checker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig({
    // 静态资源引用路径，默认为"/"
    base: './',
    server: {
        // 监听所有IP地址
        host: '0.0.0.0',
        // 指定dev sever的端口号，默认为5173
        port: 3000,
        // 自动打开浏览器运行以下路径的页面
        open: '/',
        // 设置反向代理
        proxy: {
            // 以下示例表示：请求URL中含有"/api"，则反向代理到http://localhost
            // 例如: http://localhost:3000/api/login -> http://localhost/api/login
            '/api': {
                target: 'http://localhost/',
                changeOrigin: true,
            },
        },
    },
    resolve: {
        // 路径别名配置
        alias: {
            '@': path.resolve(import.meta.dirname, 'src'),
        },
    },
    // plugins: [react()],
    plugins: [
        react(),
        checker({
            eslint: {
                // useFlatConfig: true 表示使用扁平模式配置（eslint.config.js）
                // useFlatConfig: false 表示使用传统模式配置（如.eslintrc.json、.eslintrc.cjs）
                useFlatConfig: true,
                lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
            },
        }),
    ],
})
