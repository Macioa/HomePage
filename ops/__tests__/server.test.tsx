// const Fetch = require('node-fetch')
process.env.NODE_ENV = 'test'

// "test": "./node_modules/.bin/jest --runInBand --detectOpenHandles",
const server = require('../../index.js')

afterAll(() => server.http.close())

describe('Server', () => {
  it('Initializes a http server', () => {
    expect(server.http.listening).toBeTruthy()
  })

  // it('Sends a page', async () => {
  //   let res = await Fetch('http://127.0.0.1')
  //   let text = await res.text()
  //   await expect(text.indexOf('main.js')).toBeGreaterThan(0)
  // })
})
