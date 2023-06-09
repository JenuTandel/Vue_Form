<template>
  <!-- start: card -->
  <div class="card">
    <div class="card-body">
      <h3>Employee Name:{{ props.employeeData?.empName }}</h3>
      <p>Email Id:{{ props.employeeData?.email }}</p>
      <p>Contact Number:{{ props.employeeData?.phoneno }}</p>
      <p>Date of Birth:{{ props.employeeData?.dob }}</p>
      <p>Duty start time:{{ props.employeeData?.dutystarttime }}</p>
    </div>
  </div>
  <!-- end: card -->
</template>

<script setup lang="ts">
import { EmployeeData } from "@/employee/model/employee.model";

const props = defineProps<{
  employeeData: EmployeeData | undefined;
}>();
</script>
