export function ContactSection() {
  return (
    <footer id="contact" className="relative bg-primary px-6 py-24 text-primary-foreground md:px-14 md:py-36 snap-start">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary-foreground/60">
          <span className="h-px w-8 bg-accent" />
          Get in touch
        </div>

        <div className="mt-10 flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-balance font-serif text-5xl font-light leading-[0.98] tracking-tight md:text-8xl">
              Let&apos;s make
              <br />
              something <span className="italic text-accent">still.</span>
            </h2>
          </div>
          <a
            href="mailto:info@tizianalovecchio.com"
            className="group inline-flex items-center gap-4 self-start text-lg tracking-tight transition-opacity hover:opacity-70 md:self-end md:text-2xl"
          >
            <span className="font-serif italic">info@tizianalovecchio.com</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
        </div>

        {/* Links row */}
        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-primary-foreground/15 pt-10 text-sm md:grid-cols-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary-foreground/50">Sede</div>
            <p className="mt-3 leading-relaxed text-primary-foreground/80">
              Milano
              <br />
              Italia
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary-foreground/50">Follow</div>
            <ul className="mt-3 space-y-1.5 text-primary-foreground/80">
              <li>
                <a href="#" className="transition-opacity hover:opacity-60">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="transition-opacity hover:opacity-60">
                  Behance
                </a>
              </li>
              <li>
                <a href="#" className="transition-opacity hover:opacity-60">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary-foreground/50">Services</div>
            <ul className="mt-3 space-y-1.5 text-primary-foreground/80">
              <li>Editorial commissions</li>
              <li>Prints &amp; licensing</li>
              <li>Workshops</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-primary-foreground/50">Enquiries</div>
            <p className="mt-3 leading-relaxed text-primary-foreground/80">
              Available worldwide.
              <br />
              Response within 48h.
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-2 text-xs uppercase tracking-[0.25em] text-primary-foreground/40 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Tiziana Lo Vecchio Photography</span>
          <span>Catturare la luce, un fotogramma alla volta</span>
        </div>
      </div>
    </footer>
  )
}
