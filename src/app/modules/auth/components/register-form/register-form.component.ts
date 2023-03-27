import { AuthService } from './../../../../services/auth.service';
import { RequestStatus } from './../../../../models/request-status.model';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { CustomValidators } from '@utils/validators';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {

  formUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]]
  });

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });

  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this.authService.registerAndLogin(name, email, password)
      .subscribe({
        next: (res)=>{
          console.log('REGISTRO ->',name );          
          this.status = 'success';
          //this.router.navigate(['/login']);
          this.router.navigate(['/app/boards']);
        },
        error: (error)=>{                    
          this.status = 'failed';
          console.log('error_register', error);        

        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser(){
    if (this.formUser.valid) {
      this.statusUser = 'loading';
      const {email} = this.formUser.getRawValue();
      this.authService.isAvailable(email)
      .subscribe({
        next: (res)=>{
          console.log('validateUser ->',res ); 
          this.showRegister = true;         
          this.status = 'success';
          if (res.isAvailable) {
            this.form.controls.email.setValue(email);            
          } else {
            this.router.navigate(['/login'],{
              queryParams: {email}
            }); 

          }
        },
        error: (error)=>{                    
          this.status = 'failed';
          console.log('error_register', error);        

        }
      })        

      
    }else{
      this.formUser.markAllAsTouched();

    }

  }
}
