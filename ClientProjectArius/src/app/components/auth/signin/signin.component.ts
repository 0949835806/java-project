import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public invalidLogin: boolean = false;
  constructor(private router: Router, private http: HttpClient, private notification: NotificationService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  login() {
    this.authService.login(this.form.get('username')?.value, this.form.get('password')?.value).subscribe({
      next: (response) => {
        this.notification.showSuccess("User login successful", "Success");
        const token = response.access_token;
        const refreshToken = response.refresh_token;
        localStorage.setItem("access_token", token);
        localStorage.setItem("refresh_token", refreshToken);
        this.invalidLogin = false;
        this.router.navigate(["/"]);
      },
      error: (err) => {
        this.notification.showError("Invalid username or password.", "Error");
        this.invalidLogin = true;
      },
      complete: () => console.info('Login complete')
    });
  }



}
