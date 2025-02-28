export class Employee {
    employeeId: string;
    employeeName: string;
    email: string;
    phone: number;
    designation: string;
    salary: number;

    constructor(employeeId: string, employeeName: string, employeeEmail: string,
                phone: number, designation: string, salary: number) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.email = employeeEmail;
        this.phone = phone;
        this.designation = designation;
        this.salary = salary;
    }
}