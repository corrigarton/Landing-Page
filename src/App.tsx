import { useState, useEffect, useRef, type ReactNode } from 'react'

import clientBBefore from './imports/client_B-_before.png'
import clientBAfter from './imports/client_B-after.png'
import clientABefore from './imports/Client_A_-_Before.png'
import clientAAfter from './imports/client_A_-_after.png'
import logoImg from './imports/bd63982f-fc2a-4e6e-88e1-ab0ae24e1450.png'
import michaelleImg from './imports/michaelle_-_Copy-1.jpg'
import tomMyersImg from './imports/image-26.png'
import maryBondImg from './imports/mary_bond.jpg'
import kathleenPorterImg from './imports/Kathleen-Porter-.jpg'

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth)
    window.addEventListener('resize', fn, { passive: true })
    return () => window.removeEventListener('resize', fn)
  }, [])
  return width
}

// ─── Reveal ───────────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  style = {},
}: {
  children: ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── Shared atoms ─────────────────────────────────────────────────────────────

function SectionTag({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
      <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
      <span style={{
        fontSize: '11px',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: '#c9a96e',
      }}>
        {label}
      </span>
    </div>
  )
}

function PrimaryBtn({ children, large, href = '#course' }: { children: ReactNode; large?: boolean; href?: string }) {
  const [hover, setHover] = useState(false)
  return (
    <a
      href={href}
      style={{
        display: 'inline-block',
        background: hover ? '#d4b87a' : '#c9a96e',
        color: '#000',
        padding: large ? '18px 44px' : '13px 30px',
        fontSize: large ? '13px' : '11px',
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        transition: 'background 0.2s ease, transform 0.15s ease',
        transform: hover ? 'scale(1.01)' : 'scale(1)',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </a>
  )
}

// ─── Contained card (the lino.systems-style element wrapper) ──────────────────

function Card({
  children,
  padded = true,
  style,
}: {
  children: ReactNode
  padded?: boolean
  style?: React.CSSProperties
}) {
  return (
    <div style={{
      border: '1px solid rgba(255,255,255,0.07)',
      background: '#0c0c0c',
      ...(padded ? { padding: 'clamp(36px, 6vw, 72px)' } : {}),
      ...style,
    }}>
      {children}
    </div>
  )
}

// ─── Section shell ────────────────────────────────────────────────────────────

function Section({
  children,
  style,
}: {
  children: ReactNode
  style?: React.CSSProperties
}) {
  return (
    <section style={{
      padding: '10px 16px',
      background: '#080808',
      ...style,
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  )
}

// ─── Before / After panel ─────────────────────────────────────────────────────

function BeforeAfterPanel({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
}) {
  const w = useWindowWidth()
  const isMobile = w < 900
  const labelStyle: React.CSSProperties = {
    flexShrink: 0,
    textAlign: 'center' as const,
    padding: '14px 0 10px',
    fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase' as const,
    color: 'rgba(240,236,227,0.45)',
  }
  const panelHeight = isMobile ? '72vh' : '100%'

  return (
    <div style={{ display: 'flex', gap: '0', height: panelHeight }}>
      {/* Before */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <span style={labelStyle}>Before</span>
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <img
            src={before}
            alt={beforeAlt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom center', display: 'block' }}
          />
        </div>
      </div>

      {/* Vertical divider */}
      <div style={{
        width: '1px', flexShrink: 0,
        background: 'linear-gradient(to bottom, transparent 0%, rgba(201,169,110,0.5) 12%, rgba(201,169,110,0.5) 88%, transparent 100%)',
      }} />

      {/* After */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <span style={labelStyle}>After</span>
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <img
            src={after}
            alt={afterAlt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom center', display: 'block' }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function NavLink({ children, href, muted }: { children: ReactNode; href: string; muted?: boolean }) {
  const [hover, setHover] = useState(false)
  return (
    <a
      href={href}
      style={{
        fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
        color: hover
          ? (muted ? 'rgba(240,236,227,0.9)' : '#c9a96e')
          : (muted ? 'rgba(240,236,227,0.55)' : 'rgba(240,236,227,0.5)'),
        transition: 'color 0.3s ease',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </a>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const w = useWindowWidth()
  const isMobile = w < 900

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { if (!isMobile) setMenuOpen(false) }, [isMobile])

  const navBg = scrolled || menuOpen

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: navBg ? 'rgba(8,8,8,0.97)' : 'transparent',
      backdropFilter: navBg ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: navBg ? 'blur(20px)' : 'none',
      borderBottom: navBg ? '1px solid rgba(201,169,110,0.1)' : '1px solid transparent',
      transition: 'background 0.45s ease, border-color 0.45s ease',
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto', padding: '0 28px',
        height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 400, color: '#f0ece3', letterSpacing: '0.04em' }}>FitAlign</span>
        </a>

        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            {['Studio', 'Workshops', 'Teacher Training'].map(l => (
              <NavLink key={l} href="#">{l}</NavLink>
            ))}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {!isMobile && <NavLink href="#" muted>Login</NavLink>}
          {!isMobile && <PrimaryBtn>Begin FitAlign</PrimaryBtn>}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px 4px', display: 'flex', flexDirection: 'column',
                gap: '5px', alignItems: 'flex-end', width: '32px',
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block',
                  width: i === 1 ? '16px' : '22px',
                  height: '1.5px',
                  background: '#f0ece3',
                  borderRadius: '1px',
                  transition: 'transform 0.3s ease, opacity 0.3s ease, width 0.3s ease',
                  ...(menuOpen && i === 0 ? { transform: 'translateY(6.5px) rotate(45deg)', width: '22px' } : {}),
                  ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
                  ...(menuOpen && i === 2 ? { transform: 'translateY(-6.5px) rotate(-45deg)', width: '22px' } : {}),
                }} />
              ))}
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobile && (
        <div style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '360px' : '0',
          transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
          borderTop: menuOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}>
          <div style={{ padding: '28px 28px 36px', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {['Studio', 'Workshops', 'Teacher Training', 'Login'].map(l => (
              <a
                key={l}
                href="#"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(240,236,227,0.65)', textDecoration: 'none',
                  padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {l}
              </a>
            ))}
            <div style={{ marginTop: '24px' }}>
              <PrimaryBtn href="#course">Begin FitAlign</PrimaryBtn>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const isMobile = useWindowWidth() < 900
  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '140px 24px 100px', textAlign: 'center',
      background: '#080808', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 75% 55% at 50% 58%, rgba(201,169,110,0.055) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)',
        animation: 'lineGrow 1.2s cubic-bezier(0.16,1,0.3,1) 0.1s both',
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', width: '100%' }}>
        <div style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both', marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '1px', background: '#c9a96e', opacity: 0.8 }} />
            <span style={{ fontSize: '11px', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#c9a96e' }}>
              Movement Education
            </span>
            <div style={{ width: '48px', height: '1px', background: '#c9a96e', opacity: 0.8 }} />
          </div>
        </div>

        <div style={{ animation: 'fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.35s both', marginBottom: '44px' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5.5rem, 16vw, 13rem)',
            fontWeight: 400, lineHeight: 0.88, letterSpacing: '-0.01em', color: '#f0ece3',
          }}>
            FitAlign
          </h1>
        </div>

        <div style={{ animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both', marginBottom: '40px' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.35rem, 3.2vw, 2.25rem)',
            fontStyle: 'italic', fontWeight: 400, color: 'rgba(240,236,227,0.8)',
          }}>
            Restore Your Kid Body.
          </p>
        </div>

        <div style={{ animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.72s both', marginBottom: '56px' }}>
          <p style={{
            fontSize: '1.1rem', lineHeight: 1.78, color: 'rgba(240,236,227,0.6)',
            maxWidth: '500px', margin: '0 auto',
          }}>
            Address persistent tension, restricted movement, poor posture, instability, and recurring pain by changing the pattern beneath them.
          </p>
        </div>

        <div style={{ animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.88s both', marginBottom: '72px' }}>
          <PrimaryBtn large>Explore the FitAlign Course</PrimaryBtn>
        </div>

        <div style={{ animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 1.05s both' }}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
            gap: '10px 20px', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(240,236,227,0.72)',
          }}>
            <span>Featured in The New York Times</span>
            {!isMobile && <span style={{ color: 'rgba(201,169,110,0.8)', fontSize: '16px' }}>·</span>}
            <span>Developed Over 30+ Years</span>
            {!isMobile && <span style={{ color: 'rgba(201,169,110,0.8)', fontSize: '16px' }}>·</span>}
            <span>500+ Teachers Worldwide</span>
          </div>
        </div>
      </div>

      {/* Scroll chevron — sits below the stats, centered */}
      <div style={{
        position: 'absolute', bottom: '28px', left: '0', right: '0',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        animation: 'fadeUp 1s ease 1.5s both',
        pointerEvents: 'none',
      }}>
        <svg width="36" height="20" viewBox="0 0 36 20" fill="none" style={{ animation: 'scrollPulse 2.8s ease-in-out infinite' }}>
          <path d="M2 3L18 17L34 3" stroke="rgba(201,169,110,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}

// ─── CLIENT B — "When Support Changes" ────────────────────────────────────────

function ClientBSection() {
  const isMobile = useWindowWidth() < 900

  if (isMobile) {
    return (
      <Section>
        <Card padded={false}>
          <div style={{ padding: 'clamp(28px, 5vw, 48px)' }}>
            <Reveal><SectionTag label="Client Transformation" /></Reveal>
            <Reveal delay={70}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
                fontWeight: 400, lineHeight: 1.15, color: '#f0ece3', marginBottom: '24px',
              }}>
                When Support Changes, the Whole Body Changes
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.85, fontSize: '1.0125rem' }}>
                This is not simply a person being told to stand straighter.
              </p>
            </Reveal>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <BeforeAfterPanel
              before={clientBBefore}
              after={clientBAfter}
              beforeAlt="Side profile showing forward head posture and compensatory pattern"
              afterAlt="Side profile after sessions — body organized around a balanced vertical line"
            />
          </div>

          <div style={{ padding: 'clamp(28px, 5vw, 48px)' }}>
            <Reveal delay={80}>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.85, fontSize: '1.0125rem', marginBottom: '20px' }}>
                His head, rib cage, abdomen, pelvis, and legs have shifted into a more balanced relationship.
              </p>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.85, fontSize: '1.0125rem', marginBottom: '32px' }}>
                The entire body is organizing itself differently around the vertical line.
              </p>
              <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'rgba(240,236,227,0.4)' }}>
                Before and after working with Michaelle Edwards.
              </p>
            </Reveal>
          </div>
        </Card>
      </Section>
    )
  }

  return (
    <Section>
      <Card padded={false}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 0,
        }}>
          {/* Copy */}
          <div style={{ padding: 'clamp(36px, 6vw, 72px)' }}>
            <Reveal>
              <SectionTag label="Client Transformation" />
            </Reveal>
            <Reveal delay={70}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
                fontWeight: 400, lineHeight: 1.15, color: '#f0ece3', marginBottom: '28px',
              }}>
                When Support Changes, the Whole Body Changes
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.85, marginBottom: '16px', fontSize: '1.0125rem' }}>
                This is not simply a person being told to stand straighter.
              </p>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.85, marginBottom: '16px', fontSize: '1.0125rem' }}>
                His head, rib cage, abdomen, pelvis, and legs have shifted into a more balanced relationship. The entire body is organizing itself differently around the vertical line.
              </p>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.85, marginBottom: '28px', fontSize: '1.0125rem' }}>
                Better posture is not something he is forcing. It is the result of better support.
              </p>
              <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'rgba(240,236,227,0.4)' }}>
                Before and after working with Michaelle Edwards.
              </p>
            </Reveal>
          </div>

          {/* Photos */}
          <Reveal delay={120} style={{ borderLeft: '1px solid rgba(255,255,255,0.07)', height: '100%' }}>
            <div style={{ padding: '0 clamp(16px, 3vw, 32px)', height: '100%', boxSizing: 'border-box' }}>
              <BeforeAfterPanel
                before={clientBBefore}
                after={clientBAfter}
                beforeAlt="Side profile showing forward head posture and compensatory pattern"
                afterAlt="Side profile after sessions — body organized around a balanced vertical line"
              />
            </div>
          </Reveal>
        </div>
      </Card>
    </Section>
  )
}

