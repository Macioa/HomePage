import React, { useRef, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import * as THREE from 'three'
import * as cannon from 'cannon'
import './styles.css'
import * as style from './styles.css'
import { TextGeometry } from 'three'

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
  body?: cannon.Body
  shape: string
  startpos: number[]
  mass: number
  anchorgrav: number
}

// create necessary objects for scene
export const init = (
  {
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
  }: Instance,
  camerapos = [0, 0, 5]
) => {
  camera.position.set(camerapos[0], camerapos[1], camerapos[2])
  world.gravity = gravity
  return { world, gravity, scene, camera, renderer }
}

// resize render and reproject aspect ratio for camera
export const Resize = (i: Instance, w: number, h: number) => {
  i.renderer.setSize(w, h)
  Reproject(i, w, h)
}

// reproject asspect ratio for camera
export const Reproject = ({ camera }: Instance, w: number, h: number) => {
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}

// start render
export const Start = (i: Instance) => {
  var prevRender: number
  const animate = (t = Date.now(), step = 1 / 60, maxSubSteps = 3) => {
    requestAnimationFrame(animate)
    i.renderer.render(i.scene, i.camera)
    if (prevRender !== undefined) {
      var dt = (t - prevRender) / 1000
      i.world.step(step, dt, maxSubSteps)
    }
    prevRender = t
    if (i.objects)
      i.objects.forEach(o => {
        // @ts-ignore
        o.mesh.position.copy(o.body.position)
        // @ts-ignore
        o.mesh.setRotationFromQuaternion(o.body.quaternion)
      })
  }

  animate()
}

// create geometry from string
export const ComputeTextGeometry = (text = '', font: THREE.Font) => {
  let mem = new Map()
  return text.split('').map(c => {
    let data = mem.get(c)
      ? mem.get(c)
      : new THREE.TextGeometry(c, {
          size: 10,
          height: 0.5,
          curveSegments: 3,
          font: font
        })
    if (!mem.get(c)) data.computeBoundingBox()
    mem.set(c, data)
    return data
  })
}

// create meshes from geometry
export const CreateMeshes = (
  geos: THREE.Geometry[] = [],
  material: THREE.Material
) => geos.map(g => new THREE.Mesh(g, material))

// add elements to simulation //compute bounds, find largest bound, create cannon body, add to THREE scene and CANNON sim
export const AddToSim = (
  i: Instance,
  meshes: Obj[] = [],
  defaultMass: number = 1000
) => {
  if (!i.objects) i.objects = []
  return meshes.map(({ mesh, shape, startpos, mass }) => {
    // mesh.geometry.computeBoundingBox()
    let size = mesh.geometry.boundingBox.getSize(new THREE.Vector3()),
      maxBound = size.x >= size.y ? size.x : size.y,
      sp = startpos.length >= 3 ? startpos : [0, 0, 0]
    maxBound = maxBound >= size.z ? maxBound : size.z
    mass = mass ? mass : defaultMass
    shape = shape.toLowerCase() === 'sphere' ? 'sphere' : 'box'
    let cShape =
        shape === 'sphere'
          ? new cannon.Sphere(maxBound)
          : new cannon.Box(new cannon.Vec3(size.x, size.y, size.z)),
      body = new cannon.Body({
        mass,
        position: new cannon.Vec3(sp[0], sp[1], sp[2]),
        shape: cShape
      })
    i.world.addBody(body)
    i.scene.add(mesh)
    let res = { mesh, body, shape, startpos, mass }
    i.objects.push(res)
    return res
  })
}

//
//
//
// create react element
export const ThreeCanvas = () => {
  const ref = useRef(null)
  let i = init({ gravity: new cannon.Vec3(0, 0, 0) })
  const resolve = () =>
    Resize(i, ref.current.offsetWidth, ref.current.offsetHeight)
  useEffect(() => {
    resolve()
    ref.current.appendChild(i.renderer.domElement)
    window.addEventListener('resize', resolve)

    AddToSim(
      i,
      CreateMeshes(
        ComputeTextGeometry(
          'Hello World',
          new THREE.Font(require('./fontdata/moonlime.json'))
        ),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      ).map((m, i) => {
        return {
          mesh: m,
          shape: 'box',
          mass: 1,
          startpos: [0, 0, 0]
        }
      })
    )
    Start(i)
  })
  return <div ref={ref} style={{ width: '100%', height: '100%' }} id='3Scene' />
}
