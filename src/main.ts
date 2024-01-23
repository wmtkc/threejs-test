import "./style.css"
import * as THREE from "three"
import { SceneOne } from "./scenes/scene-one.ts"

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")!,
})
const currentPopulatedScene = new SceneOne({ domElement: renderer.domElement })

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

function onPointerMove(event: MouseEvent) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
}
addEventListener("pointermove", onPointerMove)

function onMouseDown() {
  raycaster.setFromCamera(pointer, currentPopulatedScene.camera)
  const intersects = raycaster.intersectObjects(
    currentPopulatedScene.scene.children
  )
  if (intersects.length == 0) return

  currentPopulatedScene.clickObjects.forEach((clickObject, ix) => {
    if (clickObject.id === intersects[0].object.id) {
      currentPopulatedScene.placedObjects[ix]!.onClick()
    }
  })
}
addEventListener("click", onMouseDown)

function animate() {
  requestAnimationFrame(animate)
  currentPopulatedScene.animate()
  currentPopulatedScene.controls.update()
  renderer.render(currentPopulatedScene.scene, currentPopulatedScene.camera)
}
animate()
