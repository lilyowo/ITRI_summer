import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSettingsComponent } from './right-settings.component';

describe('RightSettingsComponent', () => {
  let component: RightSettingsComponent;
  let fixture: ComponentFixture<RightSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
