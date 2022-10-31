import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  roles: Array<any> = [];
  id!: number;
  users: User = new User();
  constructor(private userService: UserService, private routex: ActivatedRoute, private notification: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getRoles().subscribe(data => {
      this.roles =data;
    })
    this.id = this.routex.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data =>{
      this.users.userid= data.userid;
      this.users.username= data.username;
      this.users.fullName =data.fullName;
      this.users.password=data.password;
      this.users.email= data.email;
      this.users.phone= data.phone;
      this.users.address= data.address;
      
    })
  }

  onUpdate(user:User){
    this.userService.onUpdate(user, this.id).subscribe(
      {
        next: (success) =>{
          this.notification.showSuccess("Update successfull","Success");
          this.router.navigate(["/admin/user"]);
        },
        error:(err) => {
          this.notification.showError("Update failed!","Error");
        }
      })
  }

}
