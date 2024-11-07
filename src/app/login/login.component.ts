import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user = new User()
  error: number = 0
  message : string = "login ou mot de passe erronés..";

  constructor(private authService: AuthService, private router: Router){}

  Login(){
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get("Authorization")! //je prends le parametre Authorization de lentete de la commande
        this.authService.saveToken(jwToken)
        this.router.navigate(['/'])
      },
      error: (err: any) => {
        this.error = 1
        if (err.error.errorCause=='disabled')
          this.message="Utilisateur désactivé, Veuillez contacter votre Administrateur";
      }
    })
  }

}
