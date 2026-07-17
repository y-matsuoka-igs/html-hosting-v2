// screens-rpg.jsx — 6月の診断：転生RPG職業診断（占いの代替・仮置き）
// 真面目なトリセツから寄り道 → 種明かしで本道へ戻すループ。
const { useState: useRpg } = React;

// 遊びの差し色（本編の青/橙とは別の、紫=ファンタジー系）
const RPG = {
  grad: 'linear-gradient(150deg,#3a2f6b 0%,#6a4fc0 100%)',
  gradSoft: 'linear-gradient(135deg,#efeaff,#e2dcfb)',
  violet: '#6a4fc0',
  violetD: '#4b3b8f',
  ink: '#2b2350',
};

// 内部的に6職業ある想定。インタビュー用は「賢者」だけ作り込む。
const RPG_CLASSES = ['賢者', '勇者', '吟遊詩人', '錬金術師', '聖騎士', '旅商人'];

const SAGE = {
  name: '賢者',
  emoji: '🧙',
  title: '静かに真実を見抜く者',
  flavor: '群れずに、でも誰より深く考える。あなたは答えより“問い”の質で勝負するタイプ。',
  abilities: [
    { label: '論理的思考', icon: 'compass', v: 0.9 },
    { label: '疑う力', icon: 'search', v: 0.82 },
  ],
  mission: '授業で1回、“なんで?”と質問してみる',
  affinity: [
    { name: '吟遊詩人', emoji: '🎻', why: 'あなたの問いを、物語にして広めてくれる' },
    { name: '錬金術師', emoji: '⚗️', why: '仮説をすぐ試す相棒。考えが形になる' },
  ],
};

/* 能力ゲージ */
function AbilityBar({ icon, label, v }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ width: 30, height: 30, borderRadius: 9, background: '#efeaff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: RPG.violet, flexShrink: 0 }}><FIcon name={icon} size={17} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{label}</div>
        <div style={{ height: 8, background: '#eceaf6', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ width: `${v * 100}%`, height: '100%', background: 'linear-gradient(90deg,#7c5cdb,#a98bff)', borderRadius: 4 }}></div>
        </div>
      </div>
    </div>
  );
}

/* 結果本体（タブ版＝コンテンツ / 単独版で共有） */
function RpgResultBody({ from }) {
  const nav = useNav();
  const c = SAGE;
  return (
    <>
        {/* 職業カード（主役・スクショ映え） */}
        <div className="fade-in" style={{ background: RPG.grad, borderRadius: 'var(--r-lg)', padding: '24px 20px 22px', color: '#fff', textAlign: 'center', boxShadow: '0 14px 34px rgba(58,47,107,.4)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,.08)' }}></div>
          <div style={{ position: 'absolute', bottom: -40, left: -20, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }}></div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, letterSpacing: 2, opacity: .8, fontWeight: 700, marginBottom: 14 }}>あなたの転生先は…</div>
            <div style={{ width: 118, height: 118, margin: '0 auto 14px', borderRadius: '50%', background: 'rgba(255,255,255,.16)', border: '3px solid rgba(255,255,255,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60 }}>{c.emoji}</div>
            <div style={{ fontFamily: 'var(--font-round)', fontSize: 34, fontWeight: 900, lineHeight: 1.1 }}>{c.name}</div>
            <div style={{ display: 'inline-block', marginTop: 10, padding: '5px 15px', borderRadius: 999, background: 'rgba(255,255,255,.18)', fontSize: 13, fontWeight: 800 }}>「{c.title}」</div>
            <p style={{ fontSize: 12.5, opacity: .95, lineHeight: 1.85, fontWeight: 500, marginTop: 14, maxWidth: 280, marginLeft: 'auto', marginRight: 'auto' }}>{c.flavor}</p>
          </div>
        </div>

        {/* 能力値風の強み2つ */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: RPG.violetD, marginBottom: 13, display: 'flex', alignItems: 'center', gap: 6 }}><FIcon name="sparkle" size={14} color={RPG.violet} /> 賢者の能力</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {c.abilities.map((a, i) => <AbilityBar key={i} {...a} />)}
          </div>
        </div>

        {/* 2. 相性のいい職業 */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: RPG.violetD, marginBottom: 11, display: 'flex', alignItems: 'center', gap: 6 }}><FIcon name="handshake" size={14} color={RPG.violet} /> 相性のいい職業</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {c.affinity.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#f7f5ff', borderRadius: 12, padding: '11px 13px' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', border: '1.5px solid #e2dcfb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{a.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>{a.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-sub)', lineHeight: 1.5, fontWeight: 500, marginTop: 1 }}>{a.why}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. なんでこの職業？ → 種明かし */}
        <button className="btn btn--lg" onClick={() => nav.go('rpg-reveal', { from })}
          style={{ background: '#fff', color: RPG.violetD, border: `2px solid ${RPG.violet}`, gap: 8 }}>
          <FIcon name="search" size={18} color={RPG.violetD} /> なんでこの職業？
        </button>
        <div style={{ height: 4 }}></div>
    </>
  );
}

