<template>
  <section>
    <h2 class="mb-3">Employee List</h2>
    <button @click="exportCSV">Export as CSV</button>
    <select class="" v-model="selectedTime" @change="onSelect">
      <option value="" selected>Select Duty time</option>
      <option value="01:39">1:00</option>
      <option value="02:15">2:00</option>
      <option value="15:03">3:00</option>
    </select>
    <div class="table-wrapper overflow-auto" @scroll="load">
      <table class="table border">
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
          <tr v-for="(i, index) in empdata" :key="i.id">
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
            <!-- <td>
              <button @click="toggleRow(index)">
                {{ isRowExpanded(index) ? "Collapse" : "Expand" }}
              </button>
            </td> -->
          </tr>
          <!-- <tr v-for="(row, index) in filteredData" :key="'expanded-' + index">
            <td :colspan="columnCount">
              <div v-if="isRowExpanded(index)">
                <p>trial version</p>
              </div>
            </td>
          </tr> -->
          <p v-if="filteredData.length == 0">No Data found</p>
          <p v-if="isLoading">"Loading..."</p>
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

const empdata = ref<EmployeeData[]>([]);
const filteredData = ref();
const selectedTime = ref("");
filteredData.value = empdata.value;
const expandedRows = ref<any>([]);
const columnCount = ref();

// const toggleRow = (index: number) => {
//   if (isRowExpanded(index)) {
//     expandedRows.value = expandedRows.value.filter(
//       (rowIndex: any) => rowIndex !== index
//     );
//   } else {
//     expandedRows.value.push(index);
//   }
// };
// const isRowExpanded = (index: any) => {
//   return expandedRows.value.includes(index);
// };

const onSelect = () => {
  if (selectedTime.value == "") {
    filteredData.value = empdata.value;
  } else {
    filteredData.value = empdata.value.filter(
      (data) => data.dutystarttime.toString() === selectedTime.value
      // data.dutystarttime.getHours.toString() === selectedTime.value
    );
  }
};

const exportCSV = () => {
  const csvContent = convertToCSV(empdata.value);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.csv";
  link.click();
};
const convertToCSV = (data: any) => {
  const headers = Object.keys(data[0]);
  const rows = data.map((obj: any) =>
    headers.map((header) => {
      if (typeof obj[header] === "string" && obj[header].includes(",")) {
        return `"${obj[header]}"`;
      } else {
        return obj[header];
      }
    })
  );
  const csvArray = [headers, ...rows];
  return csvArray.map((row) => row.join(",")).join("\n");
};

const router = useRouter();
const props = defineProps<{
  data: EmployeeData[];
  pageSize: number;
}>();

const data = computed(() => {
  // console.log("props", props.data);
  return props.data;
});

watch(data, () => {
  data.value.forEach((element) => {
    empdata.value.push(element);
  });
  columnCount.value = Object.keys(empdata.value[0]).length;
});

const emit = defineEmits<{
  (event: "deleteEmployee", values: number): void;
  (event: "updateemployeeId", values: number): void;
  (event: "getemployeeData", values: EmployeeData): void;
  (event: "getPageNumber", values: number): void;
}>();

onMounted(() => {
  emitter.on("getData", (e: any) => {
    empdata.value.push(e);
  });
});

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
const isLoading = ref(false);

const load = (e: any) => {
  let { scrollTop, clientHeight, scrollHeight } = e.target;
  if (scrollTop + clientHeight == scrollHeight) {
    isLoading.value = true;
    if (props.data.length % props.pageSize == 0 && props.data.length != 0) {
      pageNumber.value++;
      emit("getPageNumber", pageNumber.value);
      isLoading.value = false;
    } else {
      isLoading.value = false;
    }
  }
};
</script>

<style scoped lang="scss">
.table-wrapper {
  height: 200px;
}
</style>
