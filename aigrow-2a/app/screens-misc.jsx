// screens-misc.jsx — 機能解放通知（announce）
const { useState: useSm, useEffect: useEm } = React;

const UNLOCKS = [
{ emoji: 'book', title: 'トリセツが完成しました', desc: 'キミだけの取扱説明書が見られるよ', color: 'var(--green)' },
{ emoji: 'link', title: 'トリセツをシェアできる', desc: '友だちや先生に結果を送れるよ', color: 'var(--blue)' },
{ emoji: 'footsteps', title: 'チャレンジ機能が解放', desc: 'AiGROWが次の行動を提案するよ', color: 'var(--orange)' }];


function AnnounceScreen() {
  const nav = useNav();
  const [show, setShow] = useSm(false);
  useEm(() => {const t = setTimeout(() => setShow(true), 80);nav.update({ seenAnnounce: true });return () => clearTimeout(t);}, []);

  return (
    <div className="screen" style={{ background: '#ff6b5e', position: 'relative', overflow: 'hidden' }}>
      <StatusBar dark />
      {/* confetti dots */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .9 }}>
        {[['#fff', 12, 18, 0], ['#ffe08a', 80, 12, .3], ['#fff', 65, 30, .6], ['#bdf5d0', 30, 70, .2], ['#fff', 88, 60, .5], ['#ffd0e0', 15, 50, .8]].map(([c, l, top, d], i) =>
        <div key={i} style={{ position: 'absolute', left: `${l}%`, top: `${top}%`, width: 10, height: 10, borderRadius: i % 2 ? '50%' : 2, background: c, animation: `floaty 2.4s ${d}s ease-in-out infinite`, transform: 'rotate(20deg)' }}></div>
        )}
      </div>

      <div className="scroll" style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
        <div style={{ flex: 1, minHeight: 540, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 76, transform: show ? 'scale(1)' : 'scale(0)', transition: 'transform .5s cubic-bezier(.2,1.3,.4,1.3)', color: '#fff', display: 'flex', justifyContent: 'center' }}><FIcon name="party" size={70} sw={1.6} /></div>
          <h1 style={{ fontFamily: 'var(--font-round)', fontSize: 26, fontWeight: 900, color: '#fff', marginTop: 8, lineHeight: 1.4 }}>新しい機能が<br />解放されたよ！</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.92)', fontWeight: 600, marginTop: 10 }}>3つの評価が完了！おめでとう</p>

          <div style={{ width: '100%', marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {UNLOCKS.map((u, i) =>
            <div key={i} style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 13, boxShadow: 'var(--shadow)',
              transform: show ? 'translateY(0)' : 'translateY(24px)', opacity: show ? 1 : 0, transition: `all .45s ${0.2 + i * 0.12}s cubic-bezier(.2,.9,.3,1.2)` }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, flexShrink: 0, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: u.color }}>{u.emoji ? <FIcon name={u.emoji} size={22} /> : null}</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>{u.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 500 }}>{u.desc}</div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ flexShrink: 0, padding: '4px 24px 26px' }}>
          <button className="btn btn--lg" style={{ background: '#fff', color: 'var(--orange-dark)', boxShadow: 'var(--shadow-lg)' }} onClick={() => nav.go('home')}>トリセツを見る</button>
          <button className="btn" style={{ background: 'transparent', color: 'rgba(255,255,255,.9)', marginTop: 6 }} onClick={() => nav.go('exam')}>受検タブに戻る</button>
        </div>
      </div>
    </div>);

}

Object.assign(window, { AnnounceScreen });

/* ─────────── タスク完了：キミの性格・傾向コメント（元HTML準拠） ─────────── */
const TC_TRAITS = [
{ emoji: 'bulb', title: 'アイデアの豊かさ', desc: '気質の「開放性の高さ」と「創造性」が組み合わさり、誰も思いつかない発想を生み出す力があります', bg: 'var(--green-soft)', color: '#2E7D32' },
{ emoji: 'rocket', title: '自律的な実行力', desc: '「自律性の高さ」と「個人的実行力」が支え合い、目標に向かって粘り強く動き続けられます', bg: '#e3f0ff', color: '#2447c9' },
{ emoji: 'handshake', title: '深い共感力', desc: '「繊細性」と「共感・傾聴力」により、相手の気持ちを察して丁寧に関わることができます', bg: '#fff3e0', color: '#E65100' }];


