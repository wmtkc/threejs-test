import {
  BufferGeometry,
  ColorRepresentation,
  Euler,
  Material,
  Mesh,
  PointLight,
  PointLightHelper,
  Vector3,
} from "three"
import { PopulatedScene } from "../scenes/populated-scene.ts"

type PointLightProps = {
  relativePosition: Euler
  color?: ColorRepresentation
  intensity?: number
  distance?: number
  decay?: number
  setHelper?: boolean
}

export class LitPlaceableMesh {
  readonly mesh: Mesh
  readonly populatedScene: PopulatedScene
  readonly pointLight: PointLight
  readonly pointLightHelper?: PointLightHelper
  public defaultRelativeCameraPositionEuler?: Euler

  constructor(args: {
    readonly populatedScene: PopulatedScene
    readonly geometry: BufferGeometry
    readonly material: Material
    readonly pointLightProps: PointLightProps
    readonly position?: Euler
    readonly rotation?: Vector3
    readonly callback?: () => void
  }) {
    const { pointLightProps } = args
    this.populatedScene = args.populatedScene

    this.mesh = new Mesh(args.geometry, args.material)
    this.populatedScene.scene.add(this.mesh)

    if (args.position) {
      this.mesh.position.setFromEuler(args.position)
    }

    if (args.rotation) {
      this.mesh.rotation.setFromVector3(args.rotation)
    }

    this.pointLight = new PointLight(
      pointLightProps.color ?? 0xffeeaa,
      pointLightProps.intensity,
      pointLightProps.distance,
      pointLightProps.decay
    )
    const absolutePointLightEuler = new Euler(
      this.mesh.position.x + pointLightProps.relativePosition.x,
      this.mesh.position.y + pointLightProps.relativePosition.y,
      this.mesh.position.z + pointLightProps.relativePosition.z
    )
    this.pointLight.position.setFromEuler(absolutePointLightEuler)

    this.populatedScene.scene.add(this.pointLight)

    if (pointLightProps.setHelper) {
      this.pointLightHelper = new PointLightHelper(this.pointLight)
      this.populatedScene.scene.add(this.pointLightHelper)
    }
  }

  onClick() {}
  animate() {}
}
