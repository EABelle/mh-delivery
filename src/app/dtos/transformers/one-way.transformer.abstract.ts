export abstract class OneWayTransformer<SourceType, DestinationType> {
    abstract transform(source: SourceType): DestinationType
    transformList(source: SourceType[]): DestinationType[] {
        return source.map(this.transform);
    }
}
