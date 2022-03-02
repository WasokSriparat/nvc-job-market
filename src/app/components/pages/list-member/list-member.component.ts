import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/service/member.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.css']
})
export class ListMemberComponent implements OnInit {
  members:any;
  isLoggedIn = false;
  currentUser:any;
  statusAdmin = false;

  constructor(private service : MemberService,private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();
      if(this.currentUser.category == 'admin'){
        this.statusAdmin = true;
      }
    }

    this.service.getMembers().subscribe((res:any)=>{
      this.members = res.data;
    })

  }

  deleteMember(id:any){
    Swal.fire({
      title: "ต้องการลบสมาชิกหรือไม่ ?",
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteMember(id).subscribe((res)=>{
          Swal.fire(
            'Success!',
            "ลบสำเร็จ",
            'success'
          )
          window.location.reload();
        })
      }
    })
  }

}
