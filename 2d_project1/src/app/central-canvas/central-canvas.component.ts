import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-central-canvas',
  templateUrl: './central-canvas.component.html',
  styleUrls: ['./central-canvas.component.css']
})
export class CentralCanvasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() view: string='2D View';

}
