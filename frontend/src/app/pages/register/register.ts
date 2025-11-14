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
  selector: "app-register",
  templateUrl: "./register.html",
  styleUrls: ["./register.css"],
  imports: [ReactiveFormsModule, CommonModule],
})
export class RegisterComponent {
  form: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      role: ["user", [Validators.required]],
    });
  }
  loginClicked() {
    this.router.navigate(["/login"]);
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.error?.message || "Registration failed. Please try again.";
      },
    });
  }
}