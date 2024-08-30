import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-export-help',
  templateUrl: './export-help.component.html',
  styleUrls: ['./export-help.component.css'],
})
export class ExportHelpComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
  closeModal() {
    this.close.emit();
  }
}
