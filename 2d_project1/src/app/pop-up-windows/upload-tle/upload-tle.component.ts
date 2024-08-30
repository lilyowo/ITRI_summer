import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-upload-tle',
  templateUrl: './upload-tle.component.html',
  styleUrls: ['./upload-tle.component.css'],
})
export class UploadTleComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() uploadStart = new EventEmitter<void>();
  @Output() uploadEnd = new EventEmitter<void>();
  @Input() projectId!: number;
  selectedFile: File | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}
  closeModal() {
    this.close.emit();
  }
  uploadTLE() {
    //transport tle file to App server or DB
    if (this.selectedFile) {
      this.uploadStart.emit(); // 通知上層開始上傳
      const reader = new FileReader();
      reader.onload = (event: any) => {
        // const base64String = event.target.result.split(',')[1]; // Remove the data type prefix from the base64 string
        const base64String = event.target.result as string;
        // console.log('Base64 Encoded File:', base64String);
        this.taskService.uploadTle(base64String, this.projectId).subscribe(
          (response) => {
            console.log('Upload successful:', response);
            this.uploadEnd.emit(); // 通知上層上傳結束
            this.closeModal();
          },
          (error) => {
            console.error('Upload failed:', error);
            alert(`Upload failed. Please try again.\n${error}`);
            this.uploadEnd.emit(); // 通知上層上傳結束
          },
        );
      };
      reader.readAsDataURL(this.selectedFile); // Read file as base64 string
    } else {
      alert('Please select a file before uploading.');
    }
    // this.closeModal();
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
