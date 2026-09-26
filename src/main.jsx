import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import confetti from "canvas-confetti";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Camera,
  Heart,
  Mail,
  Music2,
  Pause,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import "./style.css";
import { siteContent } from "./siteContent";

function Gate({ onAccept }) {
  const [noPosition, setNoPosition] = useState(null);
  const [tip, setTip] = useState("");
  const tips = siteContent.gate.noTips;

  function dodge() {
    setNoPosition({
      left: `${Math.random() * Math.max(0, window.innerWidth - 160)}px`,
      top: `${Math.random() * Math.max(0, window.innerHeight - 64)}px`,
    });
    setTip(tips[Math.floor(Math.random() * tips.length)]);
    window.setTimeout(() => setTip(""), 900);
  }

  function accept() {
    confetti({ particleCount: 140, spread: 85, origin: { y: 0.62 }, colors: ["#f472b6", "#38bdf8", "#f9a8d4", "#7dd3fc"] });
    onAccept();
  }

  return (
    <div className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate-paper">
        <span className="gate-mark"><Heart size={20} fill="currentColor" /></span>
        <p className="eyebrow">{siteContent.gate.eyebrow}</p>
        <h1 id="gate-title">{siteContent.entryQuestion}</h1>
        <p className="gate-note">{siteContent.gate.note}</p>
        <div className="gate-actions">
          <button className="button button-primary" onClick={accept}>{siteContent.gate.yesButton} <Heart size={16} /></button>
          <button
            className="button button-secondary"
            style={noPosition ? { ...noPosition, position: "fixed", zIndex: 25 } : undefined}
            aria-label={siteContent.accessibility.noButton}
            onPointerEnter={(event) => { if (event.pointerType === "mouse") dodge(); }}
            onClick={(event) => { event.preventDefault(); dodge(); }}
          >{siteContent.gate.noButton} <span aria-hidden="true">🙅‍♂️</span></button>
        </div>
        <span className="gate-tip" aria-live="polite">{tip}</span>
        <span className="gate-date">{siteContent.gate.footer}</span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href={siteContent.header.homeHref} aria-label={siteContent.accessibility.home}><span className="wordmark-icon"><Heart size={16} fill="currentColor" /></span><span>{siteContent.header.brandLineOne}<br />{siteContent.header.brandLineTwo}</span></a>
      <nav aria-label="Main navigation">
        {siteContent.header.links.map((link, index) => <a href={link.href} key={link.href}>{link.label}{index === 2 && <ArrowUpRight size={14} />}</a>)}
      </nav>
      <span className="header-date">{siteContent.header.issue} <span>·</span> {siteContent.header.edition}</span>
    </header>
  );
}

function Hero() {
  const firstMemory = siteContent.memories[0];
  return (
    <section className="hero page-width scroll-reveal" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><Sparkles size={14} /> {siteContent.hero.eyebrow}</p>
        <h1>{siteContent.hero.title}<br /><span className="hero-name">{siteContent.girlfriendName}.</span></h1>
        <p className="hero-intro">{siteContent.hero.intro}</p>
        <a className="text-link" href={siteContent.hero.memoriesHref}>{siteContent.hero.link} <ArrowDown size={16} /></a>
        <div className="hero-index"><span>{siteContent.hero.indexNumber}</span><span>{siteContent.hero.index}</span><span className="index-rule" /></div>
      </div>
      <div className="hero-visual">
        <div className="hero-photo-frame">
          <span className="tape tape-one" aria-hidden="true" />
          <img src={siteContent.hero.imageUrl} alt={firstMemory.alt} />
          <span className="photo-caption">{siteContent.hero.imageCaption}</span>
        </div>
        <div className="hero-note"><span>{siteContent.hero.note}</span><Heart size={19} fill="currentColor" /></div>
        <span className="hero-scribble" aria-hidden="true">{siteContent.hero.scribble}</span>
      </div>
    </section>
  );
}

function SectionHeading({ number, eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="section-number">{number}</span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
    </div>
  );
}

