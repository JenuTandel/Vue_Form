import employeeServices from "@/employee/service/employee.services";

export default function getData() {
  let data;
  employeeServices.getEmployeeData(1, 5).then((res) => {
    data = res.data;
  });
  return data;
}
