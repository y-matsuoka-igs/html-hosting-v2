// screens-home.jsx — ホーム（完成度30/70/100の3状態 × 3案）
const { useState: useSh } = React;

// 3ステップ定義
function homeSteps(state) {
  return [
    { key: 'diag',  label: '気質診断',  emoji: 'search', done: state.diag.done,  pct: 30 },
    { key: 'self',  label: '自己評価',  emoji: 'pencil', done: state.self.done,  pct: 40 },
    { key: 'other', label: '相互評価',  emoji: 'mail', done: state.other.done, pct: 30, note: 'みんなが評価を送ると完了' },
  ];
}
// 状態に応じたチャレンジ
function nextAction(state, comp) {
  if (!state.diag.done)  return { title: '気質診断をやってみよう', desc: 'ゲーム感覚で、キミのタイプをチェック！', cta: '気質診断をはじめる', go: 'start-diag', color: 'var(--blue)' };
  if (!state.self.done)  return { title: 'STEP 2：自己評価をやってみよう', desc: '5つの質問に答えるだけ。自分の強みが見えてくるよ。', cta: '自己評価をはじめる', go: 'self-eval', color: 'var(--blue)' };
  if (!state.other.done) return { title: 'STEP 3：相互評価をやってみよう', desc: 'クラスメートのことを評価しよう。みんなからの見方も集まってくるよ。', cta: 'あおいさんの相互評価を始める', go: 'other-eval', color: 'var(--orange)' };
  if (!state.seenAnnounce) return { title: 'トリセツが完成したよ！', desc: '新しい機能が解放されました。さっそくホームで見てみよう。', cta: '解放された機能を見る', go: 'announce', color: 'var(--orange)' };
  return { title: 'トリセツが完成したよ！', desc: 'キミだけの取扱説明書ができあがりました。', cta: 'ホームで見る', go: 'home', color: 'var(--green)' };
}

/* ───── 共通：あいさつヘッダー ───── */
function HomeGreeting() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 2px 2px' }}>
      <Mascot size={46} />
      <div>
        <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 16, color: 'var(--text)' }}>こんにちは、たろう！</div>
        <div style={{ fontSize: 11.5, color: 'var(--text-sub)', fontWeight: 600 }}>今日も一歩、自分を知ろう</div>
      </div>
    </div>
  );
}

/* ───── ロック/解放コンテンツ枠 ───── */
function ContentTeaser({ unlocked, onOpen }) {
  if (unlocked) {
    return (
      <button onClick={onOpen} style={{ width: '100%', border: 'none', cursor: 'pointer', textAlign: 'left', background: 'linear-gradient(135deg,#fff3e6,#ffe7cf)', borderRadius: 'var(--r-lg)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ color:'var(--orange)', display:'flex' }}><FIcon name="gift" size={26} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--orange-dark)' }}>コンテンツが解放されたよ！</div>
          <div style={{ fontSize: 10.5, color: '#b5732f' }}>占い・バッジ・今月の診断をチェック</div>
        </div>
        <Icon name="chevR" size={18} />
      </button>
    );
  }
  return (
    <div style={{ background: '#f0edea', borderRadius: 'var(--r-lg)', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ color:'#9a8f82', display:'flex' }}><FIcon name="lock" size={20} /></div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-sub)' }}>占い・バッジ・今月の診断</div>
        <div style={{ fontSize: 10, color: 'var(--text-sub)' }}>トリセツが完成すると様々なコンテンツが解放されます</div>
      </div>
    </div>
  );
}

/* ───── チャレンジカード ───── */
function NextCard({ action, onGo }) {
  return (
    <div className="card">
      <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 4, height: 16, borderRadius: 2, background: action.color }}></span>{action.title}
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-sub)', marginBottom: 12, lineHeight: 1.6, whiteSpace: 'pre-line', fontWeight: 500 }}>{action.desc}</p>
      <button className="btn" style={{ background: action.color, color: '#fff', boxShadow: 'var(--shadow)' }} onClick={onGo}>{action.cta}</button>
    </div>
  );
}

/* ════ 案A：チェックリスト型（原案踏襲・ポップ） ════ */
function HomeVarA({ state, comp }) {
  const nav = useNav();
  const steps = homeSteps(state);
  const action = nextAction(state, comp);
  const doneCount = steps.filter(s => s.done).length;
  return (
    <div className="stack">
      <div style={{ background: 'linear-gradient(135deg,#1aa6ff,#0069b5)', borderRadius: 'var(--r-lg)', padding: 18, color: '#fff', boxShadow: 'var(--shadow-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 14 }}>トリセツ完成度</span>
          <span style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 28 }}>{comp}<span style={{ fontSize: 15 }}>%</span></span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
          {steps.map(s => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: s.done ? '#fff' : 'rgba(255,255,255,.18)', border: s.done ? 'none' : '2px solid rgba(255,255,255,.4)' }}>
                {s.done ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <span style={{ fontSize: 11 }}>{s.emoji}</span>}
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, opacity: s.done ? 1 : .6 }}>{s.label}の完了
                {s.note && <span style={{ fontSize: 9.5, opacity: .8, fontWeight: 500 }}>（{s.note}）</span>}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 10, background: 'rgba(255,255,255,.22)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: `${comp}%`, height: '100%', background: '#fff', borderRadius: 999, transition: 'width .6s cubic-bezier(.2,.8,.2,1)' }}></div>
        </div>
        <div style={{ fontSize: 11, opacity: .9, marginTop: 6, fontWeight: 600 }}>{doneCount} / 3 完了</div>
      </div>
      <NextCard action={action} onGo={() => nav.go(action.go)} />
      <ContentTeaser unlocked={comp >= 100} onOpen={() => nav.tab('contents')} />
    </div>
  );
}

