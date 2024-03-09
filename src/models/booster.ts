import { User } from './user'

export interface Booster {
  _id: string;
  userId: User;
  avatarUrl: string;
  nickname: string;
  gameName: string;
  tagLine: string;
  languages: string;
  currentRank: string;
  completedBoosts: number;
  jobAssigned: string | null;
  status: string;
  country: string;
  boosterRequest: string;
  createdAt: string
  updatedAt: string
  __v: number;
}