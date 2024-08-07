import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-left-tools',
  templateUrl: './left-tools.component.html',
  styleUrls: ['./left-tools.component.css'],
})
export class LeftToolsComponent implements OnInit {
  showModal = false;
  constructor() {}

  ngOnInit(): void {}

  handleButtonClick(toolName: string): void {
    alert(`${toolName} clicked`);
  }
  toggleModal() {
    this.showModal = !this.showModal;
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
