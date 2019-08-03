import './types'
import { General, Phone, Name, Address } from './types'

const data: General = {
  person: {
    name: new Name({ first: 'Ryan', middle: 'Wade', last: 'Montgomery' }),
    desc: 'Web-focused Software Engineer',
    email: { primary: 'development@ryanwademontgomery.com' },
    phone: { primary: new Phone({ area: 512, line1: 952, line2: 9352 }) },
    location: new Address({ short: 'Austin, TX, US' }),
    linkedin: 'https://linkedin.com/in/ryanwademontgomery',
    website: { primary: 'https://ryanwademontgomery.com' }
  },
  objective: { short: 'looking for a ...', long: '' },
  education: [
    {
      institution: 'Cy-Fair High School',
      location: new Address({ short: 'Houston, TX, US' }),
      date: { start: '1998', end: '2002' }
    },
    {
      institution: 'University of Texas at Dallas',
      location: new Address({ short: 'Dallas, TX, US' }),
      program: 'Computer Science',
      date: { start: '2002', end: '2004' }
    },
    {
      institution: 'Western Governors University',
      location: new Address({ remote: true }),
      program: 'Software Engineering',
      date: { start: '2016', end: '2017' }
    },
    {
      institution: 'General Assembly',
      location: new Address({ short: 'Austin, TX, US' }),
      program: 'Full Stack Web Development Immersive',
      date: { start: 'June, 2018', end: 'August, 2018' }
    }
  ]
}
