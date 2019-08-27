import React from 'react'

const style = require('../../styles.css')

interface Link {
  name: string
  logo: any
  url: string
}

export const footerLinks = [
  {
    name: 'Linked In',
    logo: require('Images/linkedin.svg'),
    url: 'https://linkedin.com/in/ryanwademontgomery'
  },
  {
    name: 'General Assembly',
    logo: require('Images/ga.svg'),
    url: 'https://profiles.generalassemb.ly/ryan-montgomery'
  },
  {
    name: 'Twitter',
    logo: require('Images/twitter.svg'),
    url: 'https://twitter.com/macioa_macioa'
  },
  {
    name: 'Github',
    logo: require('Images/github.svg'),
    url: 'https://github.com/Macioa'
  },
  {
    name: 'Mail',
    logo: require('Images/mail.svg'),
    url: 'mailto:development@ryanwademontgomery.com'
  }
]
  .filter(e => e.logo && e.url)
  .map((e, i) => (
    <a
      id={`Link${e.name.replace(' ', '')}`}
      key={`Link${i}`}
      href={e.url}
      target='blank'>
      <img src={e.logo} className={style.footerLink} alt={e.name} />
    </a>
  ))

export const Footer = () => (
  <footer className={style.footer} id={style.footer}>
    {...footerLinks}
  </footer>
)
