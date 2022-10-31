import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/guard/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  tokenPayload: any;
  token: any;
  userid !: number;
  constructor(private authGuard: AuthGuard, private authService:AuthService, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.GetTokenDecoded()
  }

  GetTokenDecoded() {
    this.token = this.authGuard.getToken();
    const user = this.jwtHelper.decodeToken(this.token);
    this.authService.getUserByUsername(user.sub).subscribe(data => {
      this.userid = data.userid;
    });
  }

}
