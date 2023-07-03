<template>
  <employee-list-presentation
    :data="employee"
    :pageSize="pageSize"
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
const pageSize = 5;
const isLoadMore = ref(true);

// onMounted(() => {
//   emitter.on("getData", () => {
//     console.log("call");
//     getEmployeeData();
//     // employeeServices.getAllEmployeeData().then((res) => {
//     //   employee.value = res.data;
//     // });
//   });
// });

// onUnmounted(() => {
//   emitter.off("getData");
// });

getEmployeeData();

//get employee data
function getEmployeeData() {
  employeeServices.getEmployeeData(pageNumber.value, pageSize).then((res) => {
    if (res.data.length % pageSize != 0) {
      isLoadMore.value = false;
    }
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
  if (isLoadMore.value) {
    getEmployeeData();
  }
}
</script>
