import { useEffect, useState } from "react";

/** Which chapter is at the reading line — updates in page order as you scroll. */
export function useActiveSection(hrefs: readonly string[]) {
  const [active, setActive] = useState(hrefs[0] ?? "");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const marker = window.innerHeight * 0.28;
      let current = hrefs[0] ?? "";
      for (const href of hrefs) {
        const el = document.getElementById(href.slice(1));
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) current = href;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hrefs]);

  return active;
}
