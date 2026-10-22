import { useState } from 'react'
import { analyze } from './analyze.js'

export default function Analyzer() {
  const [text, setText] = useState('')
  const r = analyze(text)

  return (
    <section className="analyzer">
      <label htmlFor="sample">Texte à examiner</label>
      <textarea
        id="sample"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Colle ici un extrait d'au moins quelques phrases."
        rows={8}
      />
      {r ? (
        <dl className="metrics">
          <div><dt>Mots</dt><dd>{r.words}</dd></div>
          <div><dt>Phrases</dt><dd>{r.sentences}</dd></div>
          <div><dt>Longueur moyenne</dt><dd>{r.meanLength.toFixed(1)}</dd></div>
          <div><dt>Variation du rythme</dt><dd>{r.burstiness.toFixed(2)}</dd></div>
          <div><dt>Diversité du vocabulaire</dt><dd>{(r.lexicalDiversity * 100).toFixed(0)} %</dd></div>
          <div><dt>Séquences répétées</dt><dd>{r.repeated}</dd></div>
        </dl>
      ) : (
        <p className="empty">Colle un texte pour voir les indices apparaître.</p>
      )}
    </section>
  )
}
