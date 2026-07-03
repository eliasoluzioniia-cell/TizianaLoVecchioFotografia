export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="flex items-center justify-between px-6 py-6 text-background md:px-14">
        <a
          href="#top"
          className="pointer-events-auto font-serif text-xl tracking-tight md:text-2xl"
        >
          Tiziana Lo Vecchio
        </a>
        <nav className="pointer-events-auto flex items-center gap-6 text-xs uppercase tracking-[0.25em] md:gap-10">
          <a href="#work" className="transition-opacity hover:opacity-60">
            Work
          </a>
          <a href="#about" className="hidden transition-opacity hover:opacity-60 sm:inline">
            About
          </a>
          <a href="#contact" className="transition-opacity hover:opacity-60">
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
