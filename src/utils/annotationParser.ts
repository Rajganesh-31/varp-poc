import { Finding } from '../types'

export type ContentSegment =
  | { type: 'text'; value: string }
  | { type: 'annotation'; value: string; finding: Finding }

/**
 * Splits document content into plain text and annotated phrase segments.
 */
export function parseAnnotatedContent(content: string, findings: Finding[]): ContentSegment[] {
  const annotated = findings
    .filter((f) => f.highlightPhrase && content.includes(f.highlightPhrase))
    .map((f) => ({
      finding: f,
      phrase: f.highlightPhrase as string,
      index: content.indexOf(f.highlightPhrase as string),
    }))
    .sort((a, b) => a.index - b.index)

  const segments: ContentSegment[] = []
  let cursor = 0

  for (const { finding, phrase, index } of annotated) {
    if (index < cursor) continue
    if (index > cursor) {
      segments.push({ type: 'text', value: content.slice(cursor, index) })
    }
    segments.push({ type: 'annotation', value: phrase, finding })
    cursor = index + phrase.length
  }

  if (cursor < content.length) {
    segments.push({ type: 'text', value: content.slice(cursor) })
  }

  if (segments.length === 0) {
    segments.push({ type: 'text', value: content })
  }

  return segments
}
