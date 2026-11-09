const words = ["Musculação", "Ritmosfera", "Pilates", "Ballet", "Aulas inclusas", "Professores sempre presentes"];

/** Faixa de palavras em movimento. Decorativa: leitores de tela ignoram. */
export function Marquee() {
  const items = [...words, ...words, ...words, ...words];
  return (
    <div aria-hidden="true" data-decor className="overflow-hidden border-y-2 border-ink bg-volt py-4 text-ink">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((word, i) => (
              <li key={`${copy}-${i}`} className="flex items-center">
                <span className="display px-6 text-3xl sm:text-4xl">{word}</span>
                <span className="text-2xl">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
