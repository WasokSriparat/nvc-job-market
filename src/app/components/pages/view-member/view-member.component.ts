import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/service/member.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.css']
})
export class ViewMemberComponent implements OnInit {

  currentUser: any;
  isLoggedIn = false;
  id:any;
  profilePic = "../../../../assets/images/NullProfile.png";

  constructor(private service : MemberService, private router : Router,private activatedRouter: ActivatedRoute, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !! this.tokenStorage.getToken();

    this.activatedRouter.params.subscribe((params)=>{
      this.id = params['id'];
    })

    this.service.getMemberById(this.id).subscribe((res)=>{
      this.currentUser = res.data;
      if(this.currentUser.profilePic){
        this.profilePic = this.currentUser.profilePic;
      }
    })
  }

}
