import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleRouteComponent } from './rule-route.component';

describe('RuleRouteComponent', () => {
  let component: RuleRouteComponent;
  let fixture: ComponentFixture<RuleRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
