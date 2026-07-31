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
    school: <><path d="M4 20V10l8-5 8 5v10"/><path d="M4 20h16"/><path d="M10 20v-5h4v5"/></>,
    chat:   <path d="M4 5h16v11H9l-4 3.5V16H4z"/>,
    bell:   <><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/></>,
    tree:   <><path d="M12 21v-6"/><path d="M12 15c-4 0-6-2.5-6-5.5C6 6 8.7 3 12 3s6 3 6 6.5c0 3-2 5.5-6 5.5z"/></>,
    leaf:   <path d="M5 19c0-8 6-13 14-14-1 9-6 14-14 14zM5 19c3-3 5-5 9-7"/>,
    flag:   <><path d="M4 21V4"/><path d="M4 4h12l-3 5 3 5H4"/></>,
    menu:   <path d="M4 7h16M4 12h16M4 17h16"/>,
    help:   <><circle cx="12" cy="12" r="9"/><path d="M9.2 9.3a2.9 2.9 0 0 1 5.6 1c0 1.9-2.8 2.2-2.8 4"/><path d="M12 17.5h.01"/></>,
    globe:  <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"/></>,
    info:   <><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></>,
    logout: <><path d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3"/><path d="M16 17l5-5-5-5M21 12H9"/></>,
    report: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></>,
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

/* ─────────── AiGROW official logo ─────────── */
function Logo({ height = 22, style }) {
  return <img src="assets/logo-aigrow.svg" alt="AiGROW" style={{ height, width: 'auto', display: 'block', ...style }} />;
}

const FAQ_ITEMS = [
  { q: '回答した内容をあとから直せますか？', a: '一度回答した質問には戻れません。ゆっくり考えてから答えてね。次の受検期間ではまた新しく回答できるよ。' },
  { q: 'トリセツが表示されないのはなぜ？', a: '気質診断・自己評価・まわりからの相互評価がすべてそろうとトリセツが解放されます。相手の回答を待っている間は表示できません。' },
  { q: '評価をお願いできる人数に上限はある？', a: '1回の受検期間で最大10人までリクエストできます。断られた場合はその枠がもどるので、別の友だちに送れます。' },
  { q: '評価した内容は相手に知られる？', a: '誰がどう評価したかは相手に見えません。集計された結果だけがトリセツに反映されます。安心して正直に答えてね。' },
  { q: '受検期間を過ぎてしまったら？', a: '期間を過ぎた受検には回答できません。先生から次の期間が設定されるとホームに通知が届きます。' },
  { q: '途中で画面を閉じても大丈夫？', a: 'そこまでの回答は保存されています。受検タブから同じコースを選ぶと、続きから再開できます。' },
];

