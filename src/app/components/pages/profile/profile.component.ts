import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName = "";
  currentUser: any;
  isLoggedIn = false;
  statusMember = false;

  constructor(private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {
    this.isLoggedIn = !! this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();
    }
    console.log(this.currentUser.email)
    if (this.currentUser.category == "member") {
      this.statusMember = true;
      this.userName = `${this.currentUser.firstName}  ${this.currentUser.lastName}`;
    }else {
      this.userName = this.currentUser.name;
    }

  }

}
