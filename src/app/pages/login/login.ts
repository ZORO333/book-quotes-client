import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  model: any = {};

  constructor(private auth: AuthService, private router: Router) { }

  submit() {
    this.auth.login(this.model).subscribe(() => {
      this.router.navigate(['/books']);
    });
  }

}
