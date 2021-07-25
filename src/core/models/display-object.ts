export abstract class DisplayObject {
    visible: boolean;

    abstract setScale(scale: number): void;
    abstract getScale(): number;
}
