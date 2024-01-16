import { Transcript } from '@models/video'

export const highlightContent = (content: string) => {
  return content
    .split(' ')
    .map((word) => {
      if (word.startsWith('[')) {
        const indexOfSquareBracket = word.indexOf(']')
        return `<strong>${word.substring(0, indexOfSquareBracket).replace(/([\[\]]|_)/g, '')}</strong>${word.substring(
          indexOfSquareBracket + 1,
          word.length,
        )}`
      }
      if (word.endsWith(']')) {
        const indexOfSquareBracket = word.indexOf('[')
        return `${word.substring(0, indexOfSquareBracket)}<strong>${word
          .substring(indexOfSquareBracket, word.length)
          .replace(/([\[\]]|_)/g, '')}</strong>`
      }

      return word
    })
    .join(' ')
}

export const convertTranscriptToText = (transcript: Transcript[]) => {
  let transcriptText = ''
  transcript.map((item) => {
    transcriptText += `${item.start.toFixed(2)} - ${(item.start + item.duration).toFixed(2)}: ${item.text} <br />`
  })

  return transcriptText
}

export const highlightTranscript = (transcript: Transcript[]) => {
  let transcriptHighlightedText = ''
  transcript.map((item) => {
    const text = highlightContent(item.text)
    transcriptHighlightedText += `<span style={{width:"200px"}}>${item.start.toFixed(2)} - ${(
      item.start + item.duration
    ).toFixed(2)}:</span> ${text} <br />`
  })

  return transcriptHighlightedText
}
