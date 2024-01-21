export type Student = {
  uuid: string
  title: string
  sectionsIds: string[]
}

export type ClassSection = {
  uuid: string
  title: string
  timeSlot: number
  enrollment: number
}

export type Room = {
  uuid: string
  title: string
  capacity: number
  location: {
    x: number
    y: number
  }
}

export type Project = {
  uuid: string
  title: string
  sections: ClassSection[]
  rooms: Room[]
  students: Student[]
}

export type TextVariants =
  | 'title-1'
  | 'title-2'
  | 'title-3'
  | 'title-4'
  | 'title-5'
  | 'title-6'
  | 'featured-1'
  | 'featured-2'
  | 'featured-3'
  | 'body-1'
  | 'body-2'
  | 'body-3'
  | 'caption-1'
  | 'caption-2'
