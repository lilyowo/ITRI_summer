import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportHelpComponent } from './export-help.component';

describe('ExportHelpComponent', () => {
  let component: ExportHelpComponent;
  let fixture: ComponentFixture<ExportHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
