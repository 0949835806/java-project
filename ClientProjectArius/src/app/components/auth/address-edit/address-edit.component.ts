import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/guard/auth-guard.service';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {

  id : number =0;
  address: Address = new Address();
  token: any;
  constructor(private addressService: AddressService, private routex: ActivatedRoute,private jwtHelper :JwtHelperService,
   private notification: NotificationService, private router: Router, private authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.id = this.routex.snapshot.params['id'];
    this.addressService.getById(this.id).subscribe(data => {
      this.address.id = data.id;
      this.address.fullName = data.fullName;
      this.address.name = data.name;
      this.address.landmark = data.landmark;
      this.address.mobileNo = data.mobileNo;
      this.address.street = data.street;
      this.address.postalCode = data.postalCode;
    })
  }

  onUpdate(address: Address){
    console.log(address);
    this.token = this.authGuard.getToken();
    const user = this.jwtHelper.decodeToken(this.token);
    console.log("User name: ",user.sub);
    this.addressService.update(user.sub, address).subscribe(
      {
        next: (success) =>{
          this.notification.showSuccess("Update successfull","Success");
          this.router.navigate(["/checkout"]);
        },
        error:(err) => {
          this.notification.showError("Update failed!","Error");
        }
      })
  }
}
