import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { VueReCaptcha } from "vue-recaptcha-v3";
import { IReCaptchaOptions } from "vue-recaptcha-v3/dist/IReCaptchaOptions";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
app.use(VueReCaptcha, {
  siteKey: "6LfSUY0mAAAAAEJw4fGqdzEzgEJ8H1qb7ojX052p",
} as IReCaptchaOptions);

// import { VueRecaptchaPlugin } from "vue-recaptcha";

// app.use(VueRecaptchaPlugin, {
//   v2SiteKey: "6LesQI4mAAAAAMnLs8DbBkVqrzVS_3tJqRlwML0V",
// });
