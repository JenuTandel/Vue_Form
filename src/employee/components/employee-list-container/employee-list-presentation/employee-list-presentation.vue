<template>
  <section>
    <h2 class="mb-3">Employee List</h2>
    <div class="table-wrapper overflow-auto" @scroll="load">
      <table class="table">
        <thead class="position-sticky bg-white top-0">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { EmployeeData } from "@/employee/model/employee.model";
import emitter from "@/emitter/emitter.mitt";
import { useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";

const router = useRouter();
const props = defineProps<{
  data: EmployeeData[];
}>();

const empdata: { value: EmployeeData[] };
const data = computed(() => {
  return props.data;
});

watch(
  data,
  () => {
    console.log(data.value);
    if (data.value) {
      data.value.forEach((element: EmployeeData) => {
        console.log(element);
        empdata.value.push(element);
      });
    }
  },
  { immediate: true }
);

const emit = defineEmits<{
  (event: "deleteEmployee", values: number): void;
  (event: "updateemployeeId", values: number): void;
  (event: "getemployeeData", values: EmployeeData): void;
  (event: "getPageNumber", values: number): void;
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

const pageNumber = ref(1);

const load = (e: any) => {
  let { scrollTop, clientHeight, scrollHeight } = e.target;
  if (scrollTop + clientHeight == scrollHeight) {
    setTimeout(() => {
      pageNumber.value++;
      emit("getPageNumber", pageNumber.value);
    }, 1000);
  }
};
</script>

<style scoped lang="scss">
.table-wrapper {
  height: 200px;
}
</style>
