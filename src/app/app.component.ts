import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(public authService: AuthService, private router: Router){}

  title = 'MonProjet';

  logout(){
    this.authService.logout()
  }

  ngOnInit(): void {
    this.authService.loadToken()
    if(this.authService.getToken()==null || this.authService.isTokenExpired())
      this.router.navigate(["/login"])

  }
}
