<template>
  <section>
    <form id="emp-form" @submit.prevent="onSubmit">
      <h2>Employee Form</h2>
      <!-- {{ formInit }} -->
      <div class="mb-3">
        <Field
          type="text"
          name="empName"
          id="empName"
          class="form-control"
          placeholder="Enter fullname"
          autocomplete="on"
        />
        <span class="text-danger">{{ errors.empName }}</span>
      </div>
      <div class="mb-3">
        <Field
          type="password"
          name="password"
          id="password"
          class="form-control"
          placeholder="Enter your password"
        />
        <span class="text-danger">{{ errors.password }}</span>
      </div>
      <div class="mb-3">
        <Field
          type="email"
          name="email"
          id="email"
          class="form-control"
          placeholder="Enter your mail id"
          autocomplete="on"
        />
        <span class="text-danger">{{ errors.email }}</span>
      </div>
      <div class="mb-3">
        <Field
          type="date"
          name="dob"
          id="dob"
          class="form-control"
          placeholder="Birthdate"
        />
        <span class="text-danger">{{ errors.dob }}</span>
      </div>
      <div class="mb-3">
        <Field
          type="tel"
          name="phoneno"
          id="phoneno"
          class="form-control"
          placeholder="Contact number"
          autocomplete="on"
        />
        <span class="text-danger">{{ errors.phoneno }}</span>
      </div>
      <div class="mb-3">
        <Field
          type="time"
          name="dutystarttime"
          id="dutytime"
          class="form-control"
          placeholder="time"
        />
        <span class="text-danger">{{ errors.dutystarttime }}</span>
      </div>

      <!-- <div
        class="g-recaptcha"
        data-siteKey="6LesQI4mAAAAAMnLs8DbBkVqrzVS_3tJqRlwML0V"
      ></div> -->
      <vue-recaptcha
        sitekey="6LdK564mAAAAAHF9SvY8svhRaxE-iznsSBcKniXH"
        size="invisible"
        theme="light"
        hl="gu"
        @verify="recaptchaVerified"
        @expire="recaptchaExpired"
        @fail="recaptchaFailed"
        ref="vueRecaptcha1"
      >
      </vue-recaptcha>

      <!-- <button @click="recaptcha">Execute recaptcha</button> -->
      <!-- <span class="text-danger">{{ captchaerr }}</span> -->
      <div class="my-3">
        <!-- :disabled="!meta.valid" -->
        <button type="submit" class="btn btn-dark">Add Employee</button>
      </div>
    </form>

    <!-- formvalidation button outside form -->
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary" @click="validateForm">
        CheckValidation
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useForm, Field, configure } from "vee-validate";
import { computed, reactive, ref, watch } from "vue";
import * as yup from "yup";
import { EmployeeData } from "../../../model/employee.model";
import vueRecaptcha from "vue3-recaptcha2";
import axios from "axios";

// import { VueRecaptcha, useReCaptcha } from "vue-recaptcha-v3";

// const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
// const recaptcha = async () => {
//   await recaptchaLoaded();
//   const token = await executeRecaptcha("login");
//   console.log(token);
// };
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
});

const schema = yup.object({
  empName: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "It contains alphabets only")
    .required(),
  password: yup
    .string()
    .required()
    .min(6, "Password should have min 6 characters"),
  // .matches(/^S$/, "space not allowed"),
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter correct mail id")
    .required(),
  phoneno: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter correct contact number")
    .required(),
  dob: yup.string().required(),
  dutystarttime: yup.string().required(),
});

const formInit = reactive({ data: {} });

formInit.data = {
  empName: "",
  password: "",
  email: "",
  phoneno: "",
  dob: "",
  dutystarttime: "",
};

const { errors, meta, handleSubmit, validate, setValues } =
  useForm<EmployeeData>({
    initialValues: formInit.data,
    validationSchema: schema,
  });

const data = computed(() => {
  return props.patchData;
});

watch(data, (newValue) => {
  setValues(newValue);
  if (newValue) {
    validate();
  }
});

const props = defineProps<{ patchData: EmployeeData }>();

const emit = defineEmits<{
  (event: "postEmployee", values: EmployeeData): void;
}>();

const onSubmit = handleSubmit((values: EmployeeData, { resetForm }) => {
  // if (isCaptchaVerified.value) {
  emit("postEmployee", values);
  resetForm();
  // } else {
  //   captchaerr.value = "reCAPTCHA is mandatory";
  // }
});

const validateForm = () => {
  validate();
};
const isCaptchaVerified = ref(false);
const vueRecaptcha1 = ref();

const recaptchaVerified = (response: any) => {
  if (response) {
    isCaptchaVerified.value = true;
    captchaerr.value = "";
  }
};
const recaptchaExpired = () => {
  vueRecaptcha1.value.reset();
};
const captchaerr = ref();
const recaptchaFailed = (err: any) => {
  // captchaerr.value = err;
};
</script>

<style scoped>
#emp-form {
  width: 500px;
  margin: auto;
}
</style>

<!-- <template>
  <form @submit.prevent="submitForm">
    <input v-model="email" name="email" type="text" />
    <span>{{ emailError }}</span>
    <input v-model="name" name="name" type="text" />
    <span>{{ nameError }}</span>

    <button type="submit">Submit</button>
  </form>
  <button @click="validateField">Validate Email</button>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { useField, useForm } from "vee-validate";

const schema = yup.object({
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter correct mail id")
    .required(),
  name: yup.string().required(),
});
const { handleSubmit, validate } = useForm({
  validationSchema: schema,
});
const { value: email, errorMessage: emailError } = useField("email");
const { value: name, errorMessage: nameError } = useField("name");

const submitForm = handleSubmit(async () => {
  // Perform form submission logic
});

const validateField = () => {
  validate();
};

// const errors = ref([]);
// email.errors = errors;
</script> -->
