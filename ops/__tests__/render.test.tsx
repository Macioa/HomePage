import React from 'react'
import { footerLinks } from '../../src/components/Footer'
import fs from 'fs'

const puppeteer = require('puppeteer'),
  options = {
    args: ['--disable - gpu', '--no-sandbox', '--disable-setuid-sandbox']
  }
const path = require('path')
const output = 'ops/__tests__/__snapshots__/'
let deviceNames = ['iPhone 5', 'iPhone X'],
  devices: any = []
deviceNames
  .concat(deviceNames.map(d => `${d} landscape`))
  .forEach(name => devices.push(puppeteer.devices[`${name}`]))

jest.setTimeout(30000)

const browserPromise = (async () => {
  return await puppeteer.launch(options)
})()

afterAll(async () => {
  let browser = await Promise.resolve(browserPromise)
  await browser.close()
})

describe('Render Test', () => {
  it('standard', async () => {
    let browser = await Promise.resolve(browserPromise)
    let page = await browser.newPage()
    await page.goto('file:' + path.resolve(__dirname, '../../dist/index.html'))
    let screenshot = await page.screenshot()
    fs.writeFileSync(`${output}standard.png`, screenshot)
    await page.close()
    await expect(
      fs.readFileSync(`${output}standard.png`).byteLength
    ).toBeGreaterThan(6000)
  })
  devices.forEach(async (d: any) => {
    it(`${d.name}`, async () => {
      let browser = await Promise.resolve(browserPromise)
      let page = await browser.newPage()
      await page.emulate(d)
      await page.goto(
        'file:' + path.resolve(__dirname, '../../dist/index.html')
      )
      let screenshot = await page.screenshot()
      fs.writeFileSync(`${output}${d.name}.png`, screenshot)
      await page.close()
      await expect(
        fs.readFileSync(`${output}${d.name}.png`).byteLength
      ).toBeGreaterThan(6000)
    })
  })
})

describe('Link Test', () => {
  let links = footerLinks.slice(0, footerLinks.length)
  links.forEach(async (link: any) => {
    it(`${link.props.id}`, async () => {
      let browser = await Promise.resolve(browserPromise)
      let page = await browser.newPage()
      await page.goto(
        'file:' + path.resolve(__dirname, '../../dist/index.html')
      )
      await page.click(`#${link.props.id}`)
      new Promise(resolve => page.once('popup', resolve)).then(
        async (p: any) => {
          let screenshot = await p.screenshot()
          fs.writeFileSync(`${output}${link.props.id}.png`, screenshot)
          await p.close()
          await expect(
            fs.readFileSync(`${output}${link.props.id}.png`).byteLength
          ).toBeGreaterThan(6000)
        }
      )
    })
  })
})
