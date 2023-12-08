import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthToken} from "./auth-token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private jwtHelper: JwtHelperService,
  ) { }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }

  public isAdmin(): boolean {
    const token = this.jwtHelper.decodeToken() as AuthToken;
    if (!this.isAuthenticated()) {
      return false;
    }
    return token && token.roles && token.roles.includes('ADMIN');
  }
}
