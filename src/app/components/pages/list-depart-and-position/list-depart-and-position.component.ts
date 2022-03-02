import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DepartmentService } from 'src/app/service/department.service';
import { PositionService } from 'src/app/service/position.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-depart-and-position',
  templateUrl: './list-depart-and-position.component.html',
  styleUrls: ['./list-depart-and-position.component.css']
})
export class ListDepartAndPositionComponent implements OnInit {
  departments:any;
  positions:any;
  isLoggedIn = false;
  currentUser:any;
  statusAdmin = false;
  statusEditDepartment = false;
  statusEditPosition = false;

  departmentForm!: FormGroup;
  positionForm!: FormGroup;

  constructor(private departmentService : DepartmentService,private positionService : PositionService,private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {

    this.departmentForm = new FormGroup({
      departmentId: new FormControl(),
      departmentName : new FormControl()
    })

    this.positionForm = new FormGroup({
      positionId: new FormControl(),
      positionName : new FormControl()
    })

    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();
      if(this.currentUser.category == 'admin'){
        this.statusAdmin = true;
      }
    }

    this.departmentService.getDepartments().subscribe((res:any)=>{
      this.departments = res.data;
    })

    this.positionService.getPositions().subscribe((res:any)=>{
      this.positions = res.data;
    })

  }

  onAddDepartment(){
    let deparment = {
      name: this.departmentForm.value.departmentName
    }
    this.departmentService.addDepartment(deparment).subscribe((res)=>{
      if(res.msg == "ok"){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'เพิ่มสำเร็จ'
        })
        this.departmentService.getDepartments().subscribe((res:any)=>{
          this.departments = res.data;
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'เพิ่มไม่สำเร็จ'
        })
      }
    })
  }

  onAddPosition(){
    let position = {
      name: this.positionForm.value.positionName
    }
    this.positionService.addPosition(position).subscribe((res)=>{
      if(res.msg == "ok"){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'เพิ่มสำเร็จ'
        })
        this.positionService.getPositions().subscribe((res:any)=>{
          this.positions = res.data;
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'เพิ่มไม่สำเร็จ'
        })
      }
    })
  }

  editDepartment(id:any){

    let currentDepartment : any;

    this.departmentService.getDepartmentById(id).subscribe((res)=>{
      currentDepartment = res.data;

      this.departmentForm.controls['departmentId'].setValue(currentDepartment._id);
      this.departmentForm.controls['departmentName'].setValue(currentDepartment.name);

    })

    this.statusEditDepartment = true;
  }

  editPosition(id:any){

    let currentPosition : any;

    this.positionService.getPositionById(id).subscribe((res)=>{
      currentPosition = res.data;

      this.positionForm.controls['positionId'].setValue(currentPosition._id);
      this.positionForm.controls['positionName'].setValue(currentPosition.name);

    })

    this.statusEditPosition = true;
  }

  updateDepartment(){
    let id = this.departmentForm.value.departmentId
    let department = {
      name: this.departmentForm.value.departmentName
    }
    this.departmentService.updateDepartment(id,department).subscribe((res)=>{
      if(res.msg == "OK"){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'แก้ไขสำเร็จ'
        })
        
        this.departmentService.getDepartments().subscribe((res:any)=>{
          this.departments = res.data;
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'แก้ไขไม่สำเร็จ'
        })
      }
    })

  }

  updatePosition(){
    let id = this.positionForm.value.positionId
    let position = {
      name: this.positionForm.value.positionName
    }
    this.positionService.updatePosition(id,position).subscribe((res)=>{
      if(res.msg == "OK"){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'แก้ไขสำเร็จ'
        })
        this.positionService.getPositions().subscribe((res:any)=>{
          this.positions = res.data;
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'แก้ไขไม่สำเร็จ'
        })
      }
    })
    
  }

  cancelEditDepartment(){
    this.departmentForm.controls['departmentId'].setValue(null);
    this.departmentForm.controls['departmentName'].setValue(null);
    this.statusEditDepartment = false;
  }

  cancelEditPosition(){
    this.positionForm.controls['positionId'].setValue(null);
    this.positionForm.controls['positionName'].setValue(null);
    this.statusEditPosition = false;
  }

  deleteDepartment(id:any){
    Swal.fire({
      title: "ต้องการลบข้อมูลหรือไม่ ?",
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.departmentService.deleteDepartment(id).subscribe((res)=>{
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

  deletePosition(id:any){
    Swal.fire({
      title: "ต้องการลบข้อมูลหรือไม่ ?",
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.positionService.deletePosition(id).subscribe((res)=>{
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
