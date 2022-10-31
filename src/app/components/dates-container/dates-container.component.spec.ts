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
});
