"use client"

const images = [
  { src: "/gallery/e1.jpg", title: "Riflessi", category: "Studio" },
  { src: "/gallery/e2.jpg", title: "Geometrie", category: "Architettura" },
  { src: "/gallery/e3.jpg", title: "Forme", category: "Natura" },
  { src: "/gallery/e4.jpg", title: "Sguardo", category: "Ritratto" },
  { src: "/gallery/e5.jpg", title: "Trame", category: "Dettaglio" },
  { src: "/gallery/e6.jpg", title: "Contrasti", category: "Studio" },
  { src: "/gallery/e7.jpg", title: "Istanti", category: "Reportage" },
  { src: "/gallery/e8.jpg", title: "Silenzi", category: "Paesaggio" },
  { src: "/gallery/e9.jpg", title: "Frammenti", category: "Riflessi" },
  { src: "/gallery/e10.jpg", title: "Presenze", category: "Ritratto" },
  { src: "/gallery/e11.jpg", title: "Dettagli", category: "Studio" },
  { src: "/gallery/e12.jpg", title: "Composizioni", category: "Natura" },
  { src: "/gallery/e13.jpg", title: "Spazi", category: "Architettura" },
  { src: "/gallery/e14.jpg", title: "Elementi", category: "Minimal" },
]

// Each tile is explicitly placed on a 12-col grid so every row packs edge-to-edge.
const tiles = [
  { i: 0, area: "md:col-span-7 md:row-span-2" }, // rows 1-2
  { i: 1, area: "md:col-span-5 md:row-span-1" }, // row 1
  { i: 2, area: "md:col-span-5 md:row-span-1" }, // row 2
  { i: 3, area: "md:col-span-4 md:row-span-2" }, // rows 3-4
  { i: 4, area: "md:col-span-8 md:row-span-1" }, // row 3
  { i: 5, area: "md:col-span-4 md:row-span-1" }, // row 4
  { i: 6, area: "md:col-span-4 md:row-span-1" }, // row 4
  { i: 7, area: "md:col-span-3 md:row-span-2" }, // rows 5-6
  { i: 8, area: "md:col-span-5 md:row-span-1" }, // row 5
  { i: 9, area: "md:col-span-4 md:row-span-2" }, // rows 5-6
  { i: 10, area: "md:col-span-5 md:row-span-1" }, // row 6 (was reuse of index 5)
  { i: 11, area: "md:col-span-6 md:row-span-2" }, // rows 7-8
  { i: 12, area: "md:col-span-6 md:row-span-1" }, // row 7
  { i: 13, area: "md:col-span-6 md:row-span-1" }, // row 8
]

function Tile({
  item,
  className = "",
}: {
  item: (typeof images)[number]
  className?: string
}) {
  return (
    <figure className={`group relative overflow-hidden ${className}`}>
      <img
        src={item.src || "/placeholder.svg"}
        alt={`${item.title} — ${item.category}`}
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        crossOrigin="anonymous"
      />
      <figcaption className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/50 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <h3 className="font-serif text-2xl font-light italic leading-none text-white">{item.title}</h3>
        <p className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-white/70">{item.category}</p>
      </figcaption>
    </figure>
  )
}

export function EditorialGrid() {
  return (
    <section id="work" className="relative bg-background">
      {/* Dense full-bleed mosaic — Mode style. Mobile: 2 cols; desktop: 12-col tessellated mosaic. */}
      <div className="grid auto-rows-[42vw] grid-cols-2 gap-1.5 sm:auto-rows-[32vw] md:auto-rows-[19vw] md:grid-cols-12 md:gap-2">
        {tiles.map((tile, idx) => (
          <Tile
            key={idx}
            item={images[tile.i]}
            className={`col-span-1 row-span-1 ${tile.area}`}
          />
        ))}
      </div>
    </section>
  )
}