const STEP_FLOW = [
  { key: 'diag', label: '気質診断', route: 'start-diag' },
  { key: 'self', label: '自己評価', route: 'start-self' },
  { key: 'other', label: '相互評価', route: 'start-other' },
];
const SELF_PEERS = [
  { course: '自己・相互の全問題', name: '入江 平作', period: '2026-05-01 13:15' },
  { course: '自己・相互の全問題', name: '青田 徳彦', period: '2026-05-01 13:15' },
];
function StepCompleteScreen() {
  const nav = useNav();
  const kind = (nav.params && nav.params.kind) || 'diag';
  const doneIdx = STEP_FLOW.findIndex(s => s.key === kind);
  const cur = STEP_FLOW[doneIdx];
  const next = STEP_FLOW[doneIdx + 1];
  const COPY = {
    diag: { catch: 'キミの気質のクセが見えてきたよ', body: '5つの項目に答えてくれてありがとう！\n続けて「自己評価」でキミ自身の見え方をチェックしよう。' },
    self: { catch: '自分から見たキミが記録できたよ', body: 'おつかれさま！次は「相互評価」で、\nまわりから見たキミの姿を集めよう。' },
    other: { catch: 'まわりから見たキミが集まったよ', body: '' },
  }[kind] || {};
  const pct = Math.round((doneIdx + 1) / STEP_FLOW.length * 100);
  const R = 46, C = 2 * Math.PI * R;
  return (
    <div className="screen">
      <StatusBar />
      <AppHeader noMenu />
      <div className="scroll pad stack">
        {/* hero */}
        <div className="fade-in" style={{ background: '#315cfa', borderRadius: 'var(--r-lg)', padding: '26px 20px', textAlign: 'center', color: '#fff', border: '2px solid #1f1b16', boxShadow: '4px 4px 0 #1f1b16' }}>
          <div style={{ position: 'relative', width: 124, height: 124, margin: '0 auto 12px' }}>
            <svg width="124" height="124" viewBox="0 0 124 124" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="62" cy="62" r={R} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="12" />
              <circle cx="62" cy="62" r={R} fill="none" stroke="#ffd633" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${pct / 100 * C} ${C}`} style={{ transition: 'stroke-dasharray .7s cubic-bezier(.2,.8,.2,1)' }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', color: '#ffd633' }}><FIcon name="party" size={40} color="#ffd633" /></div>
            </div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, opacity: .8, marginBottom: 8 }}>STEP {doneIdx + 1} / 3 完了</div>
          <div style={{ fontFamily: 'var(--font-round)', fontSize: 22, fontWeight: 900, lineHeight: 1.4 }}>{cur.label} 完了！</div>
          <div style={{ fontSize: 12.5, opacity: .9, lineHeight: 1.7, marginTop: 8 }}>{COPY.catch}</div>
        </div>

        {/* 3ステップ進捗 */}
        <div className="card card--flat" style={{ padding: '15px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {STEP_FLOW.map((s, i) => (
              <React.Fragment key={s.key}>
                {i > 0 && <div style={{ flex: 1, height: 2, background: i <= doneIdx ? 'var(--green)' : 'var(--border)' }}></div>}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff',
                    background: i <= doneIdx ? 'var(--green)' : i === doneIdx + 1 ? 'var(--blue)' : 'var(--border)' }}>
                    {i <= doneIdx ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: i <= doneIdx ? 'var(--green)' : i === doneIdx + 1 ? 'var(--blue-dark)' : 'var(--text-sub)' }}>{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* キミが得られた相互評価の進捗 */}
        {(() => { const got = kind === 'other' ? 3 : 0, full = got >= 3; return (
        <div className="card card--flat" style={{ padding: '16px 16px 15px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 12, fontWeight: 800, color: 'var(--text)' }}>
            <span>キミが得られた相互評価</span>
            <span style={{ color: 'var(--text-sub)', fontWeight: 500 }}>—</span>
            <span>現在の評価完了者数</span>
          </div>
          <div style={{ marginTop: 8, fontFamily: 'var(--font-round)', color: full ? 'var(--green)' : 'var(--text)' }}>
            <span style={{ fontSize: 34, fontWeight: 900, lineHeight: 1 }}>{got}</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-sub)' }}> / 3 </span>
            <span style={{ fontSize: 17, fontWeight: 800 }}>名</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginTop: 10 }}>
            {[0, 1, 2].map((i) => <span key={i} style={{ width: 34, height: 8, borderRadius: 999, background: i < got ? 'var(--green)' : 'var(--border)' }}></span>)}
          </div>
          {full ? (
            <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--green-soft, #e6f4e6)', color: 'var(--green)', borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 800 }}>相互評価がそろったよ！</div>
          ) : (
            <button className="btn" style={{ marginTop: 12, background: '#fff', color: 'var(--blue-dark)', border: '2px solid #1f1b16', boxShadow: '2px 2px 0 #1f1b16', width: 'auto', padding: '10px 18px', fontSize: 12.5 }} onClick={() => nav.go('other-start', { tab: 1 })}>評価の完了状況を確認</button>
          )}
        </div>); })()}

        {/* 次のステップ案内 */}
        {next && (
          <div style={{ background: '#fff5cc', borderRadius: 'var(--r-md)', padding: '14px 16px', borderLeft: '4px solid var(--orange)' }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: '#E65100', marginBottom: 6, lineHeight: 1.6 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><FIcon name="book" size={14} color="#E65100" /> つぎは「{next.label}」</span></div>
            <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.8, fontWeight: 500, whiteSpace: 'pre-line' }}>{COPY.body}</p>
          </div>
        )}

        {next ? (
          <button className="btn btn--cta btn--lg" onClick={() => nav.go(next.route)}>{next.label}にすすむ</button>
        ) : (
          <button className="btn btn--cta btn--lg" onClick={() => nav.go('home')}>完成したトリセツを見る</button>
        )}
      </div>
    </div>
  );
}

/* 今のキミ（成分ブレンド表）レーダー — 6軸コンピテンシー */
function SelfRadar({ size = 230 }) {
  const data = [
    { label: '考え創る', v: 0.88 }, { label: 'やり抜く', v: 0.55 }, { label: '巻き込む', v: 0.62 },
    { label: '協働する', v: 0.45 }, { label: '社会を想う', v: 0.4 }, { label: '発見する', v: 0.78 }];
  const W = 230, cx = 115, cy = 112, R = 68, n = data.length;
  const pt = (i, r) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };
  const grids = [0.33, 0.66, 1].map(g => data.map((_, i) => pt(i, R * g).join(',')).join(' '));
  const poly = data.map((d, i) => pt(i, R * d.v).join(',')).join(' ');
  return (
    <svg width={size} height={size * 0.98} viewBox={`0 0 ${W} ${W * 0.98}`}>
      {grids.map((g, i) => <polygon key={i} points={g} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1" />)}
      {data.map((_, i) => { const [x, y] = pt(i, R); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,.22)" strokeWidth="1" />; })}
      <polygon points={poly} fill="rgba(255,214,51,.35)" stroke="#ffd633" strokeWidth="2.5" strokeLinejoin="round" />
      {data.map((d, i) => { const [lx, ly] = pt(i, R + 20); return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-round)" fontWeight="700" fontSize="11" fill="#fff">{d.label}</text>; })}
    </svg>
  );
}

/* 完了モーダル */
function TaskCompleteModal({ onClose }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 22px', background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(2px)' }}>
      <div className="fade-in" style={{ width: '100%', maxWidth: 400, background: '#fff', borderRadius: 18, overflow: 'hidden', border: '2px solid #1f1b16', boxShadow: '6px 6px 0 #1f1b16' }}>
        <div style={{ background: '#315cfa', padding: '26px 20px 22px', textAlign: 'center', color: '#fff' }}>
          <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}><FIcon name="party" size={44} /></div>
          <div style={{ fontFamily: 'var(--font-round)', fontSize: 20, fontWeight: 900, lineHeight: 1.4 }}>キミのタスクが<br />全て完了したよ！</div>
        </div>
        <div style={{ padding: '18px 20px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            {['気質診断', '自己評価', '相互評価'].map(t => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--green-soft)', color: '#2E7D32', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 11.5, padding: '5px 10px', borderRadius: 999 }}>✓ {t}</span>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--text-sub)', fontWeight: 600, lineHeight: 1.7, textAlign: 'center', marginBottom: 16 }}>お疲れさまでした！<br />今のキミの結果を見てみよう。</p>
          <button className="btn btn--cta btn--lg" onClick={onClose}>結果を見る</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── 相互評価 開始 ─────────── */
function StartOtherScreen() {
  const nav = useNav();
  return (
    <div className="screen screen--white">
      <StatusBar />
      <AppHeader sub="相互評価" noMenu />
      <div className="scroll" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, minHeight: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '12px 30px 24px', gap: 6 }}>
          <Pill style={{ background: 'var(--blue-soft)', color: 'var(--blue-dark)' }}>STEP 3 / 3</Pill>
          <div style={{ margin: '18px 0 6px', display: 'flex', justifyContent: 'center', color: 'var(--blue)' }}><FIcon name="handshake" size={64} sw={1.6} /></div>
          <h1 style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.5 }}>さいごは、おたがいの<br/>強みを送り合おう！</h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-sub)', fontWeight: 600, marginTop: 8, lineHeight: 1.7 }}>
            友だちを評価して、キミも評価してもらう。<br/>まわりから見たキミの姿がわかって、<br/>トリセツが完成するよ。
          </p>
        </div>
        <div style={{ flexShrink: 0, padding: '0 24px 26px' }}>
          <button className="btn btn--cta btn--lg" onClick={() => nav.go('other-start')}>相互評価をはじめる</button>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-sub)', marginTop: 12 }}>1 人 約 3 分</p>
        </div>
      </div>
    </div>
  );
}

/* 相互評価の開始ハブ：「自分が評価する」×「評価をお願いする」タブ */
function OtherStartScreen() {
  const nav = useNav();
  return (
    <div className="screen">
      <StatusBar />
      <AppHeader sub="相互評価" noMenu />
      <div className="scroll pad stack">
        <MutualEvalStart nav={nav} />
      </div>
    </div>
  );
}

function MutualEvalStart({ nav }) {
  const [tab, setTab] = useSm((nav.params && nav.params.tab) || 0);
  const [query, setQuery] = useSm('');
  const [copied, setCopied] = useSm(false);
  const tabs = [['handshake', '自分が評価する'], ['megaphone', '評価をお願いする']];
  return (
    <>
      <div style={{ display: 'flex', gap: 8 }}>
        {tabs.map(([ic, label], i) => (
          <button key={label} onClick={() => setTab(i)}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px 4px', cursor: 'pointer', borderRadius: 12,
              border: '2px solid #1f1b16', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 12.5, transition: 'all .15s',
              background: tab === i ? 'var(--blue)' : '#fff', color: tab === i ? '#fff' : 'var(--text)',
              boxShadow: tab === i ? '3px 3px 0 #1f1b16' : 'none' }}>
            <FIcon name={ic} size={15} color={tab === i ? '#fff' : 'var(--blue)'} /> {label}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text-sub)', fontFamily: 'var(--font-round)', padding: '2px 2px 0' }}>相互評価する友達</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SELF_PEERS.map((p, i) => (
              <button key={i} onClick={() => nav.go('other-eval')}
                style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: '#fff', border: '2px solid #1f1b16', borderRadius: 'var(--r-lg)', boxShadow: '3px 3px 0 #1f1b16', padding: '14px 15px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--blue)' }}><FIcon name="handshake" size={20} color="var(--blue)" /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10.5, color: 'var(--text-sub)', fontWeight: 700 }}>受検コース名：{p.course}</div>
                  <div style={{ fontSize: 14.5, fontWeight: 900, color: 'var(--text)', fontFamily: 'var(--font-round)', marginTop: 2, lineHeight: 1.35 }}>「{p.name}」を相互評価をする</div>
                  <div style={{ fontSize: 10.5, color: 'var(--text-sub)', fontWeight: 500, marginTop: 3 }}>期間：{p.period}</div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c3bba9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M9 5l7 7-7 7"/></svg>
              </button>
            ))}
          </div>
        </>
      )}

      {tab === 1 && (
        <>
          {/* 評価完了者数 */}
          <div className="card card--flat" style={{ textAlign: 'center', padding: '16px 14px' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-sub)' }}>キミが得られた相互評価　—　現在の評価完了者数</div>
            <div style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 34, color: 'var(--text)', marginTop: 4 }}>0<span style={{ fontSize: 18 }}> / 3 名</span></div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 6 }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: 26, height: 6, borderRadius: 3, background: 'var(--border)' }}></span>)}
            </div>
          </div>

          {/* 依頼状況 */}
          <div style={{ background: '#ffece3', borderRadius: 'var(--r-md)', padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8590c" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
            <span style={{ fontSize: 12.5, fontWeight: 800, color: '#e8590c' }}>残り3名の方からの評価完了待ちです。</span>
          </div>
          <div className="card card--flat" style={{ padding: '14px 14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-sub)', marginBottom: 8 }}>回答待ち</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)', padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" style={{ flexShrink: 0 }}><circle cx="10" cy="8" r="3.5"/><path d="M4 19c0-3.1 2.7-5.5 6-5.5s6 2.4 6 5.5"/><path d="M15.5 5.2a3.5 3.5 0 0 1 0 5.6M18.5 13.9c1.5 1 2.5 2.6 2.5 4.6"/></svg>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text)' }}>ユーザ名は表示されません</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-sub)', margin: '14px 0 8px' }}>回答済み</div>
            <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)', padding: '11px 13px' }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-sub)' }}>なし</span>
            </div>
          </div>

          {/* QRコード */}
          <button className="btn btn--primary btn--lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v2M20 20h-4"/></svg>
            評価依頼用QRコード
          </button>

          {/* 検索して依頼 */}
          <div className="card card--flat" style={{ padding: '14px 14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 10 }}>評価を依頼する人を探す</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="field" style={{ flex: 1, minWidth: 0 }} placeholder="評価を依頼する人を検索" value={query} onChange={e => setQuery(e.target.value)} />
              <button disabled={!query.trim()}
                style={{ flexShrink: 0, width: 'auto', padding: '0 20px', border: 'none', borderRadius: 999, cursor: query.trim() ? 'pointer' : 'default', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13.5, background: query.trim() ? 'var(--green)' : 'var(--border)', color: '#fff' }}>決定</button>
            </div>
          </div>

          {/* 依頼文コピー / LINE */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }}
              style={{ flex: 1, cursor: 'pointer', background: '#fff', border: '2px solid #1f1b16', borderRadius: 'var(--r-lg)', boxShadow: '3px 3px 0 #1f1b16', padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"/></svg>
              <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 11.5, color: 'var(--text)', lineHeight: 1.4 }}>{copied ? 'コピーした！' : '評価依頼文をコピー'}</span>
            </button>
            <button style={{ flex: 1, cursor: 'pointer', background: '#fff', border: '2px solid #1f1b16', borderRadius: 'var(--r-lg)', boxShadow: '3px 3px 0 #1f1b16', padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 26, height: 26, borderRadius: 7, background: '#06c755', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M12 4C6.9 4 3 7.3 3 11.2c0 3.5 3.1 6.4 7.3 7l-.3 2.6c0 .3.3.5.6.3l3.1-2.1c4.7-.2 8.3-3.3 8.3-7.8C22 7.3 17.1 4 12 4z"/></svg>
              </span>
              <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 11.5, color: 'var(--text)' }}>LINEで送信</span>
            </button>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-sub)', lineHeight: 1.7, textAlign: 'center' }}>QRコード・依頼文・LINEで、お友達に相互評価をお願いできるよ</p>
        </>
      )}
    </>
  );
}

/* ─────────── 完了サマリー（今のキミ・自己評価版） ─────────── */
function TaskCompleteScreen() {
  const nav = useNav();
  const [showModal, setShowModal] = useSm(true);
  return (
    <div className="screen" style={{ position: 'relative' }}>
      <StatusBar />
      <AppHeader />
      <div className="scroll pad stack">
        <SelfSummarySection />
        {/* 注意：トリセツ完成まであと一歩 */}
        <div style={{ background: '#fff8e1', borderRadius: 'var(--r-md)', padding: '14px 16px', borderLeft: '4px solid var(--orange)' }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: '#E65100', marginBottom: 6, lineHeight: 1.6 }}><span style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 5 }}><FIcon name="book" size={14} color="#E65100" /> <span>みんなの相互評価が完了すると「トリセツ」が完成するよ</span></span></div>
          <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7, fontWeight: 500 }}>トリセツが完成するまで、キミ自身が認識している性格と潜在的な気質の結果を確認してみよう</p>
        </div>
        <button className="btn btn--cta btn--lg" onClick={() => { nav.update && nav.update((s) => ({ diag: { ...s.diag, done: true }, self: { ...s.self, done: true }, other: { ...s.other, done: true }, seenAnnounce: false })); nav.go('exam'); }}>受検の進捗を確認する</button>
      </div>
      {showModal && <TaskCompleteModal onClose={() => setShowModal(false)} />}
    </div>);
}

/* ─────────── 今のキミ（自己評価版） ─────────── */
function SelfSummarySection() {
  return (
    <>
        {/* 今のキミ（自己評価）— カード単体表示 */}
        <div className="fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ fontFamily: 'var(--font-round)', fontSize: 18, fontWeight: 900, lineHeight: 1.4, color: 'var(--text)' }}>今のキミ</div>
            <span style={{ background: '#ffd633', color: '#1f1b16', border: '1.5px solid #1f1b16', borderRadius: 999, padding: '3px 10px', fontSize: 10.5, fontWeight: 800, fontFamily: 'var(--font-round)' }}>自己評価の結果</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-sub)', marginTop: 4 }}>キミの自己評価だけでできている、今のキミ</div>

          {/* 自己評価カード — トリセツカードと同じ見せ方 */}
          {/* 探索者カード（矢印素体＋虫眼鏡） */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0 2px' }}>
            <div style={{ width: '100%', maxWidth: 280, borderRadius: 16, background: '#315cfa', border: '2.5px solid #1f1b16', boxShadow: '6px 6px 0 #1f1b16', position: 'relative', overflow: 'hidden', padding: '12px 12px 15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 8.5, letterSpacing: 2.5, fontWeight: 800, color: '#ffd633' }}>KIMI NO TORISETSU</span>
                <span style={{ display: 'flex', gap: 2 }}>
                  {[0, 1, 2].map((i) => <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#ffd633" stroke="#1f1b16" strokeWidth="1.5" strokeLinejoin="round"><path d="M12 2l3 6.6 7 .8-5.2 4.8 1.4 7-6.2-3.6L5.8 21l1.4-7L2 9.4l7-.8z" /></svg>)}
                </span>
              </div>
              {/* アート枠 */}
              <div style={{ marginTop: 9, borderRadius: 12, border: '2px solid #1f1b16', background: '#6e8cff', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: 128, position: 'relative', overflow: 'hidden' }}>
                <svg style={{ position: 'absolute', top: 10, left: 14 }} width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" /></svg>
                <svg style={{ position: 'absolute', top: 26, right: 20 }} width="8" height="8" viewBox="0 0 24 24" fill="#ffd633"><path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" /></svg>
                {window.Character && <window.Character size={78} body="arrow" item="magnifier" />}
              </div>
              {/* ネームプレート */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: -14, position: 'relative' }}>
                <div style={{ background: '#ffd633', color: '#1f1b16', border: '2px solid #1f1b16', borderRadius: 10, padding: '6px 16px', fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 17.5, boxShadow: '3px 3px 0 #1f1b16' }}>探索者</div>
              </div>
              <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 12.5, color: '#fff', textAlign: 'center', marginTop: 11 }}>知りたいから、確かめにいく。</div>
              {/* カードテキスト */}
              <div style={{ background: '#fff', border: '2px solid #1f1b16', borderRadius: 10, padding: '10px 12px', marginTop: 9 }}>
                <p style={{ fontSize: 11, color: '#1f1b16', lineHeight: 1.75, fontWeight: 600, margin: 0 }}>気になったことをそのままにせず、自分の目で確かめにいく人。まわりが見落とす発見を拾い上げるよ。</p>
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', border: '2px solid #1f1b16', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 12, boxShadow: '3px 3px 0 #1f1b16' }}>
            <span style={{ flexShrink: 0, display: 'flex', paddingTop: 1, color: 'var(--blue)' }}><FIcon name="sparkle" size={17} color="var(--blue)" /></span>
            <p style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.75, textAlign: 'left', color: 'var(--text)' }}>自己評価から、キミの3つの持ち物「アイデア・行動力・まきこみ力」が見えてきたよ！</p>
          </div>
        </div>

        {/* キミの性格・傾向コメント */}
        <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', border: '2px solid #1f1b16', boxShadow: '4px 4px 0 #1f1b16', overflow: 'hidden' }}>
          <div style={{ background: 'var(--blue)', color: '#fff', padding: '11px 16px', fontFamily: 'var(--font-round)', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6, borderBottom: '2px solid #1f1b16' }}><FIcon name="search" size={15} color="#fff" /> キミの性格・傾向コメント</div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* 総合タイプ */}
            <div style={{ background: 'var(--blue-softer)', borderRadius: 'var(--r-md)', padding: 14, borderLeft: '3px solid var(--blue)' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--blue)', marginBottom: 6 }}>総合タイプ</div>
              <div style={{ fontFamily: 'var(--font-round)', fontSize: 15, fontWeight: 900, color: 'var(--text)', marginBottom: 8, lineHeight: 1.45 }}>アイデアと実行力を兼ね備えた<br />「行動する創造者」タイプ</div>
              <p style={{ fontSize: 12, color: 'var(--text-sub)', lineHeight: 1.85, fontWeight: 500 }}>新しいアイデアを次々と生み出しながら、自分の力で形にしていく力がキミの核心。エネルギッシュな挑戦者で人との関わりから刺激を受けやすく、それがさらにエネルギーとなって行動を加速させます。</p>
            </div>
            {TC_TRAITS.map((t, i) => (
              <div key={i} style={{ background: t.bg, borderRadius: 'var(--r-md)', padding: '12px 14px', display: 'flex', gap: 11 }}>
                <span style={{ display: 'flex', color: t.color, flexShrink: 0, paddingTop: 2 }}><FIcon name={t.emoji} size={18} color={t.color} /></span>
                <div>
                  <div style={{ fontFamily: 'var(--font-round)', fontSize: 13, fontWeight: 800, color: t.color, marginBottom: 4 }}>{t.title}</div>
                  <p style={{ fontSize: 11.5, color: 'var(--text)', lineHeight: 1.75, fontWeight: 500 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

    </>);
}

Object.assign(window, { SelfSummarySection, TaskCompleteScreen, StepCompleteScreen, StartOtherScreen, OtherStartScreen });