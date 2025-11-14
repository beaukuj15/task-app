import { Component } from "@angular/core";
import { AuthService } from "../../services/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.html",
  styleUrls: ["./welcome.css"],
})
export class WelcomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  goHome() {
    this.router.navigate(["/home"]);
  }


  
}