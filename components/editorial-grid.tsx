"use client"

import { useEffect, useRef, useState } from "react"

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

// Asymmetric mosaic layout applied on all screen sizes for fluid mobile grids too.
const tiles = [
  { i: 0, area: "col-span-7 row-span-2" }, // rows 1-2
  { i: 1, area: "col-span-5 row-span-1" }, // row 1
  { i: 2, area: "col-span-5 row-span-1" }, // row 2
  { i: 3, area: "col-span-4 row-span-2" }, // rows 3-4
  { i: 4, area: "col-span-8 row-span-1" }, // row 3
  { i: 5, area: "col-span-4 row-span-1" }, // row 4
  { i: 6, area: "col-span-4 row-span-1" }, // row 4
  { i: 7, area: "col-span-3 row-span-2" }, // rows 5-6
  { i: 8, area: "col-span-5 row-span-1" }, // row 5
  { i: 9, area: "col-span-4 row-span-2" }, // rows 5-6
  { i: 10, area: "col-span-5 row-span-1" }, // row 6
  { i: 11, area: "col-span-6 row-span-2" }, // rows 7-8
  { i: 12, area: "col-span-6 row-span-1" }, // row 7
  { i: 13, area: "col-span-6 row-span-1" }, // row 8
]

function Tile({
  item,
  className = "",
  onClick,
}: {
  item: (typeof images)[number]
  className?: string
  onClick?: () => void
}) {
  return (
    <figure 
      className={`group relative overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
    >
      <img
        src={item.src || "/placeholder.svg"}
        alt={`${item.title} — ${item.category}`}
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        crossOrigin="anonymous"
      />
      {/* Lightbox hint overlay */}
      <figcaption className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-6">
        <h3 className="font-serif text-lg font-light italic leading-none text-white md:text-2xl">{item.title}</h3>
        <p className="mt-1.5 text-[0.6rem] uppercase tracking-[0.3em] text-white/80 md:mt-2 md:text-[0.65rem]">{item.category}</p>
      </figcaption>
    </figure>
  )
}

export function EditorialGrid() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const touchStartRef = useRef<number>(0)

  const handlePrev = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + images.length) % images.length)
    }
  }

  const handleNext = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % images.length)
    }
  }

  const handleClose = () => {
    setActiveIdx(null)
  }

  useEffect(() => {
    if (activeIdx === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeIdx])

  return (
    <section id="work" className="relative bg-background">
      {/* 12-column asymmetric mosaic grid on both mobile and desktop */}
      <div className="grid auto-rows-[35vw] grid-cols-12 gap-1 sm:auto-rows-[28vw] md:auto-rows-[19vw] md:gap-2">
        {tiles.map((tile, idx) => (
          <Tile
            key={idx}
            item={images[tile.i]}
            className={tile.area}
            onClick={() => setActiveIdx(tile.i)}
          />
        ))}
      </div>

      {/* Lightbox / Zoom Modal Overlay */}
      {activeIdx !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none transition-all duration-300"
          onClick={handleClose}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-white hover:text-white/70 p-3 rounded-full transition-colors z-50 cursor-pointer bg-black/30 md:bg-transparent"
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            aria-label="Chiudi"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev button */}
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-white/70 p-4 rounded-full transition-colors z-50 cursor-pointer hidden md:flex items-center justify-center bg-black/20 hover:bg-black/40"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            aria-label="Precedente"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-white/70 p-4 rounded-full transition-colors z-50 cursor-pointer hidden md:flex items-center justify-center bg-black/20 hover:bg-black/40"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            aria-label="Successiva"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container with Swipe Support */}
          <div 
            className="relative flex flex-col items-center justify-center max-w-full max-h-full px-6"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => { touchStartRef.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = touchStartRef.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) {
                if (diff > 0) handleNext();
                else handlePrev();
              }
            }}
          >
            <img
              src={images[activeIdx].src}
              alt={images[activeIdx].title}
              className="max-h-[75vh] max-w-full md:max-h-[82vh] object-contain select-none transition-all duration-300"
              crossOrigin="anonymous"
            />
            {/* Metadata Info */}
            <div className="mt-5 text-center text-white">
              <h4 className="font-serif text-xl font-light italic md:text-3xl">{images[activeIdx].title}</h4>
              <p className="mt-1.5 text-[0.6rem] uppercase tracking-[0.3em] text-white/60 md:mt-2 md:text-[0.65rem]">{images[activeIdx].category}</p>
            </div>
          </div>

          {/* Image counter indicator (bottom right) */}
          <div className="absolute bottom-6 right-6 text-white/40 text-[9px] uppercase tracking-[0.25em] select-none md:text-[10px]">
            {activeIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  )
}
