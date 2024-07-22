import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-tle',
  templateUrl: './upload-tle.component.html',
  styleUrls: ['./upload-tle.component.css']
})
export class UploadTleComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  closeModal() {
    this.close.emit();
  }
  uploadTLE(){
    //transport tle file to App server or DB
    this.closeModal();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileNameDisplay = document.querySelector('.file-name-display') as HTMLInputElement;
      fileNameDisplay.value = `${file.name}.${file.type.split('/')[1]}`;
    }
  }

}
