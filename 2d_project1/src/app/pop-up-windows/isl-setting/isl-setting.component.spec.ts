import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslSettingComponent } from './isl-setting.component';

describe('IslSettingComponent', () => {
  let component: IslSettingComponent;
  let fixture: ComponentFixture<IslSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IslSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IslSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
