import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css'],
})
export class ShowEmpComponent implements OnInit {
  employees: any[] = [];
  modalTitle = '';
  action = '';

  _id = '';
  name = '';
  joinDate = null;
  departmentId = null;
  photoFileName = 'anonymous.png';

  departments = [];

  employee = {
    _id: this._id,
    name: this.name,
    joinDate: this.joinDate,
    department: this.departmentId,
    photoFileName: this.photoFileName,
    isNew: true,
  };

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.getEmployees();
    this.getDepartments();
  }

  addEmployeeButtonClick() {
    this.employee = {
      _id: this._id,
      name: this.name,
      joinDate: this.joinDate,
      department: this.departmentId,
      photoFileName: this.photoFileName,
      isNew: true,
    };
    this.modalTitle = 'Add Employee';
    this.action = 'Add';
  }

  editEmployeeButtonClick(employee) {
    console.log(employee);
    this._id = employee._id;
    this.name = employee.name;
    this.joinDate = employee.joinDate;
    this.photoFileName = employee.photoFileName;
    this.departmentId = employee.department._id;
    this.modalTitle = 'Update Department';
    this.action = 'Update';
  }

  deleteEmployeeButtonClick(employee) {
    if (confirm('Delete this?')) {
      this.service.deleteEmployee(employee._id).subscribe((data) => {
        alert('deleted');
        this.getEmployees();
      });
    }
  }

  getEmployees() {
    this.service.getEmployees().subscribe((data) => {
      console.log(data);
      this.employees = data;
    });
  }

  getDepartments() {
    this.service.getDepartments().subscribe((data) => {
      this.departments = data;
      this.departmentId = data[0]?._id;
    });
  }

  addEmployee() {
    console.log('add', this.employee);
    this.service
      .addEmployee({
        name: this.name,
        joinDate: this.joinDate,
        photoFileName: this.photoFileName,
        departmentId: this.departmentId,
      })
      .subscribe((data) => {
        alert('Employee added');
        this.getEmployees();
      });
  }

  updateDepartment() {
    console.log('update', this.employee);
    this.service
      .updateDepartment(this.employee._id, {
        name: this.name,
        joinDate: this.joinDate,
        photoFileName: this.photoFileName,
        departmentId: this.departmentId,
      })
      .subscribe((data) => {
        alert('Employee updated');
        this.getEmployees();
      });
  }
}
