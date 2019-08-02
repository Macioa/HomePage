//   Primative

interface Phone {
  country?: Number
  area: Number
  line1: Number
  line2: Number
}

interface Address {
  street: String
  city: String
  state: String
  country: String
  zip: Number
  short?: String
}

interface Name {
  first: String
  middle?: String
  last: String
}

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

//   Advanced

interface General {
  person: Person
  desc: String
  objective: {
    short: String
    long: String
  }
}
