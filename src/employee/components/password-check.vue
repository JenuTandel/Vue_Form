<template>
  <section class="mt-5">
    <div id="passwordInput">
      <input
        type="password"
        placeholder="enter your password"
        name="password"
        class="w-100 p-2"
        v-model="password"
        @input="checkPassword"
      />
      <div id="passwordStrength" :class="strength"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
const password = ref();
const poor = ref(false);
const weak = ref(false);
const strong = ref(false);

const poorRegExp = /[a-z]/;
const weakRegExp = /([0-9])/;
const strongRegExp = /(?=.*?[#?!@$%^&*-])/;
const whitespaceRegExp = /^$|\s+/;

const strength = computed(() => {
  if (poor.value) {
    return "progressbar-danger";
  } else if (weak.value) {
    return "progressbar-warning";
  } else if (strong.value) {
    return "progressbar-success";
  }
  return "";
});
const checkPassword = () => {
  const passwordLength = password.value.length;
  if (passwordLength === 0) {
    poor.value = weak.value = strong.value = false;
  }
  if (
    (passwordLength <= 3 && passwordLength > 0) ||
    poorRegExp.test(password.value)
  ) {
    poor.value = true;
  }
  if (
    passwordLength >= 4 &&
    passwordLength < 8 &&
    weakRegExp.test(password.value) &&
    poor.value
  ) {
    poor.value = false;
    weak.value = true;
  }
  if (passwordLength >= 8 && strongRegExp.test(password.value) && weak.value) {
    weak.value = false;
    strong.value = true;
  }
};
</script>

<style scoped lang="scss">
#passwordInput {
  width: 30%;
  margin-bottom: 5px;
}
#passwordStrength {
  height: 5px;
}
.progressbar-danger {
  width: 10%;
  background-color: red;
}
.progressbar-warning {
  width: 60%;
  background-color: orange;
}
.progressbar-success {
  width: 100%;
  background-color: green;
}
</style>