// ─── BODY PHILOSOPHY ──────────────────────────────────────────────────────────

function BodyPhilosophySection() {
  return (
    <Section>
      <Card>
        <div style={{ maxWidth: '720px' }}>
          <Reveal>
            <SectionTag label="The Foundation" />
          </Reveal>
          <Reveal delay={70}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 400, lineHeight: 1.12, color: '#f0ece3', marginBottom: '36px',
            }}>
              Your body already knows how to move well.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88, marginBottom: '20px', fontSize: '1.0625rem' }}>
              Efficient movement, stable joints, and balanced muscle activation are automatic processes your body is designed to perform.
            </p>
            <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88, marginBottom: '20px', fontSize: '1.0625rem' }}>
              But injury, inactivity, repetitive habits, and stress can teach the body to favor movement patterns that are no longer useful.
            </p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: 'rgba(240,236,227,0.88)', lineHeight: 1.65,
            }}>
              Over time, those patterns begin to feel normal.
            </p>
          </Reveal>
        </div>
      </Card>
    </Section>
  )
}

// ─── STABILITY SCIENCE ────────────────────────────────────────────────────────

function StabilitySection() {
  return (
    <Section>
      <Card padded={false}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}>
          <div style={{ padding: 'clamp(36px, 6vw, 72px)', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
            <Reveal>
              <SectionTag label="How the Body Works" />
            </Reveal>
            <Reveal delay={60}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
                fontWeight: 400, lineHeight: 1.15, color: '#f0ece3', marginBottom: '28px',
              }}>
                Your Body Is Constantly Creating Stability
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88, marginBottom: '18px' }}>
                Standing is not passive. Muscles throughout your body are constantly pulling against one another through continuous, automatic adjustments.
              </p>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88, marginBottom: '18px' }}>
                Imagine trying to balance a broom upright on your palm. You wouldn't hold it perfectly still — you would make constant tiny corrections to keep it from falling.
              </p>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88 }}>
                Your body maintains stability in the same way. 
              </p>
            </Reveal>
          </div>

          <div style={{ padding: 'clamp(36px, 6vw, 72px)' }}>
            <Reveal delay={80}>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88, marginBottom: '18px' }}>
                When one area stops contributing effectively, other muscles automatically increase their effort to preserve it.
              </p>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88, marginBottom: '32px' }}>
                These compensations allow you to keep moving, but they change how force travels through the body.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div style={{
                border: '1px solid rgba(201,169,110,0.18)',
                padding: '28px 32px',
                background: 'rgba(201,169,110,0.03)',
                marginBottom: '28px',
              }}>
                <p style={{
                  fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: '#c9a96e', marginBottom: '20px',
                }}>
                  Over time, this can contribute to:
                </p>
                {['Poor posture', 'Restricted movement', 'Fatigue and stiffness', 'Uneven joint loading', 'Persistent pain'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#c9a96e', flexShrink: 0 }} />
                    <span style={{ color: 'rgba(240,236,227,0.7)', fontSize: '15px' }}>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
               <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88 }}>
                The symptom may appear in one area, while the pattern involves the entire body.
              </p>
            </Reveal>
          </div>
        </div>
      </Card>
    </Section>
  )
}

