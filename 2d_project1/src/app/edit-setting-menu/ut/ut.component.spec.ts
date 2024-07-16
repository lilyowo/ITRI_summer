import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtComponent } from './ut.component';

describe('UtComponent', () => {
  let component: UtComponent;
  let fixture: ComponentFixture<UtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
