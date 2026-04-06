import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryDetail } from './salary-detail';

describe('SalaryDetail', () => {
  let component: SalaryDetail;
  let fixture: ComponentFixture<SalaryDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
