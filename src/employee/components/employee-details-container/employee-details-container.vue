<template>
  <employee-details-presentation
    :employeeData="employeeData"
  ></employee-details-presentation>
</template>

<script setup lang="ts">
import employeeDetailsPresentation from "./employee-details-presentation/employee-details-presentation.vue";
import employeeServices from "@/employee/service/employee.services";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = +route.params.id;
const employeeData = ref();

//get employee by id
employeeServices.getEmployeeById(id).then((res) => {
  employeeData.value = res.data;
});
</script>
