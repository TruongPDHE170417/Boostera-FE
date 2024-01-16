const DEFAULT_LENGTH_TO_TRUNCATE_STRING = 10

export const isValidHttpUrl = (str: string) => {
  let url
  try {
    url = new URL(str)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

export const truncateString = (str: string, num?: number) => {
  const lengthToTruncateString = num ?? DEFAULT_LENGTH_TO_TRUNCATE_STRING
  if (str.length > lengthToTruncateString) {
    return str.slice(0, lengthToTruncateString) + '...'
  }
  return str
}

export const validateYouTubeUrl = (urlToParse: string) => {
  if (urlToParse) {
    const regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    if (regExp.exec(urlToParse)) {
      return true
    }
  }
  return false
}

export const isBaseUrlHttps = () => {
  const protocol = location.protocol
  return protocol.includes('https')
}
