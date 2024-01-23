import * as THREE from "three"
import { Camera, ColorRepresentation, Euler, Object3D, Scene } from "three"
import { LitPlaceableMesh } from "../objects/lit-placeable-mesh.ts"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

export type PopulatedSceneArgs = {
  domElement: HTMLElement
  ambientLightColor?: ColorRepresentation
}

export class PopulatedScene {
  readonly scene: Scene
  readonly camera: Camera
  readonly controls: OrbitControls
  readonly placedObjects: LitPlaceableMesh[]
  readonly clickObjects: Object3D[]
  private currentlyViewing: LitPlaceableMesh | undefined

  constructor(args: PopulatedSceneArgs) {
    this.scene = new Scene()
    this.placedObjects = []
    this.clickObjects = []

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    this.controls = new OrbitControls(this.camera, args.domElement)

    if (args?.ambientLightColor) {
      const ambientLight = new THREE.AmbientLight(args.ambientLightColor)
      this.scene.add(ambientLight)
    }
  }

  viewObject(object: LitPlaceableMesh) {
    this.currentlyViewing = object

    const position = this.currentlyViewing.mesh.position
    const relativeCameraPosition =
      this.currentlyViewing.defaultRelativeCameraPositionEuler
    const absoluteCameraPosition = new Euler(
      position.x + (relativeCameraPosition?.x ?? 0),
      position.y + (relativeCameraPosition?.y ?? 0),
      position.z + (relativeCameraPosition?.z ?? 0)
    )
    this.camera.position.setFromEuler(absoluteCameraPosition)
    this.controls.target = position
    this.controls.update()
  }

  addPlacedObject(placedObject: LitPlaceableMesh) {
    this.placedObjects.push(placedObject)
    this.clickObjects.push(placedObject.mesh)
  }

  animate() {
    this.placedObjects.forEach((placedObject) => placedObject.animate())
  }
}
