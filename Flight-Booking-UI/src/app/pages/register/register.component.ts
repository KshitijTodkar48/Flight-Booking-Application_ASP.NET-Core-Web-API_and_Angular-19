import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  role = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth
      .register({
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role,
      })
      .subscribe({
        next: () => {
          alert('Registration successful');
          this.router.navigate(['/login']);
        },
        error: () => alert('Registration failed'),
      });
  }
}
