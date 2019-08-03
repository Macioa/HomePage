class Obj {
  constructor(obj = {}) {
    Object.assign(this, obj)
  }
}

//   Primative

export class Phone extends Obj {
  country?: Number
  area: Number
  line1: Number
  line2: Number
  get(seperator = '-'): String {
    return `${this.country ? `+${this.country} ` : ''}${this.area}${seperator}${
      this.line1
    }${seperator}${this.line2}`
  }
}

export class Address extends Obj {
  long?: {
    street: String
    city: String
    state: String
    country: String
    zip: Number
  }
  short?: String
  remote?: Boolean
  get(request = 'short', res = ''): String {
    switch (request) {
      case 'long':
        let { street, city, state, country, zip } = this.long
        return `${street}\n${city}, ${state}, ${country}, ${zip}`
      case 'short:':
        return this.short || this.get('long')
    }
  }
}

export class Name extends Obj {
  first: String
  middle?: String
  last: String
  get() {
    return Object.values(this)
      .filter(v => typeof v === 'string')
      .join(' ')
  }
}

//   Advanced

export interface Person {
  name: Name
  desc: String
  email: {
    primary: String
    secondary?: String[]
  }
  phone: {
    primary: Phone
    secondary?: Phone[]
  }
  location?: {
    address?: Address
    short?: String
  }
  linkedin?: String
  website?: {
    primary: String
    secondary?: String[]
  }
  git?: {
    primary: String
    secondary?: String[]
  }
}

export interface Education {
  institution: String
  program?: String
  location?: Address
  date: {
    start: String
    end: String
  }
  coursework?: String[]
  desc?: String
}

export interface Certification {
  name: String
  institution: String
  location: Address
  date: String
  desc?: String
}

export interface Skill {
  name: String
  start: String
  proficiency: Number
  bullets?: { date: { start: String; end: String }; desc: String }[]
  desc?: String
}

export interface Experience {
  position: String
  institution: String
  location: Address
  date: {
    start: String
    end: String
  }
  bullets?: { desc: String; skills?: String[]; moreinfo?: Boolean }[]
  desc?: String
}

export interface Project {
  name: String
  institution?: String
  link?: String
  desc?: String
  date?: String
}

//   Global

export interface General {
  person: Person
  objective: {
    short: String
    long: String
  }
  references?: Person[]
  education?: Education[]
  skills?: Skill[]
  projects?: Project[]
}
