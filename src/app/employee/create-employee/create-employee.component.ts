import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

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


    // this.employeeForm.get("fullName").valueChanges.subscribe(
    //   data => console.log(data)
    // );


    this.employeeForm.valueChanges.subscribe(
      data => console.log(JSON.stringify(data))
    );
  }

  // ngOnInit() {
  //   this.employeeForm = new FormGroup({
  //     fullName: new FormControl(),
  //     email: new FormControl(),
  //     skills: new FormGroup({
  //       skill: new FormControl(),
  //       experience: new FormControl(),
  //       proficiency: new FormControl()
  //     })
  //   })
  // }

  onSubmit() {
    console.log(this.employeeForm.value);
  }

  // loadData(){
  //   this.employeeForm.setValue({
  //     fullName:"Gaurav Rattan",
  //     email:"gauravrattan76@gmail.com",
  //     skills:{
  //       skill:"Angular 6",
  //       experience: 5,
  //       proficiency:"Expert"
  //     }
  //   });
  // }

  logKeyValuePairs(group: FormGroup): void {
    // loop through each key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get a reference to the control using the FormGroup.get() method
      const abstractControl = group.get(key);
      // If the control is an instance of FormGroup i.e a nested FormGroup
      // then recursively call this same method (logKeyValuePairs) passing it
      // the FormGroup so we can get to the form controls in it
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
        // If the control is not a FormGroup then we know it's a FormControl
      } else {
        console.log('Key = ' + key + ' && Value = ' + abstractControl.value);
      }
    });
  }

  loadData() {
    this.logKeyValuePairs(this.employeeForm);
    // this.employeeForm.patchValue({
    //   fullName: "Gaurav Rattan",
    //   email: "gauravrattan76@gmail.com",
    //   // skills:{
    //   //   skill:"Angular 6",
    //   //   experience: 5,
    //   //   proficiency:"Expert"
    //   // }
    // });
  }

}
