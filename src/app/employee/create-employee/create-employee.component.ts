import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';

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
      fullName: ["",[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
      email: [""],
      skills: this._fb.group({
        skill: [""],
        experience: [""],
        proficiency: [""]
      })
    });
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

  loadData() {
    this.employeeForm.patchValue({
      fullName: "Gaurav Rattan",
      email: "gauravrattan76@gmail.com",
      // skills:{
      //   skill:"Angular 6",
      //   experience: 5,
      //   proficiency:"Expert"
      // }
    });
  }

}
