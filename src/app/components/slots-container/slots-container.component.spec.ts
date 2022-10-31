import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsContainerComponent } from './slots-container.component';

describe('SlotsContainerComponent', () => {
  let component: SlotsContainerComponent;
  let fixture: ComponentFixture<SlotsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
