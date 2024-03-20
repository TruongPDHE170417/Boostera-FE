import { RANK_LEVEL_LABEL, RANK_TYPE_LABEL } from "@models/rank"

const POINT_RANK = [4, 8, 12, 16, 20, 24, 28, 32]

export const calcProgress = (fromLeague: string, fromDivision: string, currentLeague: string, currentDivision: string, toLeague: string, toDivision: string) => {
  const indexOfFrom = RANK_TYPE_LABEL.indexOf(fromLeague)
  const pointFrom = POINT_RANK[indexOfFrom] + 4 - Number(fromDivision)

  const indexOfCurrent = RANK_TYPE_LABEL.indexOf(currentLeague)
  const formattedCurrentDivision = RANK_LEVEL_LABEL.indexOf(currentDivision) + 1
  const pointCurrent = POINT_RANK[indexOfCurrent] + 4 - formattedCurrentDivision

  const indexOfTo = RANK_TYPE_LABEL.indexOf(toLeague)
  const pointTo = POINT_RANK[indexOfTo] + 4 - Number(toDivision)

  const progress = ((pointCurrent - pointFrom)/(pointTo - pointFrom)) * 100

  return progress
}