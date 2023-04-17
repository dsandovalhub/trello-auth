import { User } from './../../../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from './../../../../services/auth.service';
import { Component } from '@angular/core';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  
  user$ = this.authService.user$;

  constructor(
    private authService: AuthService, 
    private route: Router
  ) {} 

  logout(){
    this.authService.logout();
    this.route.navigate(['/login'])
  }
}
