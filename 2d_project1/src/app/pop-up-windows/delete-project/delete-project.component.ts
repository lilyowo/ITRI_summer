import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() yesDelete = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  closeModal() {
    this.close.emit();
  }
  deleteProject(){
    //如果這裡抓projectId不方便的話 可以return是否刪除
    //然後把刪除的處裡邏輯寫在project list裡面
    //如果可以抓到projectId的話，delete from Project where projectId=projectId
    this.yesDelete.emit(true);
    this.closeModal();
  }

}
