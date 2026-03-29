import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './SocialProof.css'

const VIDEOS = [
  {
    id: 'lekH0NWRGFI',
    title: 'The Origin Story',
    description: 'How Injester was born — from frustration with HTML soup to a self-improving AI pipeline.',
    badge: 'ORIGIN',
    badgeClass: 'badge-orange',
  },
  {
    id: 'W-fnWNbSQz0',
    title: 'Ray Fernando\'s Highlight at Nebius.build',
    description: 'First place at Nebius.build hackathon. Watch Ray Fernando break down the winning demo.',
    badge: '1ST PLACE',
    badgeClass: 'badge-green',
    start: 3552,
  },
  {
    id: 'UMEB6bWccVQ',
    title: 'Live at NVIDIA GTC Booth',
    description: 'Injester demoed live at the NVIDIA GTC Nebius booth — real-time extraction and optimization.',
    badge: 'GTC 2026',
    badgeClass: 'badge-blue',
  },
]

const PRESS_ITEMS = [
  {
    title: 'First place at Nebius.build',
    subtitle: 'March 15, 2026',
    icon: '🏆',
    link: null,
  },
  {
    title: 'Demoed at NVIDIA GTC',
    subtitle: 'Nebius Booth — March 2026',
    icon: '🎪',
    link: null,
  },
  {
    title: 'Agent Web Protocol',
    subtitle: 'agentwebprotocol.org',
    icon: '🌐',
    link: 'https://www.agentwebprotocol.org/',
  },
]

const PARTNERS = [
  { name: 'Nebius', svg: null },
  { name: 'Tavily', svg: null },
  { name: 'NVIDIA', svg: null },
]

export default function SocialProof() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.social-title',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )

      gsap.fromTo(
        '.video-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, scrollTrigger: { trigger: '.video-grid', start: 'top 75%' } }
      )

      gsap.fromTo(
        '.press-item',
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, scrollTrigger: { trigger: '.press-row', start: 'top 80%' } }
      )

      gsap.fromTo(
        '.partner-logo',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, stagger: 0.1, scrollTrigger: { trigger: '.partners', start: 'top 85%' } }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="social-section">
      <div className="social-inner">
        <span className="label label-purple">IN THE WILD</span>
        <h2 className="social-title">
          Watch it in action
        </h2>

        {/* Video grid */}
        <div className="video-grid">
          {VIDEOS.map((video) => (
            <div key={video.id} className="video-card">
              <div className="video-embed">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}${video.start ? `?start=${video.start}` : ''}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="video-info">
                <div className="video-header">
                  <span className={`video-badge mono ${video.badgeClass}`}>{video.badge}</span>
                </div>
                <h3 className="video-title">{video.title}</h3>
                <p className="video-desc">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Press / social proof row */}
        <div className="press-row">
          {PRESS_ITEMS.map((item, i) => {
            const Tag = item.link ? 'a' : 'div'
            const extraProps = item.link ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' } : {}
            return (
              <Tag key={i} className="press-item" {...extraProps}>
                <span className="press-icon">{item.icon}</span>
                <div className="press-text">
                  <span className="press-title">{item.title}</span>
                  <span className="press-subtitle">{item.subtitle}</span>
                </div>
                {item.link && <span className="press-arrow">→</span>}
              </Tag>
            )
          })}
        </div>

        {/* Partners */}
        <div className="partners">
          <span className="partners-label mono">RUNNING ON</span>
          <div className="partner-row">
            {PARTNERS.map((p, i) => (
              <span key={i} className="partner-logo mono">{p.name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
