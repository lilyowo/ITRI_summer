import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-tle',
  templateUrl: './upload-tle.component.html',
  styleUrls: ['./upload-tle.component.css'],
})
export class UploadTleComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  selectedFile: File | null = null;

  constructor() {}

  ngOnInit(): void {}
  closeModal() {
    this.close.emit();
  }
  uploadTLE() {
    //transport tle file to App server or DB
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64String = event.target.result;
        console.log('Base64 Encoded File:', base64String);
        // You can use the base64String as needed, e.g., send it to the server
      };
      reader.readAsDataURL(this.selectedFile); // Read file as base64 string
    }
    this.closeModal();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      this.selectedFile = file;
      const fileNameDisplay = document.querySelector(
        '.file-name-display',
      ) as HTMLInputElement;
      fileNameDisplay.value = file.name;
    } else {
      alert('Please select a valid .txt file');
    }
  }
}