/* ════ 案B：リング型（マスコット＋円形プログレス） ════ */
function HomeVarB({ state, comp }) {
  const nav = useNav();
  const steps = homeSteps(state);
  const action = nextAction(state, comp);
  const R = 52, C = 2 * Math.PI * R;
  return (
    <div className="stack">
      <div className="card" style={{ textAlign: 'center', padding: '22px 18px', background: 'linear-gradient(160deg,#fff,#eef7ff)' }}>
        <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 6px' }}>
          <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="70" cy="70" r={R} fill="none" stroke="#e3eef8" strokeWidth="13" />
            <circle cx="70" cy="70" r={R} fill="none" stroke="url(#hg)" strokeWidth="13" strokeLinecap="round"
              strokeDasharray={`${comp / 100 * C} ${C}`} style={{ transition: 'stroke-dasharray .7s cubic-bezier(.2,.8,.2,1)' }} />
            <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1aa6ff"/><stop offset="1" stopColor="#0069b5"/></linearGradient></defs>
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 34, color: 'var(--blue-dark)', lineHeight: 1 }}>{comp}%</div>
            <div style={{ fontSize: 10.5, color: 'var(--text-sub)', fontWeight: 700, marginTop: 2 }}>トリセツ完成度</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 4 }}>
          {steps.map(s => (
            <div key={s.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
                background: s.done ? 'var(--green-soft)' : 'var(--bg)', border: s.done ? '2px solid var(--green)' : '2px solid var(--border-soft)' }}>
                {s.done ? <span style={{fontWeight:900}}>✓</span> : <FIcon name={s.emoji} size={17} />}
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: s.done ? 'var(--text)' : 'var(--text-sub)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <NextCard action={action} onGo={() => nav.go(action.go)} />
      <ContentTeaser unlocked={comp >= 100} onOpen={() => nav.tab('contents')} />
    </div>
  );
}

/* ════ 案C：ジャーニー型（すごろく） ════ */
function HomeVarC({ state, comp }) {
  const nav = useNav();
  const steps = homeSteps(state);
  const action = nextAction(state, comp);
  const currentIdx = steps.findIndex(s => !s.done);
  return (
    <div className="stack">
      <div className="card" style={{ padding: '20px 18px', background: 'linear-gradient(160deg,#fff8ef,#fff)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>強み発見マップ</span>
          <Pill style={{ background: 'var(--blue-soft)', color: 'var(--blue-dark)' }}>{comp}% 達成</Pill>
        </div>
        <div style={{ position: 'relative', paddingLeft: 4 }}>
          {steps.map((s, i) => {
            const isCurrent = i === currentIdx;
            const isLast = i === steps.length - 1;
            return (
              <div key={s.key} style={{ display: 'flex', gap: 14, position: 'relative', paddingBottom: isLast ? 0 : 18 }}>
                {!isLast && <div style={{ position: 'absolute', left: 19, top: 40, bottom: 0, width: 3, background: s.done ? 'var(--green)' : 'var(--border)', borderRadius: 2 }}></div>}
                <div style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, position: 'relative', zIndex: 2,
                  background: s.done ? 'var(--green)' : isCurrent ? 'var(--orange)' : 'var(--bg)',
                  border: s.done || isCurrent ? 'none' : '2px solid var(--border)',
                  boxShadow: isCurrent ? '0 0 0 5px rgba(252,133,36,.18)' : 'none', color: s.done ? '#fff' : 'inherit' }}>
                  {s.done ? <span style={{fontWeight:900}}>✓</span> : <FIcon name={s.emoji} size={17} />}
                </div>
                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 14, color: s.done || isCurrent ? 'var(--text)' : 'var(--text-sub)' }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: s.done ? 'var(--green)' : isCurrent ? 'var(--orange-dark)' : 'var(--text-sub)', fontWeight: 600 }}>
                    {s.done ? '完了！' : isCurrent ? '今ここ' : 'これから'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <NextCard action={action} onGo={() => nav.go(action.go)} />
      <ContentTeaser unlocked={comp >= 100} onOpen={() => nav.tab('contents')} />
    </div>
  );
}

function HomeScreen() {
  const nav = useNav();
  const comp = completion(nav.state);
  const VAR = HomeVarB;
  const Pause = window.InterviewPause;
  return (
    <div className="screen">
      <StatusBar />
      <AppHeader />
      <div className="scroll pad stack">
        <HomeGreeting />
        <VAR state={nav.state} comp={comp} />
      </div>
      {(comp === 30 || comp === 100) && Pause && <Pause />}
    </div>
  );
}

Object.assign(window, { HomeScreen });
