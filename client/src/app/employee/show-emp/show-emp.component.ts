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
  photosPath = 'http://localhost:5007/employeesAvatars/';

  _id: string;
  name: string;
  joinDate;
  departmentId: string;
  photoFileName: string;
  isNew: boolean;
  photoFilePath;

  departments = [];

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.initEmployee();
    this.getEmployees();
    this.getDepartments();
  }

  initEmployee() {
    this._id = '';
    this.name = '';
    this.joinDate = null;
    this.departmentId = null;
    this.photoFileName = 'anonymous.jpg';
    this.photoFilePath = this.photosPath + this.photoFileName;
    this.isNew = true;
  }

  addEmployeeButtonClick() {
    this.initEmployee();
    this.modalTitle = 'Add Employee';
    this.action = 'Add';
  }

  editEmployeeButtonClick(employee) {
    console.log(employee);
    this._id = employee._id;
    this.name = employee.name;
    this.joinDate = new Date(employee.joinDate);
    this.photoFileName = employee.photoFileName;
    this.departmentId = employee.department._id;
    this.isNew = false;
    this.photoFilePath = this.photosPath + this.photoFileName;
    this.modalTitle = 'Update Department';
    this.action = 'Update';
  }

  setJoinDate(value) {
    if (value) {
      this.joinDate = new Date(value);
    }
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

  updateEmployee() {
    this.service
      .updateEmployee(this._id, {
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

  uploadPhoto(event) {
    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('avatar', file, file.name);
    this.service.uploadPhoto(formData).subscribe((data: any) => {
      console.log('file upload callback:', data);
      if (data.err) {
        this.photoFileName = 'anonymous.jpg';
      } else {
        this.photoFileName = file.name;
      }

      this.photoFilePath = `${this.photosPath}${this.photoFileName}`;
    });
  }
}
