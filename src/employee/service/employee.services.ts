import axios from "axios";
import { EmployeeData } from "../model/employee.model";
const baseUrl = process.env.VUE_APP_BASE_URL;

export class EmployeeService {
  getEmployeeData() {
    return axios.get(`${baseUrl}employeeData`);
  }

  addEmployeeData(employee: EmployeeData) {
    return axios.post(`${baseUrl}employeeData`, employee);
  }

  deleteEmployeeData(id: number) {
    return axios.delete(`${baseUrl}employeeData/${id}`);
  }

  getEmployeeById(id: number) {
    return axios.get(`${baseUrl}employeeData/${id}`);
  }

  updateEmployee(id: number, data: EmployeeData) {
    return axios.put(`${baseUrl}employeeData/${id}`, data);
  }
}

export default new EmployeeService();
