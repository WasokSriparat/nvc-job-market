import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/service/company.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {
  currentUser: any;
  isLoggedIn = false;
  id:any;
  profilePic = "../../../../assets/images/NullProfile.png";

  constructor(private service : CompanyService, private router : Router,private activatedRouter: ActivatedRoute, private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {
    this.isLoggedIn = !! this.tokenStorage.getToken();

    this.activatedRouter.params.subscribe((params)=>{
      this.id = params['id'];
    })

    this.service.getCompanyById(this.id).subscribe((res)=>{
      this.currentUser = res.data;
      if(this.currentUser.profilePic){
        this.profilePic = this.currentUser.profilePic;
      }
    })

  }

}
