import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() projectId!: number;
  @Input() projectName!:string;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
  }
  closeModal() {
    this.close.emit();
  }
  deleteProject(){
    this.projectService.deleteProject(this.projectId).pipe(
      catchError(error => {
        if(error.status === 404){
          console.log("error code:404  Project not found"); 
        }return of(null);
      })
    ).subscribe(response => {
      if(response){
        console.log("delete successful! projectId = ")
        console.log(this.projectName);
        console.log(this.projectId);
      }
    });
    this.closeModal();
  }

}
