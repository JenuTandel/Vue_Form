<template>
  <!-- <myCaptcha></myCaptcha> -->
  <!-- <VueRecaptcha></VueRecaptcha> -->
  <simple-form></simple-form>
  <password-check></password-check>
  <router-view />
</template>

<script setup lang="ts">
import PasswordCheck from "./employee/components/password-check.vue";
import simpleForm from "./employee/components/simple-form.vue";
// import { onMounted } from "vue";
// import myCaptcha from "@/components/my-captcha.vue";
// import { useRecaptchaProvider } from "vue-recaptcha";

// onMounted(() => {
//   useRecaptchaProvider();
// });
</script>
<style lang="scss">
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
</style>
