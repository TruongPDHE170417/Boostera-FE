import { FeaturedNewsArticleVocab, Quiz, WordWithDefinition } from '@models/newsArticle'

export const hasSummary = (summary: string | undefined | null) => {
  if (!summary || summary.length === 0) {
    return false
  }

  return true
}

export const hasQuizzes = (quizzes: Quiz[] | undefined | null) => {
  if (!quizzes || quizzes.length === 0) {
    return false
  }

  return true
}

export const hasVocab = (vocab: FeaturedNewsArticleVocab | undefined | null) => {
  if (!vocab) {
    return false
  }

  let wordList: WordWithDefinition[] = []
  for (const key in vocab) {
    wordList = [...wordList, ...vocab[key as keyof FeaturedNewsArticleVocab]]
  }

  return wordList.length > 0
}
