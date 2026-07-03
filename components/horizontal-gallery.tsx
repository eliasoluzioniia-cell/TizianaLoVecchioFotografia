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

export function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [x, setX] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    let frame = 0

    const update = () => {
      frame = 0
      const total = section.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-section.getBoundingClientRect().top, 0), Math.max(total, 1))
      const p = total > 0 ? scrolled / total : 0
      const maxX = Math.max(track.scrollWidth - window.innerWidth, 0)
      setX(p * maxX)
      setProgress(p)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", update)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const active = Math.round(progress * (slides.length - 1))

  return (
    // Tall spacer drives the pinned horizontal scroll — roughly one viewport per slide.
    <section ref={sectionRef} className="relative" style={{ height: `${slides.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-foreground">
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ transform: `translate3d(${-x}px, 0, 0)` }}
        >
          {slides.map((slide, i) => (
            <figure key={slide.title} className="relative h-full w-screen shrink-0 overflow-hidden">
              <img
                src={slide.src || "/placeholder.svg"}
                alt={slide.title}
                className="h-full w-full object-cover"
                crossOrigin="anonymous"
              />
              {/* Subtle wash so the type stays legible over any image */}
              <div className="absolute inset-0 bg-black/15" />
              <figcaption className="absolute inset-0 flex flex-col items-center justify-center text-center text-background">
                <h2 className="font-serif text-6xl font-light tracking-tight drop-shadow-sm md:text-8xl">
                  {slide.title}
                </h2>
                <span className="mt-5 border-b border-background/70 pb-1 text-xs uppercase tracking-[0.4em] text-background/90">
                  View
                </span>
                <span className="sr-only">{`Slide ${i + 1} of ${slides.length}`}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Dot pagination — Forest style */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex items-center justify-center gap-3">
          {slides.map((slide, i) => (
            <span
              key={slide.title}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                i === active ? "bg-background" : "bg-background/40"
              }`}
            />
          ))}
        </div>

        {/* Scroll hint fades out as the gallery advances */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-16 flex justify-center text-[10px] uppercase tracking-[0.4em] text-background/70 transition-opacity duration-300"
          style={{ opacity: progress > 0.04 ? 0 : 1 }}
        >
          Scroll to explore
        </div>
      </div>
    </section>
  )
}
