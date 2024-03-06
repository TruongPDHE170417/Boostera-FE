import { User } from './user'

export interface Booster {
  completedBoost: number
  _id: string
  IGN: string
  tag: string
  rank: string
  bio: string
  createdAt: string
  updatedAt: string
  __v: number
  user: User
}
