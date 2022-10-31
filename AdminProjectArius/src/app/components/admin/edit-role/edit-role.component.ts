import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {

  roles: Array<any> =[];
  id: number =0;
  user: User = new User();
  roleId !: string;
  constructor(private userService: UserService, private routex: ActivatedRoute, private notification: NotificationService
  ,private router: Router) { }

  ngOnInit(): void {
    this.userService.getRoles().subscribe(data => {
      this.roles =data
    })  
    this.id = this.routex.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data => {
      this.user.userid =data.userid;
      this.user.fullName =data.fullName;
      this.user.username =data.username;
      this.user.password=data.password;
      this.user.email =data.email;
      this.user.phone =data.phone;
      this.user.address =data.address;
      this.roleId = data.roles[0].roleId;
      console.log(this.roleId);
    })
    
  }

  editRole(role:any){
    let dataEdit = {
      userid: this.user.userid,
      username: this.user.username,
      fullName: this.user.fullName,
      password: this.user.password,
      email: this.user.email,
      phone: this.user.phone,
      address: this.user.address
    }
    console.log((dataEdit));
    
    this.userService.editRole(role.roleId, dataEdit).subscribe(data => {
      console.log(data);
      
    })
    this.router.navigate(['/admin/user']);
    this.notification.showSuccess("Edit role successfull","Success");
  }

}
