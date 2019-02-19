import {ModuleWithProviders} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employee/list-employees/list-employees.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';

const appRoutes : Routes =[
    {path:'list',component:ListEmployeesComponent},
    {path:'create',component:CreateEmployeeComponent}
];


export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);