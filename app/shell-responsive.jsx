// shell-responsive.jsx — レスポンシブシェル（デバイスフレームなし）
// DesignSystem: spec tokens only (DS project empty)
const { useState: useStateR, useEffect: useEffectR, useRef: useRefR, createContext: createContextR, useContext: useContextR } = React;

/* ─────────── Navigation context ─────────── */
const NavCtx = createContextR(null);
const useNav = () => useContextR(NavCtx);

/* ─────────── Icons ─────────── */
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
    flag:   <><path d="M4 21V4"/><path d="M4 4h12l-3 5 3 5H4"/></>,
  };
  return <svg {...p}>{paths[name]}</svg>;
}

/* ─────────── Responsive app wrapper (no device frame) ─────────── */
function Device({ children }) {
  return (
    <div id="app-root">
      {children}
    </div>
  );
}

/* ─────────── Status bar → safe-area spacer only ─────────── */
function StatusBar({ dark }) {
  // On real devices, OS shows its own status bar. We just provide a safe-area spacer.
  return <div className="safe-area-top"></div>;
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
  { key: 'home',      label: 'ホーム',      icon: 'home' },
  { key: 'exam',      label: '受検',        icon: 'clip' },
  { key: 'challenge', label: 'チャレンジ',  icon: 'flag' },
  { key: 'record',    label: 'きろく',      icon: 'book' },
  { key: 'contents',  label: 'コンテンツ',  icon: 'grid' },
];
function BottomNav({ active, onTab, badges = {}, locked = false }) {
  return (
    <div className="botnav">
      {NAV_TABS.map(t => {
        const isActive = active === t.key;
        const isDisabled = locked && !isActive;
        return (
          <button key={t.key}
            className={'botnav__item' + (isActive ? ' active' : '')}
            onClick={() => !isDisabled && onTab(t.key)}
            style={{ opacity: isDisabled ? 0.35 : 1, cursor: isDisabled ? 'default' : 'pointer', position: 'relative' }}>
            <span className="botnav__icon">
              <Icon name={t.icon} size={23} sw={isActive ? 2.4 : 2} />
              {badges[t.key] && !isDisabled && <span className="botnav__dot"></span>}
              {isDisabled && (
                <span style={{ position: 'absolute', top: -3, right: -5, fontSize: 10 }}>🔒</span>
              )}
            </span>
            {t.label}
          </button>
        );
      })}
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
