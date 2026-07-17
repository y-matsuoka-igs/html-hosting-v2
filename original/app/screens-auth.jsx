// screens-auth.jsx — Login + Onboarding
const { useState: useStateA, useRef: useRefA, useEffect: useEffectA } = React;

function LoginScreen() {
  const nav = useNav();
  const [id, setId] = useStateA('');
  const [pw, setPw] = useStateA('');
  const [err, setErr] = useStateA('');
  const ok = id.trim().length > 0 && pw.length > 0;

  const submit = () => {
    if (!ok) { setErr('IDとパスワードを入力してね'); return; }
    nav.go('onboard');
  };

  return (
    <div className="screen screen--white">
      <StatusBar />
      <div className="scroll">
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', padding: '8px 26px 26px' }}>
          {/* Hero */}
          <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, paddingTop: 24 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: -16, background: 'radial-gradient(circle, #ffe7cf 0%, transparent 70%)', borderRadius: '50%' }}></div>
              <Mascot size={120} />
            </div>
            <div className="logo" style={{ fontSize: 40 }}><span className="ai">Ai</span><span className="grow">GROW</span></div>
            <p style={{ fontFamily: 'var(--font-round)', fontWeight: 700, fontSize: 15, color: 'var(--text-sub)', textAlign: 'center', lineHeight: 1.6 }}>
              キミの強みを見つける旅へ<br/>
              <span style={{ fontSize: 13 }}>自分だけの「トリセツ」をつくろう</span>
            </p>
          </div>

          {/* Form */}
          <div className="stack" style={{ gap: 11, marginTop: 8 }}>
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
            <button className="btn btn--outline" onClick={() => nav.go('onboard')}>SSOでログイン</button>
            <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-sub)', marginTop: 6 }}>ログインで利用規約・プライバシーポリシーに同意したものとみなします</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Onboarding (reuses existing webtoon art) ─────────── */
const OB_SLIDES = [
  { img: (window.__resources && window.__resources.ob1) || 'assets/onboard-1.png', title: 'まだ気づいてない\n強みがある', body: '学習の成績だけじゃない。\nキミの「強み」を見つけよう。' },
  { img: (window.__resources && window.__resources.ob4) || 'assets/onboard-4.png', title: '3ステップで\n「トリセツ」が完成', body: '気質診断・自己評価・相互評価。\n終わると自分の取扱説明書ができる。' },
  { img: (window.__resources && window.__resources.ob6) || 'assets/onboard-6.png', title: 'AIコーチが\n次の一歩を提案', body: '結果をもとに、今やると良いことを\nやさしく教えてくれるよ。' },
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
    <div className="screen" style={{ background: '#fff7ef' }}>
      <StatusBar />
      <div ref={trackRef} onScroll={onScroll}
        style={{ flex: 1, minHeight: 0, display: 'flex', overflowX: 'auto', overflowY: 'hidden', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
        {OB_SLIDES.map((s, i) => (
          <div key={i} style={{ flex: '0 0 100%', width: '100%', height: '100%', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, minHeight: 0, padding: '8px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={s.img} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow)' }} />
            </div>
            <div style={{ padding: '14px 28px 4px', textAlign: 'center' }}>
              <h2 style={{ fontSize: 23, fontWeight: 900, color: 'var(--text)', lineHeight: 1.35, whiteSpace: 'pre-line' }}>{s.title}</h2>
              <p style={{ fontSize: 13.5, color: 'var(--text-sub)', fontWeight: 500, marginTop: 8, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* controls */}
      <div style={{ flexShrink: 0, padding: '14px 24px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginBottom: 16 }}>
          {OB_SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ border: 'none', cursor: 'pointer', height: 8, width: i === idx ? 22 : 8, borderRadius: 999, background: i === idx ? 'var(--orange)' : '#e2c8ad', transition: 'all .3s' }}></button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {!last && <button className="btn btn--ghost" style={{ flex: 1, background: '#f3e3d2', color: '#a76b32' }} onClick={() => nav.go('start-diag')}>スキップ</button>}
          <button className="btn btn--cta" style={{ flex: 2 }} onClick={next}>{last ? 'はじめる' : '次へ'}</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen, OnboardScreen });
