import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/guard/auth-guard.service';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  token: any;
  address: Array<any> = [];
  constructor(private router: Router, private http: HttpClient, private notification: NotificationService, private addressService: AddressService,
    private authGuard: AuthGuard, private authService: AuthService,  private jwtHelper :JwtHelperService) { }

  ngOnInit(): void {
    this.token = this.authGuard.getToken();
    const user = this.jwtHelper.decodeToken(this.token);
    this.addressService.list(user.sub).subscribe(data => {
      console.log("Data address: ",data);
      
      this.address = data
    })
  }



  addAddress(address: Address) {
    this.token = this.authGuard.getToken();
    const user = this.jwtHelper.decodeToken(this.token);
    this.addressService.insert(user.sub, address).subscribe(data => {
      console.log(data);
      this.notification.showSuccess("Register successfull","Success");
    })
    window.location.reload();
  }

  deleteAddress(id: number){
    this.addressService.delete(id).subscribe({
      next: (value) => {
        console.log("Delete successfull: ", value);
        this.notification.showSuccess("Delete address successfull", "Success");
        window.location.reload();
      },
      error: (err) => {
        console.log("Error: ", err);
        this.notification.showError("Delete address failed!", "Error");
      },
    })
  }
}
