import { Engine as BabylonJsEngine } from '@babylonjs/core';

export default class Engine {
    private readonly handler: BabylonJsEngine;
    private readonly canvas: HTMLCanvasElement;

    get babylonjs(): BabylonJsEngine {
        return this.handler;
    }

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.handler = new BabylonJsEngine(this.canvas, true);
    }
}
