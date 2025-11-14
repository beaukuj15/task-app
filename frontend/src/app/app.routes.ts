import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login";
import { RegisterComponent } from "./pages/register/register";
import { WelcomeComponent } from "./pages/welcome/welcome";
import { Home } from "./pages/home/home";
import { AuthGuard } from "./auth/auth-guard";

export const routes: Routes = [
  { path: "", redirectTo: "welcome", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "welcome", component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: "home", component: Home, canActivate: [AuthGuard] },
];