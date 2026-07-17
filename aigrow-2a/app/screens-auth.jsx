// screens-auth.jsx — Login + Onboarding
const { useState: useStateA, useRef: useRefA, useEffect: useEffectA } = React;

/* Provider brand glyphs for SSO sign-in buttons */
function GoogleGlyph({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}
function MsGlyph({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 23 23" style={{ flexShrink: 0 }}>
      <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
      <rect x="12" y="1" width="10" height="10" fill="#7FBA00"/>
      <rect x="1" y="12" width="10" height="10" fill="#00A4EF"/>
      <rect x="12" y="12" width="10" height="10" fill="#FFB900"/>
    </svg>
  );
}

function LoginScreen() {
  const nav = useNav();
  const [sid, setSid] = useStateA('');
  const [id, setId] = useStateA('');
  const [pw, setPw] = useStateA('');
  const [err, setErr] = useStateA('');
  const ok = sid.trim().length > 0 && id.trim().length > 0 && pw.length > 0;

  const submit = () => {
    if (!ok) { setErr('学校ID・ID・パスワードを入力してね'); return; }
    nav.go('onboard');
  };

  return (
    <div className="screen screen--white">
      <StatusBar />
      {/* ログイン前もハンバーガー（言語切り替えのみ） */}
      <div style={{ position: 'absolute', top: 'calc(env(safe-area-inset-top, 0px) + 10px)', right: 14, zIndex: 60 }}>
        <HeaderMenu langOnly />
      </div>
      <div className="scroll">
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', padding: '8px 26px 26px' }}>
          {/* Hero */}
          <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, paddingTop: 24 }}>
            <Logo height={44} />
            <p style={{ fontFamily: 'var(--font-round)', fontWeight: 700, fontSize: 15, color: 'var(--text-sub)', textAlign: 'center', lineHeight: 1.6 }}>
              あなたの強みを見つける旅へ<br/>
              <span style={{ fontSize: 13 }}>自分だけの「トリセツ」をつくろう</span>
            </p>
          </div>

          {/* Form */}
          <div className="stack" style={{ gap: 11, marginTop: 8 }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-sub)', display: 'flex' }}><Icon name="school" size={20} /></span>
              <input className="field" style={{ paddingLeft: 44 }} placeholder="学校ID" value={sid}
                onChange={e => { setSid(e.target.value); setErr(''); }} />
            </div>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-sub)', display: 'flex' }}><Icon name="user" size={20} /></span>
              <input className="field" style={{ paddingLeft: 44 }} placeholder="ログインID" value={id}
                onChange={e => { setId(e.target.value); setErr(''); }} />
            </div>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-sub)', display: 'flex' }}><Icon name="lock" size={20} /></span>
              <input className="field" style={{ paddingLeft: 44 }} type="password" placeholder="パスワード" value={pw}
                onChange={e => { setPw(e.target.value); setErr(''); }} />
            </div>
            {err && <div style={{ color: '#e23', fontSize: 12, fontWeight: 700, paddingLeft: 4 }}>{err}</div>}
            <button className="btn btn--cta btn--lg" onClick={submit} style={{ marginTop: 4 }}>ログイン</button>
            <button className="btn btn--outline" onClick={() => nav.go('onboard')}><GoogleGlyph /> Googleでログイン</button>
            <button className="btn btn--outline" onClick={() => nav.go('onboard')}><MsGlyph /> Microsoftでログイン</button>
            <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-sub)', marginTop: 6 }}>ログインで利用規約・プライバシーポリシーに同意したものとみなします</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Onboarding (reuses existing webtoon art) ─────────── */
