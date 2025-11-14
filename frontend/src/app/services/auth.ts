import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: {
    email: string;
    password: string;
  }): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(`${environment.apiUrl}/auth/login`, data)
      .pipe(
        tap((res) => localStorage.setItem("access_token", res.access_token)),
        catchError((error) => {
          const errorMessage =
            error.status === 401
              ? "Invalid email or password. Please try again."
              : "An unexpected error occurred. Please try again later.";
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  
  register(data: {
    email: string;
    password: string;
    name: string;
    role: string;
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, data).pipe(
      catchError((error) => {
        const errorMessage =
          error.status === 400
            ? "Registration failed. Please check your input."
            : "An unexpected error occurred. Please try again later.";
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  
  logout(): void {
    localStorage.removeItem("access_token");
  }

  
  getToken(): string | null {
    return localStorage.getItem("access_token");
  }

 
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}