export function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] py-10 px-6 md:px-12 flex items-center justify-between flex-wrap gap-4">
      <div className="font-heading font-black text-[20px] tracking-[.02em]">
        Am<em className="text-lime not-italic">ka</em>
      </div>
      <p className="text-[13px] text-muted-color">© 2025 Amka · Built for East African Gyms</p>
      <div className="flex gap-6">
        <a href="#" className="text-[13px] text-muted-color no-underline transition-colors duration-200 hover:text-cream">Privacy</a>
        <a href="#" className="text-[13px] text-muted-color no-underline transition-colors duration-200 hover:text-cream">Terms</a>
        <a href="mailto:hello@amka.app" className="text-[13px] text-lime no-underline transition-colors duration-200 hover:text-cream">hello@amka.app</a>
      </div>
    </footer>
  );
}
