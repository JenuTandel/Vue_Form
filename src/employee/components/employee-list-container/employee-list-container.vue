<template>
  <employee-list-presentation
    :data="employee"
    @deleteEmployee="deleteEmployee"
    @getemployeeData="getemployeeData"
    @getPageNumber="getPageNumber"
  ></employee-list-presentation>
</template>

<script setup lang="ts">
import employeeListPresentation from "./employee-list-presentation/employee-list-presentation.vue";
import { onMounted, onUnmounted, ref } from "vue";
import employeeServices from "@/employee/service/employee.services";
import { EmployeeData } from "@/employee/model/employee.model";
import emitter from "@/emitter/emitter.mitt";

const employee = ref();
const empData = ref();

const pageNumber = ref(1);

onMounted(() => {
  emitter.on("getData", () => {
    getEmployeeData();
  });
});

onUnmounted(() => {
  emitter.off("getData");
});

getEmployeeData();

//get employee data
function getEmployeeData() {
  employeeServices.getEmployeeData(pageNumber.value, 5).then((res) => {
    console.log(pageNumber.value);
    console.log(res);
    employee.value = res.data;
  });
}

//delete employee data
function deleteEmployee(id: number) {
  employeeServices.deleteEmployeeData(id);
  getEmployeeData();
}

//get employee data from details button
function getemployeeData(employee: EmployeeData) {
  empData.value = employee;
}

function getPageNumber(num: number) {
  pageNumber.value = num;
  getEmployeeData();
}
</script>
