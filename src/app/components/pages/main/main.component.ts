import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  searchForm!: FormGroup;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      title: new FormControl()
    })
  }

  onSearch(){
    if(this.searchForm.value.title == null || this.searchForm.value.title == "" || this.searchForm.value.title == " "){
      this.router.navigate([`/jobpost/search`]);
    }else{
      this.router.navigate([`/jobpost/search/${this.searchForm.value.title}`]);
    }
  }

}
