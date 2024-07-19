import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuFloorComponent } from './simu-floor.component';

describe('SimuFloorComponent', () => {
  let component: SimuFloorComponent;
  let fixture: ComponentFixture<SimuFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuFloorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
