import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        this.auth.storeToken(res.token, res.role);
        const route = res.role === 'Admin' ? '/admin' : '/';
        this.router.navigate([route]);
        alert("Logged in successfully.");
      },
      error: () => alert('Invalid credentials'),
    });
  }
}
