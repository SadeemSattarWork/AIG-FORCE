"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { countryCodes, type CountryCode } from "@/lib/country-codes";
import { cn } from "@/lib/utils";

type Props = {
  /** selected country ISO code */
  value: string;
  onChange: (iso: string) => void;
};

/* Custom country-code picker.
   Collapsed: flag + chevron + dial code only (e.g. 🇵🇰 ⌄ +92).
   Open: scrollable list of full country names with a checkmark on the
   selected one. Keyboard: type-ahead by name, arrows to move, Enter to
   pick, Escape to close. */
export function PhoneCodeSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef<{ query: string; at: number }>({ query: "", at: 0 });

  const selected: CountryCode =
    countryCodes.find((c) => c.iso === value) ?? countryCodes[0];

  const selectedIndex = useMemo(
    () => countryCodes.findIndex((c) => c.iso === value),
    [value]
  );

  // When the panel opens, move focus to the list (highlight is set in the
  // open handler, not here, to avoid a state update inside the effect)
  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  const openPanel = () => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  // Keep the active option scrolled into view
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const pick = (iso: string) => {
    onChange(iso);
    setOpen(false);
  };

  // Type-ahead: jump to the next country whose name starts with the typed
  // characters. Repeated presses of the same letter cycle through matches.
  const handleTypeahead = (key: string) => {
    const now = Date.now();
    const ta = typeahead.current;
    ta.query = now - ta.at > 800 ? key : ta.query + key;
    ta.at = now;

    const q = ta.query.toLowerCase();
    // Single repeated letter → cycle; multi-char → match prefix from top
    const isRepeat = ta.query.length > 1 && ta.query.split("").every((c) => c === ta.query[0]);
    const startFrom = isRepeat ? activeIndex + 1 : 0;
    const needle = isRepeat ? ta.query[0].toLowerCase() : q;

    for (let i = 0; i < countryCodes.length; i++) {
      const idx = (startFrom + i) % countryCodes.length;
      if (countryCodes[idx].name.toLowerCase().startsWith(needle)) {
        setActiveIndex(idx);
        return;
      }
    }
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(countryCodes.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(countryCodes.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        pick(countryCodes[activeIndex].iso);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      default:
        if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
          e.preventDefault();
          handleTypeahead(e.key);
        }
    }
  };

  return (
    <div ref={rootRef} className="relative">
      {/* Collapsed trigger */}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country calling code: ${selected.name}, ${selected.dial}`}
        className="h-full flex items-center gap-1.5 pl-3 pr-2.5 border-r border-hairline bg-bone text-ink text-sm focus:outline-none focus-visible:bg-hairline/60 cursor-pointer"
      >
        <span className="text-base leading-none" aria-hidden="true">
          {selected.flag}
        </span>
        <ChevronDown
          size={13}
          className={cn("text-muted transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
        <span className="text-muted/40" aria-hidden="true">
          |
        </span>
        <span className="tabular-nums">{selected.dial}</span>
      </button>

      {/* Open panel */}
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`country-${countryCodes[activeIndex].iso}`}
          onKeyDown={onListKeyDown}
          className="absolute z-30 top-full left-0 mt-1 w-72 max-h-72 overflow-y-auto bg-paper border border-hairline shadow-[0_16px_40px_rgba(14,14,18,0.14)] focus:outline-none"
        >
          {countryCodes.map((c, i) => {
            const isSelected = c.iso === value;
            const isActive = i === activeIndex;
            return (
              <li
                key={c.iso}
                id={`country-${c.iso}`}
                data-index={i}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => pick(c.iso)}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2 text-sm cursor-pointer",
                  isActive ? "bg-blue text-white" : "text-ink"
                )}
              >
                <Check
                  size={14}
                  className={cn("shrink-0", isSelected ? "opacity-100" : "opacity-0")}
                  aria-hidden="true"
                />
                <span className="text-base leading-none" aria-hidden="true">
                  {c.flag}
                </span>
                <span className="flex-1 truncate">{c.name}</span>
                <span
                  className={cn(
                    "tabular-nums text-xs",
                    isActive ? "text-white/70" : "text-muted"
                  )}
                >
                  {c.dial}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
