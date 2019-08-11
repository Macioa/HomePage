import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as THREE from 'three'
import * as cannon from 'cannon'
import './styles.css'
import * as style from './styles.css'

export interface Instance {
  world?: cannon.World
  gravity?: cannon.Vec3
  scene?: THREE.Scene
  camera?: THREE.PerspectiveCamera
  renderer?: THREE.Renderer
  objects?: Obj[]
}

export interface Obj {
  mesh: THREE.Mesh
  body: cannon.Body
}

// create necessary objects for scene
export const init = ({
  world = new CANNON.World(),
  gravity = new CANNON.Vec3(0, 0, -9.82),
  scene = new THREE.Scene(),
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  ),
  renderer = new THREE.WebGLRenderer()
}: Instance) => {
  world.gravity = new CANNON.Vec3(0, 0, -9.82)
  return { world, gravity, scene, camera, renderer }
}

// resize render and reproject aspect ratio for camera
export const resize = (i: Instance, w: number, h: number) => {
  i.renderer.setSize(w, h)
  reproject(i, w, h)
}

// reproject asspect ratio for camera
export const reproject = ({ camera }: Instance, w: number, h: number) => {
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}

export const start = (i: Instance) => {
  var prevRender: number
  const animate = (t = Date.now(), step = 1 / 60, maxSubSteps = 3) => {
    requestAnimationFrame(animate)
    i.renderer.render(i.scene, i.camera)
    if (prevRender !== undefined) {
      var dt = (t - prevRender) / 1000
      i.world.step(step, dt, maxSubSteps)
    }
    prevRender = t
  }
  animate()
}

export const ThreeCanvas = () => {
  const ref = useRef(null)
  const i = init({})
  const resolve = () =>
    resize(i, ref.current.offsetWidth, ref.current.offsetHeight)
  useEffect(() => {
    resolve()
    ref.current.appendChild(i.renderer.domElement)
    window.addEventListener('resize', resolve)
    start(i)
  })
  return <div ref={ref} style={{ width: '100%', height: '100%' }} id='3Scene' />
}
