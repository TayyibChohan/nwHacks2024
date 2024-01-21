import { Project } from './types'
import { proxy } from 'valtio'

export type UserData = {
  projects: Project[]
  uuid?: string
}

export const userData = proxy<UserData>({
  projects: [],
  uuid: undefined,
})
