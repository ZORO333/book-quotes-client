import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
  
})
export class Register {
  model: any = {};

  constructor(private auth: AuthService, private router: Router) { }

  serverError: string | null = null;

  submit() {
    this.serverError = null;

    if (!this.model.userName || !this.model.password) return;

    this.auth.register(this.model).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => {
        this.serverError = err.error; // visar backend-meddelande i UI
      }
    });
  }

}

