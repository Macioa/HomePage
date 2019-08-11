import React from 'react'
import renderer from 'react-test-renderer'
import { Hello } from '../../src/components/hello'

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4)
  })
})

describe('Todo component renders the todo correctly', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <Hello compiler='test/ts' framework='test/react' />
    )
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})

// describe('ThreeJS Canvas component renders', () => {
//   it('renders correctly', () => {
//     const rendered = renderer.create(<ThreeCanvas />)
//     expect(rendered.toJSON()).toMatchSnapshot()
//   })
// })
