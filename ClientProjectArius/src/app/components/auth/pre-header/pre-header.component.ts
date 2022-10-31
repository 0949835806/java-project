import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/guard/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategogoryService } from 'src/app/services/categogory.service';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-pre-header',
  templateUrl: './pre-header.component.html',
  styleUrls: ['./pre-header.component.css']
})
export class PreHeaderComponent implements OnInit {


  roles: Array<any> = [];
  username !: string;
  token: any;
  tokenPayload: any;
  expirationDate: any;
  isLoggedIn = false;
  showAdminBroad = false;
  showAuthBroad= false;
  
  constructor(private categoryService:CategogoryService, private authGuard: AuthGuard, private authService:AuthService,
  private jwtHelper :JwtHelperService, private cartService: CartService, private notification: NotificationService) { }

  ngOnInit(): void {
    
    this.token = this.authGuard.getToken();
    this.GetTokenDecoded();
    this.getTokenExpirationDate();
    // console.log(this.authGuard.getToken());
    this.isLoggedIn= !!this.authGuard.getToken();
    
    if(this.isLoggedIn){
      const user = this.jwtHelper.decodeToken(this.token);
      this.roles = user.roles;
      
        this.showAdminBroad = this.roles.includes("ROLE_ADMIN");
        this.showAuthBroad = this.roles.includes("ROLE_USER");

        this.username = user.sub;
        // console.log(user);
        
    }
    
  }
  GetTokenDecoded() {
    const user = this.jwtHelper.decodeToken(this.token);
    this.authService.getUserByUsername(user.sub).subscribe(data => {
      this.tokenPayload =data;
      console.log(this.tokenPayload)
    })
    
  }
  getTokenExpirationDate() {
    this.expirationDate = this.jwtHelper.getTokenExpirationDate(this.token);
  }
  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.token);
  }

  logout():void {
    this.authGuard.logout();
    window.location.reload();
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  } 


}
