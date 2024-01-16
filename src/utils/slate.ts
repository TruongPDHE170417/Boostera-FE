import { Descendant } from 'slate'

export const defaultValueRichText: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

export const removeImageSrcField = (content: Descendant[]): Descendant[] => {
  for (let i = 0; i < content.length; i++) {
    let item = content[i]
    if (item.type === 'image' && item.imageSrc) {
      item = {
        ...item,
        imageSrc: '',
      }
      content[i] = {
        ...item,
      }
    }
    if (item.children && item.children.length > 0) {
      const children = removeImageSrcField(item.children)
      content[i] = Object.assign({}, item, { children })
    }
  }
  return [...content]
}
