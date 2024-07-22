import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  totalTime: number = 100; // 6000 seconds
  currentTime: number = 0;
  intervalId: any;
  progressWidth: number = 0;
  isDragging: boolean = false;
  showTooltip: boolean = false;
  tooltipLeft: number = 0;
  hoveredTime: number = 0;
  showModal = false;

  constructor() { }

  ngOnInit() {
    this.updateProgressWidth();
  }

  ngOnDestroy() {
    this.clearInterval();
  }

  play() {
    this.clearInterval();
    this.intervalId = setInterval(() => {
      if (this.currentTime < this.totalTime) {
        this.currentTime++;
        this.updateProgressWidth();
      } else {
        this.pause();
      }
      if(this.currentTime == this.totalTime){
        this.showModal = true;
      }
    }, 1000); // 1 second interval
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }

  pause() {
    this.clearInterval();
  }

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  updateProgressWidth() {
    this.progressWidth = (this.currentTime / this.totalTime) * 100;
  }

  onDragStart(event: MouseEvent) {
    this.isDragging = true;
    this.pause();
    this.updateProgressByMouseEvent(event);
  }

  @HostListener('document:mousemove', ['$event'])
  onDrag(event: MouseEvent) {
    if (this.isDragging) {
      this.updateProgressByMouseEvent(event);
    }
  }

  @HostListener('document:mouseup')
  onDragEnd() {
    if (this.isDragging) {
      this.isDragging = false;
      this.play();
    }
  }

  updateProgressByMouseEvent(event: MouseEvent) {
    const progressBar: HTMLElement = (event.target as HTMLElement).closest('.progress-bar') as HTMLElement;
    if (progressBar) {
      const rect = progressBar.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const totalWidth = rect.width;
      const newProgress = offsetX / totalWidth;
      this.currentTime = Math.round(newProgress * this.totalTime);
      this.updateProgressWidth();
    }
  }

  onMouseMove(event: MouseEvent) {
    const progressBar: HTMLElement = (event.target as HTMLElement).closest('.progress-bar') as HTMLElement;
    if (progressBar) {
      const rect = progressBar.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const totalWidth = rect.width;
      const hoverProgress = offsetX / totalWidth;
      this.hoveredTime = Math.round(hoverProgress * this.totalTime);
      this.tooltipLeft = offsetX;
      this.showTooltip = true;
    }
  }

  onMouseLeave() {
    this.showTooltip = false;
  }
}
