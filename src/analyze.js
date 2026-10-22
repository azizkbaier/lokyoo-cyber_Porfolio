// Indices simples et transparents. Ce n'est PAS un détecteur fiable.
export function analyze(text) {
  const clean = text.trim()
  if (!clean) return null

  const sentences = clean.split(/(?<=[.!?])\s+/).filter(Boolean)
  const words = clean.toLowerCase().match(/[\p{L}']+/gu) || []
  const lengths = sentences.map((s) => (s.match(/[\p{L}']+/gu) || []).length)

  const mean = lengths.reduce((a, b) => a + b, 0) / (lengths.length || 1)
  const variance =
    lengths.reduce((a, b) => a + (b - mean) ** 2, 0) / (lengths.length || 1)
  const burstiness = Math.sqrt(variance) / (mean || 1)

  const unique = new Set(words).size
  const lexicalDiversity = words.length ? unique / words.length : 0

  const trigrams = {}
  for (let i = 0; i < words.length - 2; i++) {
    const k = words.slice(i, i + 3).join(' ')
    trigrams[k] = (trigrams[k] || 0) + 1
  }
  const repeated = Object.values(trigrams).filter((n) => n > 1).length

  return {
    words: words.length,
    sentences: sentences.length,
    meanLength: mean,
    burstiness,
    lexicalDiversity,
    repeated,
  }
}
