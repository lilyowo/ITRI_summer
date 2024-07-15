import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-format-tabs',
  templateUrl: './format-tabs.component.html',
  styleUrls: ['./format-tabs.component.css']
})
export class FormatTabsComponent implements OnInit {
  @Output() viewChanged = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  handleButtonClick(view: string): void {
    this.viewChanged.emit(view);
  }

}
