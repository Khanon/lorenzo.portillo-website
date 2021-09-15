import { ParticleEndCriteria } from './particle-end-criteria';

export interface ParticleProperties {
    x?: number;
    y?: number;
    z?: number;
    scale?: number;
    alpha?: number;
    endCriteria?: ParticleEndCriteria;
    endValue?: number;
}
