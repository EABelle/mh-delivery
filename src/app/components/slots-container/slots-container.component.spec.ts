import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryTime } from 'src/app/models/delivery-time.model';

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

  it('should show contain 3 slots', () => {
    component.slots = [
      {
        deliveryTimeId: '1',
        deliveryDate: '2023-01-01',
        startTime: '08:00',
        stopTime: '09:00',
        inHomeAvailable: true
      },
      {
        deliveryTimeId: '2',
        deliveryDate: '2023-01-01',
        startTime: '09:00',
        stopTime: '10:00',
        inHomeAvailable: true
      },
      {
        deliveryTimeId: '3',
        deliveryDate: '2023-01-01',
        startTime: '09:00',
        stopTime: '11:00',
        inHomeAvailable: false
      }
    ];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.time-slot').length).toEqual(3);
  });

  it('should show contain 3 slots with correct time', () => {
    component.slots = [
      {
        deliveryTimeId: '1',
        deliveryDate: '2023-01-01',
        startTime: '08:00',
        stopTime: '09:00',
        inHomeAvailable: true
      },
      {
        deliveryTimeId: '2',
        deliveryDate: '2023-01-01',
        startTime: '09:00',
        stopTime: '10:00',
        inHomeAvailable: true
      },
      {
        deliveryTimeId: '3',
        deliveryDate: '2023-01-01',
        startTime: '09:00',
        stopTime: '11:00',
        inHomeAvailable: false
      }
    ];
    const expectedTimes = [
      '08:00 - 09:00',
      '09:00 - 10:00',
      '09:00 - 11:00'
    ];
    fixture.detectChanges();
    const times = fixture.nativeElement.querySelectorAll('.time');
    times.forEach((time: any, index: number) => 
      expect(time.textContent).toEqual(expectedTimes[index])
    );
  });

  it('should show contain 3 slots with correct in home availability', () => {
    component.slots = [
      {
        deliveryTimeId: '1',
        deliveryDate: '2023-01-01',
        startTime: '08:00',
        stopTime: '09:00',
        inHomeAvailable: true
      },
      {
        deliveryTimeId: '2',
        deliveryDate: '2023-01-01',
        startTime: '09:00',
        stopTime: '10:00',
        inHomeAvailable: true
      },
      {
        deliveryTimeId: '3',
        deliveryDate: '2023-01-01',
        startTime: '09:00',
        stopTime: '11:00',
        inHomeAvailable: false
      }
    ];
    fixture.detectChanges();
    const slots = fixture.nativeElement.querySelectorAll('.time-slot');
    slots.forEach((slot: any, index: number) => {
      if (index === 2) {
        expect(slot.textContent).not.toContain('Home delivery');
      } else {
        expect(slot.textContent).toContain('Home delivery');
      }
    });
  });

  it('should emit event on change', () => {
    spyOn(component.selectSlot, 'emit');
    const slot: DeliveryTime = {
      deliveryTimeId: '1',
      deliveryDate: '2023-01-01',
      startTime: '08:00',
      stopTime: '09:00',
      inHomeAvailable: true
    };
    component.onSelectSlot(slot);
    expect(component.selectSlot.emit).toHaveBeenCalledWith(slot);
  });

  it('should have a slot selected when selectedSlot is set', () => {
    const slot: DeliveryTime = {
      deliveryTimeId: '1',
      deliveryDate: '2023-01-01',
      startTime: '08:00',
      stopTime: '09:00',
      inHomeAvailable: true
    };
    component.selectedSlot = slot;
    component.slots = [slot];
    fixture.detectChanges();
    expect(component.selectedSlot).toEqual(slot);
    expect(fixture.nativeElement.querySelectorAll('.time-slot.selected').length).toEqual(1);
  });

  it('should not have a slot selected when selectedSlot is not set', () => {
    const slot: DeliveryTime = {
      deliveryTimeId: '1',
      deliveryDate: '2023-01-01',
      startTime: '08:00',
      stopTime: '09:00',
      inHomeAvailable: true
    };
    component.slots = [slot];
    fixture.detectChanges();
    expect(component.selectedSlot).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.time-slot.selected').length).toEqual(0);
  });
});
