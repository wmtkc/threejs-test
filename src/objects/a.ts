import * as THREE from "three"
import {LitPlaceableMesh} from "./LitPlaceableMesh.ts";
import {Euler, Scene} from "three";


export class A extends LitPlaceableMesh {
    readonly defaultCameraPositionEuler: Euler;
    constructor(
        scene: Scene
    ) {
        const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
        const material = new THREE.MeshStandardMaterial({ color: 0xa8a8a8 })
        const pointLightProps = {
            relativePosition: new Euler(-10, -10, 20),
            intensity: 300,
            setHelper: true
        }

        super({
            scene,
            geometry,
            material,
            pointLightProps
        });
    }

    animate () {
        this.mesh.rotation.x -= 0.01
        this.mesh.rotation.y += 0.02
        this.mesh.rotation.z += 0.03
    }
}
