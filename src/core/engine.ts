import { Engine as BabylonJsEngine } from '@babylonjs/core';

export class Engine {
    readonly babylonjs: BabylonJsEngine;

    private readonly canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.babylonjs = new BabylonJsEngine(this.canvas, true);
    }
}
