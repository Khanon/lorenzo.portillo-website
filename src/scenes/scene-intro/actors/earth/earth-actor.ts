import {
  Color3,
  MeshBuilder,
  StandardMaterial
} from '@babylonjs/core'
import {
  Actor3D,
  Actor3DInterface,
  ActorComposition,
  ActorCompositionDefinition,
  BabylonScene,
  Logger,
  SceneType
} from '@khanonjs/engine'

const compositionId: string = 'Earth'

@Actor3D()
export class ActorEarth extends Actor3DInterface {
  @ActorComposition(compositionId)
  earth(composition: ActorCompositionDefinition, scene: SceneType) {
    Logger.trace('aki ActorComposition earth', scene)

    const flatMaterial = new StandardMaterial('', scene.babylon.scene)
    flatMaterial.disableLighting = true
    flatMaterial.emissiveColor = new Color3(0.13, 0.13, 0.13)
    const meshBjs = MeshBuilder.CreateDisc('', {
      radius: 1125,
      tessellation: 200
    })
    meshBjs.material = flatMaterial

    // composition.add(new Mesh(this.name, meshBjs))  // 8a8f
  }

  onSpawn() {
    Logger.trace('aki ActorEarth onSpawn', this)
    const composition = this.setComposition(compositionId)
  }
}
