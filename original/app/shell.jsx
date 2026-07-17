// shell.jsx — device frame, status bar, bottom nav, icons, shared UI primitives
const { useState, useEffect, useRef, createContext, useContext } = React;

/* ─────────── Navigation context ─────────── */
const NavCtx = createContext(null);
const useNav = () => useContext(NavCtx);

/* ─────────── Icons (stroke, currentColor) ─────────── */
function Icon({ name, size = 24, sw = 2 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    home:   <><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/></>,
    clip:   <><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H9z"/><path d="M9 11h6M9 15h4"/></>,
    book:   <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/></>,
    grid:   <><rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/></>,
    back:   <path d="M15 5l-7 7 7 7"/>,
    close:  <path d="M6 6l12 12M18 6 6 18"/>,
    chevR:  <path d="M9 5l7 7-7 7"/>,
    check:  <path d="M5 12.5l4.5 4.5L19 7"/>,
    star:   <path d="M12 3.5l2.6 5.3 5.9.86-4.25 4.14 1 5.86L12 17.1l-5.25 2.76 1-5.86L3.5 9.66l5.9-.86z"/>,
    sparkle:<><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M6.5 6.5l2.5 2.5M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5"/></>,
    lock:   <><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    user:   <><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></>,
    chat:   <path d="M4 5h16v11H9l-4 3.5V16H4z"/>,
    bell:   <><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/></>,
    tree:   <><path d="M12 21v-6"/><path d="M12 15c-4 0-6-2.5-6-5.5C6 6 8.7 3 12 3s6 3 6 6.5c0 3-2 5.5-6 5.5z"/></>,
    leaf:   <path d="M5 19c0-8 6-13 14-14-1 9-6 14-14 14zM5 19c3-3 5-5 9-7"/>,
  };
  return <svg {...p}>{paths[name]}</svg>;
}

/* ─────────── Device frame + scaling ─────────── */
function Device({ children, tweaks }) {
  const wrapRef = useRef(null);
  useEffect(() => {
    const fit = () => {
      const pad = 28;
      const vw = window.innerWidth - pad * 2;
      const vh = window.innerHeight - pad * 2;
      const s = Math.min(1, vw / 414, vh / 868);
      if (wrapRef.current) wrapRef.current.style.transform = `scale(${s})`;
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return (
    <div id="stage">
      <div id="device-scaler" ref={wrapRef}>
        <div className="device" style={{ fontFamily: tweaks ? tweaks._bodyFont : undefined }}>
          <div className="device__island"></div>
          <div className="device__screen">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Status bar ─────────── */
function StatusBar({ dark }) {
  return (
    <div className={'statusbar' + (dark ? ' on-dark' : '')}>
      <span>9:41</span>
      <span className="statusbar__right">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="5" y="4" width="3" height="8" rx="1"/><rect x="10" y="1.5" width="3" height="10.5" rx="1"/><rect x="14.5" y="6" width="3" height="6" rx="1" opacity=".35"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.4c2 0 3.8.8 5.1 2.1l1-1A8.7 8.7 0 0 0 8 .8 8.7 8.7 0 0 0 1.9 3.5l1 1A7.2 7.2 0 0 1 8 2.4z"/><path d="M8 5.6c1.1 0 2.1.45 2.85 1.2l1-1A5.5 5.5 0 0 0 8 4a5.5 5.5 0 0 0-3.85 1.8l1 1A4 4 0 0 1 8 5.6z"/><circle cx="8" cy="9.6" r="1.7"/></svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="1" y="1.5" width="21" height="10" rx="3" stroke="currentColor" strokeWidth="1.2" opacity=".5"/><rect x="3" y="3.3" width="16" height="6.4" rx="1.5" fill="currentColor"/><rect x="23.2" y="4.6" width="1.8" height="3.8" rx="1" fill="currentColor" opacity=".6"/></svg>
      </span>
    </div>
  );
}

/* ─────────── App header ─────────── */
function AppHeader({ sub, left, right }) {
  return (
    <div className="appbar">
      {left || (
        <div className="logo"><span className="ai">Ai</span><span className="grow">GROW</span>{sub && <span className="sub">{sub}</span>}</div>
      )}
      {right || <div style={{ width: 24 }}></div>}
    </div>
  );
}

/* ─────────── Bottom nav ─────────── */
const NAV_TABS = [
  { key: 'home',     label: 'ホーム',     icon: 'home' },
  { key: 'exam',     label: '受検',       icon: 'clip' },
  { key: 'torisetsu',label: 'トリセツ',   icon: 'book' },
  { key: 'contents', label: 'コンテンツ', icon: 'grid' },
];
function BottomNav({ active, onTab, badges = {} }) {
  return (
    <div className="botnav">
      {NAV_TABS.map(t => (
        <button key={t.key} className={'botnav__item' + (active === t.key ? ' active' : '')} onClick={() => onTab(t.key)}>
          <span className="botnav__icon">
            <Icon name={t.icon} size={23} sw={active === t.key ? 2.4 : 2} />
            {badges[t.key] && <span className="botnav__dot"></span>}
          </span>
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ─────────── Shared UI primitives ─────────── */
function Pill({ children, bg, color, style }) {
  return <span className="pill" style={{ background: bg, color, ...style }}>{children}</span>;
}
function Progress({ value, color }) {
  return (
    <div className="progress">
      <div className="progress__fill" style={{ width: `${value}%`, background: color }}></div>
    </div>
  );
}
// Big friendly mascot blob (placeholder character used across screens)
function Mascot({ size = 80, mood = 'happy' }) {
  const eyes = mood === 'wow'
    ? <><circle cx="38" cy="52" r="6"/><circle cx="62" cy="52" r="6"/></>
    : <><path d="M32 52q6 7 12 0" stroke="#1a3a52" strokeWidth="4" fill="none" strokeLinecap="round"/><path d="M56 52q6 7 12 0" stroke="#1a3a52" strokeWidth="4" fill="none" strokeLinecap="round"/></>;
  return (
    <svg width={size} height={size} viewBox="0 0 100 110">
      <rect x="22" y="14" width="56" height="84" rx="16" fill="#fff" stroke="#1aa6ff" strokeWidth="4"/>
      <rect x="30" y="22" width="40" height="52" rx="8" fill="#e7f4ff"/>
      <g fill="#1a3a52">{mood === 'wow' ? eyes : null}</g>
      {mood !== 'wow' && <g>{eyes}</g>}
      <circle cx="36" cy="64" r="4" fill="#ffb1c8"/><circle cx="64" cy="64" r="4" fill="#ffb1c8"/>
      <path d="M44 70q6 5 12 0" stroke="#1a3a52" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <text x="50" y="90" textAnchor="middle" fontFamily="M PLUS Rounded 1c" fontWeight="800" fontSize="13" fill="#0096fa">Ai</text>
    </svg>
  );
}

Object.assign(window, {
  NavCtx, useNav, Icon, Device, StatusBar, AppHeader,
  BottomNav, NAV_TABS, Pill, Progress, Mascot,
});
