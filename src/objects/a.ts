import * as THREE from "three"
import { LitPlaceableMesh } from "./lit-placeable-mesh.ts"
import { Euler } from "three"
import { PopulatedScene } from "../scenes/populated-scene.ts"

export class A extends LitPlaceableMesh {
  constructor(populatedScene: PopulatedScene) {
    const defaultRelativeCameraPosition = new Euler(0, 0, -30)
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
    const material = new THREE.MeshStandardMaterial({ color: 0xa8a8a8 })
    const pointLightProps = {
      relativePosition: new Euler(-10, -10, 20),
      intensity: 1000,
      // setHelper: true,
    }

    super({
      populatedScene,
      geometry,
      material,
      pointLightProps,
    })
    this.defaultRelativeCameraPositionEuler = defaultRelativeCameraPosition
  }

  onClick() {
    console.log("Clicked A")
    this.populatedScene.viewObject(this)
  }

  animate() {
    this.mesh.rotation.x -= 0.01
    this.mesh.rotation.y += 0.02
    this.mesh.rotation.z += 0.03
  }
}
