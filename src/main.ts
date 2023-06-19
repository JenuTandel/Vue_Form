import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");

// import { VueRecaptchaPlugin } from "vue-recaptcha";

// app.use(VueRecaptchaPlugin, {
//   v2SiteKey: "6LesQI4mAAAAAMnLs8DbBkVqrzVS_3tJqRlwML0V",
// });
