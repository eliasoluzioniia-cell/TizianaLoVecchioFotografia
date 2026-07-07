export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between px-6 py-6 text-white md:px-14">
        <a
          href="#top"
          className="pointer-events-auto font-serif text-2xl font-light tracking-wide text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-opacity hover:opacity-80 md:text-4xl"
        >
          Tiziana Lo Vecchio
        </a>
        <nav className="pointer-events-auto flex items-center gap-6 text-xs uppercase tracking-[0.25em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] md:gap-10">
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
