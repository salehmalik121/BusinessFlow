import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule ,ReactiveFormsModule ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';
  users: Array<any> = [
  { id: 1, name: 'Super Admin', email: 'superadmin@example.com', role: 'superAdmin', password: 'Super@123' },

  // Accounts users
  { id: 2, name: 'Accounts User 1', email: 'accounts1@example.com', role: 'accounts', password: 'Accounts@1' },
  { id: 3, name: 'Accounts User 2', email: 'accounts2@example.com', role: 'accounts', password: 'Accounts@2' },
  { id: 4, name: 'Accounts User 3', email: 'accounts3@example.com', role: 'accounts', password: 'Accounts@3' },
  { id: 5, name: 'Accounts User 4', email: 'accounts4@example.com', role: 'accounts', password: 'Accounts@4' },

  // Sales users
  { id: 6, name: 'Sales User 1', email: 'sales1@example.com', role: 'sales', password: 'Sales@1' },
  { id: 7, name: 'Sales User 2', email: 'sales2@example.com', role: 'sales', password: 'Sales@2' },
  { id: 8, name: 'Sales User 3', email: 'sales3@example.com', role: 'sales', password: 'Sales@3' },
  { id: 9, name: 'Sales User 4', email: 'sales4@example.com', role: 'sales', password: 'Sales@4' },

  // Maintenance users
  { id: 10, name: 'Maintenance User 1', email: 'maintenance1@example.com', role: 'maintenance', password: 'Maint@1' },
  { id: 11, name: 'Maintenance User 2', email: 'maintenance2@example.com', role: 'maintenance', password: 'Maint@2' },
  { id: 12, name: 'Maintenance User 3', email: 'maintenance3@example.com', role: 'maintenance', password: 'Maint@3' },
  { id: 13, name: 'Maintenance User 4', email: 'maintenance4@example.com', role: 'maintenance', password: 'Maint@4' },

  // Inventory users
  { id: 14, name: 'Inventory User 1', email: 'inventory1@example.com', role: 'inventory', password: 'Inventory@1' },
  { id: 15, name: 'Inventory User 2', email: 'inventory2@example.com', role: 'inventory', password: 'Inventory@2' },
  { id: 16, name: 'Inventory User 3', email: 'inventory3@example.com', role: 'inventory', password: 'Inventory@3' },
  { id: 17, name: 'Inventory User 4', email: 'inventory4@example.com', role: 'inventory', password: 'Inventory@4' },
  { id: 18, name: 'Inventory User 5', email: 'inventory5@example.com', role: 'inventory', password: 'Inventory@5' },
  { id: 19, name: 'Inventory User 6', email: 'inventory6@example.com', role: 'inventory', password: 'Inventory@6' },

  // One extra Sales user
  { id: 20, name: 'Sales User 5', email: 'sales5@example.com', role: 'sales', password: 'Sales@5' }
];




  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {}

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      // Simulate API call
      setTimeout(() => {
        const { email, password } = this.loginForm.value;
        const index = this.users.findIndex(user => user.email === email);
        const passwordCheck : boolean = this.users[index].password === password;
        // Mock authentication - replace with actual service call
        if (index != -1 && password) {
          console.log('Login successful');
          delete this.users[index].password;
          this.auth.setUser(this.users[index]);
          localStorage.setItem('loginDetails', JSON.stringify(this.users[index]));
          console.log(this.users[index]);
          this.router.navigate(['/main']);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
        
        this.isLoading = false;
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  onForgotPassword(): void {
    console.log('Forgot password clicked');
    // Implement forgot password logic
  }

  onSignUp(): void {
    console.log('Sign up clicked');
    // Navigate to sign up page
  }
}
