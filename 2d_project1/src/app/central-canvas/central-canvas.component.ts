import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { Map2dComponent } from '../maps/map2d/map2d.component';

@Component({
  selector: 'app-central-canvas',
  templateUrl: './central-canvas.component.html',
  styleUrls: ['./central-canvas.component.css'],
})
export class CentralCanvasComponent implements OnInit, OnChanges {
  @Input() view: string = '2D View';
  @Input() projectId!: number;
  @Output() uploadStart = new EventEmitter<void>();
  @Output() uploadEnd = new EventEmitter<void>();
  @ViewChild('map2d') map2dComponent!: Map2dComponent;
  constructor() {}
  currentView: 'map2d' | 'map3d' | 'map-tree' = 'map2d';
  ngOnInit(): void {
    this.updateView();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['view']) {
      this.updateView();
    }
  }
  onUploadStart() {
    this.uploadStart.emit();
  }
  onUploadEnd() {
    this.uploadEnd.emit();
  }
  private updateView() {
    switch (this.view.toLowerCase()) {
      case '2d view':
        this.currentView = 'map2d';
        break;
      case '3d view':
        this.currentView = 'map3d';
        break;
      case 'tree view':
        this.currentView = 'map-tree';
        break;
      default:
        this.currentView = 'map2d';
    }
  }
}
