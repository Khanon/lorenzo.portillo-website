import {
  Color3,
  MeshBuilder,
  StandardMaterial
} from '@babylonjs/core'
import {
  Actor,
  ActorComposition,
  ActorCompositionDefinition,
  ActorInterface,
  KJS,
  Logger,
  Mesh,
  MeshInterface,
  SceneType
} from '@khanonjs/engine'

const compositionId: string = 'Earth'

@Mesh()
class MeshEarth extends MeshInterface {
  onSpawn(scene: KJS.Scene) {
    const flatMaterial = new StandardMaterial('', scene.babylon.scene)
    flatMaterial.disableLighting = true
    flatMaterial.emissiveColor = new Color3(0.13, 0.13, 0.13)
    const meshBjs = MeshBuilder.CreateDisc('', { radius: 1125, tessellation: 200 }, scene.babylon.scene)
    meshBjs.material = flatMaterial
    this.setMesh(meshBjs)
  }
}

@Actor({
  meshes: [MeshEarth]
})
export class ActorEarth extends ActorInterface {
  @ActorComposition(compositionId)
  compose(comkposition: ActorCompositionDefinition, scene: SceneType) {
    Logger.trace('aki ActorComposition earth')
    comkposition.addMesh(MeshEarth)
  }

  onSpawn(scene: KJS.Scene) {
    Logger.trace('aki ActorEarth onSpawn', this)
    this.useComposition(compositionId)
  }
}
