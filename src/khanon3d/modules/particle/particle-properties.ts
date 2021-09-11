import { Motion } from '../motion/motion';

export interface ParticleProperties {
    x: number;
    y: number;
    motion: Motion;
    parent?: any; // TODO
}
