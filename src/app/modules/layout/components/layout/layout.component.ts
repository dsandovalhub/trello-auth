import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit{
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile()
    .subscribe();
      
  }
}
