import {AbstractControl} from '@angular/forms';

export class customValidtors{
   static emailDomain(domainname:string){
        return (control: AbstractControl) =>{
        const email = control.value;
        const domain = email.substring(email.lastIndexOf('@') + 1);
        if (domain === '' || domain.toLowerCase() === domainname) {
          return null;
        }
        else {
          return { 'emailDomain': true };
        }
      }
      }
}