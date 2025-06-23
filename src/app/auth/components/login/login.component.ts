import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _formBuilder = inject(FormBuilder).nonNullable;
  private _authService = inject(AuthService);
  private _router = inject(Router);

  checked = signal(false);
  loginError = signal('');
  isLoading = signal(false);

  loginFormGroup = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    showPassword: [false],
  });

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['/home']);
    }
  }

  onMatSlideChange() {
    this.checked.update((value) => !value);
  }

  signIn() {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginFormGroup.getRawValue();
    this.isLoading.set(true);

    this._authService.login(username, password).subscribe({
      next: () => {
        this.loginError.set('');
        this._router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error.message);
        this.loginError.set('Incorrect username or password');
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  getUsernameError(): string {
    const control = this.loginFormGroup.controls.username;
    return control.hasError('required') ? 'You must enter a value' : '';
  }

  getPasswordError(): string {
    const control = this.loginFormGroup.controls.password;
    return control.hasError('required') ? 'You must enter a value' : '';
  }
}
