import { PopulatedScene, PopulatedSceneArgs } from "./populated-scene.ts"
import { A } from "../objects/a.ts"
import { B } from "../objects/b.ts"

export class SceneOne extends PopulatedScene {
  constructor(args: PopulatedSceneArgs) {
    super({ ...args, ambientLightColor: 0xaabbcc })

    const a = new A(this)
    this.addPlacedObject(a)

    const b = new B(this)
    this.addPlacedObject(b)

    this.viewObject(a)
  }
}
