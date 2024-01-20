import * as THREE from "three"
import {A} from "../objects/a.ts"
import {ColorRepresentation, Object3D, Scene} from "three"
import {LitPlaceableMesh} from "../objects/lit-placeable-mesh.ts"

export class PopulatedScene {
    readonly scene: Scene
    readonly placedObjects: LitPlaceableMesh[]
    readonly clickObjects: Object3D[]

    public currentlyViewing: LitPlaceableMesh;

    constructor(args?: {
        ambientLightColor?: ColorRepresentation
    }) {
        this.scene = new Scene()
        this.placedObjects = [];
        this.clickObjects = [];

        if (args?.ambientLightColor) {
            const ambientLight = new THREE.AmbientLight(args.ambientLightColor)
            this.scene.add(ambientLight)
        }
    }

    addPlacedObject(placedObject: LitPlaceableMesh) {
        this.placedObjects.push(placedObject)
        this.clickObjects.push(placedObject.mesh)
    }

    animate () {
        this.placedObjects.forEach((placedObject) => placedObject.animate())
    }
}


