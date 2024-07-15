import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftToolsComponent } from './left-tools.component';

describe('LeftToolsComponent', () => {
  let component: LeftToolsComponent;
  let fixture: ComponentFixture<LeftToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
