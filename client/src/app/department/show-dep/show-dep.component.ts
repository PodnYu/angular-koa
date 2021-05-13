import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css'],
})
export class ShowDepComponent implements OnInit {
  departments: any[] = [];
  modalTitle = '';
  action = '';
  department = {
    _id: '',
    name: '',
    isNew: true,
  };
  addEditFormOpened = false;
  departmentName = '';

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  addDepartmentButtonClick() {
    this.department = {
      _id: '',
      name: '',
      isNew: true,
    };
    this.departmentName = '';
    this.modalTitle = 'Add Department';
    this.action = 'Add';
    this.addEditFormOpened = true;
  }

  editDepartmentButtonClick(department) {
    this.department = department;
    this.departmentName = department.name;
    this.modalTitle = 'Update Department';
    this.action = 'Update';
  }

  deleteDepartmentButtonClick(department) {
    if (confirm('Delete this?')) {
      this.service.deleteDepartment(department._id).subscribe((data) => {
        alert('deleted');
        this.getDepartments();
      });
    }
  }

  closeModalButtonClick() {}

  getDepartments() {
    this.service.getDepartments().subscribe((data) => {
      console.log(data);
      this.departments = data;
    });
  }

  addDepartment() {
    console.log('add', this.department);
    this.service
      .addDepartment({ name: this.departmentName })
      .subscribe((data) => {
        alert('Department added');
        this.getDepartments();
      });
  }

  updateDepartment() {
    console.log('update', this.department);
    this.service
      .updateDepartment(this.department._id, {
        name: this.departmentName,
      })
      .subscribe((data) => {
        alert('Department updated');
        this.getDepartments();
      });
  }
}
