import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalDetail } from './appraisal-detail';

describe('AppraisalDetail', () => {
  let component: AppraisalDetail;
  let fixture: ComponentFixture<AppraisalDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppraisalDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(AppraisalDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
