import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleSwitchComponent } from './rule-switch.component';

describe('RuleSwitchComponent', () => {
  let component: RuleSwitchComponent;
  let fixture: ComponentFixture<RuleSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
