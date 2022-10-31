import { DeliveryTime } from "../models/delivery-time.model";

export function deliveryTimeToDates(time: DeliveryTime): { from: Date, to: Date } {
    return {
      from: new Date(time.deliveryDate + ' ' + time.startTime),
      to: new Date(time.deliveryDate + ' ' + time.stopTime)
    }
  }
  
export function compareTimes(a: DeliveryTime, b: DeliveryTime): number {
    const { from: aFrom, to: aTo } = deliveryTimeToDates(a);
    const { from: bFrom, to: bTo } = deliveryTimeToDates(b);
    return aFrom.getTime() - bFrom.getTime() || aTo.getTime() - bTo.getTime();
}

export function compareDates(a: string, b: string): number {
return new Date(a).getTime() - new Date(b).getTime();
}