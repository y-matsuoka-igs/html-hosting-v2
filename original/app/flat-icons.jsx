// flat-icons.jsx — tone-matched flat SVG icons + emoji→icon mapping
// Usage: <Emo e="🔥" size={16} color="var(--orange)" />  (falls back to nothing if unmapped)
//        <FIcon name="fire" size={16} />

const FLAT_PATHS = {
  // strokes use currentColor; viewBox 0 0 24 24
  megaphone: <><path d="M3 11v2a1 1 0 0 0 1 1h2l4 3.5V6.5L6 10H4a1 1 0 0 0-1 1z"/><path d="M14 8a5 5 0 0 1 0 8"/><path d="M10 18.5 11 21"/></>,
  users:     <><circle cx="9" cy="9" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 6.5a3 3 0 0 1 0 5.5"/><path d="M17 14.5a5.5 5.5 0 0 1 3.5 4.5"/></>,
  rocket:    <><path d="M12 3c3 1.5 5 4.5 5 8l-2 4H9l-2-4c0-3.5 2-6.5 5-8z"/><circle cx="12" cy="9" r="1.6"/><path d="M9 15l-2 4M15 15l2 4M12 15v4"/></>,
  target:    <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/></>,
  bulb:      <><path d="M9 17h6"/><path d="M10 20h4"/><path d="M12 3a6 6 0 0 1 4 10.5c-.6.5-1 1.2-1 2H9c0-.8-.4-1.5-1-2A6 6 0 0 1 12 3z"/></>,
  warning:   <><path d="M12 4 2.5 20h19L12 4z"/><path d="M12 10v4"/><circle cx="12" cy="17.2" r="0.6" fill="currentColor"/></>,
  fire:      <><path d="M12 3c1 3-1.5 4-1.5 6.5C10.5 11 11 12 12 12s2-1.2 1.8-3C15.5 10 17 12 17 14.5a5 5 0 0 1-10 0C7 11 10 9 12 3z"/></>,
  sparkle:   <><path d="M12 3l1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8z"/><path d="M18.5 15.5l.7 2 .8-2 .8 2"/></>,
  sprout:    <><path d="M12 20v-7"/><path d="M12 13C9 13 7 11 7 8c2 0 5 1 5 5z"/><path d="M12 11c0-3 2-5 5-5 0 3-2 5-5 5z"/></>,
  party:     <><path d="M4 20l4-11 7 7-11 4z"/><path d="M8 9l7 7"/><path d="M14 4v2M18 6l1.4-1.4M19 10h2"/></>,
  pencil:    <><path d="M14 5l5 5"/><path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/></>,
  search:    <><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/></>,
  crown:     <><path d="M4 8l3.5 9h9L20 8l-5 4-3-6-3 6-5-4z"/></>,
  palette:   <><path d="M12 3a9 9 0 0 0 0 18c1.5 0 2-1 2-2s-1-2 0-3 3 0 4-1a8 8 0 0 0-6-12z"/><circle cx="8.5" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="7.5" r="1" fill="currentColor"/><circle cx="15.5" cy="10" r="1" fill="currentColor"/></>,
  book:      <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/></>,
  leaf:      <><path d="M5 19c0-8 6-13 14-14-1 9-6 14-14 14z"/><path d="M5 19c3-3 5-5 9-7"/></>,
  compass:   <><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></>,
  handshake: <><path d="M7 11l3-3 4 4 3-2"/><path d="M3 9l4-2 5 5-2 2-3-2"/><path d="M21 9l-4-2"/></>,
  medal:     <><circle cx="12" cy="14" r="5"/><path d="M9 9.5 7 3M15 9.5 17 3M10.5 3h3"/><path d="M12 12.2l.7 1.4 1.5.2-1.1 1 .3 1.5-1.4-.8-1.4.8.3-1.5-1.1-1 1.5-.2z" fill="currentColor" stroke="none"/></>,
  star:      <><path d="M12 3.5l2.6 5.3 5.9.86-4.25 4.14 1 5.86L12 17.1l-5.25 2.76 1-5.86L3.5 9.66l5.9-.86z"/></>,
  check:     <><circle cx="12" cy="12" r="8.5"/><path d="M8 12.5l2.5 2.5L16 9.5"/></>,
  copy:      <><rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5V4.5A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5"/></>,
  footsteps: <><path d="M7 4c1.5 0 2 1.5 2 3s-.3 4-2 4-2-2.5-2-4 .5-3 2-3z"/><path d="M6 15c2 0 3 .8 3 2.2S8 20 6.5 20 4 18.5 4 17.2 4.5 15 6 15z"/><path d="M17 7c1.5 0 2 1.5 2 3s-.3 4-2 4-2-2.5-2-4 .5-3 2-3z"/></>,
  sunrise:   <><path d="M3 18h18"/><path d="M8 18a4 4 0 0 1 8 0"/><path d="M12 6V3M5 9 6.5 10.5M19 9l-1.5 1.5"/></>,
  calendar:  <><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/></>,
  bolt:      <><path d="M13 3 5 13h5l-1 8 8-11h-5z"/></>,
  hundred:   <><path d="M5 8v8M3.5 9.5 5 8M9 8v8M14 8a2 2 0 0 1 2 2v4a2 2 0 0 1-4 0v-4a2 2 0 0 1 2-2zM21 8a2 2 0 0 1 2 2"/><circle cx="20" cy="12" r="2.5"/></>,
  gem:       <><path d="M6 4h12l3 5-9 11L3 9z"/><path d="M3 9h18M9 4 7 9l5 11 5-11-2-5"/></>,
  crystal:   <><circle cx="12" cy="10" r="6"/><path d="M7 18h10l-1.5 3h-7z"/><path d="M9.5 8a2.5 2.5 0 0 1 2.5-2" /></>,
  gift:      <><rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M4 13h16M12 9v11"/><path d="M12 9C9 9 8 4 12 4c4 0 3 5 0 5z" fill="none"/></>,
  chart:     <><path d="M4 20V4M4 20h16"/><rect x="7" y="12" width="3" height="5"/><rect x="12" y="8" width="3" height="9"/><rect x="17" y="5" width="3" height="12"/></>,
  link:      <><path d="M9.5 14.5 14.5 9.5"/><path d="M11 7l1-1a3.5 3.5 0 0 1 5 5l-1 1"/><path d="M13 17l-1 1a3.5 3.5 0 0 1-5-5l1-1"/></>,
  camera:    <><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l1.5-2.5h5L16 7"/></>,
  chat:      <><path d="M4 5h16v11H9l-4 3.5V16H4z"/></>,
  mail:      <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/></>,
  flag:      <><path d="M6 21V4"/><path d="M6 4h11l-2 3.5L17 11H6z"/></>,
  trophy:    <><path d="M8 4h8v4a4 4 0 0 1-8 0z"/><path d="M8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3"/><path d="M12 12v4M9 20h6M10 20l.5-4h3l.5 4"/></>,
  heart:     <><path d="M12 20S4 14.5 4 9a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5.5-8 11-8 11z"/></>,
  clip:      <><rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H9z"/><path d="M9 11h6M9 15h4"/></>,
  lock:      <><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  flower:    <><circle cx="12" cy="12" r="2.2"/><path d="M12 9.8C12 7 13 5 12 3c-1 2 0 4 0 6.8zM12 14.2C12 17 11 19 12 21c1-2 0-4 0-6.8zM9.8 12C7 12 5 11 3 12c2 1 4 0 6.8 0zM14.2 12C17 12 19 13 21 12c-2-1-4 0-6.8 0z"/></>,
  bell:      <><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/></>,
  hourglass: <><path d="M7 4h10M7 20h10"/><path d="M7 4c0 4 5 5 5 8M17 4c0 4-5 5-5 8M7 20c0-4 5-5 5-8M17 20c0-4-5-5-5-8"/></>,
};

