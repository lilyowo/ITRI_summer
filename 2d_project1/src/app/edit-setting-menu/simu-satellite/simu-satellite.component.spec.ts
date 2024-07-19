import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuSatelliteComponent } from './simu-satellite.component';

describe('SimuSatelliteComponent', () => {
  let component: SimuSatelliteComponent;
  let fixture: ComponentFixture<SimuSatelliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuSatelliteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuSatelliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
