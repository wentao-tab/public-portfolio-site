import { useLayoutEffect, useRef, useState } from 'react';
import './AboutIntro.css';

const seenKey = 'wentao.about-film.seen.v1';
let seenInMemory = false;
const labels = {
  'zh-CN': ['关于 Wentao', '重播短片', '进入关于', '开启声音', '关闭声音', '有声播放', '暂停', '播放'],
  'zh-TW': ['關於 Wentao', '重播短片', '進入關於', '開啟聲音', '關閉聲音', '有聲播放', '暫停', '播放'],
  en: ['About Wentao', 'Replay film', 'Enter About', 'Sound on', 'Sound off', 'Play with sound', 'Pause', 'Play'],
};

export default function AboutIntro({ lang }: { lang: string }) {
  const [title, replay, enter, soundOn, soundOff, playFilm, pause, play] = labels[lang as keyof typeof labels] ?? labels.en;
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  useLayoutEffect(() => {
    let seen = seenInMemory;
    try { seen ||= localStorage.getItem(seenKey) === '1'; } catch { /* Storage can be disabled. */ }
    if (!seen) setOpen(true);
  }, []);
  useLayoutEffect(() => {
    if (!open) return;
    const modal = dialog.current!;
    const video = player.current!;
    modal.showModal();
    seenInMemory = true;
    try { localStorage.setItem(seenKey, '1'); } catch { /* Retain the in-memory flag. */ }
    video.play().catch(() => setPaused(true));
    return () => { video.pause(); modal.close(); };
  }, [open]);

  const startReplay = () => {
    setProgress(0);
    setPaused(false);
    setOpen(true);
  };
  const togglePlay = () => {
    const video = player.current!;
    if (video.paused) video.play().catch(() => setPaused(true));
    else video.pause();
  };

  return <>
    <button type="button" className="afi-replay" onClick={startReplay}>
      <span aria-hidden="true">▷</span>{replay}<small>00:15</small>
    </button>
    {open && <dialog className="afi-stage" ref={dialog} aria-label={title}
      onCancel={e => { e.preventDefault(); setOpen(false); }}>
      <div className="afi-screen">
        <header className="afi-bar"><span className="afi-name"><i aria-hidden="true" />Wentao</span><span>{title}</span></header>
        <div className="afi-picture">
          <video ref={player} src="/about-film/wentao.mp4?v=1080" poster="/about-film/poster.jpg?v=1080" playsInline muted={muted}
            onPlay={() => setPaused(false)} onPause={() => setPaused(true)}
            onTimeUpdate={e => setProgress(e.currentTarget.currentTime)}
            onEnded={() => setOpen(false)} onError={() => setOpen(false)} />
          {paused && <button type="button" className="afi-play" onClick={togglePlay}>{muted || progress > 0 ? play : playFilm} ▷</button>}
        </div>
        <footer className="afi-controls">
          <div className="afi-track" aria-hidden="true"><b style={{transform:'scaleX('+ Math.min(progress / 15, 1) +')'}} /></div>
          <div className="afi-actions">
            <button type="button" onClick={togglePlay}>{paused ? play : pause}</button>
            <button type="button" onClick={() => setMuted(!muted)}>{muted ? soundOn : soundOff}</button>
            <span className="afi-time">00:{String(Math.floor(Math.min(progress,15))).padStart(2,'0')} / 00:15</span>
            <button type="button" className="afi-enter" onClick={() => setOpen(false)}>{enter} <span aria-hidden="true">→</span></button>
          </div>
        </footer>
      </div>
    </dialog>}
  </>;
}
