import React, { useRef } from 'react'
import { default as data } from '../../../data'
import { General, Person, Phone, Name, Address } from '../../../data/types'
import * as style from '../../styles.css'
const info: General = data.General,
  me: Person = info.person
// @ts-ignore
// import html2canvas from 'html2canvas'
// @ts-ignore
import jsPDF from 'jspdf'

const Header = () => (
  <div
    style={{ width: '100%', display: 'block' }}
    className={style.resContainer}>
    <div className={style.leftAlign}>
      <h1>{me.name.get()}</h1>
      <h3>{me.desc}</h3>
      <p>{info.objective.long}</p>
    </div>
    <div className={style.rightAlign} style={{ marginRight: '10px' }}>
      {me.location.short}
      <br />
      {me.email.primary}
      <br />
      {me.phone.primary.get()}
      <br />
      <a href={'' + me.website.primary}>{me.website.primary}</a>
    </div>
  </div>
)

const Skills = () => (
  <div style={{ width: '100%', display: 'block' }}>
    <h2>Skills</h2>
  </div>
)

const CV = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => (
    <div
      ref={ref}
      style={{ width: '100%', height: '100%', borderStyle: 'solid' }}
      className={style.cvContainer}>
      <Header />
      <Skills />
    </div>
  )
)

const exportToDoc = (e: any, ref: any) => {
  const pdf = new jsPDF('p', 'pt', 'letter')
  var specialElementHandlers = {
    width: 550,
    '#bypassme': function(element: any, renderer: any) {
      return true
    }
  }
  pdf.fromHTML(ref.current, 25, 25, {
    elementHandlers: specialElementHandlers
  })
  pdf.save('ryanmontgomery.pdf')
  // const test = html2canvas(ref.current, {})
  // Promise.resolve(test).then(t => {
  //   t.toDataURL('image/png')
  //   var doc = new jsPDF()
  //   doc.addImage(t, 'JPEG', 20, 20)
  //   doc.save('test.pdf')
  // })
}

export const CVContainer = () => {
  const cvWrap = useRef<HTMLDivElement>(null)
  return (
    <div>
      <div style={{ textAlign: 'center', margin: '15px' }}>
        <button onClick={e => exportToDoc(e, cvWrap)}>PDF Download</button>
      </div>
      <CV ref={cvWrap} />
    </div>
  )
}
