import { AboutData } from "@/lib/notion"

export function AboutSection({ data }: { data: AboutData | null }) {
  const name = data?.name || "Tiziana Lo Vecchio"
  const portrait = data?.portrait || "/gallery/about-me.jpg"
  const headline = data?.headline || "Sono Tiziana — una fotografa alla ricerca della pausa tra i momenti, dove la luce si posa e il tempo si ferma."
  const biography = data?.biography && data.biography.length > 0 ? data.biography : [
    "Da oltre dieci anni lavoro catturando la realtà con pazienza e dedizione. Il mio approccio è attento e non frettoloso; preferisco attendere il momento perfetto anziché forzare uno scatto che non è pronto.",
    "Il mio stile si muove fluidamente tra paesaggi naturali e ritratti editoriali intimi, sempre alla ricerca della stessa onestà silenziosa."
  ]
  
  const location = data?.location || "Italia"
  const activeSince = data?.activeSince || "2012"
  const specialization = data?.specialization || "Paesaggi · Ritratti · Editoriale"
  const awards = data?.awards || "—"

  return (
    <section id="about" className="relative border-t border-border bg-secondary px-6 py-24 md:px-14 md:py-36 snap-start">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        {/* Portrait */}
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden md:sticky md:top-24">
            <img
              src={portrait}
              alt={`Ritratto di ${name}`}
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
        </div>

        {/* Story */}
        <div className="md:col-span-6 md:col-start-7">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            <span className="h-px w-8 bg-accent" />
            Su di me
          </div>

          <p className="mt-8 text-balance font-serif text-3xl font-light leading-[1.15] text-foreground md:text-5xl">
            {headline}
          </p>

          <div className="mt-12 space-y-6 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {biography.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Meta list */}
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-10">
            <div>
              <dt className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Sede</dt>
              <dd className="mt-2 font-serif text-xl text-foreground">{location}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Attiva dal</dt>
              <dd className="mt-2 font-serif text-xl text-foreground">{activeSince}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Specializzazione</dt>
              <dd className="mt-2 font-serif text-xl text-foreground">{specialization}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Riconoscimenti</dt>
              <dd className="mt-2 font-serif text-xl text-foreground">{awards}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
