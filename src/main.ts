import './style.css'
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {SceneOne} from "./scenes/scene-one.ts";

const currentPopulatedScene = new SceneOne();
const currentScene = currentPopulatedScene.scene
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg")
})
const controls = new OrbitControls( camera, renderer.domElement, currentScene )

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setFromEuler(currentPopulatedScene.currentlyViewing.defaultCameraPositionEuler)
controls.update()

function onPointerMove( event ) {
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
addEventListener( 'pointermove', onPointerMove );

function onMouseDown( event ) {
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects(currentScene.children);
    if (intersects.length == 0) return;

    currentPopulatedScene.clickObjects.forEach((clickObject, ix) => {
        if (clickObject.id === intersects[0].object.id) {
            currentPopulatedScene.placedObjects[ix]!.onClick()
        }
    })
}
addEventListener( 'click', onMouseDown )

function animate () {
    requestAnimationFrame(animate)
    currentPopulatedScene.animate()
    controls.update()
    renderer.render(currentScene, camera)
}
animate()