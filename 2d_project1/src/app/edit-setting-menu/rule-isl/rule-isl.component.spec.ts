import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleIslComponent } from './rule-isl.component';

describe('RuleIslComponent', () => {
  let component: RuleIslComponent;
  let fixture: ComponentFixture<RuleIslComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleIslComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleIslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
