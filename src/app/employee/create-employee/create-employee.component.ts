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
      email: ["", [Validators.required, emailDomain('ge.com')]],
      skills: this._fb.group({
        skill: ["", Validators.required],
        experience: ["", Validators.required],
        proficiency: ["", Validators.required]
      })
    });

    this.employeeForm.valueChanges.subscribe(
      data => this.logKeyValuePairs(this.employeeForm)
    );
  }

  formErrors = {
    'fullName': '',
    'email': '',
    'skill': '',
    'experience': '',
    'proficiency': ''
  }

  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'emailDomain': 'Email domain should be GE.com',
      'required': 'Email is required.'
    },
    'skill': {
      'required': 'Skill Name is required.',
    },
    'experience': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };


  onSubmit() {
    console.log(this.employeeForm.value);
  }

  logKeyValuePairs(group: FormGroup = this.employeeForm) {
    Object.keys(group.controls).forEach((key) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl)
      }
      else {
        this.formErrors[key] = "";
        if (abstractControl && !abstractControl.valid && (abstractControl.touched)) {
          const messages = this.validationMessages[key];

          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
    console.log(this.formErrors);
  }

  // loadData() {
  //   this.logKeyValuePairs(this.employeeForm);
  //   console.log(this.formErrors);
  // }

}

function emailDomain(domainname:string){
  return (control: AbstractControl) =>{
  const email = control.value;
  const domain = email.substring(email.lastIndexOf('@') + 1);
  if (domain === '' || domain.toLowerCase() === domainname) {
    return null;
  }
  else {
    return { 'emailDomain': true }
  }
}
}
