"use client"

import { useEffect, useState } from "react"

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
  const [active, setActive] = useState(0)
  const [showDots, setShowDots] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const height = window.innerHeight
      if (height === 0) return
      
      const index = Math.round(scrollY / height)
      if (index >= 0 && index < slides.length) {
        setActive(index)
      }
      
      // Hide pagination dots and scroll hint when user scrolls past the 5 slides
      if (scrollY > height * 4.4) {
        setShowDots(false)
      } else {
        setShowDots(true)
      }
    }

    // Run once on mount to handle initial scroll position
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDotClick = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <>
      {/* 5 slides rendered directly in the main document flow */}
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          className="relative h-screen w-full snap-start snap-always overflow-hidden"
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

      {/* Fixed Vertical Dot Pagination on the right */}
      {showDots && (
        <div className="fixed right-6 top-1/2 flex -translate-y-1/2 flex-col items-center justify-center gap-3 z-40">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === active ? "bg-background scale-125" : "bg-background/40 hover:bg-background/75"
              }`}
              aria-label={`Vai alla slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Animated scroll hint centered on first slide */}
      {showDots && (
        <div
          className="pointer-events-none fixed inset-x-0 bottom-10 flex flex-col items-center justify-center gap-2 text-[10px] uppercase tracking-[0.4em] text-background/70 transition-opacity duration-300 z-20"
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
      )}
    </>
  )
}
