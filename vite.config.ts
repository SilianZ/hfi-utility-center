import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import sitemap from 'vite-plugin-sitemap'

const dynamicRoutes = [
    "/reservation/create",
    "/reservation/status",
    "/admin/login",
    "/admin/reservations",
    "/admin/approval",
    "/admin/policy",
]

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), sitemap({ hostname: "https://www.hfiuc.org", readable: true, dynamicRoutes: dynamicRoutes})],
    server: {
        proxy: {
            "/api": {
                target: "http://120.24.212.59/api",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    primevue: [
                        "primevue/button",
                        "primevue/tag",
                        "primevue/dialog",
                        "primevue/select",
                        "primevue/floatlabel",
                        "primevue/skeleton",
                        "primevue/card",
                        "primevue/toast",
                        "primevue/multiselect",
                        "primevue/datepicker",
                        "primevue/usetoast",
                        "primevue/inputtext",
                        "primevue/column",
                        "primevue/textarea",
                        "primevue/datatable",
                        "primevue/selectbutton",
                        "primevue/tooltip",
                        "primevue/toastservice",
                        "primevue/config",
                        "@primevue/themes",
                        "@primevue/themes/aura"
                    ],
                    vue: ["vue", "vue-request", "vue-turnstile"],
                    axios: ["axios"],
                    cos: ["cos-js-sdk-v5"]
                },
            },
        },
    },
});
