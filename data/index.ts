import { General, Phone, Name, Address } from './types'

export default {
  General: {
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
    skills: [
      {
        name: 'Javascript',
        priority: 1,
        proficiency: 5,
        totalyrs: 2.5,
        start: '2016'
      },
      {
        name: 'Python',
        priority: 5,
        proficiency: 3,
        totalyrs: 4,
        start: '2013'
      },
      { name: 'C++', priority: 2, proficiency: 4, totalyrs: 3, start: '2001' },
      { name: 'HTML', priority: 3, proficiency: 4, totalyrs: 2, start: '2016' },
      { name: 'CSS', priority: 3, proficiency: 4, totalyrs: 2, start: '2016' },
      {
        name: 'ElixirLang',
        priority: 5,
        proficiency: 2,
        totalyrs: 0.1,
        start: '2018'
      },
      {
        name: 'Docker/Kubernetes',
        priority: 4,
        proficiency: 4,
        start: '2018',
        totalyrs: 1
      },
      {
        name: 'Linux/Bash',
        priority: 4,
        proficiency: 4,
        start: '2001',
        totalyrs: 4
      },
      {
        name: 'DB:SQL/NoSQL',
        priority: 4,
        proficiency: 4,
        start: '2016',
        totalyrs: 2.5
      }
    ],
    experience: [
      {
        position: 'Developer',
        institution: 'Arcadia Media Group',
        location: new Address({ short: 'Dallas, TX, US', remote: true }),
        date: { start: 'Oct 2018', end: 'July 2019' },
        desc: 'Agile development for blockchain application and services',
        bullets: [
          {
            desc:
              'Built full CICD pipeline for cross-compile, automated testing, and deployment for peer-to-peer and web services',
            skills: ['Docker', 'Kubernetes', 'Google Cloud'],
            moreinfo: true
          },
          {
            desc: 'Implemented UX designs into client wallet application',
            skills: ['C++', 'Qt']
          },
          {
            desc: 'Built blockchain web browser based on UX designs',
            skills: ['Node JS', 'MongoDB', 'React', 'Express']
          },
          {
            desc: 'Security and functional updates for website',
            skills: ['Node JS']
          },
          {
            desc: 'Wrote client and server maintenance modules',
            skills: ['Python']
          }
        ]
      },
      {
        position: 'Fullstack Web Development Student',
        institution: 'General Assembly',
        location: new Address({ short: 'Austin, TX, US' }),
        date: { start: 'June, 2018', end: 'August, 2019' },
        desc:
          'A full time, full stack web development immersive. For three months, we studied and utilized modern tools and practice in software development, standards, apis, and testing for web: including Javascript, Node, React, Python, Django, Postgresql, and Mongo. Since I already had experience with Javascript and Python, I utilized this time to learn ElixirLang and functional programming, submitting a Phoenix app in place of a Django app.'
      },
      {
        position: 'Application Engineer',
        institution: 'Geomagic Software, 3D Systems Inc.',
        location: new Address({ short: 'Raleigh, NC, TX', remote: true }),
        date: { start: '2012', end: '2017' },
        desc:
          'A diverse technical role with many responsibilities revolving primarily around analyzing and processing 3D scan data (product design, reverse-engineering products, product inspection) ',
        bullets: [
          {
            desc:
              'Contracted out clients and prospects to write or consult on custom applications using Geomagic Control API to process and analyze 3D scan data.',
            skills: ['Python'],
            moreinfo: true
          },
          {
            desc:
              'Provided on-site and off-site training, consulting, proof-of-concepts, and demos in Geomagic Software and API for clients and partners.',
            skills: ['Python', 'Object Oriented Programming', '3D Scan Data']
          }
        ]
      },
      {
        position: 'Product Manager',
        institution: 'Alibre Inc (Now Alibre LLC)',
        location: new Address({ short: 'Dallas, TX, US' }),
        date: { start: '2010', end: '2012' },
        desc: 'Agile environment for development of C# CAD software',
        bullets: [
          { desc: 'New feature planning and specifications' },
          {
            desc:
              'Transitioned customer, reseller, sales team, and support requests into prioritized action items for development.'
          },
          {
            desc:
              'Created documentation, specs, and algorithms for the development process',
            skills: ['Agile']
          },
          {
            desc:
              'Worked with development team to create new ribbon interface and cursor-centric graphical popup menu.',
            skills: ['UX'],
            moreinfo: true
          },
          { desc: 'Managed beta programs and customer feedback.' }
        ]
      },
      {
        position: 'Techinical Support Manager',
        institution: 'Alibre Inc (Now Alibre LLC)',
        location: new Address({ short: 'Dallas, TX, US' }),
        date: { start: '2008', end: '2010' }
      },
      {
        position: 'IT Intern',
        institution: 'Halliburton',
        location: new Address({ short: 'Houston, TX, US' }),
        date: { start: 'May 2001', end: 'August 2001' }
      }
    ],
    education: [
      {
        institution: 'Cy-Fair High School',
        location: new Address({ short: 'Houston, TX, US' }),
        date: { start: '1998', end: '2002' },
        coursework: ['Computer Science I', 'Computer Science II AB AP']
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
    ],
    certifications: [
      {
        name: 'Full Stack Web Development',
        institution: 'General Assembly',
        location: new Address({ short: 'Austin, TX, US' }),
        date: '2018'
      },
      {
        name: 'A+',
        institution: 'CompTIA',
        location: new Address({ short: 'Austin, TX, US' }),
        date: '2017'
      }
    ]
  }
}
