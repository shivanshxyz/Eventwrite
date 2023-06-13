declare interface Events {
  id: string
  title: string
  childAddress: string
  category: Category
  image: Image
  eventHost: string
  fee: number
  date: string
  description: Desc
  seats: number
  owner: string
  type: string
  venue?: Venue
  buyers: Array<string>
  tickets_available: number
  tickets_sold: number
  link?: string
  displayName?: string
  profileImage?: string
}

declare interface Venue {
  name: string
  x: number
  y: number
}

declare interface Image {
  image: string
  gallery: Array<string>
  video?: string
}

declare interface Desc {
  short_desc: string
  long_desc?: string
}

declare interface Category {
  event_type: string
  category: [string]
}
