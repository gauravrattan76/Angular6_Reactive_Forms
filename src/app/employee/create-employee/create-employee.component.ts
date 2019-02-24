import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {customValidtors} from '../../shared/customValidators';

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
      emailGroup:this._fb.group({
        email: ["", [Validators.required, customValidtors.emailDomain('ge.com')]],
        confirmEmail:['',Validators.required],
      },{validator:matchEmails}),
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
    'confirmEmail':'',
    'emailGroup':'',
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
    'confirmEmail':{
      'required':'Confirm Email is required'
    },
    'emailGroup':{
    'emailMismatch':'email and confirm email don not match'
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
  }

  logKeyValuePairs(group: FormGroup = this.employeeForm) {
    Object.keys(group.controls).forEach((key) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = "";
        if (abstractControl && !abstractControl.valid && (abstractControl.touched)) {
          const messages = this.validationMessages[key];

          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl)
      }
    });
  }

}


function matchEmails(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine) {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}