import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuSwitchComponent } from './simu-switch.component';

describe('SimuSwitchComponent', () => {
  let component: SimuSwitchComponent;
  let fixture: ComponentFixture<SimuSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
