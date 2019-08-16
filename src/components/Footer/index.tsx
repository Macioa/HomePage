import React from 'react'

const style = require('../../styles.css')

const footerLinks = [
  {
    logo: require('Images/linkedin.svg'),
    url: 'https://linkedin.com/in/ryanwademontgomery'
  },
  {
    logo: require('Images/ga.svg'),
    url: 'https://profiles.generalassemb.ly/ryan-montgomery'
  },
  {
    logo: require('Images/twitter.svg'),
    url: 'https://twitter.com/macioa_macioa'
  },
  {
    logo: require('Images/github.svg'),
    url: 'https://github.com/Macioa'
  },
  {
    logo: require('Images/mail.svg'),
    url: 'mailto:development@ryanwademontgomery.com'
  }
]
  .filter(e => e.logo && e.url)
  .map((e, i) => (
    <a key={i} href={e.url} target='blank'>
      <img src={e.logo} className={style.footerLink} alt='test' />
    </a>
  ))

export const Footer = () => (
  <footer className={style.footer} id={style.footer}>
    {...footerLinks}
  </footer>
)
