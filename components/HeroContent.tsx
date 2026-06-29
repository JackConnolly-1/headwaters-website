"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/Button";

export default function HeroContent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      // Title exits upward ~1.6× faster than normal scroll, fades out by 400px
      el.style.transform = `translateY(${-y * 0.6}px)`;
      el.style.opacity = String(Math.max(0, 1 - y / 380));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center text-center will-change-transform">
      <h1
        className="font-display font-extrabold text-navy-900 leading-[1.06] tracking-[-0.028em] mx-auto text-balance max-w-[960px]"
        style={{ fontSize: "clamp(3.4rem, 7vw, 6rem)" }}
      >
        We back founders at the{" "}
        <span className="text-gold-600 italic font-bold font-cormorant">
          forefront
        </span>{" "}
        of hard technology
      </h1>
      <p className="max-w-[660px] mx-auto mt-8 text-[21px] leading-[1.65] text-navy-700">
        Headwaters writes first checks into pre-revenue teams solving hard
        physical problems — from the Northern Rockies to the frontier of what's
        buildable.
      </p>
      <div className="flex gap-4 justify-center mt-11 flex-wrap">
        <Button variant="primary" size="lg" href="/founders">
          For Founders →
        </Button>
        <Button variant="secondary" size="lg" href="/about">
          For Investors
        </Button>
      </div>
    </div>
  );
}
