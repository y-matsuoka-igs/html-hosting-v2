// screens-torisetsu.jsx — トリセツ メイン（2案：ブックレット型 / レーダー型）
const { useState: useSt } = React;

const TORI = {
  typeTitle: '行動する創造者',
  typeSub: 'アイデアと実行力を兼ね備えた',
  kishitsu: '人と関わることに前向きで、周囲とのやりとりの中からエネルギーや刺激を得やすいタイプです。新しいことや変化にもオープンで、「まずやってみよう」と一歩踏み出せる柔軟さがあります。',
  strengths: ['個人的実行力', '創造力', '表現力', '影響力の行使'],
  strengthDesc: 'アイデアを生み出し、それを自分の力で形にしながら、言葉や行動で周囲に伝え、人を巻き込みながら実現していく力があります。',
  patterns: [
    '人と話すなかでアイデアがどんどん出てくる',
    '考えるより先に動き出すことが多い',
    '周りを巻き込みながら進めるのが得意',
    '変化や新しい環境にワクワクできる',
  ],
  usage: [
    ['megaphone', 'アイデアはまず誰かに話してみる'],
    ['users', '一人で抱え込まず、チームで動く機会をつくる'],
    ['rocket', '完璧にしてからより「まずやってみる」を大切に'],
    ['target', '自分が輝けるポジション・役割を積極的に選ぶ'],
  ],
  pitfalls: [
    '動き出しは早いが、詰めが甘くなりやすい',
    '一人で黙々とやる作業が続くと集中力が落ちやすい',
    '周りの意見に影響されすぎて方向がブレることも',
  ],
  // 5軸レーダー（外向/開放/繊細/協調/自律）の値（デモ）
  radar: [
    { label: '外向性', v: 0.86 },
    { label: '開放性', v: 0.78 },
    { label: '繊細性', v: 0.42 },
    { label: '協調性', v: 0.64 },
    { label: '自律性', v: 0.7 },
  ],
};

/* 5角形レーダー */
function Radar({ data, color = 'var(--blue)' }) {
  const size = 220, cx = size / 2, cy = size / 2 + 6, R = 78;
  const n = data.length;
  const pt = (i, r) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const grid = [0.25, 0.5, 0.75, 1].map(g => data.map((_, i) => pt(i, R * g).join(',')).join(' '));
  const poly = data.map((d, i) => pt(i, R * d.v).join(',')).join(' ');
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      {grid.map((g, i) => <polygon key={i} points={g} fill="none" stroke="#e3e9ee" strokeWidth="1" />)}
      {data.map((_, i) => { const [x, y] = pt(i, R); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e3e9ee" strokeWidth="1" />; })}
      <polygon points={poly} fill={color} fillOpacity="0.18" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      {data.map((d, i) => { const [x, y] = pt(i, R * d.v); return <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke={color} strokeWidth="2.5" />; })}
      {data.map((d, i) => {
        const [x, y] = pt(i, R + 20);
        return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontFamily="M PLUS Rounded 1c" fontWeight="700" fontSize="11" fill="var(--text)">{d.label}</text>;
      })}
    </svg>
  );
}

/* 共通セクション */
function ToriSection({ title, children }) {
  return (
    <div className="card" style={{ padding: 16 }}>
      <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 7 }}>
        <span style={{ width: 4, height: 15, borderRadius: 2, background: 'var(--orange)' }}></span>{title}
      </h3>
      {children}
    </div>
  );
}

function ToriBody() {
  return (
    <>
      <ToriSection title="気質">
        <p style={{ fontSize: 12.5, color: 'var(--text-sub)', lineHeight: 1.85, fontWeight: 500 }}>{TORI.kishitsu}</p>
      </ToriSection>

      <ToriSection title="強み">
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 10 }}>
          {TORI.strengths.map(s => (
            <span key={s} style={{ background: 'var(--orange)', color: '#fff', fontFamily: 'var(--font-round)', fontWeight: 700, fontSize: 12, padding: '6px 13px', borderRadius: 999 }}>{s}</span>
          ))}
        </div>
        <p style={{ fontSize: 12.5, color: 'var(--text-sub)', lineHeight: 1.85, fontWeight: 500 }}>{TORI.strengthDesc}</p>
      </ToriSection>

      <ToriSection title="キミの基本パターン">
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TORI.patterns.map((p, i) => (
            <li key={i} style={{ display: 'flex', gap: 9, fontSize: 12.5, color: 'var(--text)', lineHeight: 1.6, fontWeight: 500 }}>
              <span style={{ color: 'var(--blue)', fontWeight: 800 }}>›</span>{p}
            </li>
          ))}
        </ul>
      </ToriSection>

      <ToriSection title="うまくいくキミの使い方">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TORI.usage.map(([e, t], i) => (
            <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'center', background: 'var(--blue-softer)', borderRadius: 12, padding: '10px 12px' }}>
              <span style={{ display:'flex', color:'var(--blue)', flexShrink:0 }}><FIcon name={e} size={18} /></span>
              <span style={{ fontSize: 12.5, color: 'var(--text)', fontWeight: 600, lineHeight: 1.5 }}>{t}</span>
            </div>
          ))}
        </div>
      </ToriSection>

      <ToriSection title="落とし穴に注意">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TORI.pitfalls.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 12.5, color: 'var(--text)', lineHeight: 1.6, fontWeight: 500 }}>
              <span style={{ flexShrink: 0, marginTop: 1, color:'var(--orange)', display:'flex' }}><FIcon name="warning" size={15} /></span>{p}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: '#9a6a2e', background: '#fff6e9', borderRadius: 10, padding: '9px 11px', lineHeight: 1.6, display: 'flex', gap: 7, fontWeight: 600 }}>
          <span style={{ flexShrink: 0, color: '#d98a2b', display: 'flex', marginTop: 1 }}><FIcon name="bulb" size={14} /></span>落とし穴は「弱点」じゃなく、知っておけば対処できるポイントだよ。
        </div>
      </ToriSection>
    </>
  );
}

