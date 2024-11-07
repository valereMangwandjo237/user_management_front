import { Component, NgModule, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit{
  public user = new User()
  confirmPassword?: string
  myForm!: FormGroup
  err!: string
  loading: number = 0

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, 
    private toastr: ToastrService){}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required]]
    })
  }

  onRegister(){
    this.loading = 1
    this.authService.registerUser(this.user).subscribe({
      next: (res)=>{
        this.toastr.success('veillez confirmer votre email', 'Confirmation');
        this.router.navigate(["/verifyEmail"])
      },
      error: (err:any)=>{
        this.loading = 0
        if(err.error.errorCode=="USER_EMAIL_ALREADY_EXISTS"){
          this. err = "Adresse email deja utilisée!"
        }
      }
    })
    
  }

}
