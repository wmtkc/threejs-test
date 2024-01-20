import {
  BufferGeometry,
  ColorRepresentation,
  Euler,
  Material,
  Mesh,
  PointLight,
  PointLightHelper,
  Scene,
  Vector3,
} from "three"

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
  readonly pointLight: PointLight
  readonly pointLightHelper: PointLightHelper | undefined
  public defaultCameraPositionEuler: Euler | undefined

  constructor(args: {
    readonly scene: Scene
    readonly geometry: BufferGeometry
    readonly material: Material
    readonly pointLightProps: PointLightProps
    readonly position?: Euler
    readonly rotation?: Vector3
    readonly callback?: () => void
  }) {
    const { scene, pointLightProps } = args

    this.mesh = new Mesh(args.geometry, args.material)
    scene.add(this.mesh)

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

    scene.add(this.pointLight)

    if (pointLightProps.setHelper) {
      this.pointLightHelper = new PointLightHelper(this.pointLight)
      scene.add(this.pointLightHelper)
    }
  }

  onClick() {}
  animate() {}
}
