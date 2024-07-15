import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatTabsComponent } from './format-tabs.component';

describe('FormatTabsComponent', () => {
  let component: FormatTabsComponent;
  let fixture: ComponentFixture<FormatTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
