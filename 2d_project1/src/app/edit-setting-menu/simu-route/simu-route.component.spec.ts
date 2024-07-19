import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuRouteComponent } from './simu-route.component';

describe('SimuRouteComponent', () => {
  let component: SimuRouteComponent;
  let fixture: ComponentFixture<SimuRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
