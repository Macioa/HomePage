//   Primative

interface Phone {
  country?: Number
  area: Number
  line1: Number
  line2: Number
}

interface Address {
  long?: {
    street: String
    city: String
    state: String
    country: String
    zip: Number
  }
  short?: String
  remote?: Boolean
}

interface Name {
  first: String
  middle?: String
  last: String
}

//   Advanced

interface Person {
  name: Name
  email: {
    primary: String
    secondary?: [String]
  }
  phone: {
    primary: Phone
    secondary?: [Phone]
  }
  location?: {
    address?: Address
    short?: String
  }
  linkedin?: String
  website?: {
    primary: String
    secondary?: [String]
  }
  git?: {
    primary: String
    secondary?: [String]
  }
}

interface Education {
  institution: String
  location?: Address
  date: {
    start: Date
    end: Date
  }
  coursework?: [String]
  desc?: String
}

interface Certification {
  name: String
  institution: String
  location: Address
  date: Date
  desc?: String
}

interface Skill {
  name: String
  start: Date
  proficiency: Number
  bullets?: [{ date: { start: Date; end: Date }; desc: String }]
  desc?: String
}

interface Experience {
  position: String
  institution: String
  location: Address
  date: {
    start: Date
    end: Date
  }
  bullets?: [{ desc: String; skills?: [String]; moreinfo?: Boolean }]
  desc?: String
}

interface Project {
  name: String
  institution?: String
  link?: String
  desc?: String
  date?: Date
}

//   Global

interface General {
  person: Person
  desc: String
  objective: {
    short: String
    long: String
  }
  references?: [Person]
  education?: [Education]
  skills?: [Skill]
  projects?: [Project]
}