function Memories() {
  return (
    <section className="memories-section page-width" id="memories">
      <SectionHeading {...siteContent.memoriesSection} />
      <div className="memory-grid">
        {siteContent.memories.map((memory, index) => (
          <article className={`memory memory-${index + 1} ${index % 2 === 1 ? "memory-reversed" : ""} scroll-reveal`} key={memory.title}>
            <div className="memory-photo"><span className="tape" aria-hidden="true" /><img src={memory.imageUrl} alt={memory.alt} loading={index === 0 ? "eager" : "lazy"} /><span className="photo-number">{String(index + 1).padStart(2, "0")}</span></div>
            <div className="memory-copy">
              <p className="memory-tag"><Camera size={12} /> {memory.tag}</p>
              <h3>{memory.title}</h3>
              <p className="memory-date">{memory.date}</p>
              <p className="memory-caption">{memory.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LoveIndex() {
  return (
    <section className="love-index scroll-reveal" aria-labelledby="love-index-title">
      <div className="page-width love-index-inner">
        <div className="love-index-heading"><p className="eyebrow">{siteContent.telemetry.eyebrow}</p><h2 id="love-index-title">{siteContent.telemetry.title}</h2><p><span className="live-dot" /> {siteContent.telemetry.status}</p></div>
        <div className="stats-row">
          {siteContent.telemetry.stats.map((stat) => {
            const percentage = Math.min(Number.parseFloat(stat.value) || 0, 100);
            return (
              <div className="stat" key={stat.label}>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
                <div className="stat-meter" role="progressbar" aria-label={stat.label} aria-valuemin="0" aria-valuemax="100" aria-valuenow={percentage}>
                  <span className="stat-meter-fill" style={{ width: `${percentage}%` }} />
                </div>
                <span className="stat-note">{stat.note}</span>
              </div>
            );
          })}
        </div>
        <div className="counter-grid">{siteContent.telemetry.counters.map((item) => <div className="counter" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
      </div>
    </section>
  );
}

function LittleThings() {
  return (
    <section className="little-section page-width" id="little-things">
      <SectionHeading {...siteContent.littleThingsSection} />
      <div className="note-grid">{siteContent.littleThingsSection.notes.map((item, index) => <article className={`note note-${index + 1} scroll-reveal`} key={item.title}><span className="note-index">{siteContent.littleThingsSection.noteLabel} {String(index + 1).padStart(2, "0")}</span><span className="note-emoji" aria-hidden="true">{item.emoji}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
    </section>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    function updateTime() {
      setCurrentTime(audio.currentTime);
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    }
    function ended() { setPlaying(false); }
    function failed() { setError(true); setPlaying(false); }
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    audio.addEventListener("ended", ended);
    audio.addEventListener("error", failed);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
      audio.removeEventListener("ended", ended);
      audio.removeEventListener("error", failed);
    };
  }, []);

  async function togglePlayback() {
    if (playing) { audioRef.current.pause(); setPlaying(false); return; }
    try { await audioRef.current.play(); setPlaying(true); setError(false); }
    catch { setError(true); }
  }

  function seek(event) {
    const value = Number(event.target.value);
    if (audioRef.current.duration) audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    setProgress(value);
  }

  return (
    <section className="music-section page-width scroll-reveal" id="soundtrack">
      <div className="music-copy"><p className="eyebrow"><Music2 size={14} /> {siteContent.soundtrack.eyebrow}</p><h2>{siteContent.soundtrack.heading}<br />{siteContent.soundtrack.subheading}</h2><p>{siteContent.soundtrack.description}</p></div>
      <div className="player">
        <audio ref={audioRef} src={siteContent.soundtrack.audioUrl} preload="metadata" loop />
        <div className={`record ${playing ? "record-playing" : ""}`} aria-hidden="true"><img src={siteContent.soundtrack.artworkUrl} alt="" /><span>✿</span></div>
        <div className="track-meta"><strong>{siteContent.soundtrack.title}</strong><span>{siteContent.soundtrack.artist}</span><span className="side-label">{siteContent.soundtrack.mixLabel}</span></div>
        <div className="player-controls"><button className="icon-button play-button" onClick={togglePlayback} aria-label={playing ? siteContent.accessibility.pauseMusic : siteContent.accessibility.playMusic}>{playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}</button><div className="track-progress"><input type="range" min="0" max="100" value={progress} onChange={seek} aria-label={siteContent.accessibility.progress} /><div className="time-row"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div></div></div>
        {error && <span className="audio-error" role="status">{siteContent.soundtrack.errorMessage}</span>}
      </div>
    </section>
  );
}

function Letter() {
  return (
    <section className="letter-section page-width" id="letter">
      <article className="letter-paper scroll-reveal"><div className="letter-meta"><span>{siteContent.loveLetter.eyebrow}</span><Mail size={18} /></div><h2>{siteContent.loveLetter.title}</h2><div className="letter-body">{siteContent.loveLetter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><p className="letter-sign">{siteContent.loveLetter.signOff}<br /><span>{siteContent.loveLetter.signature}</span></p><span className="letter-stamp" aria-hidden="true">{siteContent.loveLetter.stampTop}<br />{siteContent.loveLetter.stampBottom}</span></article>
    </section>
  );
}

function SurpriseButton({ onClick }) {
  return (
    <section className="surprise-cta page-width scroll-reveal" aria-label={siteContent.accessibility.surprise}>
      <p className="eyebrow"><Sparkles size={14} /> {siteContent.surprise.eyebrow}</p>
      <button className="surprise-button" onClick={onClick}><Sparkles size={16} /> {siteContent.surprise.button}</button>
    </section>
  );
}

function Surprise({ seconds, onClose }) {
  return (
    <div className="surprise-backdrop" role="dialog" aria-modal="true" aria-labelledby="surprise-title">
      <div className="surprise-paper"><button className="icon-button close-surprise" onClick={onClose} aria-label={siteContent.accessibility.closeSurprise}><X size={18} /></button>
        {seconds === 0 ? <><img className="surprise-gif" src={siteContent.surprise.gifUrl} alt={siteContent.accessibility.surprise} /><p className="eyebrow">{siteContent.surprise.resultEyebrow}</p><h2 id="surprise-title">{siteContent.surprise.resultMessage}</h2></> : <><span className="surprise-icon"><Sparkles size={24} /></span><p className="eyebrow">{siteContent.surprise.modalEyebrow}</p><h2 id="surprise-title">Febrian {siteContent.surprise.countdownPrefix} <span>{seconds}</span></h2></>}
        <button className="text-link" onClick={onClose}>{siteContent.surprise.closeLink} <ArrowUpRight size={15} /></button>
      </div>
    </div>
  );
}

function LoveParticles() {
  return (
    <div className="love-particles" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => <Heart className={`love-particle love-particle-${index + 1}`} key={index} />)}
    </div>
  );
}

function App() {
  const [accepted, setAccepted] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [prizeSeconds, setPrizeSeconds] = useState(null);

  useEffect(() => {
    document.body.classList.toggle("page-locked", !accepted);
    return () => document.body.classList.remove("page-locked");
  }, [accepted]);

  useEffect(() => {
    if (!accepted) return undefined;
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".scroll-reveal").forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, [accepted]);

  useEffect(() => {
    function onScroll() { setShowTop(window.scrollY > 550); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (prizeSeconds === null) return undefined;
    const timer = window.setTimeout(() => {
      if (prizeSeconds === 0) setPrizeSeconds(null);
      else setPrizeSeconds((seconds) => seconds - 1);
    }, prizeSeconds === 0 ? 5000 : 1000);
    return () => window.clearTimeout(timer);
  }, [prizeSeconds]);

  return (
    <div className={`app ${accepted ? "app-ready" : "app-locked"}`}>
      <LoveParticles />
      <Header />
      <main><Hero /><Memories /><LoveIndex /><LittleThings /><MusicPlayer /><Letter /><SurpriseButton onClick={() => setPrizeSeconds(10)} /></main>
      <footer className="site-footer"><span>{siteContent.footer.madeFor} {siteContent.girlfriendName}, {siteContent.footer.signoff}</span><a href={siteContent.footer.backToTopHref} aria-label={siteContent.accessibility.backToTop}><ArrowUp size={16} /></a><span>{new Date().getFullYear()} · {siteContent.footer.finalNote}</span></footer>
      <button className={`back-top ${showTop ? "back-top-visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={siteContent.accessibility.backToTop}><ArrowUp size={18} /></button>
      {prizeSeconds !== null && <Surprise seconds={prizeSeconds} onClose={() => setPrizeSeconds(null)} />}
      {!accepted && <Gate onAccept={() => setAccepted(true)} />}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
