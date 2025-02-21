import { User } from './../../../../models/user.model';
import { AuthService } from './../../../../services/auth.service';
import { UsersService } from './../../../../services/users.service';
import { Component } from '@angular/core';

import { DataSourceUser } from './data-source';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent  {

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: User | null = null;

  constructor(
    private usersService:UsersService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void{
    this.usersService.getUsers()
    .subscribe(users =>{
      this.dataSource.init(users);
    })
    this.authService.user$
    .subscribe(user =>{
      this.user = user;
    })
  }

}
