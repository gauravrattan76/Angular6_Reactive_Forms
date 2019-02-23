import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Key } from 'protractor';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this._fb.group({
      fullName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: [""],
      skills: this._fb.group({
        skill: [""],
        experience: [""],
        proficiency: [""]
      })
    });

    // this.employeeForm.valueChanges.subscribe(
    //   //data => console.log(JSON.stringify(data))
    // );
  }

  onSubmit() {
    console.log(this.employeeForm.value);
  }

  logKeyValuePairs(group: FormGroup) {
    Object.keys(group.controls).forEach((key) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl)
      }
      else {
        console.log("Key  " + key + " value  " + abstractControl.value);
      }
    });
  }

  loadData() {
    this.logKeyValuePairs(this.employeeForm);
  }

}
