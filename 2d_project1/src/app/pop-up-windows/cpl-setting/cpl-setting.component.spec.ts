import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CplSettingComponent } from './cpl-setting.component';

describe('CplSettingComponent', () => {
  let component: CplSettingComponent;
  let fixture: ComponentFixture<CplSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CplSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CplSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
