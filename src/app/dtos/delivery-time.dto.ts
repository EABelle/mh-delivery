export class DeliveryTimeDTO {
    constructor(
        readonly deliveryTimeId: string,
        readonly deliveryDate: string,
        readonly startTime: string,
        readonly stopTime: string,
        readonly inHomeAvailable: boolean
    ) {}
}