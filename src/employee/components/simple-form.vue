<template>
  <div id="passwordInput">
    <input
      type="password"
      placeholder="enter your password"
      name="password"
      v-model="password"
      @input="checkPassword"
    />
  </div>
  <div
    id="passwordStrength"
    :class="poor || weak || strong ? 'd-block' : 'd-none'"
  >
    <span id="poor" :class="poor ? 'active' : ''"></span>
    <span id="weak" :class="weak ? 'active' : ''"></span>
    <span id="strong" :class="strong ? 'active' : ''"></span>
  </div>
  <div id="passwordInfo">{{ passwordInfo }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const password = ref();
const poor = ref(false);
const weak = ref(false);
const strong = ref(false);
const passwordInfo = ref();

const poorRegExp = /[a-z]/;
const weakRegExp = /([0-9])/;
const strongRegExp = /(?=.*?[#?!@$%^&*-])/;
const whitespaceRegExp = /^$|\s+/;

const checkPassword = () => {
  const passwordLength = password.value.length;
  if (passwordLength === 0) {
    poor.value = weak.value = strong.value = false;
    passwordInfo.value = "";
  }
  if (whitespaceRegExp.test(password.value)) {
    passwordInfo.value = "whitespace not required";
  } else {
    passwordInfo.value = "";

    if (
      (passwordLength <= 3 && passwordLength > 0) ||
      poorRegExp.test(password.value)
    ) {
      poor.value = true;
      if (passwordLength < 4) {
        weak.value = false;
      }
    }
    if (passwordLength >= 4 && weakRegExp.test(password.value) && poor.value) {
      weak.value = true;
      if (passwordLength < 8 || strongRegExp.test(password.value)) {
        strong.value = false;
      }
    }
    if (
      passwordLength >= 8 &&
      strongRegExp.test(password.value) &&
      weak.value
    ) {
      strong.value = true;
    }
  }
};
</script>

<style scoped>
#passwordInput {
  width: 30%;
  display: flex;
  position: relative;
}
#passwordInput input[type="password"],
#passwordInput input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid lightgrey;
  font-size: 15px;
}

#passwordInput #showHide {
  font-size: 12px;
  font-weight: 600;
  position: absolute;
  color: red;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
}
#passwordStrength {
  width: 30%;
  height: 5px;
  margin: 5px 0;
}
#passwordStrength span {
  position: relative;
  height: 100%;
  width: 33.33%;
  background: lightgrey;
  border-radius: 5px;
  display: inline-block;
}
/* #passwordStrength span:nth-child(2) {
  margin: 0 3px;
} */
#passwordStrength span.active:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 5px;
}
#passwordStrength span#poor:before {
  background-color: #ff4757;
}
#passwordStrength span#weak:before {
  background-color: orange;
}
#passwordStrength span#strong:before {
  background-color: #23ad5c;
}
#passwordInfo {
  font-size: 15px;
}
#passwordInfo #poor {
  color: red;
}
#passwordInfo #weak {
  color: orange;
}
#passwordInfo #strong {
  color: green;
}
</style>

<!-- <template>
  <div id="app">
    <label>Password</label>
    <input type="password" v-model="password" />
    <password-meter :password="password" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PasswordMeter from "vue-simple-password-meter";

export default defineComponent({
  components: {
    PasswordMeter,
  },
  setup() {
    const password = ref("");

    return {
      password,
    };
  },
});
</script> -->
