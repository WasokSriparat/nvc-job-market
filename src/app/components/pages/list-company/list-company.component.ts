import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.css']
})
export class ListCompanyComponent implements OnInit {

  companies:any;
  isLoggedIn = false;
  currentUser:any;
  statusAdmin = false;

  constructor(private service : CompanyService,private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();
      if(this.currentUser.category == 'admin'){
        this.statusAdmin = true;
      }
    }

    this.service.getCompanies().subscribe((res:any)=>{
      this.companies = res.data;
    })

  }

  deleteCompany(id:any){
    Swal.fire({
      title: "ต้องการลบบริษัทหรือไม่ ?",
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCompany(id).subscribe((res)=>{
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
