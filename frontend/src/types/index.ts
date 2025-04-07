export interface User {
    id: string;
    email: string;
    is_employer: boolean;
    is_talent_verify_staff: boolean;
  }
  
  export interface Company {
    id: string;
    name: string;
    registration_number: string;
    date_of_registration: string;
    address: string;
    contact_person: string;
    contact_phone: string;
    email: string;
    total_employees: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface Department {
    id: string;
    name: string;
    description?: string;
  }
  
  export interface EmployeeRole {
    id: string;
    name: string;
    description?: string;
  }
  
  export interface Employee {
    id: string;
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    employee_id?: string;
    company: Company;
    created_at: string;
    updated_at: string;
  }
  
  export interface EmploymentHistory {
    id: string;
    employee: Employee;
    department: Department;
    role: EmployeeRole;
    start_date: string;
    end_date?: string;
    duties?: string;
    is_current: boolean;
  }