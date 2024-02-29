export enum RANK_TYPE {
  NONE = 0,
  IRON,
  BRONZE,
  SILVER,
  GOLD,
  PLATINUM,
  EMERALD,
  DIAMOND,
  MASTER,
  GRANDMASTER,
  CHALLENGER,
}

export const RANK_IMAGES = [
  "iron",
  "bronze",
  "silver",
  "gold",
  "platinum",
  "emerald",
  "diamond",
  "master",
  "grandmaster",
  "challenger"
]

export const RANK_TYPE_LABEL = ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "EMERALD", "DIAMOND", "MASTER", "GRANDMASTER", "CHALLENGER"]

export enum RANK_LEVEL {
  NONE = 0,
  ONE,
  TWO,
  THREE,
  FOUR,
}

export const RANK_LEVEL_LABEL = ["I", "II", "III", "IV"]

export enum RANK_POINT {
  NONE = 0,
  POINT_1,
  POINT_2,
  POINT_3,
  POINT_4,
  POINT_5,
}

export const RANK_POINT_LABEL = ["0-20", "21-40", "41-60", "61-80", "81-99"]