// emoji → flat icon name
const EMOJI_TO_ICON = {
  '📣':'megaphone','👥':'users','🚀':'rocket','🎯':'target','💡':'bulb','⚠️':'warning','⚠':'warning',
  '🔥':'fire','✨':'sparkle','🌱':'sprout','🎉':'party','✏️':'pencil','✏':'pencil','🔍':'search',
  '👑':'crown','🎨':'palette','📖':'book','🌿':'leaf','🧭':'compass','🤝':'handshake','🏅':'medal',
  '🌟':'star','⭐':'star','✅':'check','👣':'footsteps','🌅':'sunrise','📅':'calendar','⚡':'bolt',
  '💯':'hundred','💎':'gem','🔮':'crystal','🦄':'sparkle','🎁':'gift','📊':'chart','🔗':'link',
  '📸':'camera','📗':'chat','✉️':'mail','✉':'mail','🚩':'flag','🏆':'trophy','💬':'chat','💭':'chat',
  '🏟️':'trophy','🎧':'star','🕹️':'star','🛠️':'palette','🖌️':'palette','📝':'pencil','📹':'camera',
  '🧪':'search','🏛️':'book','🎭':'palette','💼':'book','❔':'sparkle','♟️':'target','🌳':'leaf',
  '🎵':'star','⚽':'target','🎮':'star','🔧':'palette','🙌':'sparkle','💪':'bolt','🤖':'chat',
};

function FIcon({ name, size = 18, sw = 1.8, color }) {
  const p = FLAT_PATHS[name];
  if (!p) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color || 'currentColor'} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
      {p}
    </svg>
  );
}

// Render an emoji as a flat icon. If unmapped, render nothing (caller can fallback).
function Emo({ e, size = 18, sw = 1.8, color }) {
  const name = EMOJI_TO_ICON[e];
  if (!name) return null;
  return <FIcon name={name} size={size} sw={sw} color={color} />;
}

Object.assign(window, { FIcon, Emo, EMOJI_TO_ICON, FLAT_PATHS });
