import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

import "../node_modules/nprogress/nprogress.css";
import "../node_modules/msuite-vue/dist/msuite-vue.css";
import "msuite-vue";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

Sentry.init({
    dsn: "https://da913f1dd2784dd9b79728ea9dad30bd@sentry.io/1823227",
    integrations: [
        new Integrations.Vue({ Vue, attachProps: true, logErrors: true })
    ]
});
