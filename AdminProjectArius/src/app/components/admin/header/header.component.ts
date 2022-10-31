import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/guard/auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  roles: Array<any> = [];
  username !: string;
  token: any;
  tokenPayload: any;
  expirationDate: any;
  isLoggedIn = false;
  showAdminBroad = false;
  showAuthBroad= false;
  constructor(private authGuard: AuthGuard, private jwtHelper :JwtHelperService,private router: Router) { }

  ngOnInit(): void {
    this.token = this.authGuard.getToken();

    this.isLoggedIn =!!this.authGuard.getToken();
    if(this.isLoggedIn){
      const user = this.jwtHelper.decodeToken(this.token);
      this.roles  = user.roles;

      this.showAdminBroad = this.roles.includes("ROLE_ADMIN");
      this.showAuthBroad = this.roles.includes("ROLE_USER");

      this.username = user.sub;
    }

  }

  logout():void {
    this.authGuard.logout();
    // window.location.reload();
    this.router.navigate(['/admin/login'])
  }

}
