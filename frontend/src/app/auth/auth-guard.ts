import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth";
import { jwtDecode } from "jwt-decode";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (!token) {
      this.redirectToLogin();
      return false;
    }

    if (this.isTokenExpired(token)) {
      this.authService.logout();
      this.redirectToLogin();
      return false;
    }

    return true;
  }

  
  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      return Date.now() > decoded.exp * 1000;
    } catch {
      return true; // Treat invalid tokens as expired
    }
  }

  private redirectToLogin(): void {
    this.router.navigate(["/login"]);
  }
}