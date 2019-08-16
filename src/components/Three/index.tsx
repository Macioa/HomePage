import React, { useRef, useEffect } from 'react'
import {
  Scene,
  PerspectiveCamera,
  Renderer,
  Mesh,
  WebGLRenderer,
  Vector3,
  Geometry,
  TextGeometry,
  Material,
  MeshBasicMaterial,
  Font
} from 'three'
import { World, Body, Vec3, Sphere, Box } from 'cannon'

export interface Instance {
  world?: World
  gravity?: Vec3
  scene?: Scene
  camera?: PerspectiveCamera
  renderer?: Renderer
  objects?: Obj[]
}

export interface Obj {
  mesh: Mesh
  body?: Body
  shape?: string
  startpos: number[]
  mass: number
  anchorgrav?: number
}

// create necessary objects for scene
export const init = (
  {
    world = new World(),
    gravity = new Vec3(0, 0, -9.82),
    scene = new Scene(),
    camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ),
    renderer = new WebGLRenderer()
  }: Instance = {},
  camerapos = [0, 0, 45]
): Instance => {
  camera.position.set(camerapos[0], camerapos[1], camerapos[2])
  world.gravity = gravity
  return { world, gravity, scene, camera, renderer }
}

// resize render and reproject aspect ratio for camera
export const Resize = (i: Instance, w: number, h: number): void => {
  i.renderer.setSize(w, h)
  Reproject(i, w, h)
}

// reproject asspect ratio for camera
export const Reproject = ({ camera }: Instance, w: number, h: number): void => {
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  camera.position.setZ((175 * h) / w)
}

// start render
export const Start = (i: Instance): void => {
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
const mem = new Map()
export const ComputeTextGeometry = (text = '', font: Font): Geometry[] => {
  return text.split('').map(c => {
    let data = mem.get(c)
      ? mem.get(c)
      : new TextGeometry(c, {
          size: 10,
          height: 0.25,
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
  geos: Geometry[] = [],
  material: Material
): Mesh[] => geos.map(g => new Mesh(g, material))

// add elements to simulation //compute bounds, find largest bound, create CANNON body, add to THREE scene and CANNON sim
export const AddToSim = (
  i: Instance,
  meshes: Obj[] = [],
  defaultMass: number = 1000
): Obj[] => {
  if (!i.objects) i.objects = []
  return meshes.map(({ mesh, shape, startpos, mass, anchorgrav = null }) => {
    let size = mesh.geometry.boundingBox.getSize(new Vector3()),
      maxBound = Object.values(size).sort((a, b) => b - a)[0],
      sp = startpos.length >= 3 ? startpos : [0, 0, 0]
    mass = mass ? mass : defaultMass
    shape = shape.toLowerCase() === 'sphere' ? 'sphere' : 'box'
    let cShape =
        shape === 'sphere'
          ? new Sphere(maxBound)
          : new Box(new Vec3(size.x, size.y, size.z)),
      body = new Body({
        mass,
        position: new Vec3(sp[0], sp[1], sp[2]),
        shape: cShape
      })
    i.world.addBody(body)
    i.scene.add(mesh)
    let res = { mesh, body, shape, startpos, mass, anchorgrav }
    i.objects.push(res)
    if (res.anchorgrav) {
      res.body.preStep = () => {
        //  vel + (startingpos-currentpos) * anchorgrav
        res.body.velocity = res.body.velocity.vadd(
          new Vec3(res.startpos[0], res.startpos[1], res.startpos[2])
            .vadd(res.body.position.negate())
            .scale(res.anchorgrav)
        )
        // torq - eulerAngle
        let q = new Vec3()
        res.body.quaternion.toEuler(q)
        res.body.torque = res.body.torque.vsub(q)
      }
    }
    return res
  })
}

// create full objects from string
export const TextMesh = ({
  text = 'Hello World',
  spacing = 8,
  font = new Font(require('./fontdata/Moonglade.json')),
  material = new MeshBasicMaterial({ color: 0xffffff }),
  options = {}
}): Obj[] => {
  let meshes = CreateMeshes(ComputeTextGeometry(text, font), material).map(
    m => {
      return {
        mesh: m,
        width: m.geometry.boundingBox.getSize(new Vector3()).x
      }
    }
  )
  const sum = (total: number, mesh: any) => total + mesh.width + spacing
  let totalWidth = meshes.reduce(sum, spacing),
    currentpos = -totalWidth / 2 // left most bound
  return meshes.map(m => {
    let res = {
      mesh: m.mesh,
      shape: 'box',
      mass: 1,
      startpos: [currentpos + m.width / 2, 0, 0],
      anchorgrav: 0.2,
      ...options
    }
    currentpos = currentpos + m.width + spacing
    return res
  })
}

//
//
//
// create react element
export const ThreeCanvas = (props: any) => {
  const ref = useRef(null)
  let i = init({ gravity: new Vec3(0, 0, 0) })
  const resolve = () =>
    Resize(i, ref.current.offsetWidth, ref.current.offsetHeight)
  useEffect(() => {
    resolve()
    ref.current.appendChild(i.renderer.domElement)
    window.addEventListener('resize', resolve)

    AddToSim(i, TextMesh({ text: 'Ryan Montgomery' }))

    Start(i)
  })
  return (
    <div
      ref={ref}
      style={{ width: '100%', height: '100%' }}
      id='3Scene'
      {...props}
    />
  )
}