/* ─────────── Header hamburger menu（右からスライドイン） ─────────── */
function HeaderMenu({ dark, langOnly }) {
  const nav = useNav();
  const userName = nav && nav.state && nav.state.userName;
  const [about, setAbout] = useStateR(false);
  const [faq, setFaq] = useStateR(false);
  const [openQ, setOpenQ] = useStateR(null);
  const [open, setOpen] = useStateR(false);
  const [lang, setLang] = useStateR('ja');
  const [confirmOut, setConfirmOut] = useStateR(false);
  useEffectR(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  const item = { display: 'flex', alignItems: 'center', gap: 12, width: '100%', border: 'none', background: 'none', cursor: 'pointer', padding: '13px 14px', borderRadius: 12, fontSize: 14.5, fontWeight: 700, fontFamily: 'var(--font)', color: 'var(--text)', textAlign: 'left', WebkitTapHighlightColor: 'transparent' };
  return (
    <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
      <button aria-label="メニュー" onClick={() => { setAbout(false); setFaq(false); setOpen(true); }}
        style={{ width: 38, height: 38, borderRadius: 12, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: dark ? 'rgba(255,255,255,.2)' : 'var(--bg)', color: dark ? '#fff' : 'var(--text)', WebkitTapHighlightColor: 'transparent' }}>
        <Icon name="menu" size={20} />
      </button>

      {/* Backdrop (constrained to the app column) */}
      <div onClick={() => setOpen(false)}
        style={{ position: 'fixed', top: 0, bottom: 0,
          left: 'max(0px, calc((100vw - 480px) / 2))', right: 'max(0px, calc((100vw - 480px) / 2))',
          zIndex: 320, background: 'rgba(20,18,14,.42)',
          opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity .28s ease' }}></div>

      {/* Slide-in drawer — expands from the menu icon (top-right of the app column) */}
      <div role="dialog" aria-hidden={!open}
        style={{ position: 'fixed', top: 0, bottom: 0,
          right: 'max(0px, calc((100vw - 480px) / 2))', zIndex: 330,
          width: 'min(320px, 84%, 480px)', background: '#fff',
          boxShadow: '-14px 0 40px rgba(20,18,14,.16)',
          display: 'flex', flexDirection: 'column',
          transformOrigin: 'top right',
          transform: open ? 'scale(1)' : 'scale(0.32)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform .34s cubic-bezier(.22,1,.36,1), opacity .24s ease',
          paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        {/* Drawer header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 14px 14px 18px', borderBottom: '1.5px solid var(--border-soft)', flexShrink: 0 }}>
          {about || faq ? (
            <button onClick={() => { setAbout(false); setFaq(false); }} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 15, fontWeight: 800, fontFamily: 'var(--font)', color: 'var(--text)', WebkitTapHighlightColor: 'transparent' }}>
              <Icon name="back" size={20} /> {faq ? 'よくある質問' : 'AiGROWについて'}
            </button>
          ) : (
            <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)' }}>メニュー</span>
          )}
          <button aria-label="閉じる" onClick={() => setOpen(false)}
            style={{ width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--text)', WebkitTapHighlightColor: 'transparent', flexShrink: 0 }}>
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Sliding panes */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', width: '300%', transform: faq ? 'translateX(-66.6667%)' : about ? 'translateX(-33.3333%)' : 'translateX(0)', transition: 'transform .3s cubic-bezier(.22,1,.36,1)' }}>

        <div style={{ width: '33.3333%', overflowY: 'auto', padding: '14px 12px' }}>
          {!langOnly && userName && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', marginBottom: 8, background: 'var(--blue-soft)', borderRadius: 12 }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#315cfa', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="user" size={17} /></span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-sub)' }}>ログイン中</div>
                <div style={{ fontSize: 14, fontWeight: 900, fontFamily: 'var(--font-round)', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName} さん</div>
              </div>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px 8px', fontSize: 11.5, fontWeight: 800, color: 'var(--text-sub)', letterSpacing: '.02em' }}>
            <Icon name="globe" size={14} /> 言語切り替え
          </div>
          {[['ja', '日本語'], ['en', 'English']].map(([k, label]) => (
            <button key={k} onClick={() => setLang(k)}
              style={{ ...item, justifyContent: 'space-between', background: lang === k ? 'var(--blue-soft)' : 'none', color: lang === k ? 'var(--blue-dark)' : 'var(--text)' }}>
              {label}
              {lang === k && <Icon name="check" size={17} />}
            </button>
          ))}

          {/* 暫定：トリセツへ遷移するリンク（ログイン前も表示） */}
          <div style={{ height: 1, background: 'var(--border-soft)', margin: '10px 8px' }}></div>
          <button onClick={() => { setOpen(false); nav && (nav.tab ? nav.tab('home') : nav.go('home')); }} style={item}>
            <Icon name="book" size={18} /> トリセツ
          </button>

          {/* FAQ */}
          <div style={{ height: 1, background: 'var(--border-soft)', margin: '10px 8px' }}></div>
          <button onClick={() => { setOpenQ(null); setFaq(true); }} style={{ ...item, justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Icon name="help" size={18} /> よくある質問（FAQ）</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .45 }}><polyline points="9 6 15 12 9 18" /></svg>
          </button>

          {/* AiGROWについて */}
          <div style={{ height: 1, background: 'var(--border-soft)', margin: '10px 8px' }}></div>
          <button onClick={() => setAbout(true)} style={{ ...item, justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Icon name="info" size={18} /> AiGROWについて</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .45 }}><polyline points="9 6 15 12 9 18" /></svg>
          </button>

          {!langOnly && (<>
            <div style={{ height: 1, background: 'var(--border-soft)', margin: '10px 8px' }}></div>
            <button onClick={() => setConfirmOut(true)} style={{ ...item, color: '#e0533f' }}>
              <Icon name="logout" size={18} /> ログアウト
            </button>
          </>)}
        </div>

        {/* Pane 2: AiGROWについて */}
        <div style={{ width: '33.3333%', overflowY: 'auto', padding: '14px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px 8px', fontSize: 11.5, fontWeight: 800, color: 'var(--text-sub)', letterSpacing: '.02em' }}>
            <Icon name="info" size={14} /> 利用に関する注意事項
          </div>
          {[['利用規約', 'https://www.aigrow.jp/terms'], ['第三者評価者利用規約', 'https://www.aigrow.jp/terms-evaluator'], ['プライバシーポリシー', 'https://www.aigrow.jp/privacy']].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ ...item, justifyContent: 'space-between', textDecoration: 'none' }}>
              <span>{label}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .4, flexShrink: 0 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6M10 14 21 3" /></svg>
            </a>
          ))}
        </div>

        {/* Pane 3: よくある質問（FAQ） */}
        <div style={{ width: '33.3333%', overflowY: 'auto', padding: '14px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px 8px', fontSize: 11.5, fontWeight: 800, color: 'var(--text-sub)', letterSpacing: '.02em' }}>
            <Icon name="help" size={14} /> 困ったときは
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQ_ITEMS.map((q, i) => {
              const on = openQ === i;
              return (
                <div key={i} style={{ background: on ? 'var(--blue-softer)' : 'var(--bg)', borderRadius: 12, overflow: 'hidden' }}>
                  <button onClick={() => setOpenQ(on ? null : i)}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 9, width: '100%', border: 'none', background: 'none', cursor: 'pointer', padding: '12px 13px', textAlign: 'left', fontFamily: 'var(--font)', WebkitTapHighlightColor: 'transparent' }}>
                    <span style={{ flexShrink: 0, fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 12, color: 'var(--blue-dark)', marginTop: 1 }}>Q</span>
                    <span style={{ flex: 1, fontSize: 13, fontWeight: 800, color: 'var(--text)', lineHeight: 1.55 }}>{q.q}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: .45, marginTop: 3, transform: on ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  {on && (
                    <div style={{ display: 'flex', gap: 9, padding: '0 13px 13px' }}>
                      <span style={{ flexShrink: 0, fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 12, color: 'var(--orange)' }}>A</span>
                      <p style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: 'var(--text-sub)', lineHeight: 1.85 }}>{q.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <a href="https://www.aigrow.jp/contact" target="_blank" rel="noopener noreferrer"
            style={{ ...item, justifyContent: 'space-between', textDecoration: 'none', marginTop: 10, background: 'var(--blue-soft)', color: 'var(--blue-dark)', fontSize: 13.5 }}>
            <span>解決しないときはお問い合わせ</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .5, flexShrink: 0 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6M10 14 21 3" /></svg>
          </a>
        </div>

        </div>
        </div>
      </div>

      {confirmOut && (
        <div style={{ position: 'fixed', top: 0, bottom: 0,
          left: 'max(0px, calc((100vw - 480px) / 2))', right: 'max(0px, calc((100vw - 480px) / 2))',
          zIndex: 420, background: 'rgba(20,18,14,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 22 }}>
          <div className="fade-in" style={{ width: '100%', maxWidth: 320, background: '#fff', border: '2px solid #1f1b16', boxShadow: '5px 5px 0 #1f1b16', borderRadius: 'var(--r-lg)', padding: '22px 20px 18px', textAlign: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '50%', background: '#fdeae6', color: '#e0533f', marginBottom: 12 }}>
              <Icon name="logout" size={22} />
            </span>
            <div style={{ fontFamily: 'var(--font-round)', fontSize: 16.5, fontWeight: 900, color: 'var(--text)', lineHeight: 1.6 }}>ログアウトしてよろしいでしょうか？</div>
            <p style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-sub)', lineHeight: 1.75, margin: '8px 0 18px' }}>また同じアカウントでログインすると、<br />続きから利用できます。</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <button onClick={() => { setConfirmOut(false); setOpen(false); nav && nav.go('login'); }}
                style={{ width: '100%', border: '2px solid #1f1b16', boxShadow: '3px 3px 0 #1f1b16', borderRadius: 999, padding: '13px 16px', background: '#e0533f', color: '#fff', fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 14.5, cursor: 'pointer' }}>ログアウトする</button>
              <button onClick={() => setConfirmOut(false)}
                style={{ width: '100%', border: 'none', background: 'none', color: 'var(--text-sub)', fontFamily: 'var(--font)', fontWeight: 800, fontSize: 13.5, padding: '6px 0', cursor: 'pointer' }}>キャンセル</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────── ログイン中ユーザーの常時表示バー（全画面共通・最下部） ─────────── */
function UserBar({ name }) {
  return null;
  /* eslint-disable no-unreachable */
  if (!name) return null;
  return (
    <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      padding: '5px 12px', background: '#f3ecd9', borderTop: '1px solid var(--border-soft)',
      fontSize: 10.5, fontWeight: 800, color: '#7a7263', letterSpacing: '.02em' }}>
      <Icon name="user" size={12} />
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name} さんでログイン中</span>
    </div>
  );
}

/* ─────────── ログイン直後の本人確認モーダル ─────────── */
function WelcomeModal({ name, onOk, onLogout }) {
  return (
    <div style={{ position: 'fixed', top: 0, bottom: 0,
      left: 'max(0px, calc((100vw - 480px) / 2))', right: 'max(0px, calc((100vw - 480px) / 2))',
      zIndex: 400, background: 'rgba(20,18,14,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 22 }}>
      <div className="fade-in" style={{ width: '100%', maxWidth: 340, background: '#fff', border: '2px solid #1f1b16', boxShadow: '5px 5px 0 #1f1b16', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '16px 16px 14px', borderBottom: '1.5px solid var(--border-soft)' }}>
          <p style={{ flex: 1, fontSize: 11.5, lineHeight: 1.75, color: 'var(--text-sub)', fontWeight: 600 }}>
            {name}さんでない場合は、<br />右上のアイコンをタップしてログアウトしてください
          </p>
          <button aria-label="ログアウト" onClick={onLogout}
            style={{ width: 34, height: 34, borderRadius: 10, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: '#e0533f', flexShrink: 0, WebkitTapHighlightColor: 'transparent' }}>
            <Icon name="logout" size={19} />
          </button>
        </div>
        <div style={{ padding: '20px 20px 18px', textAlign: 'center' }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-sub)', textAlign: 'left' }}>ようこそ</div>
          <div style={{ fontFamily: 'var(--font-round)', fontSize: 22, fontWeight: 900, color: 'var(--text)', margin: '12px 0 20px' }}>{name} さん</div>
          <button className="btn btn--cta btn--lg" onClick={onOk}>OK</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── App header ─────────── */
function AppHeader({ sub, left, right, noMenu }) {
  return (
    <div className="appbar">
      {left || (
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Logo height={22} />{sub && <span className="sub">{sub}</span>}</div>
      )}
      {right || (noMenu ? <div style={{ width: 24 }}></div> : <HeaderMenu />)}
    </div>
  );
}

/* ─────────── Bottom nav ─────────── */
const NAV_TABS = [
  { key: 'home',      label: 'ホーム',      icon: 'home' },
  { key: 'exam',      label: '受検',        icon: 'clip' },
  { key: 'challenge', label: 'チャレンジ',  icon: 'flag' },
  { key: 'record',    label: 'きろく',      icon: 'book' },
  { key: 'report',   label: 'レポート',    icon: 'report' },
];
function BottomNav({ active, onTab, badges = {}, locked = false, enabledKeys }) {
  return (
    <div className="botnav">
      {NAV_TABS.map(t => {
        const isActive = active === t.key;
        const isDisabled = enabledKeys ? (!isActive && !enabledKeys.includes(t.key)) : (locked && !isActive);
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
      <rect x="22" y="14" width="56" height="84" rx="16" fill="#fff" stroke="#315cfa" strokeWidth="4"/>
      <rect x="30" y="22" width="40" height="52" rx="8" fill="#e8edff"/>
      <g fill="#1a3a52">{mood === 'wow' ? eyes : null}</g>
      {mood !== 'wow' && <g>{eyes}</g>}
      <circle cx="36" cy="64" r="4" fill="#ffb1c8"/><circle cx="64" cy="64" r="4" fill="#ffb1c8"/>
      <path d="M44 70q6 5 12 0" stroke="#1a3a52" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <text x="50" y="90" textAnchor="middle" fontFamily="M PLUS Rounded 1c" fontWeight="800" fontSize="13" fill="#315cfa">Ai</text>
    </svg>
  );
}

Object.assign(window, {
  NavCtx, useNav, Icon, Logo, Device, StatusBar, AppHeader, HeaderMenu, WelcomeModal, UserBar,
  BottomNav, NAV_TABS, Pill, Progress, Mascot,
});
