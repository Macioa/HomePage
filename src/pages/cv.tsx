import * as React from 'react'
import { default as data } from '../../data'
import { General, Person, Phone, Name, Address } from '../../data/types'
import * as style from '../styles.css'
const info: General = data.General,
  me: Person = info.person

export const CV = (test = {}) => {
  console.log(info)
  console.log(me.location)
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100%' }}>
        <div className={style.leftAlign}>
          <h1>{me.name.get()}</h1>
          <h2>{me.desc}</h2>
          <h3>{info.objective.long}</h3>
        </div>
        <div className={style.rightAlign}>
          {me.location.short}
          <br />
          {me.email.primary}
          <br />
          {me.phone.primary.get()}
          <br />
          <a href={'' + me.website.primary}>{me.website.primary}</a>
        </div>
      </div>
      <div>
        <h2>Skills</h2>
      </div>
    </div>
  )
}
