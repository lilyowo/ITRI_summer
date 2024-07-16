import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtComponent } from './ft.component';

describe('FtComponent', () => {
  let component: FtComponent;
  let fixture: ComponentFixture<FtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
