export class EmployeeData {
  id: number;
  empName: string;
  password: string;
  email: string;
  phoneno: number;
  dob: Date;
  dutystarttime: Date;

  constructor(
    id: number,
    empName: string,
    password: string,
    email: string,
    phoneno: number,
    dob: Date,
    dutystarttime: Date
  ) {
    this.id = id;
    this.empName = empName;
    this.password = password;
    this.email = email;
    this.phoneno = phoneno;
    this.dob = dob;
    this.dutystarttime = dutystarttime;
  }
}
