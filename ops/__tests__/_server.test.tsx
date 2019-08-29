process.env.NODE_ENV = 'test'

// "test": "./node_modules/.bin/jest --runInBand --detectOpenHandles",
// let server = require('../../index.js')

describe('Server', () => {
  // afterAll(async () => await server.http.close())

  // it('Initializes a http server', async () => {
  //   await expect(server.http.listening).toBeTruthy()
  // })
  it('Placeholder test',()=>expect(true).toBeTruthy())
  // it('Sends a page', async () => {
  //   let res = await Fetch('http://127.0.0.1')
  //   let text = await res.text()
  //   await expect(text.indexOf('main.js')).toBeGreaterThan(0)
  // })
})
