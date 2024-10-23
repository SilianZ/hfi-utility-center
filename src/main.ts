import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router/router";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import { Vio } from "./styles/theme";
import { createI18n } from "vue-i18n";
import en_us from "./assets/i18n/en_us.json";
import zh_cn from "./assets/i18n/zh_cn.json";
import zh_ms from "./assets/i18n/zh_ms.json";

const app = createApp(App);
const i18n = createI18n({
    fallbackLocale: "en_us",
    messages: {
        en_us,
        zh_cn,
        zh_ms,
    },
});
app.use(i18n);
app.use(router);
app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        preset: Vio,
        options: {
            darkModeSelector: ".p-dark",
        },
    },
});
app.directive("tooltip", Tooltip);
app.mount("#app");