const OB_SLIDES = [
  { img: 'assets/ob-new-1.png', title: 'まだ気づいてない\n強みがある', body: '学習の成績だけじゃない。\nキミの「強み」を見つけよう。' },
  { img: 'assets/ob-new-2.png', title: '3ステップで\n「トリセツ」が完成', body: '気質診断・自己評価・相互評価。\n終わると自分の取扱説明書ができる。' },
  { img: 'assets/ob-new-3.png', title: 'AIコーチが\n次の一歩を提案', body: '結果をもとに、今やると良いことを\nやさしく教えてくれるよ。' },
];
function OnboardScreen() {
  const nav = useNav();
  const trackRef = useRefA(null);
  const [idx, setIdx] = useStateA(0);
  const last = idx === OB_SLIDES.length - 1;

  const goTo = (i) => {
    const t = trackRef.current;
    if (t) t.scrollTo({ left: i * t.clientWidth, behavior: 'smooth' });
  };
  const onScroll = () => {
    const t = trackRef.current;
    if (t) setIdx(Math.round(t.scrollLeft / t.clientWidth));
  };
  const next = () => { if (last) nav.go('start-diag'); else goTo(idx + 1); };

  return (
    <div className="screen" style={{ background: '#fffbf2' }}>
      <StatusBar />
      <div ref={trackRef} onScroll={onScroll}
        style={{ flex: 1, minHeight: 0, display: 'flex', overflowX: 'auto', overflowY: 'hidden', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
        {OB_SLIDES.map((s, i) => {
          const active = i === idx;
          return (
          <div key={i} style={{ flex: '0 0 100%', width: '100%', height: '100%', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, minHeight: 0, padding: '10px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" style={{ position: 'absolute', top: '9%', left: '11%', zIndex: 2, animation: active ? 'obTwinkle 1.8s ease-in-out infinite' : 'none', opacity: active ? 1 : 0 }}><path d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z" fill="#ffd633" stroke="#1f1b16" strokeWidth="1.4"/></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ position: 'absolute', bottom: '13%', right: '10%', zIndex: 2, animation: active ? 'obTwinkle 2.2s .5s ease-in-out infinite' : 'none', opacity: active ? 1 : 0 }}><path d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z" fill="#ff6b5e" stroke="#1f1b16" strokeWidth="1.4"/></svg>
              <div key={active ? 'pop' : 'rest'} style={{ height: '100%', maxWidth: '100%', display: 'flex', justifyContent: 'center', animation: active ? 'obPop .65s cubic-bezier(.2,1.5,.35,1) both' : 'none' }}>
                <img src={s.img} alt="" style={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain', borderRadius: 14, border: '2px solid #1f1b16', boxShadow: '8px 8px 0 #ffd633', animation: 'obFloat 3.6s ease-in-out infinite' }} />
              </div>
            </div>
            <div key={active ? 'txt-on' : 'txt-off'} style={{ padding: '14px 28px 4px', textAlign: 'center', animation: active ? 'obRise .5s .18s cubic-bezier(.2,.8,.2,1) both' : 'none' }}>
              <h2 style={{ fontSize: 23, fontWeight: 900, color: 'var(--text)', lineHeight: 1.35, whiteSpace: 'pre-line' }}>{s.title}</h2>
              <p style={{ fontSize: 13.5, color: 'var(--text-sub)', fontWeight: 500, marginTop: 8, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{s.body}</p>
            </div>
          </div>
          );
        })}
      </div>

      {/* controls */}
      <div style={{ flexShrink: 0, padding: '14px 24px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginBottom: 16 }}>
          {OB_SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ cursor: 'pointer', height: 9, width: i === idx ? 22 : 9, borderRadius: 3, background: i === idx ? '#ffd633' : '#e3d9c4', border: i === idx ? '1.5px solid #1f1b16' : 'none', transition: 'all .3s' }}></button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {!last && <button className="btn btn--ghost" style={{ flex: 1, background: '#f3ecd9', color: '#7a7263' }} onClick={() => nav.go('start-diag')}>スキップ</button>}
          <button className="btn btn--cta" style={{ flex: 2 }} onClick={next}>{last ? 'はじめる' : '次へ'}</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen, OnboardScreen });
