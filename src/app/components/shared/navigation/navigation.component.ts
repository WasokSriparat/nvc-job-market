import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  currentUser: any;
  isLoggedIn = false;
  statusMember = false;
  statusCompany = false;
  statusAdmin = false;
  userName: any;
  profilePic = "../../../../assets/images/NullProfile.png";

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();

      if(this.currentUser.profilePic){
        this.profilePic = this.currentUser.profilePic;
      }

      if (this.currentUser.category == "admin") {
        this.statusCompany = true;
        this.statusAdmin = true;
      } else if (this.currentUser.category == "company") {
        this.statusCompany = true;
      } else {
        this.statusMember = true;
      }

      if (this.statusMember) {
        this.userName = this.currentUser.firstName;
      } else {
        this.userName = this.currentUser.name;
      }

    }

  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
