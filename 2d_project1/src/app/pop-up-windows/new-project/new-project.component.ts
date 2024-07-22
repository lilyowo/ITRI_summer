import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  projectTitle:string = "";
  constructor() { }

  ngOnInit(): void {
  }
  closeModal() {
    this.close.emit();
  }
  createProject(){
    //check project name unique
    //if it's not unique
    //alert: Duplicate project name
    
    //if it's unique
    //insert into Project table
    this.closeModal();
    
  }

}
