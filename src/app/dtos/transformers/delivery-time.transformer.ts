import { DeliveryTime } from "src/app/models/delivery-time.model";
import { DeliveryTimeDTO } from "../delivery-time.dto";
import { OneWayTransformer } from "./one-way.transformer.abstract";

export class DeliveryTimeTransformer extends OneWayTransformer<DeliveryTimeDTO, DeliveryTime> {
    transform(source: DeliveryTimeDTO): DeliveryTime {
        return new DeliveryTime(
            source.deliveryTimeId,
            source.deliveryDate,
            source.startTime,
            source.stopTime,
            source.inHomeAvailable
        )
    }
}