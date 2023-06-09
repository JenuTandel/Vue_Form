<template>
  <section>
    <h2 class="mb-3">Employee List</h2>
    <table class="table">
      <thead>
        <th>Sr. No.</th>
        <th>Employee Name</th>
        <th>Email ID</th>
        <th>Contact number</th>
        <th>Date of Birth</th>
        <th>Duty Time</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr v-for="(i, index) in data" :key="i.id">
          <td>{{ index + 1 }}</td>
          <td>{{ i.empName }}</td>
          <td>{{ i.email }}</td>
          <td>{{ i.phoneno }}</td>
          <td>{{ i.dob }}</td>
          <td>{{ i.dutystarttime }}</td>
          <td>
            <button class="btn btn-success me-2" @click="onEdit(i.id)">
              Edit
            </button>
            <button class="btn btn-danger me-2" @click="onRemove(i.id)">
              Remove
            </button>
            <button class="btn btn-primary" @click="onDetails(i)">
              Details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { EmployeeData } from "@/employee/model/employee.model";
import emitter from "@/emitter/emitter.mitt";
import { useRouter } from "vue-router";

const router = useRouter();
defineProps<{
  data: EmployeeData[] | undefined;
}>();

const emit = defineEmits<{
  (event: "deleteEmployee", values: number): void;
  (event: "updateemployeeId", values: number): void;
  (event: "getemployeeData", values: EmployeeData): void;
}>();

//edit button functionality
function onEdit(id: number) {
  emitter.emit("empid", id);
}
//remove button functionality
function onRemove(id: number) {
  emit("deleteEmployee", id);
}
//details button functionality
function onDetails(employee: EmployeeData) {
  if (employee) {
    router.push(`employee/${employee.id}`);
  }
}
</script>
