import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryConfirmationPageComponent } from './delivery-confirmation-page.component';

describe('DeliveryConfirmationPageComponent', () => {
  let component: DeliveryConfirmationPageComponent;
  let fixture: ComponentFixture<DeliveryConfirmationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryConfirmationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
