import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() userId!: number; // 接收 userId
  projectTitle:string = "";
  
  constructor(private projectService: ProjectService) {}
  
  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit();
  }
  createProject(){
    if (!this.projectTitle.trim()) {
      alert("專案名稱不可空白");
      return;
    }

    this.projectService.addProject(this.userId, this.projectTitle).pipe(
      catchError(error => {
        if (error.status === 400) {
          alert(`專案名稱 ${this.projectTitle} 重複`);
        } else {
          alert('新增專案失敗，請稍後再試');
        }
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        alert('專案新增成功');
        this.closeModal();
      }
    });
    this.closeModal();
    
  }

}