// ─── WHY FIXES FAIL ───────────────────────────────────────────────────────────

function WhyFailsSection() {
  const solutions = [
    {
      label: 'Relaxation & Release',
      headline: 'Targeting the muscles that hurt',
      body: 'Many approaches focus on loosening or relaxing wherever pain appears — massage, stretching, or manual therapy applied directly to the tense area.',
      limitation: 'Those muscles may be working harder to compensate for missing support elsewhere. When the underlying movement pattern stays unchanged, the body tends to recreate the tension.',
    },
    {
      label: 'Strength Training',
      headline: 'Building more capacity',
      body: 'Strength training can build valuable capacity — developing muscle that supports joints and enables more demanding movement.',
      limitation: 'But when strength is added without changing how the body coordinates movement, it may further reinforce the same compensation pattern.',
    },
  ]

  return (
    <Section>
      <Card padded={false}>
        <div style={{ padding: 'clamp(36px, 6vw, 72px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <Reveal>
            <SectionTag label="A Different Approach" />
          </Reveal>
          <Reveal delay={70}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
              fontWeight: 400, lineHeight: 1.15, color: '#f0ece3', maxWidth: '640px',
            }}>
              Why common solutions often don't last
            </h2>
          </Reveal>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}>
          {solutions.map((s, i) => (
            <Reveal key={s.label} delay={100 + i * 80} style={{
              borderRight: i === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}>
              <div style={{ padding: 'clamp(32px, 5vw, 56px)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
                <p style={{
                  fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: '#c9a96e', marginBottom: '18px',
                }}>
                  {s.label}
                </p>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                  fontWeight: 400, color: '#f0ece3', lineHeight: 1.25, marginBottom: '20px',
                }}>
                  {s.headline}
                </h3>
                <p style={{ color: 'rgba(240,236,227,0.65)', lineHeight: 1.85, marginBottom: '28px', fontSize: '1rem' }}>
                  {s.body}
                </p>
                {s.limitation && (
                  <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    paddingTop: '24px',
                  }}>
                    <p style={{
                      fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase',
                      color: 'rgba(240,236,227,0.4)', marginBottom: '14px',
                    }}>
                      Why it doesn't last
                    </p>
                    <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.85, fontSize: '1rem' }}>
                      {s.limitation}
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Card>
    </Section>
  )
}

// ─── CLIENT A — Kelly ─────────────────────────────────────────────────────────

function ClientASection() {
  const isMobile = useWindowWidth() < 900

  if (isMobile) {
    return (
      <Section>
        <Card padded={false}>
          <div style={{ padding: 'clamp(28px, 5vw, 48px)' }}>
            <Reveal><SectionTag label="Client Transformation" /></Reveal>
            <Reveal delay={70}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
                fontWeight: 400, lineHeight: 1.15, color: '#f0ece3', marginBottom: '24px',
              }}>
                She Was Already a Pilates Instructor
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.85, fontSize: '1.0125rem' }}>
                Kelly had already developed substantial strength, body awareness, and muscular control. But her body was still organizing that strength through a compensatory pattern.
              </p>
            </Reveal>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <BeforeAfterPanel
              before={clientABefore}
              after={clientAAfter}
              beforeAlt="Kelly before sessions — strength organized through a compensatory pattern"
              afterAlt="Kelly after 3 sessions — head, rib cage, pelvis and silhouette visibly reorganized"
            />
          </div>

          <div style={{ padding: 'clamp(28px, 5vw, 48px)' }}>
            <Reveal delay={80}>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.85, fontSize: '1.0125rem', marginBottom: '20px' }}>
                She didn't need to build a stronger body. She needed her body to use the strength it already had differently.
              </p>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.85, fontSize: '1.0125rem', marginBottom: '32px' }}>
                After only three sessions with Michaelle Edwards, her head, rib cage, abdomen, pelvis, and overall silhouette had visibly reorganized.
              </p>
              <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'rgba(240,236,227,0.4)' }}>
                Before and after 3 private sessions with Michaelle Edwards.
              </p>
            </Reveal>
          </div>
        </Card>
      </Section>
    )
  }

  return (
    <Section>
      <Card padded={false}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 0,
        }}>
          {/* Photos first in DOM → shows on top on mobile */}
          <Reveal delay={120} style={{ borderRight: '1px solid rgba(255,255,255,0.07)', height: '100%' }}>
            <div style={{ padding: '0 clamp(16px, 3vw, 32px)', height: '100%', boxSizing: 'border-box' }}>
              <BeforeAfterPanel
                before={clientABefore}
                after={clientAAfter}
                beforeAlt="Kelly before sessions — strength organized through a compensatory pattern"
                afterAlt="Kelly after 3 sessions — head, rib cage, pelvis and silhouette visibly reorganized"
              />
            </div>
          </Reveal>

          {/* Copy */}
          <div style={{ padding: 'clamp(36px, 6vw, 72px)' }}>
            <Reveal>
              <SectionTag label="Client Transformation" />
            </Reveal>
            <Reveal delay={70}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
                fontWeight: 400, lineHeight: 1.15, color: '#f0ece3', marginBottom: '28px',
              }}>
                She Was Already a Pilates Instructor
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88, marginBottom: '16px', fontSize: '1.0125rem' }}>
                Kelly had already developed substantial strength, body awareness, and muscular control. But her body was still organizing that strength through a compensatory pattern.
              </p>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88, marginBottom: '16px', fontSize: '1.0125rem' }}>
                After only three sessions with Michaelle Edwards, her head, rib cage, abdomen, pelvis, and overall silhouette had visibly reorganized.
              </p>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88, marginBottom: '28px', fontSize: '1.0125rem' }}>
                She didn't need to build a stronger body. She needed her body to use the strength it already had differently.
              </p>
              <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'rgba(240,236,227,0.4)' }}>
                Before and after 3 private sessions with Michaelle Edwards.
              </p>
            </Reveal>
          </div>
        </div>
      </Card>
    </Section>
  )
}

