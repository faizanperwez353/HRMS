import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalList } from './appraisal-list';

describe('AppraisalList', () => {
  let component: AppraisalList;
  let fixture: ComponentFixture<AppraisalList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppraisalList],
    }).compileComponents();

    fixture = TestBed.createComponent(AppraisalList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
