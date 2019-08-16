import React from 'react'
import renderer from 'react-test-renderer'
import { init, TextMesh } from '../../src/components/Three/index'
import { Footer } from '../../src/components/Footer'

describe('ThreeJS Component', () => {
  it('Initializes an instance', () => {
    expect(Object.keys(init({ renderer: null })).length).toEqual(5)
  })
  it('TextMesh generates meshes', () => {
    expect(TextMesh({ text: 'Test' }).length).toEqual(4)
  })
})

describe('Footer Component', () => {
  it('renders correctly', () => {
    let rendered = renderer.create(<Footer />)
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
