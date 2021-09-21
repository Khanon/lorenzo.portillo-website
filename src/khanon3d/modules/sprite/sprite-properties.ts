export interface SpriteProperties {
    /**
     * Texture url
     */
    url: string;

    /**
     * Total frames
     */
    numFrames: number;

    /**
     * Height ratio (width / height). If undefined then use texture ratio.
     */
    ratio?: number;
}
