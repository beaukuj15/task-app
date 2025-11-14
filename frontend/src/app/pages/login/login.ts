import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login",
  templateUrl: "./login.html",
  styleUrls: ["./login.css"],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  form: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  signupClicked() {
    this.router.navigate(["/register"]);
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(["/welcome"]);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.error?.message || "Login failed. Please try again.";
      },
    });
  }
}