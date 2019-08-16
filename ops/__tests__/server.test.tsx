// const Fetch = require('node-fetch')
process.env.NODE_ENV = 'test'

describe('Server', () => {
  it('Initializes a http server', () => {
    expect(require('../../index.js').http.listening).toBeTruthy()
  })
  // it('Sends a page', async () => {
  //   let res = await Fetch('http://127.0.0.1')
  //   let text = await res.text()
  //   await expect(text.indexOf('main.js')).toBeGreaterThan(0)
  // })
})
