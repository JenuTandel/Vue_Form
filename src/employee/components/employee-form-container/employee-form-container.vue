<template>
  <employee-form-presentation
    @postEmployee="postEmployee"
    :patchData="employeeData"
  ></employee-form-presentation>
</template>

<script setup lang="ts">
import employeeFormPresentation from "./employee-form-presentation/employee-form-presentation.vue";
import employeeService from "../../service/employee.services";
import { ref, onMounted, onUnmounted } from "vue";
import { EmployeeData } from "@/employee/model/employee.model";
import emitter from "@/emitter/emitter.mitt";

const employee = ref();
const employeeData = ref();

onMounted(() => {
  emitter.on("empid", (e: any) => {
    employeeService.getEmployeeById(e).then((res) => {
      employeeData.value = res.data;
    });
  });
});

//add and update employee data
function postEmployee(values: EmployeeData) {
  if (values.id) {
    employeeService.updateEmployee(values.id, values).then((res) => {
      if (res) {
        emitter.emit("getData");
      }
    });
  } else {
    employee.value = values;
    employeeService.addEmployeeData(employee.value).then((res) => {
      if (res) {
        emitter.emit("getData", employee.value);
      }
    });
  }
}

onUnmounted(() => {
  emitter.off("empid");
});
</script>
