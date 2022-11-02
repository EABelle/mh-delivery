import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on change', () => {
    spyOn(component.check, 'emit');
    component.onChange();
    expect(component.check.emit).toHaveBeenCalled();
  });

  it('should show label', () => {
    component.label = 'test';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('label').textContent).toContain('test');
  });

  it('should be marked as checked when checked is true', () => {
    component.checked = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('input').checked).toBeTrue();
  });

  it('should be unchecked when checked is false', () => {
    component.checked = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('input').checked).toBeFalse();
  });
});
