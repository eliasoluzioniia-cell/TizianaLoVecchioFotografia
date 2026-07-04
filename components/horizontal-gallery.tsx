"use client"

import { useEffect, useRef, useState } from "react"

type Slide = {
  src: string
  title: string
}

const slides: Slide[] = [
  { src: "/gallery/h1.jpg", title: "Orizzonti" },
  { src: "/gallery/h2.jpg", title: "Luce e Silenzio" },
  { src: "/gallery/h3.jpg", title: "Natura Silente" },
  { src: "/gallery/h4.jpg", title: "Sfumature" },
  { src: "/gallery/h5.jpg", title: "Sospensione" },
]

export function VerticalGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollY = container.scrollTop
      const height = container.clientHeight
      if (height === 0) return
      const index = Math.round(scrollY / height)
      if (index >= 0 && index < slides.length) {
        setActive(index)
      }
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDotClick = (index: number) => {
    const container = containerRef.current
    if (!container) return
    container.scrollTo({
      top: index * container.clientHeight,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative h-screen bg-foreground">
      {/* Scroll Snapping Vertical Container */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-none"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.title}
            className="relative h-full w-full snap-start snap-always overflow-hidden"
          >
            <img
              src={slide.src || "/placeholder.svg"}
              alt={slide.title}
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
            {/* Subtle wash so the type stays legible over any image */}
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-background">
              <h2 className="font-serif text-5xl font-light tracking-tight drop-shadow-sm md:text-8xl select-none">
                {slide.title}
              </h2>
              <span className="mt-5 border-b border-background/70 pb-1 text-xs uppercase tracking-[0.4em] text-background/90 select-none">
                Esplora
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Vertical Dot Pagination */}
      <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col items-center justify-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              i === active ? "bg-background scale-125" : "bg-background/40 hover:bg-background/75"
            }`}
            aria-label={`Vai alla slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint animates on first slide */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center justify-center gap-2 text-[10px] uppercase tracking-[0.4em] text-background/70 transition-opacity duration-300 z-20"
        style={{ opacity: active > 0 ? 0 : 1 }}
      >
        <span>Scorri per esplorare</span>
        <svg
          width="12"
          height="24"
          viewBox="0 0 12 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="animate-bounce"
        >
          <path d="M6 1v22M1 18l5 5 5-5" />
        </svg>
      </div>
    </section>
  )
}
