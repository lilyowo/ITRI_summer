import { Component, OnInit, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  closeModal() {
    this.close.emit();
  }

}
