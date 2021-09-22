import { from, Observable, of, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';

import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { TextureProperties } from '../../models/texture-properties';
import { Misc } from '../misc/misc';
import { SpriteTexture } from '../sprite/sprite-texture';
import { Logger } from '../logger/logger';

interface AssetsJsonData {
    spriteTextures: { url: string; width: number; height: number }[];
}

export class AssetsManager {
    private readonly spriteTextures: Misc.KeyValue<string, SpriteTexture> = new Misc.KeyValue<string, SpriteTexture>();

    constructor(private readonly babylonJsScene: BabylonJsScene) {}

    release(): void {
        this.spriteTextures.getValues().forEach((spriteTexture) => spriteTexture.release());
        this.spriteTextures.reset();
    }

    loadAssets(jsonUrl: string): Observable<void> {
        if (jsonUrl) {
            return fromFetch(jsonUrl).pipe(
                switchMap((response: Response) => {
                    if (response.ok) {
                        return from(response.json()).pipe(
                            switchMap((jsonData: AssetsJsonData) => {
                                if (jsonData.spriteTextures) {
                                    jsonData.spriteTextures.forEach((textureData) => {
                                        this.loadSpriteTexture({
                                            url: textureData.url,
                                            width: textureData.width,
                                            height: textureData.height,
                                        });
                                    });
                                }
                                return of();
                            }),
                            catchError((error) => {
                                return throwError(() => error);
                            })
                        );
                    } else {
                        throwError(() => new Error(`Could't load JSON: ${jsonUrl}`));
                    }
                }),
                catchError((error) => {
                    return throwError(() => error);
                })
            );
        } else {
            return of();
        }
    }

    loadSpriteTexture(textureProperties: TextureProperties): SpriteTexture {
        const spriteTexture = new SpriteTexture(this.babylonJsScene, textureProperties.url, textureProperties.width, textureProperties.height);
        this.spriteTextures.add(textureProperties.url, spriteTexture);
        return spriteTexture;
    }

    /**
     * Returns existing instance of SpriteManager or create a new one.
     *
     * @param url
     * @param properties
     * @returns
     */
    getSpriteTexture(textureProperties: TextureProperties): SpriteTexture {
        let spriteTexture: SpriteTexture = this.spriteTextures.get(textureProperties.url);
        if (spriteTexture) {
            return spriteTexture;
        } else if (textureProperties.width && textureProperties.height) {
            return this.loadSpriteTexture(textureProperties);
        } else {
            Logger.error('SpriteTexture not loaded:', textureProperties.url);
        }
    }

    loadBlender3D(url: string): void {}
}
