import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import QuestionsGrid from "@/components/QuestionsGrid";
import SubmitApplication from "@/components/SubmitApplication";

const submitItems = [
  {
    k: "01",
    title: "The Application",
    body: "Answer the five questions below. Brief, direct answers are preferred — there are no word limits, but concise is better.",
  },
  {
    k: "02",
    title: "Pitch Deck",
    body: "A 10–15 slide PDF covering the problem, your solution, the team, the technology, the market, and your ask.",
  },
  {
    k: "03",
    title: "Founder Video",
    tag: "Encouraged",
    featured: true,
    body: "3–5 minutes, max. Tell us why you're solving this now and demo your prototype if you have one. A phone recording is perfectly fine.",
  },
];

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="bg-white pt-24 pb-[72px]">
        <div className="max-w-[880px] mx-auto px-8 text-center">
          <FadeIn className="flex justify-center">
            <Eyebrow label="Application" centered />
          </FadeIn>
          <FadeIn delay={80}>
            <h1
              className="font-display font-extrabold text-navy-900 leading-[1.1] tracking-[-0.025em] mt-6 mx-auto max-w-[760px]"
              style={{ fontSize: "clamp(2.3rem, 4.6vw, 3.6rem)" }}
            >
              Apply for investment consideration
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="max-w-[640px] mx-auto mt-[26px] text-[19px] leading-[1.62] text-navy-700">
              We write {" "}
              <span className="text-navy-900 font-semibold">$100k–$250k</span>{" "}
              checks into pre-revenue companies solving intricate, valuable
              problems.{" "}
              <span className="font-bold text-navy-900">
                Read below for instructions on what to submit.
              </span>
            </p>
          </FadeIn>
          <FadeIn delay={240}>
            <div className="mt-[34px] flex justify-center gap-4 flex-wrap">
              <Button
                variant="secondary"
                size="lg"
                href="/headwaters-seed-application.docx"
                download
              >
                Download Template
              </Button>
              <SubmitApplication />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── What to Submit ── */}
      <section className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <FadeIn>
            <div className="text-center max-w-[640px] mx-auto">
              <Eyebrow label="What to Submit" centered />
              <h2
                className="font-display font-extrabold text-navy-900 leading-[1.12] tracking-[-0.02em] mt-[18px]"
                style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}
              >
                Three things, one submission
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-3 gap-5 mt-12">
            {submitItems.map((s, i) => {
              const dark = s.featured;
              return (
                <FadeIn key={s.k} delay={i * 80} className="h-full">
                  <div
                    className={`rounded-xl p-9 h-full flex flex-col transition-[box-shadow,transform] duration-300 hover:-translate-y-[2px] hover:shadow-lg ${
                      dark
                        ? "bg-navy-900 border border-navy-900"
                        : "bg-white border border-navy-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`font-mono text-[15px] font-semibold tracking-[0.05em] ${
                          dark ? "text-gold-500" : "text-gold-600"
                        }`}
                      >
                        {s.k}
                      </div>
                      {s.tag && (
                        <span
                          className={`text-[10px] font-bold tracking-[0.1em] uppercase px-[10px] py-[5px] rounded-full ${
                            dark
                              ? "bg-gold-500 text-navy-900"
                              : "text-gold-700 bg-gold-50 border border-gold-200"
                          }`}
                        >
                          {s.tag}
                        </span>
                      )}
                    </div>
                    <h3
                      className={`font-display font-bold text-[22px] mt-5 mb-3 leading-[1.2] ${
                        dark ? "text-white" : "text-navy-900"
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={`text-[16px] leading-[1.6] m-0 flex-1 ${
                        dark ? "text-navy-200" : "text-navy-600"
                      }`}
                    >
                      {s.body}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── The Five Questions ── */}
      <section className="bg-navy-50 border-t border-navy-100 py-24">
        <div className="max-w-[1100px] mx-auto px-8">
          <FadeIn>
            <Eyebrow label="The Five Questions" />
            <h2
              className="font-display font-extrabold text-navy-900 leading-[1.12] tracking-[-0.02em] mt-[18px] mb-3 max-w-[680px]"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}
            >
              The questions that guide our decision
            </h2>
            <p className="text-[16px] leading-[1.65] text-navy-600 max-w-[640px] mb-12">
              Your answers are shared with our Investment Committee exactly as you
              write them.{" "}
              <span className="font-bold text-navy-900">
                There are no word limits, but brief and direct answers are
                preferred.
              </span>
            </p>
          </FadeIn>
          <QuestionsGrid />
        </div>
      </section>

      {/* ── About the Video ── */}
      <section className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <FadeIn>
            <div className="text-center max-w-[640px] mx-auto">
              <Eyebrow label="About the Video" centered />
              <h2
                className="font-display font-extrabold text-navy-900 leading-[1.12] tracking-[-0.02em] mt-[18px]"
                style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}
              >
                Use a video to tell us more about you and your solution
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 gap-5 mt-12">
            <FadeIn delay={80} className="h-full">
              <div className="bg-navy-50 border border-navy-100 rounded-xl p-11 h-full flex flex-col">
                <span className="font-mono text-[13px] font-semibold tracking-[0.08em] uppercase text-gold-600">
                  01
                </span>
                <h3 className="font-display font-bold text-[26px] text-navy-900 mt-4 mb-4 leading-[1.2]">
                  Why now?
                </h3>
                <p className="text-[17px] leading-[1.65] text-navy-700 m-0 flex-1">
                  What's happening in your field, your market, or the technology
                  that makes this the right moment to build this company — and why
                  you are the right person to do it. This is where conviction
                  comes through.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={160} className="h-full">
              <div className="bg-navy-50 border border-navy-100 rounded-xl p-11 h-full flex flex-col">
                <span className="font-mono text-[13px] font-semibold tracking-[0.08em] uppercase text-gold-600">
                  02
                </span>
                <h3 className="font-display font-bold text-[26px] text-navy-900 mt-4 mb-4 leading-[1.2]">
                  Demo, if applicable
                </h3>
                <p className="text-[17px] leading-[1.65] text-navy-700 m-0 flex-1">
                  Walk us through a prototype, a simulation, or test results.
                  We're engineers and investors — we appreciate seeing the work,
                  even when it's early. A screen share or a walk through your lab
                  is exactly right.
                </p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={220}>
            <p className="text-center text-[19px] leading-[1.6] font-bold text-navy-900 mt-10 max-w-[720px] mx-auto">
              Upload to Google Drive, Dropbox, YouTube (unlisted), or Loom, and
              include the link with your submission.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Submission CTA ── */}
      <FadeIn yOffset={16}>
        <section className="bg-navy-900">
          <div className="max-w-[1000px] mx-auto px-8 py-[100px] text-center">
            <Eyebrow label="Submission" centered dark />
            <h2
              className="font-display font-extrabold text-white leading-[1.1] tracking-[-0.02em] mt-6"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
            >
              Ready when you are
            </h2>
            <p className="max-w-[600px] mx-auto mt-[22px] text-[18px] leading-[1.6] text-navy-200">
              Submit your completed application, pitch deck, and video link in one
              form. We review every application and respond as quickly as possible, and we greatly appreciate your time and effort.
            </p>
            <div className="mt-8 flex justify-center">
              <SubmitApplication variant="accent">
                Submit Your Application →
              </SubmitApplication>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Legal note ── */}
      <section className="bg-navy-950 py-8">
        <div className="max-w-[1000px] mx-auto px-8 text-center">
          <p className="text-[13px] leading-[1.6] text-navy-400 m-0">
            Headwaters Seed Stage Fund I is managed by Frontier Capital Management
            LLC, affiliated with Frontier Angels, Bozeman, Montana. This is not an
            offer of securities.
          </p>
        </div>
      </section>
    </div>
  );
}
