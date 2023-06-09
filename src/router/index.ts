import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import EmployeeData from "../views/employee-data.vue";
import EmployeeDetailsContainer from "../employee/components/employee-details-container/employee-details-container.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/employee",
  },
  {
    path: "/employee",
    component: EmployeeData,
  },
  {
    path: "/employee/:id",
    component: EmployeeDetailsContainer,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
