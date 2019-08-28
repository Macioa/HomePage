import React from 'react'
import { footerLinks } from '../../src/components/Footer'

const puppeteer = require('puppeteer'),
  options = {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
const path = require('path')
const output = 'ops/__tests__/__snapshots__/'
let deviceNames = ['iPhone 5', 'iPhone X'],
  devices: any = []
deviceNames
  .concat(deviceNames.map(d => `${d} landscape`))
  .forEach(name => devices.push(puppeteer.devices[`${name}`]))

jest.setTimeout(30000)

describe('Render Test', () => {
  it('standard', async () => {
    let browser = await puppeteer.launch(options)
    let page = await browser.newPage()
    browser.open
    await page.goto('file:' + path.resolve(__dirname, '../../dist/index.html'))
    await page.screenshot({ path: `${output}standard.png` })
    await browser.close()
    await expect(page).toBeTruthy()
  })
  devices.forEach(async (d: any) => {
    it(`${d.name}`, async () => {
      let browser = await puppeteer.launch(options)
      let page = await browser.newPage()
      await page.emulate(d)
      await page.goto(
        'file:' + path.resolve(__dirname, '../../dist/index.html')
      )
      await page.screenshot({ path: `${output}${d.name}.png` })
      await browser.close()
      await expect(page).toBeTruthy()
    })
  })
})

describe('Link Test', () => {
  let links = footerLinks.slice(0, footerLinks.length - 1)
  links.forEach(async (link: any) => {
    it(`${link.props.id}`, async () => {
      let browser = await puppeteer.launch(options),
        page = await browser.newPage(),
        screen
      await page.goto(
        'file:' + path.resolve(__dirname, '../../dist/index.html')
      )
      await page.click(`#${link.props.id}`)
      new Promise(resolve => page.once('popup', resolve)).then(
        async (p: any) => {
          screen = await p.screenshot({ path: `${output}${link.props.id}.png` })
          await expect(screen).toBeTruthy()
          await browser.close()
        }
      )
    })
  })
})
