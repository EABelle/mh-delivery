import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDetailsPageComponent } from './delivery-details-page.component';

describe('DeliveryDetailsPageComponent', () => {
  let component: DeliveryDetailsPageComponent;
  let fixture: ComponentFixture<DeliveryDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
