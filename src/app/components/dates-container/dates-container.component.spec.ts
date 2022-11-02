import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesContainerComponent } from './dates-container.component';

describe('DatesContainerComponent', () => {
  let component: DatesContainerComponent;
  let fixture: ComponentFixture<DatesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatesContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 0 dates', () => {
    component.dates = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.date-card').length).toEqual(0);
  });

  it('should contain 5 dates', () => {
    component.dates = [
      '2023-01-01',
      '2023-01-02',
      '2023-01-03',
      '2023-01-04',
      '2023-01-05',
    ];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.date-card').length).toEqual(5);
  });

  it('should contain 5 dates with correct week day', () => {
    component.dates = [
      '2023-01-01',
      '2023-01-02',
      '2023-01-03',
      '2023-01-04',
      '2023-01-05',
    ];
    const expectedWeekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday'
    ];
    fixture.detectChanges();
    const weekDays = fixture.nativeElement.querySelectorAll('.week-day');
    weekDays.forEach((day: any, index: number) => 
      expect(day.textContent).toEqual(expectedWeekDays[index])
    );
  });

  it('should contain dates with correct date', () => {
    component.dates = ['2023-01-01'];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.day').textContent).toEqual('01');
  });

  it('should contain dates with correct month', () => {
    component.dates = ['2023-01-01'];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.month').textContent).toEqual('January');
  });

  it('should have a selected date', () => {
    component.dates = ['2023-01-01'];
    component.selectedDate = '2023-01-01';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.date-card').classList).toContain('selected');
  });

  it(`shouldn't have any selected date`, () => {
    component.dates = ['2023-01-01'];
    component.selectedDate = '';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.date-card').classList).not.toContain('selected');
  });

  it('should emit a date when clicked', () => {
    component.dates = ['2023-01-01'];
    spyOn(component.selectDate, 'emit');
    fixture.detectChanges();
    fixture.nativeElement.querySelectorAll('.date-card')[0].click();
    expect(component.selectDate.emit).toHaveBeenCalledOnceWith('2023-01-01');
  });
});
