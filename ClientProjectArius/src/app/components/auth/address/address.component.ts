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
  editCache: { [key: string]: any } = {};
  isEdit =false;
  constructor(private router: Router, private http: HttpClient, private notification: NotificationService, private addressService: AddressService,
    private authGuard: AuthGuard, private authService: AuthService,  private jwtHelper :JwtHelperService) { }

  ngOnInit(): void {
    this.token = this.authGuard.getToken();
    const user = this.jwtHelper.decodeToken(this.token);
    this.addressService.list(user.sub).subscribe(data => {
      console.log("Data address: ",data);
      
      this.address = data
      this.updateEditCache(data);
      
    })
    
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
    this.isEdit= true;
  }

  cancelEdit(id: string): void {
    const index = this.address.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.address[index] },
      edit: false
    };
    this.isEdit= false;
  }

  saveEdit(id: string): void {
    const index = this.address.findIndex(item => item.id === id);
    console.log("index :",index);
    console.log("data edit: ", this.editCache[id].data);
    this.onUpdate( this.editCache[id].data);
    Object.assign(this.address[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    this.isEdit= false;
  }

  updateEditCache(data:any[]) {
    data.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
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

  onUpdate(address: Address){
    this.token = this.authGuard.getToken();
    const user = this.jwtHelper.decodeToken(this.token);
    this.addressService.update(user.sub, address).subscribe(
    {
      next: (success) =>{
        this.notification.showSuccess("Update successfull","Success");
        window.location.reload();
      },
      error:(err) => {
        this.notification.showError("Update failed!","Error");
      }
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
