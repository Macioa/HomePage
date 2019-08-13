import React from 'react'
import renderer from 'react-test-renderer'
// import { Hello } from '../../src/components/hello'
import { init, TextMesh } from '../../src/components/Three/index'

// describe('Addition', () => {
//   it('knows that 2 and 2 make 4', () => {
//     expect(2 + 2).toBe(4)
//   })
// })

// describe('Todo component renders the todo correctly', () => {
//   it('renders correctly', () => {
//     const rendered = renderer.create(
//       <Hello compiler='test/ts' framework='test/react' />
//     )
//     expect(rendered.toJSON()).toMatchSnapshot()
//   })
// })
describe('Initialize 3J Instance', () => {
  it('Initializes', () => {
    expect(Object.keys(init({ renderer: null })).length).toEqual(5)
  })
})

describe('Text Mesh ', () => {
  it('Generates meshes', () => {
    expect(TextMesh({ text: 'This is a test' }).length).toBeTruthy()
  })
})

// describe('ThreeJS Canvas component renders', () => {
//   it('renders correctly', () => {
//     const rendered = renderer.create(<ThreeCanvas />)
//     expect(rendered.toJSON()).toMatchSnapshot()
//   })
// })
