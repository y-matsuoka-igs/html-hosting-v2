// screens-hub.jsx — 受検ハブ(exam) / コンテンツ(contents)
const { useState: useShub } = React;

/* ════ 受検ハブ ════ */
function ExamHubScreen() {
  const nav = useNav();
  const s = nav.state;
  const items = [
    { key: 'diag',  title: '気質診断',  emoji: 'search', desc: 'ゲームでキミのタイプを診断', done: s.diag.done,  go: 'start-diag', color: 'var(--blue)' },
    { key: 'self',  title: '自己評価',  emoji: 'pencil', desc: '5つの質問で自分を評価', done: s.self.done,  go: 'self-eval', locked: !s.diag.done, color: '#00ACC1' },
    { key: 'other', title: '相互評価',  emoji: 'mail', desc: 'みんなのことを評価しよう', done: s.other.done, go: 'other-eval', locked: !s.self.done, color: 'var(--orange)' },
  ];
  return (
    <div className="screen">
      <StatusBar />
      <AppHeader sub="受検" />
      <div className="scroll pad stack">
        <div>
          <h2 style={{ fontSize: 17, fontWeight: 900 }}>受検メニュー</h2>
          <p style={{ fontSize: 12, color: 'var(--text-sub)', marginTop: 4, fontWeight: 500 }}>3つのステップでトリセツが完成するよ</p>
        </div>
        {items.map((it, i) => (
          <button key={it.key} onClick={() => !it.locked && nav.go(it.go)} disabled={it.locked}
            className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', border: 'none', cursor: it.locked ? 'default' : 'pointer', width: '100%', opacity: it.locked ? .55 : 1 }}>
            <div style={{ width: 50, height: 50, borderRadius: 15, flexShrink: 0, background: it.done ? 'var(--green-soft)' : `${it.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              <span style={{display:'flex', color: it.done ? 'var(--green)' : it.color}}>{it.locked ? <FIcon name="lock" size={22} color="#b3b9be" /> : <FIcon name={it.emoji} size={24} />}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15 }}>STEP {i + 1}・{it.title}</span>
                {it.done && <span className="pill" style={{ background: 'var(--green-soft)', color: '#2E7D32', fontSize: 10, padding: '3px 8px' }}>完了</span>}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--text-sub)', marginTop: 3, fontWeight: 500 }}>{it.locked ? '前のステップを完了すると解放' : it.desc}</div>
            </div>
            {!it.locked && <Icon name="chevR" size={18} />}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ════ コンテンツ ════ */
const BADGES = [
  { e: '🔍', l: '気質診断', need: 'diag' },
  { e: '✏️', l: '自己評価', need: 'self' },
  { e: '💌', l: '相互評価', need: 'other' },
  { e: '📖', l: 'トリセツ完成', need: 'all' },
  { e: '👣', l: '初めの一歩', need: 'step' },
  { e: '🌳', l: '成長の証', need: 'tree' },
];

/* ── レア度 ── */
const RARITY = {
  N:  { label: 'N',  name: 'ノーマル',     color: '#9aa3aa', bg: '#eef0f2', glow: 'none' },
  R:  { label: 'R',  name: 'レア',         color: '#0096fa', bg: '#e3f3ff', glow: '0 4px 14px rgba(0,150,250,.28)' },
  SR: { label: 'SR', name: 'スーパーレア', color: '#8a6cf0', bg: '#efeaff', glow: '0 4px 16px rgba(138,108,240,.34)' },
  UR: { label: 'UR', name: 'ウルトラレア', color: '#FC8524', bg: '#fff1e0', glow: '0 5px 20px rgba(252,133,36,.40)' },
};

/* ── 成長バッジ（カテゴリ分け＋レア度） ── */
const BADGE_GROUPS = [
  {
    key: 'comp', label: 'コンピテンシーの証', icon: '💎',
    desc: '強みや能力に関するバッジ',
    badges: [
      { e: '🧭', l: '自己発見',     rar: 'N',  got: true },
      { e: '💡', l: '創造の芽',     rar: 'R',  got: true },
      { e: '🤝', l: '共感マスター', rar: 'SR', got: true },
      { e: '🔥', l: '実行力の鬼',   rar: 'SR', got: false },
      { e: '👑', l: '五冠達成',     rar: 'UR', got: false },
    ],
  },
  {
    key: 'challenge', label: '挑戦の記録', icon: '🚩',
    desc: 'チャレンジの達成に関するバッジ',
    badges: [
      { e: '👣', l: '初めの一歩', rar: 'N',  got: true },
      { e: '✅', l: '3つ達成',    rar: 'R',  got: true },
      { e: '🏅', l: '10コンプ',   rar: 'SR', got: false },
      { e: '🌟', l: '挑戦王',     rar: 'UR', got: false },
    ],
  },
  {
    key: 'action', label: '継続の習慣', icon: '🔥',
    desc: '毎日のアクセスなど行動に関するバッジ',
    badges: [
      { e: '🌅', l: '初ログイン', rar: 'N',  got: true },
      { e: '📅', l: '7日連続',    rar: 'R',  got: true },
      { e: '⚡', l: '30日連続',   rar: 'SR', got: false },
      { e: '💯', l: '皆勤の証',   rar: 'UR', got: false },
    ],
  },
  {
    key: 'special', label: 'スペシャル', icon: '🎁',
    desc: 'イベントや特別な行動でもらえるバッジ',
    badges: [
      { e: '🎉', l: 'はじめまして', rar: 'N',  got: true },
      { e: '🔮', l: '占い好き',     rar: 'R',  got: false },
      { e: '🦄', l: '隠しバッジ',   rar: 'UR', got: false },
    ],
  },
];

function GrowthBadge({ b }) {
  const r = RARITY[b.rar];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, opacity: b.got ? 1 : .5 }}>
      <div style={{ position: 'relative' }}>
        <div style={{ width: 58, height: 58, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 27,
          background: b.got ? r.bg : 'var(--bg)',
          border: `2px solid ${b.got ? r.color : 'var(--border)'}`,
          boxShadow: b.got ? r.glow : 'none' }}>
          {b.got ? <Emo e={b.e} size={26} color={r.color} /> : <FIcon name="lock" size={22} color="#b3b9be" />}
        </div>
        {/* レア度バッジ */}
        <span style={{ position: 'absolute', top: -6, right: -6, minWidth: 20, height: 20, padding: '0 5px', borderRadius: 999,
          background: b.got ? r.color : '#c2c8cd', color: '#fff', fontSize: 9.5, fontWeight: 900, fontFamily: 'var(--font-round)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }}>{r.label}</span>
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, color: b.got ? 'var(--text)' : 'var(--text-sub)', textAlign: 'center', lineHeight: 1.2 }}>{b.l}</span>
    </div>
  );
}

function ContentsScreen() {
  const nav = useNav();
  const comp = completion(nav.state);
  const unlocked = comp >= 100;

  const totalGot = BADGE_GROUPS.reduce((s, g) => s + g.badges.filter(b => b.got).length, 0);
  const totalAll = BADGE_GROUPS.reduce((s, g) => s + g.badges.length, 0);

  return (
    <div className="screen">
      <StatusBar />
      <AppHeader sub="コンテンツ" />
      <div className="scroll pad stack">
        {!unlocked && (
          <div style={{ background: '#f0edea', borderRadius: 'var(--r-lg)', padding: '16px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9a8f82', flexShrink: 0 }}><FIcon name="lock" size={20} /></div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>もう少しで解放！</div>
              <div style={{ fontSize: 11, color: 'var(--text-sub)', marginTop: 2, lineHeight: 1.5 }}>トリセツが完成すると、占い・診断などが楽しめるよ（現在 {comp}%）</div>
            </div>
          </div>
        )}

        {/* 成長バッジ */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 2 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 7 }}><FIcon name="leaf" size={18} color="var(--green)" /> 成長バッジ</h3>
          <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--blue)' }}>{totalGot} / {totalAll} 獲得</span>
        </div>

        {BADGE_GROUPS.map(g => {
          const gGot = g.badges.filter(b => b.got).length;
          return (
            <div key={g.key} className="card" style={{ padding: '14px 14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 3 }}>
                <span style={{ display: 'flex', color: 'var(--text)' }}><Emo e={g.icon} size={18} /></span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13.5, color: 'var(--text)' }}>{g.label}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-sub)', fontWeight: 600, marginTop: 1 }}>{g.desc}</div>
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--text-sub)' }}>{gGot}/{g.badges.length}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginTop: 12 }}>
                {g.badges.map((b, i) => <GrowthBadge key={i} b={b} />)}
              </div>
            </div>
          );
        })}

        {/* レア度の凡例 */}
        <div className="card card--flat" style={{ display: 'flex', justifyContent: 'space-around', padding: '11px 10px' }}>
          {Object.values(RARITY).map(r => (
            <div key={r.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ minWidth: 22, height: 20, padding: '0 6px', borderRadius: 999, background: r.color, color: '#fff', fontSize: 10, fontWeight: 900, fontFamily: 'var(--font-round)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.label}</span>
              <span style={{ fontSize: 9, color: 'var(--text-sub)', fontWeight: 700 }}>{r.name}</span>
            </div>
          ))}
        </div>

        {/* お楽しみメニュー */}
        <h3 style={{ fontSize: 14, fontWeight: 800 }}>お楽しみコンテンツ</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            ['🔮', '今日の占い', '#8a6cf0', '#EDE7F6', 'fortune'],
            ['🎯', '今月の診断', '#0096fa', '#E0F7FA', 'monthly'],
            ['🎁', 'スペシャル', '#FC8524', '#fff3e0', null],
            ['📊', '成長レポート', '#00c853', '#e4f9ec', null],
          ].map(([e, l, c, bg, screen]) => (
            <div key={l} onClick={() => unlocked && screen && nav.go(screen)}
              style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: '18px 14px', textAlign: 'center', boxShadow: 'var(--shadow-sm)', opacity: unlocked ? 1 : .5, position: 'relative', cursor: unlocked && screen ? 'pointer' : 'default' }}>
              {!unlocked && <div style={{ position: 'absolute', top: 8, right: 8, color: '#b3b9be', display: 'flex' }}><FIcon name="lock" size={13} /></div>}
              <div style={{ width: 46, height: 46, borderRadius: 14, margin: '0 auto 8px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c }}><Emo e={e} size={24} /></div>
              <div style={{ fontFamily: 'var(--font-round)', fontWeight: 700, fontSize: 12.5 }}>{l}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ════ 受検準備中 ════ */
function ExamWaitingScreen() {
  const nav = useNav();
  return (
    <div className="screen">
      <StatusBar />
      {/* 青ヘッダー */}
      <div style={{ background: 'var(--blue)', flexShrink: 0, padding: '24px 24px 32px', textAlign: 'center', color: '#fff' }}>
        {/* クリップボード＋時計アイコン */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ position: 'relative', width: 72, height: 72 }}>
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <rect x="12" y="8" width="48" height="56" rx="8" fill="none" stroke="white" strokeWidth="3.5"/>
              <path d="M24 8v-2a4 4 0 0 1 8 0v2M40 8v-2a4 4 0 0 1 8 0v2" stroke="white" strokeWidth="3"/>
              <rect x="20" y="6" width="32" height="8" rx="4" fill="white" opacity=".25"/>
              <line x1="24" y1="30" x2="48" y2="30" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <line x1="24" y1="40" x2="40" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="54" cy="54" r="14" fill="var(--blue)" stroke="white" strokeWidth="3"/>
              <path d="M54 48v7l4 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, opacity: .8, marginBottom: 8 }}>NEXT SESSION</div>
        <h1 style={{ fontFamily: 'var(--font-round)', fontSize: 24, fontWeight: 900, lineHeight: 1.4, marginBottom: 10 }}>
          次のAi GROW受検は<br/>準備中です
        </h1>
        <p style={{ fontSize: 13, opacity: .85, lineHeight: 1.7, fontWeight: 500 }}>
          次回の受検案内が届くまで、<br/>今の強みを活かして前へ進もう！
        </p>
      </div>

      <div className="scroll pad stack">
        {/* それまでにできること */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2.5"/></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15 }}>それまでにできること</span>
          </div>
          <ul style={{ listStyle: 'disc', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['チャレンジでコンピテンシーを高める行動をする', () => nav.go('next-step')],
              ['トリセツを読み返して自分の強みを活かす場面を探す', () => nav.go('home')],
              ['AIに相談してキミの伸ばし方を深掘りする', () => nav.go('ai-chat')],
              ['コンテンツで気分転換・自己理解を深める', () => nav.go('contents')],
            ].map(([text, onClick]) => (
              <li key={text} style={{ fontSize: 13.5, color: 'var(--text)', fontWeight: 500, lineHeight: 1.6, cursor: 'pointer' }} onClick={onClick}>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* 次回受検の目安 */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>次回受検の目安</div>
          <div style={{ background: 'var(--bg)', borderRadius: 'var(--r-md)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-sub)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            <span style={{ fontSize: 13, color: 'var(--text-sub)', fontWeight: 600 }}>学校・担当者からの案内をお待ちください</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ExamHubScreen, ContentsScreen, ExamWaitingScreen });

/* ════ 今日の占い ════ */
function FortuneScreen() {
  const nav = useNav();
  const items = [
    { e: 'palette', title: 'ラッキーカラー：イエロー', body: '明るい色を身に着けて気分をあげよう！' },
    { e: 'gift', title: 'ラッキーフード：ドーナツ', body: '丸い形で人とのつながり運アップ！' },
    { e: 'book', title: 'ラッキー教科：国語', body: '自分の考えを言葉にするといいことあるかも！' },
    { e: 'chat', title: '今日のひとこと：「それいいね！」', body: '誰かの、何かのいい所を見つけて言葉にしてみよう' },
    { e: '✨', title: '今日のおすすめ行動', body: 'あまり話したことがない友だちに話しかけてみよう。新しい視点が得られるかも！' },
  ];
  return (
    <div className="screen">
      <StatusBar />
      <div className="appbar">
        <button onClick={() => nav.go('contents')} style={{ border: 'none', background: 'var(--bg)', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)' }}>
          <Icon name="back" size={20} />
        </button>
        <div className="logo"><span className="ai">Ai</span><span className="grow">GROW</span></div>
        <div style={{ width: 38 }}></div>
      </div>
      <div className="scroll pad stack">
        {/* ヒーロー */}
        <div style={{ background: 'linear-gradient(135deg,#2C1654,#6A3093)', borderRadius: 'var(--r-lg)', padding: '22px 20px', color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: 2, opacity: .75, fontWeight: 700, marginBottom: 8 }}>今日の占い</div>
          <div style={{ fontSize: 13.5, opacity: .9, marginBottom: 10, lineHeight: 1.6 }}>周りを明るくするアイデアメーカータイプの<br/>キミの今日の運勢は…</div>
          <div style={{ fontSize: 28, letterSpacing: 4, marginBottom: 8, color: '#FFD54F' }}>★★★★☆</div>
          <div style={{ fontSize: 14, fontFamily: 'var(--font-round)', fontWeight: 800, lineHeight: 1.55 }}>アイデアがポンポン出てくる日。<br/>ちょっとしたひとことで、場の空気を変えられそう！</div>
        </div>
        {/* アイテム一覧 */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {items.map((it, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: '#EDE7F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a6cf0', flexShrink: 0 }}>{it.e && <FIcon name={it.e} size={20} />}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', marginBottom: 2 }}>{it.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-sub)', lineHeight: 1.6, fontWeight: 500 }}>{it.body}</div>
              </div>
            </div>
          ))}
        </div>
        {/* コンテンツナビ */}
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 700, marginBottom: 8 }}>コンテンツを見る</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['🔮', '今日の占い', '#EDE7F6', null], ['🎯', '今月の診断', '#E0F7FA', 'monthly']].map(([e, l, bg, s]) => (
              <button key={l} onClick={() => s && nav.go(s)} disabled={!s}
                style={{ flex: 1, background: bg, border: 'none', borderRadius: 12, padding: '10px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: s ? 'pointer' : 'default', opacity: s ? 1 : .45 }}>
                <span style={{ fontSize: 22 }}>{e}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text)', textAlign: 'center' }}>{l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════ 今月の診断 ════ */
function MonthlyScreen() {
  const nav = useNav();
  const others = ['🎸', '🥁', '🎹', '🎷', '🎻'];
  return (
    <div className="screen">
      <StatusBar />
      <div className="appbar">
        <button onClick={() => nav.go('contents')} style={{ border: 'none', background: 'var(--bg)', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)' }}>
          <Icon name="back" size={20} />
        </button>
        <div className="logo"><span className="ai">Ai</span><span className="grow">GROW</span></div>
        <div style={{ width: 38 }}></div>
      </div>
      <div className="scroll pad stack">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#00838F', marginBottom: 4 }}>今月の診断</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 2 }}>あなたはどの楽器？楽器診断</div>
          <div style={{ fontSize: 13, color: 'var(--text-sub)' }}>あなたは…</div>
        </div>
        {/* 楽器サークル */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'linear-gradient(135deg,#E0F7FA,#B2EBF2)', border: '3px solid #00838F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, boxShadow: '0 8px 24px rgba(0,131,143,.2)' }}>🎺</div>
        </div>
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-round)', fontSize: 19, fontWeight: 900, color: 'var(--text)' }}>トランペットタイプ！</div>
        <div className="card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13.5, color: 'var(--text)', marginBottom: 10, fontWeight: 500 }}>
            <span>・明るくてエネルギーがある</span>
            <span>・ここぞというときに前に出られる</span>
            <span>・まわりの空気を動かす力がある</span>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--orange)', fontWeight: 700 }}><span style={{display:'inline-flex',alignItems:'center',gap:5}}><FIcon name="star" size={13} color="var(--orange)" /> 「場を引っ張るスイッチ」を持っているタイプ</span></div>
        </div>
        {/* 他のタイプ */}
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-sub)', marginBottom: 8, textAlign: 'center' }}>他のタイプを見る</div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            {others.map((e, i) => (
              <div key={i} style={{ width: 48, height: 48, borderRadius: '50%', background: '#f5f6f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '1.5px solid var(--border)', cursor: 'pointer' }}>{e}</div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-sub)', textAlign: 'center', marginTop: 8, lineHeight: 1.6 }}>毎月替わる：お弁当のおかず・動物・スイーツ・RPGキャラ・偉人 など</div>
        </div>
        {/* コンテンツナビ */}
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 700, marginBottom: 8 }}>コンテンツを見る</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['🔮', '今日の占い', '#EDE7F6', 'fortune'], ['🎯', '今月の診断', '#E0F7FA', null]].map(([e, l, bg, s]) => (
              <button key={l} onClick={() => s && nav.go(s)} disabled={!s}
                style={{ flex: 1, background: bg, border: 'none', borderRadius: 12, padding: '10px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: s ? 'pointer' : 'default', opacity: s ? 1 : .45 }}>
                <span style={{ fontSize: 22 }}>{e}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text)', textAlign: 'center' }}>{l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FortuneScreen, MonthlyScreen });