// ─── THE METHOD ───────────────────────────────────────────────────────────────

function MethodSection() {
  const isMobile = useWindowWidth() < 900
  const steps = [
    { n: 1, label: 'Understand', desc: 'What your body is designed to do' },
    { n: 2, label: 'Recognize', desc: 'Where compensation has changed the pattern' },
    { n: 3, label: 'Experience', desc: 'A more efficient alternative' },
    { n: 4, label: 'Repeat', desc: 'Until the movement becomes increasingly automatic' },
  ]

  return (
    <Section>
      <Card padded={false}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}>
          <div style={{ padding: 'clamp(36px, 6vw, 72px)', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
            <Reveal>
              <SectionTag label="The Method" />
            </Reveal>
            <Reveal delay={60}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
                fontWeight: 400, lineHeight: 1.15, color: '#f0ece3', marginBottom: '28px',
              }}>
                Give the Body a Better Movement Solution
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88, marginBottom: '18px' }}>
                The body can establish a new pattern when it experiences a way of moving that provides greater stability with less effort.
              </p>
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88 }}>
                Each FitAlign lesson combines explanation with guided movement so you can build a different relationship with how your body creates support.
              </p>
            </Reveal>
          </div>

          <div style={{ padding: 'clamp(36px, 6vw, 72px)' }}>
            <Reveal delay={180}>
              <div>
                {steps.map((step, i) => (
                  <div key={step.label} style={{
                    display: 'flex', gap: '18px', padding: '20px 0',
                    borderBottom: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}>
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '50%',
                      border: '1px solid rgba(201,169,110,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, fontSize: '11px', color: '#c9a96e', fontWeight: 500,
                    }}>
                      {step.n}
                    </div>
                    <div>
                      <p style={{ color: '#f0ece3', fontWeight: 500, marginBottom: '4px', fontSize: '15px' }}>{step.label}</p>
                      <p style={{ color: 'rgba(240,236,227,0.52)', fontSize: '14px', lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}

                <div style={{
                  marginTop: '28px', padding: '16px 20px',
                  background: 'rgba(201,169,110,0.055)', border: '1px solid rgba(201,169,110,0.18)',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: 'center', justifyContent: 'center',
                  gap: isMobile ? '12px' : '10px',
                }}>
                  {['Knowledge', 'Experience', 'Automatic Pattern'].map((item, i, arr) => (
                    <span key={item} style={{ display: 'contents' }}>
                      <span style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e' }}>
                        {item}
                      </span>
                      {i < arr.length - 1 && !isMobile && (
                        <span style={{ color: 'rgba(201,169,110,0.4)', fontSize: '13px' }}>→</span>
                      )}
                      {i < arr.length - 1 && isMobile && (
                        <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                          <path d="M1 1.5L9 8.5L17 1.5" stroke="rgba(201,169,110,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Card>
    </Section>
  )
}

// ─── TESTIMONIAL ──────────────────────────────────────────────────────────────

function TestimonialSection() {
  const [hovered, setHovered] = useState(false)
  return (
    <Section>
      <Card>
        <Reveal>
          <SectionTag label="Student Experience" />
        </Reveal>
        <Reveal delay={80}>
          <div
            style={{
              position: 'relative', paddingTop: '56.25%',
              background: '#111', border: `1px solid ${hovered ? 'rgba(201,169,110,0.3)' : 'rgba(201,169,110,0.1)'}`,
              cursor: 'pointer', overflow: 'hidden', transition: 'border-color 0.3s ease',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px',
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)',
            }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                border: `1px solid ${hovered ? 'rgba(201,169,110,0.6)' : 'rgba(201,169,110,0.3)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.3s, transform 0.3s',
                transform: hovered ? 'scale(1.08)' : 'scale(1)',
                background: hovered ? 'rgba(201,169,110,0.08)' : 'transparent',
              }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M8 5.5l9 5.5-9 5.5V5.5z" fill="#c9a96e" />
                </svg>
              </div>
              <p style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(240,236,227,0.3)' }}>
                Student Testimonial
              </p>
            </div>
          </div>
        </Reveal>
      </Card>
    </Section>
  )
}

// ─── ABOUT MICHAELLE ──────────────────────────────────────────────────────────

function AboutSection() {
  const w = useWindowWidth()
  const isMobile = w < 900

  const credentials = [
    'More than 500 teachers trained worldwide',
    'Two published books',
    'Featured in The New York Times, Huffington Post, Spinal Research Journal, and other health and movement publications',
    'Used by athletes, dancers, teachers, movement professionals, and students of all ages',
  ]

  const headerBlock = (
    <div style={{ padding: 'clamp(32px, 5vw, 56px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <Reveal><SectionTag label="The Founder" /></Reveal>
      <Reveal delay={70}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
          fontWeight: 400, lineHeight: 1.15, color: '#f0ece3',
        }}>
          Developed Through More Than 30 Years of Investigation
        </h2>
      </Reveal>
    </div>
  )

  const bioBlock = (
    <div style={{ padding: 'clamp(32px, 5vw, 56px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <Reveal delay={100}>
        <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88, marginBottom: '18px' }}>
          Michaelle Edwards began studying yoga at 18 under Swami Satchidananda. After experiencing injury and instability within her own practice, she began questioning whether commonly taught movements reflected the body's natural design.
        </p>
        <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.88 }}>
          Through decades of studying anatomy, breathing, fascia, posture, massage, and human movement — and working directly with thousands of students and clients — she developed a method for restoring alignment through movement rather than forcing the body into static positions.
        </p>
      </Reveal>
    </div>
  )

  const credentialsBlock = (
    <div style={{ padding: 'clamp(32px, 5vw, 56px)' }}>
      <Reveal delay={160}>
        <p style={{
          fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase',
          color: '#c9a96e', marginBottom: '24px',
        }}>
          Credentials
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {credentials.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                width: '4px', height: '4px', borderRadius: '50%',
                background: '#c9a96e', flexShrink: 0, marginTop: '9px',
              }} />
              <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.72, fontSize: '15px' }}>{c}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ color: 'rgba(240,236,227,0.48)', fontSize: '14px', lineHeight: 1.72 }}>
            FitAlign brings this body of work into a structured digital course that can be learned from anywhere.
          </p>
        </div>
      </Reveal>
    </div>
  )

  const photoBlock = (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '32px 0' : '32px',
      borderBottom: isMobile ? '1px solid rgba(255,255,255,0.07)' : 'none',
    }}>
      <img
        src={michaelleImg}
        alt="Michaelle Edwards demonstrating a balance pose outdoors"
        style={{
          width: isMobile ? '80%' : '100%',
          maxHeight: isMobile ? 'none' : '380px',
          height: 'auto',
          objectFit: 'contain',
          display: 'block',
          borderRadius: '2px',
        }}
      />
    </div>
  )

  if (isMobile) {
    return (
      <Section>
        <Card padded={false}>
          {headerBlock}
          {photoBlock}
          {bioBlock}
          {credentialsBlock}
        </Card>
      </Section>
    )
  }

  return (
    <Section>
      <Card padded={false}>
        {/* Top: photo + text side by side, photo fills full height */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {/* Photo — padded so there's breathing room around it */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(32px, 4vw, 56px)',
            borderRight: '1px solid rgba(255,255,255,0.07)',
          }}>
            <img
              src={michaelleImg}
              alt="Michaelle Edwards demonstrating a balance pose outdoors"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '440px',
                objectFit: 'contain',
                display: 'block',
                borderRadius: '2px',
              }}
            />
          </div>
          {/* Header + Bio */}
          <div>
            {headerBlock}
            {bioBlock}
          </div>
        </div>
        {/* Bottom: full-width credentials */}
        <div style={{ padding: 'clamp(32px, 5vw, 56px)' }}>
          <Reveal delay={160}>
            <p style={{
              fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase',
              color: '#c9a96e', marginBottom: '28px',
            }}>
              Credentials
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px' }}>
              {credentials.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: '#c9a96e', flexShrink: 0, marginTop: '9px',
                  }} />
                  <p style={{ color: 'rgba(240,236,227,0.68)', lineHeight: 1.72, fontSize: '15px' }}>{c}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ color: 'rgba(240,236,227,0.48)', fontSize: '14px', lineHeight: 1.72 }}>
                FitAlign brings this body of work into a structured digital course that can be learned from anywhere.
              </p>
            </div>
          </Reveal>
        </div>
      </Card>
    </Section>
  )
}

// ─── COURSE / PRICING ─────────────────────────────────────────────────────────

// ─── TESTIMONIAL SLIDER ───────────────────────────────────────────────────────

const testimonials = [
  {
    quote: "Michaelle Edwards bases her YogAlign® system on sound principles, with practical and useful exercises and awareness's.",
    name: 'Tom Myers',
    role: 'Author of Anatomy Trains and Fascial Release for Structural Balance',
    photo: tomMyersImg,
  },
  {
    quote: "YogAlign is packed with well-described anatomy and well-researched principles of body structure. The author's dedication and spirit will inspire you with her vision of a pain-free yoga path to a naturally aligned body.",
    name: 'Mary Bond',
    role: 'Author of The New Rules of Posture: How to Sit, Stand and Move in the Modern World',
    photo: maryBondImg,
  },
  {
    quote: "Michaelle Edwards raises a red flag on the prevalence of injuries experienced by people practicing yoga today. Not only does she detail common poses and practices that are at odds with the natural human design, she provides safe, rehabilitative alternatives throughout this richly-illustrated, well-researched guide.",
    name: 'Kathleen Porter',
    role: 'Natural Posture Solutions',
    photo: kathleenPorterImg,
  },
]

function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = (index: number) => {
    setFading(true)
    setTimeout(() => {
      setCurrent(index)
      setFading(false)
    }, 700)
  }

  const advance = (dir: number) => {
    goTo((current + dir + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => advance(1), 20000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current])

  const t = testimonials[current]

  return (
    <div style={{
      padding: '22px 24px',
      border: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(255,255,255,0.03)',
      position: 'relative',
    }}>
      {/* Quote — fixed height so the card never resizes between slides */}
      <div style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s ease',
        height: '180px',
        overflow: 'hidden',
      }}>
        <p style={{
          color: 'rgba(240,236,227,0.65)', fontSize: '14px', lineHeight: 1.75,
          fontStyle: 'italic', marginBottom: '18px',
        }}>
          "{t.quote}"
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img
            src={t.photo}
            alt={t.name}
            style={{
              width: '52px', height: '52px', borderRadius: '50%',
              objectFit: 'cover', objectPosition: 'center top',
              flexShrink: 0, border: '1px solid rgba(201,169,110,0.35)',
            }}
          />
          <div>
            <p style={{ fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '4px' }}>
              {t.name}
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(240,236,227,0.5)', lineHeight: 1.5 }}>
              {t.role}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? '18px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === current ? '#c9a96e' : 'rgba(201,169,110,0.3)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>
        {/* Prev / Next */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['←', '→'].map((label, i) => (
            <button
              key={label}
              onClick={() => advance(i === 0 ? -1 : 1)}
              style={{
                background: 'none', border: '1px solid rgba(201,169,110,0.25)',
                color: 'rgba(201,169,110,0.7)', cursor: 'pointer',
                width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', borderRadius: '2px',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── COURSE / PRICING ─────────────────────────────────────────────────────────

function CoursePricingSection() {
  const features = [
    'Progressive educational lessons',
    'Guided movement practices',
    'Visual explanations and demonstrations',
    'Direct instruction from Michaelle Edwards',
    'A structured method developed over more than 30 years',
    'Mobile and desktop access',
    'Lifetime access',
  ]

  const [btnHover, setBtnHover] = useState(false)

  return (
    <Section>
      <Card padded={false}>
        {/* Header — title left, price right */}
        <div style={{
          padding: 'clamp(36px, 6vw, 72px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: '40px', flexWrap: 'wrap',
        }}>
          <div style={{ flex: '1 1 340px' }}>
            <Reveal>
              <SectionTag label="The Course" />
            </Reveal>
            <Reveal delay={60}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 400, lineHeight: 1.15, color: '#f0ece3', marginBottom: '20px',
              }}>
                FitAlign Online Course
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ color: 'rgba(240,236,227,0.65)', lineHeight: 1.82, fontSize: '1.0125rem', maxWidth: '420px' }}>
                Learn how the body creates stability, how compensation patterns become automatic, and how to restore more efficient movement through education and guided experience.
              </p>
            </Reveal>
          </div>

          {/* Price — moved up into header */}
          <Reveal delay={100}>
            <div style={{ textAlign: 'left', flexShrink: 0 }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px' }}>
                One-time payment
              </p>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4.5rem, 8vw, 7.5rem)',
                fontWeight: 400, color: '#f0ece3', lineHeight: 1,
              }}>
                $249
              </div>
              <p style={{ color: 'rgba(240,236,227,0.4)', fontSize: '13px', marginTop: '20px' }}>
                Lifetime access · All devices
              </p>
            </div>
          </Reveal>
        </div>

        {/* Two-column body */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}>
          {/* Feature list */}
          <Reveal delay={80} style={{ borderRight: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ padding: 'clamp(36px, 6vw, 72px)' }}>
              <p style={{
                fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'rgba(240,236,227,0.45)', marginBottom: '28px',
              }}>
                What's included
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      border: '1px solid rgba(201,169,110,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: '1px',
                    }}>
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5l2.5 2.5L8 1" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span style={{ color: 'rgba(240,236,227,0.72)', lineHeight: 1.65, fontSize: '15px' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Testimonial + CTA — centered against the feature list */}
          <Reveal delay={160} style={{ height: '100%' }}>
            <div style={{
              padding: 'clamp(36px, 6vw, 72px)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              alignItems: 'stretch', gap: '24px', height: '100%', boxSizing: 'border-box',
            }}>
              <a
                href="#"
                style={{
                  display: 'block',
                  background: btnHover ? '#d4b87a' : '#c9a96e',
                  color: '#000', padding: '20px 32px', textAlign: 'center',
                  fontSize: '12px', fontWeight: 700, letterSpacing: '0.16em',
                  textTransform: 'uppercase', textDecoration: 'none',
                  transition: 'background 0.2s ease, transform 0.15s ease',
                  transform: btnHover ? 'scale(1.01)' : 'scale(1)',
                }}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
              >
                Begin FitAlign — $249
              </a>

              <p style={{ fontSize: '13px', color: 'rgba(240,236,227,0.32)', lineHeight: 1.6, textAlign: 'center' }}>
                Secure checkout. Lifetime access immediately upon purchase.
              </p>

              <TestimonialSlider />
            </div>
          </Reveal>
        </div>
      </Card>
    </Section>
  )
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────

function FinalCTASection() {
  return (
    <Section>
      <Card style={{ textAlign: 'center', padding: 'clamp(64px, 10vw, 120px) clamp(36px, 6vw, 80px)' }}>
        <Reveal>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.6rem)',
            fontWeight: 400, lineHeight: 1.18, color: '#f0ece3', marginBottom: '24px',
          }}>
            Stop Treating Each Symptom as a Separate Problem
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={{
            color: 'rgba(240,236,227,0.58)', lineHeight: 1.88,
            marginBottom: '44px', fontSize: '1.0625rem',
            maxWidth: '540px', margin: '0 auto 44px',
          }}>
            Learn to recognize how your body is organizing itself and give it a more stable, efficient way to move.
          </p>
        </Reveal>
        <Reveal delay={190}>
          <PrimaryBtn large>Begin FitAlign</PrimaryBtn>
        </Reveal>
      </Card>
    </Section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const [hovered, setHovered] = useState<string | null>(null)

  const FooterLink = ({ id, children, href = '#' }: { id: string; children: string; href?: string }) => (
    <a
      href={href}
      style={{
        display: 'block', fontSize: '14px',
        color: hovered === id ? 'rgba(240,236,227,0.85)' : 'rgba(240,236,227,0.42)',
        marginBottom: '10px', transition: 'color 0.25s ease', textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
    >
      {children}
    </a>
  )

  return (
    <Section style={{ paddingBottom: '10px' }}>
      <Card style={{ padding: 'clamp(36px, 6vw, 64px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', marginBottom: '56px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 400, color: '#f0ece3', letterSpacing: '0.04em', display: 'block', marginBottom: '16px' }}>FitAlign</span>
            <p style={{ fontSize: '13px', color: 'rgba(240,236,227,0.38)', lineHeight: 1.72 }}>
              Movement education grounded in 30+ years of investigation by Michaelle Edwards.
            </p>
          </div>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '18px' }}>Learn</p>
            <FooterLink id="course">The FitAlign Course — $249</FooterLink>
            <FooterLink id="method">How It Works</FooterLink>
            <FooterLink id="about">About Michaelle</FooterLink>
          </div>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '18px' }}>Experience</p>
            <FooterLink id="studio">Flagship Studio</FooterLink>
            <FooterLink id="classes">Weekly Classes</FooterLink>
            <FooterLink id="workshops">Workshops & Retreats</FooterLink>
          </div>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '18px' }}>Teach</p>
            <FooterLink id="cert">Teacher Certification</FooterLink>
            <FooterLink id="dir">Teacher Directory</FooterLink>
            <FooterLink id="pro">For Professionals</FooterLink>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px',
          display: 'flex', flexWrap: 'wrap', gap: '16px',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(240,236,227,0.28)' }}>
            © 2025 FitAlign. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy', 'Terms'].map(l => (
              <a key={l} href="#" style={{ fontSize: '13px', color: 'rgba(240,236,227,0.28)', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </Card>
    </Section>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: '#080808', color: '#f0ece3', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Nav />
      <Hero />
      <ClientBSection />
      <BodyPhilosophySection />
      <StabilitySection />
      <WhyFailsSection />
      <ClientASection />
      <MethodSection />
      <TestimonialSection />
      <AboutSection />
      <CoursePricingSection />
      <FinalCTASection />
      <Footer />
    </div>
  )
}
