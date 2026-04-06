import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Appraisals } from './appraisals';

describe('Appraisals', () => {
  let component: Appraisals;
  let fixture: ComponentFixture<Appraisals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Appraisals],
    }).compileComponents();

    fixture = TestBed.createComponent(Appraisals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
