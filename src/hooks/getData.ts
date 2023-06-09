import employeeServices from "@/employee/service/employee.services";

export default function getData() {
  let data;
  employeeServices.getEmployeeData().then((res) => {
    data = res.data;
  });
  return data;
}
