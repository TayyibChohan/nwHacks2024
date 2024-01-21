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
  location?: [number, number]
}

export type Project = {
  uuid: string
  title: string
  sections: ClassSection[]
  rooms: Room[]
  students: Student[]
}
