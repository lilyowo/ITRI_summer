import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTleComponent } from './upload-tle.component';

describe('UploadTleComponent', () => {
  let component: UploadTleComponent;
  let fixture: ComponentFixture<UploadTleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadTleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadTleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