/* 単独版：トリセツの寄り道入口カードから遷移（戻る＝トリセツ） */
function RpgResultScreen() {
  const nav = useNav();
  return (
    <div className="screen">
      <StatusBar />
      <div className="appbar">
        <button onClick={() => nav.go('home')} style={{ border: 'none', background: 'var(--bg)', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)' }}>
          <Icon name="back" size={20} />
        </button>
        <div style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 16, color: 'var(--text)' }}>6月の診断</div>
      </div>
      <div className="scroll pad stack">
        <RpgResultBody from="rpg-result" />
      </div>
    </div>
  );
}

/* ════════════ 画面3：種明かし（ループを閉じる） ════════════ */
function RpgRevealScreen() {
  const nav = useNav();
  const sources = [
    { label: '開放性', sub: 'Big Five', icon: 'bulb' },
    { label: '自律性', sub: 'Big Five', icon: 'compass' },
    { label: '論理的思考', sub: '強み', icon: 'chart' },
  ];
  return (
    <div className="screen">
      <StatusBar />
      <div className="appbar">
        <button onClick={() => nav.go(nav.params.from || 'rpg-result')} style={{ border: 'none', background: 'var(--bg)', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)' }}>
          <Icon name="back" size={20} />
        </button>
        <div style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 16, color: 'var(--text)' }}>なんで賢者？</div>
      </div>

      <div className="scroll pad stack">
        <div className="fade-in" style={{ textAlign: 'center', paddingTop: 4 }}>
          <div style={{ width: 56, height: 56, margin: '0 auto 10px', borderRadius: '50%', background: RPG.gradSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: RPG.violet }}><FIcon name="search" size={28} /></div>
          <div style={{ fontFamily: 'var(--font-round)', fontSize: 19, fontWeight: 900, color: 'var(--text)', lineHeight: 1.4 }}>遊びの裏には、<br />キミの診断データがあるよ</div>
          <p style={{ fontSize: 12.5, color: 'var(--text-sub)', lineHeight: 1.8, fontWeight: 500, marginTop: 8 }}>「賢者」は占いじゃなくて、キミのトリセツの結果から決まっているんだ。</p>
        </div>

        {/* 根拠：Big Five 2軸 + 強み1つ */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: RPG.violetD, marginBottom: 13, display: 'flex', alignItems: 'center', gap: 6 }}><FIcon name="sparkle" size={14} color={RPG.violet} /> 賢者のもとになった3つ</div>
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 8 }}>
            {sources.map((s, i) => (
              <React.Fragment key={i}>
                <div style={{ flex: 1, background: '#f7f5ff', borderRadius: 12, padding: '13px 6px', textAlign: 'center' }}>
                  <div style={{ width: 36, height: 36, margin: '0 auto 7px', borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: RPG.violet }}><FIcon name={s.icon} size={19} /></div>
                  <div style={{ fontSize: 12.5, fontWeight: 900, color: 'var(--text)', fontFamily: 'var(--font-round)', lineHeight: 1.25 }}>{s.label}</div>
                  <div style={{ fontSize: 9.5, color: 'var(--text-sub)', fontWeight: 700, marginTop: 2 }}>{s.sub}</div>
                </div>
                {i < sources.length - 1 && <div style={{ display: 'flex', alignItems: 'center', color: RPG.violet, fontWeight: 900, fontSize: 16 }}>{i === 0 ? '×' : '＋'}</div>}
              </React.Fragment>
            ))}
          </div>
          <div style={{ marginTop: 13, background: RPG.gradSoft, borderRadius: 12, padding: '12px 14px', textAlign: 'center', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13.5, color: RPG.ink, lineHeight: 1.6 }}>
            「開放性 × 自律性 ＋ 論理的思考」が、<br />賢者のもとです
          </div>
        </div>

        <div style={{ background: '#fff8e1', borderRadius: 'var(--r-md)', padding: '13px 15px', borderLeft: '4px solid var(--orange)', fontSize: 12, color: 'var(--text)', lineHeight: 1.75, fontWeight: 500 }}>
          遊びで知った強みも、トリセツに書いてある“ホンモノ”。ミッションで実際にためしてみよう。
        </div>

        <button className="btn btn--cta btn--lg" onClick={() => nav.go('home')} style={{ gap: 8 }}>
          <FIcon name="book" size={19} color="#fff" /> トリセツに戻る
        </button>
        <div style={{ height: 4 }}></div>
      </div>
    </div>
  );
}

Object.assign(window, { RpgResultScreen, RpgRevealScreen, RpgResultBody });
