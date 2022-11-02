import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on click', () => {
    spyOn(component.click, 'emit');
    component.onClick();
    expect(component.click.emit).toHaveBeenCalled();
  });

  it('should show content', () => {
    fixture.nativeElement.querySelector('button').textContent = 'test';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').textContent).toContain('test');
  });

  it('should be disabled when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').disabled).toBeTrue();
    expect(fixture.nativeElement.querySelector('button').classList).toContain('disabled');
  });

  it('should be enabled when disabled is false', () => {
    component.disabled = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').disabled).toBeFalse();
    expect(fixture.nativeElement.querySelector('button').classList).not.toContain('disabled');
  });
});
