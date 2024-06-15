import {
  Color3,
  MeshBuilder,
  StandardMaterial
} from '@babylonjs/core'
import {
  Actor3D,
  Actor3DInterface,
  ActorComposition,
  BabylonScene,
  Logger
} from '@khanonjs/engine'

const compositionId: string = 'Earth'

@Actor3D()
export class ActorEarth extends Actor3DInterface {
  @ActorComposition(compositionId)
  earth(scene: BabylonScene) {
    Logger.trace('aki ActorComposition earth', scene)

    /* const flatMaterial = new StandardMaterial('', scene)
    flatMaterial.disableLighting = true
    flatMaterial.emissiveColor = new Color3(0.13, 0.13, 0.13)
    const meshBjs = MeshBuilder.CreateDisc('', {
      radius: 1125,
      tessellation: 200
    })
    meshBjs.material = flatMaterial

    // return new Mesh(this.name, meshBjs) */
  }

  onLoaded() {
    Logger.trace('aki ActorEarth onLoaded')
  }

  onSpawn() {
    Logger.trace('aki ActorEarth onSpawn', this)
    this.useComposition(compositionId)
  }
}
