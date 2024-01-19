import './style.css'
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {A} from "./objects/a.ts";

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg")
})
const controls = new OrbitControls( camera, renderer.domElement, scene );

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

const ambientLight = new THREE.AmbientLight(0xaabbcc)
scene.add(ambientLight)

camera.position.setZ(30)
controls.update();

const a = new A(scene);

function animate () {
    requestAnimationFrame(animate)
    a.animate();
    controls.update();
    renderer.render(scene, camera)
}

animate();