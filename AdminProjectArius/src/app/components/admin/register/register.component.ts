import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public invalidRegister = false;
  constructor(private router: Router, private http: HttpClient, private notification: NotificationService,
    private userService: UserService) { }
  ngOnInit(): void {
  }

  register(user: User) {
    this.http.post(environment.baseUrl + "user/saveAdmin", user).subscribe({
      next: (value) =>{
        this.notification.showSuccess("Register successfull", "Success");
        this.router.navigate(["/admin/login"]);
      },
      error: (err) => {
        console.log("Error: ", err);
        this.notification.showError("Register failed", "Error");
        this.invalidRegister = true;
      },
      complete: () => console.info('Login complete')
      
    })

  }
}
