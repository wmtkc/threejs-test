import {PopulatedScene} from "./populated-scene.ts";
import {A} from "../objects/a.ts";

export class SceneOne extends PopulatedScene {
    constructor() {
        super({ ambientLightColor: 0xaabbcc });

        const a = new A(this.scene)
        this.addPlacedObject(a)
        this.currentlyViewing = a
    }
}