/* 表紙ヒーロー：案A ブックレット型 */
function ToriHeroBooklet() {
  return (
    <div style={{ background: '#315cfa', borderRadius: 'var(--r-lg)', padding: '22px 20px', color: '#fff', textAlign: 'center', boxShadow: 'var(--shadow-blue)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,.1)' }}></div>
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}><Mascot size={64} /></div>
        <div style={{ fontSize: 11, opacity: .85, fontWeight: 600 }}>キミのトリセツ ・ 総合タイプ</div>
        <div style={{ fontSize: 12, opacity: .9, marginTop: 8 }}>{TORI.typeSub}</div>
        <div style={{ fontFamily: 'var(--font-round)', fontSize: 25, fontWeight: 900, marginTop: 2 }}>「{TORI.typeTitle}」</div>
      </div>
    </div>
  );
}
/* 表紙ヒーロー：案B レーダー型 */
function ToriHeroRadar() {
  return (
    <div className="card" style={{ padding: '18px 12px 10px', textAlign: 'center', background: '#fff' }}>
      <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 700 }}>キミの気質バランス</div>
      <div style={{ fontFamily: 'var(--font-round)', fontSize: 20, fontWeight: 900, color: 'var(--blue-dark)', margin: '2px 0 4px' }}>「{TORI.typeTitle}」</div>
      <Radar data={TORI.radar} />
    </div>
  );
}

function TorisetsuScreen() {
  const nav = useNav();
  const [variant, setVariant] = useSt(window.__toriVar || 'A');
  React.useEffect(() => { window.__toriVar = variant; }, [variant]);
  const Hero = variant === 'A' ? ToriHeroBooklet : ToriHeroRadar;

  return (
    <div className="screen">
      <StatusBar />
      <AppHeader />
      {/* sub tabs */}
      <div style={{ display: 'flex', background: '#fff', borderBottom: '1px solid var(--border-soft)', flexShrink: 0 }}>
        {[['トリセツ', 'book', true], ['自己評価', 'chart', false], ['みんなの発見', 'users', false]].map(([l, e, on]) => (
          <div key={l} style={{ flex: 1, textAlign: 'center', padding: '9px 4px 7px', borderBottom: `2.5px solid ${on ? 'var(--blue)' : 'transparent'}`, cursor: on ? 'default' : 'pointer' }}>
            <div style={{ opacity: on ? 1 : .45, display:'flex', justifyContent:'center', color: on ? 'var(--blue)' : 'var(--text-sub)' }}><FIcon name={e} size={17} /></div>
            <div style={{ fontSize: 10, fontWeight: 700, color: on ? 'var(--blue)' : 'var(--text-sub)', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <div className="scroll pad stack">
        {/* 案スイッチ（デモ） */}
        <div style={{ display: 'flex', gap: 6, background: '#fff', padding: 5, borderRadius: 999, boxShadow: 'var(--shadow-sm)' }}>
          {[['A', 'ブックレット'], ['B', 'レーダー']].map(([v, lbl]) => (
            <button key={v} onClick={() => setVariant(v)}
              style={{ flex: 1, border: 'none', cursor: 'pointer', borderRadius: 999, padding: '8px 0', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 12,
                background: variant === v ? 'var(--blue)' : 'transparent', color: variant === v ? '#fff' : 'var(--text-sub)' }}>
              案{v} <span style={{ fontSize: 9, opacity: .8 }}>{lbl}</span>
            </button>
          ))}
        </div>

        <div className="fade-in" key={variant}><Hero /></div>
        <ToriBody />

        <button className="btn btn--cta" onClick={() => nav.go('next-step')}>次の一歩を決める</button>
      </div>
    </div>
  );
}

Object.assign(window, { TorisetsuScreen, TORI });
