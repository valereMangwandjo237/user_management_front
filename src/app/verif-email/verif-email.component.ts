import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/User.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-verif-email',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './verif-email.component.html',
})
export class VerifEmailComponent implements OnInit{
  code: String=""
  err = ""
  user: User = new User

  constructor(private route:ActivatedRoute, private authService:AuthService, private router:Router) {}

  ngOnInit(): void {
    this.user = this.authService.registredUser
  }

  onValidateEmail(){
    this.authService.validateEmail(this.code).subscribe({
      next: (res)=>{
        alert("Connexion reussie!")
        this.authService.login(this.user).subscribe({
          next: (data)=>{
            console.log("reussi...")
            let jwToken = data.headers.get("'Authorization'")!
            this.authService.saveToken(jwToken)
            this.router.navigate(["/"])
          },
          error: (err: any) => {
            console.log("echec...")
            console.log(this.user)
            console.log(err);
          }
        })
      },
      error: (err: any) => {
        if ((err.error.errorCode == "INVALID_TOKEN")) 
          this.err = "Votre code n'est pas valide !";
  
        if ((err.error.errorCode == "EXPIRED_TOKEN")) 
          this.err = "Votre code a expiré !";
      }

    })
  }

}
