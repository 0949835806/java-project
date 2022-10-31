import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public invalidRegister = false;
  constructor(private router: Router, private http: HttpClient, private notification: NotificationService) { }
  ngOnInit(): void {
  }

  register(user:User){
    this.http.post(environment.baseUrl + "user/save",user).subscribe(data=>{
      console.log(data);
      this.notification.showSuccess("Register successfull","Success");
    })
    this.router.navigate(["/signin"]);
  }
}
