const imageCDN = process.env.NEXT_PUBLIC_CDN_URL || 'http://localhost:19000'
const s3BucketConfig = process.env.NEXT_PUBLIC_CDN_REMOVE_PREFIXES || ''
const listS3Bucket = s3BucketConfig.split(',')

export const getImageCDNUrl = (path: string) => {
  let newPath = path
  if (listS3Bucket && listS3Bucket.length > 0) {
    for (const s3Bucket of listS3Bucket) {
      newPath = newPath?.replace(`/${s3Bucket}`, '') || ''
    }
  }
  return `${imageCDN}${newPath}`
}

export const removeImagePath = (path: string) => {
  let newPath = path
  if (listS3Bucket && listS3Bucket.length > 0) {
    for (const s3Bucket of listS3Bucket) {
      newPath = newPath?.replace(`/${s3Bucket}`, '') || ''
    }
  }
  return newPath
}

export const removeImageCDNFromUrl = (path: string) => {
  if (imageCDN && path.includes(imageCDN)) {
    return path.replace(imageCDN, '')
  }
  return path
}

export const convertImageToBlob = (imageBase64: string): Blob => {
  const byteString = window.atob(imageBase64.split(',')[1])
  const mimeType = imageBase64.split(',')[0].split(':')[1].split(';')[0]
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uintArray = new Uint8Array(arrayBuffer)
  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i)
  }

  return new Blob([arrayBuffer], { type: mimeType })
}

export const convertFileToBlob = (base64String: string): Blob => {
  const byteString = window.atob(base64String.split(',')[1])
  const mimeType = base64String.split(',')[0].split(':')[1].split(';')[0]
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uintArray = new Uint8Array(arrayBuffer)
  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i)
  }

  return new Blob([arrayBuffer], { type: mimeType })
}

export const getFileName = (url: string) => {
  if (!imageCDN || !url.includes(imageCDN)) {
    return null
  }
  const parsedUrl = new URL(url)
  const filename = parsedUrl.pathname.split('/').pop()

  return filename
}

export const convertRankToImageName = (rank: string) => {
  const rankName = rank.toLowerCase();
  return rankName.replace(/(\s*\b(?:i{1,3}|iv|v)\b\s*)$/i, '');
}
