import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css'],
})
export class AddEditDepComponent implements OnInit {
  constructor(private sharedService: SharedService) {
    console.log('dep');
  }

  departmentName = '';

  @Input() department;
  @Output() refreshDepartmentsEvent = new EventEmitter<any>();

  ngOnInit(): void {
    console.log('department:', this.department);
    this.departmentName = this.department.name;
  }

  addDepartmentButtonClick() {
    this.sharedService
      .addDepartment({ name: this.departmentName })
      .subscribe((data) => {
        this.refreshDepartmentsEvent.emit(data._id);
        alert('Department added');
      });
    this.departmentName = this.department.name;
    // this.departmentName = '';
  }

  updateDepartmentButtonClick() {
    console.log('update', this.department);
    this.sharedService
      .updateDepartment(this.department._id, {
        name: this.departmentName,
      })
      .subscribe((data) => {
        this.refreshDepartmentsEvent.emit(data.updated);
        alert('Department updated');
      });
    this.departmentName = this.department.name;
    console.log('department name:', this.departmentName);

    // this.departmentName = '';
  }
}
