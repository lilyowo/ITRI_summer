import { Component, OnInit, Input } from '@angular/core';
// import { Location } from '@angular/common'; // Import Location service
@Component({
  selector: 'app-left-tools',
  templateUrl: './left-tools.component.html',
  styleUrls: ['./left-tools.component.css'],
})
export class LeftToolsComponent implements OnInit {
  @Input() projectId!: number;
  showModal = false;
  showIslModal = false;
  showCplModal = false;
  loading = false;
  constructor() {}

  ngOnInit(): void {}

  handleButtonClick(toolName: string): void {
    alert(`${toolName} clicked`);
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  onUploadStart() {
    this.loading = true;
  }
  onUploadEnd() {
    this.loading = false;
    window.location.reload();
  }
  toggleIslModal() {
    this.showIslModal = !this.showIslModal;
  }
  toggleCplModal() {
    this.showCplModal = !this.showCplModal;
  }
  onUTDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', 'UT');

    const img = document.createElement('div');
    img.style.width = '10px';
    img.style.height = '10px';
    img.style.borderRadius = '50%';
    img.style.backgroundColor = 'green';
    document.body.appendChild(img);

    event.dataTransfer?.setDragImage(img, 5, 5);

    event.dataTransfer!.setDragImage(img, 0, 0);
    setTimeout(() => {
      img.remove();
    });
  }

  onFTDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', 'FT');

    const img = document.createElement('div');
    img.style.width = '10px';
    img.style.height = '10px';
    img.style.borderRadius = '50%';
    img.style.backgroundColor = 'blue';
    document.body.appendChild(img);

    event.dataTransfer?.setDragImage(img, 5, 5);

    event.dataTransfer!.setDragImage(img, 0, 0);
    setTimeout(() => {
      img.remove();
    });
  }
}
