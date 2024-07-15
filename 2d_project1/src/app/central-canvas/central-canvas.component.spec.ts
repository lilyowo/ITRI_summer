import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralCanvasComponent } from './central-canvas.component';

describe('CentralCanvasComponent', () => {
  let component: CentralCanvasComponent;
  let fixture: ComponentFixture<CentralCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
