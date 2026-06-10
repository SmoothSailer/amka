import { TICKER_ITEMS } from "@/lib/landing-data";

export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="bg-lime overflow-hidden py-[14px]">
      <div
        className="flex gap-0 w-max"
        style={{ animation: "tick 24s linear infinite" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="font-heading font-bold text-[15px] tracking-[.1em] uppercase text-ink whitespace-nowrap px-6 flex items-center gap-6 after:content-['✦'] after:text-[rgba(13,12,10,.3)] after:text-[10px]"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
