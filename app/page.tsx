import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import WaveGraphic from "@/components/WaveGraphic";
import HeroWatermark from "@/components/HeroWatermark";
import HeroContent from "@/components/HeroContent";
import FadeIn from "@/components/FadeIn";
import FocusCards from "@/components/FocusCards";
import ThesisHeadline from "@/components/ThesisHeadline";

const valueProps = [
  {
    k: "01",
    title: "Operators, not just capital",
    body: "Our investors are hardware founders who have built companies, shipped products, and navigated manufacturing realities. When that experience is relevant to a portfolio company, it's available — at the governance level and beyond.",
  },
  {
    k: "02",
    title: "A path to what comes next",
    body: "Our affiliation with Frontier Angels connects portfolio companies to a network of angel groups, family offices, and co-investors. That network is a direct path to follow-on capital — a critical advantage for hardtech founders raising a Series A and beyond.",
  },
  {
    k: "03",
    title: "Clean terms, fast decisions",
    body: "Our competitive position rests on efficient process and respect for founders' time. No warm intro required. Simple instruments. A clear answer in 14 days. When we have conviction, we act without delay.",
  },
  {
    k: "04",
    title: "Built for hardtech timelines",
    body: "Our perpetual structure means no fund clock forcing premature exits. Hardtech companies typically require 7–12 years to reach a meaningful exit. We're designed for that timeline — with patient capital and follow-on reserves to match.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden bg-white flex flex-col"
        style={{ minHeight: "calc(100vh - 86px)" }}
      >
        <HeroWatermark />
        {/* HeroContent handles scroll-parallax exit for the title */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-[1100px] mx-auto w-full px-8 pt-16 pb-8">
          <HeroContent />
        </div>
        <div className="relative z-10 leading-none mt-auto">
          <WaveGraphic />
        </div>
        {/* Fade hero into the section below — no hard edge */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none z-20"
          style={{ height: "clamp(80px, 10vw, 140px)", background: "linear-gradient(to bottom, transparent, white)" }}
        />
      </section>

      {/* ── Thesis ── */}
      <section className="pt-16 pb-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <FadeIn yOffset={40}>
            <Eyebrow label="Our Thesis" />
          </FadeIn>
          <div className="grid grid-cols-[1.15fr_1fr] gap-[80px] items-start mt-[32px]">
            <FadeIn delay={100} yOffset={48}>
              <ThesisHeadline />
            </FadeIn>
            <FadeIn delay={200} yOffset={48}>
              <div>
                <p className="text-[19px] leading-[1.72] text-navy-700 mb-[20px]">
                  Our primary focus is hardware-enabled innovation — but the
                  defining filter is the problem itself. Where a solution demands
                  real technical depth to create meaningful value, it falls within
                  our mandate. We follow the problem, not the category.
                </p>
                <p className="text-[19px] leading-[1.72] text-navy-700 mb-[24px]">
                  We write $100k–$250k checks into pre-revenue teams to support
                  concept through early prototype. Our perpetual fund structure eliminates
                  the clock that forces premature exits — we're designed for
                  hardtech timelines, not a traditional fund lifecycle.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Focus Cards ── */}
      <section className="pb-24 bg-white" style={{ overflowX: "clip" }}>
        <div className="max-w-[1200px] mx-auto px-8">
          <FocusCards />
        </div>
      </section>

      {/* ── Why Headwaters ── */}
      <section className="py-[90px] bg-navy-50 border-t border-navy-100">
        <div className="max-w-[1200px] mx-auto px-8">
          <FadeIn>
            <Eyebrow label="Why Headwaters" />
            <h2
              className="font-display font-extrabold text-navy-900 leading-[1.1] tracking-[-0.02em] mt-[18px] max-w-[640px]"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
            >
              What founders and investors actually get
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 gap-x-10 gap-y-0 mt-12">
            {valueProps.map((v, i) => (
              <FadeIn key={v.k} delay={i * 70}>
                <div className="py-8 border-t border-navy-200">
                  <div className="font-mono text-[12px] font-semibold text-gold-600 tracking-[0.07em] mb-3">
                    {v.k}
                  </div>
                  <h3 className="font-display font-bold text-[20px] text-navy-900 mb-[10px] leading-[1.2]">
                    {v.title}
                  </h3>
                  <p className="text-[15px] leading-[1.65] text-navy-600 m-0">
                    {v.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Two Ways In ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <FadeIn>
            <div className="text-center">
              <Eyebrow label="Two Ways In" centered />
              <h2
                className="font-display font-extrabold text-navy-900 leading-[1.1] tracking-[-0.02em] mt-[18px]"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
              >
                Whether you build or back, start here
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 gap-6 mt-11">
            <FadeIn delay={80}>
              <div className="bg-navy-900 rounded-lg p-10 text-white flex flex-col h-full">
                <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-gold-500">
                  For Founders
                </span>
                <h3 className="font-display font-bold text-[26px] mt-[14px] mb-3 leading-[1.15]">
                  You're building something hard
                </h3>
                <p className="text-[16px] leading-[1.65] text-navy-200 mb-7">
                  Pre-revenue, pre-prototype, pre-everyone-else. We move fast,
                  dig into the engineering, and give you a clear answer in two
                  weeks.
                </p>
                <div className="mt-auto">
                  <Button variant="accent" size="md" href="/founders">
                    See if we're a fit →
                  </Button>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={160}>
              <div
                className="bg-white rounded-lg p-10 flex flex-col border-2 border-gold-600 h-full"
                style={{ boxShadow: "var(--shadow-gold)" }}
              >
                <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-gold-700">
                  For Investors
                </span>
                <h3 className="font-display font-bold text-[26px] text-navy-900 mt-[14px] mb-3 leading-[1.15]">
                  You want frontier exposure
                </h3>
                <p className="text-[16px] leading-[1.65] text-navy-700 mb-7">
                  Headwaters Seed Stage Fund I is an evergreen vehicle — 20
                  pre-revenue hardtech companies, $100K initial checks, up to
                  $250K follow-on per company. No fund clock forcing premature
                  exits. Returns recycled into the next cohort.
                </p>
                <div className="mt-auto">
                  <Button variant="secondary" size="md" href="/about">
                    Learn about Headwaters →
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Dark CTA ── */}
      <FadeIn yOffset={16}>
        <section className="bg-navy-900 relative overflow-hidden">
          <div className="relative max-w-[1000px] mx-auto px-8 py-[104px] text-center">
            <Eyebrow label="Get in Touch" centered dark />
            <h2
              className="font-display font-extrabold text-white leading-[1.08] tracking-[-0.02em] mt-6 text-balance"
              style={{ fontSize: "clamp(2.1rem, 4vw, 3.4rem)" }}
            >
              Building something hard? We'd like to meet you.
            </h2>
            <p className="max-w-[560px] mx-auto mt-[22px] text-[18px] leading-[1.6] text-navy-200">
              No formal pitch required. Submit your application in a few minutes —
              we read every one.
            </p>
            <div className="mt-9 flex justify-center">
              <Button variant="accent" size="lg" href="/portfolio">
                How to Apply →
              </Button>
            </div>
          </div>
        </section>
      </FadeIn>

    </div>
  );
}
