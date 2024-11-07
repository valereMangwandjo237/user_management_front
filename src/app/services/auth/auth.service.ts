import { Injectable } from '@angular/core';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiURLUser } from '../../app.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[] = [
    {"username":"admin","password":"123", "email": "abc@gmail.com", "enable":true, "roles":['ADMIN']},
    {"username":"madara","password":"123","email": "abcd@gmail.com", "enable":true,"roles":['USER']} 
  ]

  public loggedUser: String = undefined!
  public isLoggedIn: boolean = false
  public roles!: String[]
  public registredUser: User = new User

  token!: string
  private helper = new  JwtHelperService()

  constructor(private router: Router, private http: HttpClient) { }

  setRegistredUser(user: User){
    this.registredUser = user
  }

  getRegistredUser(): User{
    return this.registredUser
  }

  login(user: User){
    return this.http.post<User>(apiURLUser+"/login", user, {observe: "response"})
  }

  validateEmail(code: String){
    return this.http.get<User>(apiURLUser+"/verifyEmail/"+ code)
  }

  registerUser(user: User){
    return this.http.post<User>(apiURLUser+"/register", user, {observe: "response"})
  }

  saveToken(jwt: string){
    localStorage.setItem("jwt", jwt)
    this.token = jwt
    this.isLoggedIn = true
    this.decodeJWT()
  }

  decodeJWT(){
    if(this.token == undefined)
      return

    const decodedToken = this.helper.decodeToken(this.token)
    this.roles = decodedToken.roles
    this.loggedUser = decodedToken.sub
  }

  loadToken(){
    this.token = localStorage.getItem("jwt")!
    this.decodeJWT()
  }

  getToken(){
    return this.token
  }

  logout(){
    this.loggedUser = undefined!
    this.isLoggedIn = false
    this.roles = undefined!
    this.token = undefined!
    localStorage.removeItem("jwt")
    this.router.navigate(['/login'])
  }

  isTokenExpired(): boolean{
    return this.helper.isTokenExpired(this.token)
  }

  /*signIn(user: User): boolean{
    let validuser: boolean = false

    this.users.forEach((curUser) => {
      if (user.username==curUser.username && user.password==curUser.password) {
        validuser = true
        this.loggedUser = user.username
        this.isLoggedIn = true
        this.roles = curUser.roles
        localStorage.setItem("loggedUser", String(this.loggedUser))
        localStorage.setItem("isLoggedIn", String(this.isLoggedIn))
      }
      
    })

    return validuser
  }*/

  isAdmin(): boolean{
    if(!this.roles){ //this.roles== undefiened
      return false
    } 
    return (this.roles.indexOf("ADMIN") >= 0)
  }

  getUserRoles(username: string){
    this.users.forEach((curUser) => {
      if (curUser.username == username) {
        this.roles = curUser.roles
      }
    })
  }

  setLoggedUserFromLocalStorage(login: string){
    this.loggedUser = login
    this.isLoggedIn = true
    this.getUserRoles(login)
  }


}
