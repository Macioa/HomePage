import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as THREE from 'three'
import * as cannon from 'cannon'
import './styles.css'
import * as style from './styles.css'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer()
// resize render and reproject aspect ratio for camera
const resize = (w: number, h: number) => {
  renderer.setSize(w, h)
  reproject(w, h)
}
// reproject asspect ratio for camera
const reproject = (w: number, h: number) => {
  renderer.setSize(w, h)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}
// animate
const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

export const ThreeCanvas = () => {
  const ref = useRef(null)
  let resolve = () => resize(ref.current.offsetWidth, ref.current.offsetWidth)
  useEffect(() => {
    resolve()
    ref.current.appendChild(renderer.domElement)
    window.addEventListener('resize', resolve)
    animate()
  })
  return <div ref={ref} style={{ width: '100%', height: '100%' }} id='3Scene' />
}
