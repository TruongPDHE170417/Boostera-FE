import { Schema, Validator } from '@cfworker/json-schema'

const vocabSchema: Schema = {
  type: 'object',
  properties: {
    B1: {
      type: 'array',
      items: {
        word: { type: 'string' },
        definition: { type: 'string' },
        required: ['word', 'definition'],
      },
    },
    B2: {
      type: 'array',
      items: {
        word: { type: 'string' },
        definition: { type: 'string' },
        required: ['word', 'definition'],
      },
    },
    C1: {
      type: 'array',
      items: {
        word: { type: 'string' },
        definition: { type: 'string' },
        required: ['word', 'definition'],
      },
    },
    C2: {
      type: 'array',
      items: {
        word: { type: 'string' },
        definition: { type: 'string' },
        required: ['word', 'definition'],
      },
    },
  },
  required: ['B1', 'B2', 'C1', 'C2'],
}

const quizzesSchema: Schema = {
  type: 'object',
  properties: {
    quizzes: {
      type: 'array',
      items: {
        question: { type: 'string' },
        options: {
          type: 'array',
          items: { type: 'string' },
        },
        correct_answer: { type: 'integer', minimum: 1, maximum: 4 },
        required: ['question', 'options', 'correct_answer'],
      },
    },
  },
  required: ['quizzes'],
}

const vocabValidator = new Validator(vocabSchema, '2019-09', false)
const quizzesValidator = new Validator(quizzesSchema, '2019-09', false)

export const validateVocab = (vocab?: any) => {
  let valid = false
  if (!vocab) {
    return false
  }

  try {
    const validateResponse = vocabValidator.validate(vocab)
    valid = validateResponse.valid
  } catch (error) {
    console.log(error)
    valid = false
  }

  return valid
}

export const validateQuizzes = (quizzes?: any) => {
  let valid = false
  if (!quizzes) {
    return false
  }

  try {
    const validateResponse = quizzesValidator.validate(quizzes)
    valid = validateResponse.valid
  } catch (error) {
    console.log(error)
    valid = false
  }

  return valid
}
