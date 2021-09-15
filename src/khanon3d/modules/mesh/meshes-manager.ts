import { Mesh } from './mesh';

export class MeshesManager {
    private readonly meshes: Mesh[] = [];

    addMesh(mesh: Mesh): Mesh {
        this.meshes.push(mesh);
        return mesh;
    }

    removeMesh(): void {
        // TODO
    }

    release(): void {
        // TODO
    }
}
