// torisetsu-combined.jsx — ホーム画面（トリセツ）— AiGROW プロトタイプ統合版
const { useState: useTc } = React;

// ── Design Tokens (App.tsx準拠) ───────────────────────────
const TC = {
  blue: '#315cfa',
  blueDark: '#2447c9',
  blueGrad: '#315cfa',
  orange: '#ff6b5e',
  orangeD: '#e8523f',
  orangeGrad: '#ff6b5e',
  gold: '#ffd633',
  text: '#1f1b16',
  textSub: '#7a7263',
  bg: '#fffbf2',
  surface: '#ffffff',
  border: '#cfc4ab',
  orangeSoft: '#fff5cc',
  blueSoft: '#e8edff',
  font: "'Noto Sans JP', system-ui, sans-serif",
  fontRound: "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif",
  shadow: '0 2px 8px rgba(20,40,60,.08)'
};

// ── コンテンツデータ ───────────────────────────────────────
const TORI = {
  typeTitle: '行動する創造者',
  typeSub: 'アイデアと実行力を兼ね備えた',
  strengths: ['個人的実行力', '創造力', '表現力', '影響力の行使'],
  strengthDesc: 'アイデアを生み出し、それを自分の力で形にしながら、言葉や行動で周囲に伝え、人を巻き込みながら実現していく力があります。',
  patterns: ['人と話すなかでアイデアがどんどん出てくる', '考えるより先に動き出すことが多い', '周りを巻き込みながら進めるのが得意', '変化や新しい環境にワクワクできる'],
  usage: [['📣', 'アイデアはまず誰かに話してみる'], ['👥', '一人で抱え込まずチームで動く機会をつくる'], ['🚀', '「まずやってみる」を大切に'], ['🎯', '自分が輝けるポジション・役割を積極的に選ぶ']],
  pitfalls: ['動き出しは早いが、詰めが甘くなりやすい', '一人で黙々とやる作業が続くと集中力が落ちやすい', '周りの意見に影響されすぎて方向がブレることも']
};

const EVOLUTION = {
  past: { name: '観察者', icon: '🌱', level: 1 },
  current: { name: '分析タイプ', icon: '🔍', level: 3, keys: ['創造力', '個人的実行力'] },
  branches: [
  { name: 'リーダータイプ', icon: '👑', desc: '周囲を動かす指揮者', need: '影響力の行使 +15', progress: 60, recommended: true },
  { name: 'クリエイタータイプ', icon: '🎨', desc: '0→1を生み出す表現者', need: '創造力 +8', progress: 80, recommended: false },
  { name: 'ストラテジストタイプ', icon: '♟️', desc: '戦略で道を拓く', need: '誠実性 +20', progress: 30, recommended: false }]

};

const TREE_NODES = [
{ id: 'origin', name: '観察者', icon: '🌱', tier: 0, desc: '好奇心の芽', status: 'past' },
{ id: 'thinker', name: '思考者', icon: '💭', tier: 1, parent: 'origin', desc: '考えるのが好き', status: 'past', keyComp: '創造力' },
{ id: 'doer', name: '実行者', icon: '⚡', tier: 1, parent: 'origin', desc: 'まず動いてみる', status: 'unlocked', keyComp: '個人的実行力' },
{ id: 'talker', name: '対話者', icon: '💬', tier: 1, parent: 'origin', desc: '人と話して広げる', status: 'candidate', keyComp: '表現力' },
{ id: 'analyst', name: '分析タイプ', icon: '🔍', tier: 2, parent: 'thinker', desc: 'データを読み解く', status: 'current' },
{ id: 'creator', name: 'クリエイター', icon: '🎨', tier: 2, parent: 'thinker', desc: '0→1を生み出す', status: 'candidate', keyComp: '創造力' },
{ id: 'leader', name: 'リーダー', icon: '👑', tier: 2, parent: 'doer', desc: '周囲を動かす', status: 'candidate', keyComp: '影響力' },
{ id: 'strategist', name: 'ストラテジスト', icon: '♟️', tier: 2, parent: 'doer', desc: '戦略で道を拓く', status: 'locked', keyComp: '誠実性' },
{ id: 'connector', name: 'コネクター', icon: '🤝', tier: 2, parent: 'talker', desc: '人と人をつなぐ', status: 'locked', keyComp: '協調性' },
{ id: 'scientist', name: 'サイエンティスト', icon: '🧪', tier: 3, parent: 'analyst', desc: '真理を探究する', status: 'locked' },
{ id: 'architect', name: 'アーキテクト', icon: '🏛️', tier: 3, parent: 'analyst', desc: '仕組みを設計する', status: 'locked' },
{ id: 'artist', name: 'アーティスト', icon: '🎭', tier: 3, parent: 'creator', desc: '世界観を創る', status: 'locked' },
{ id: 'ceo', name: '経営者', icon: '💼', tier: 3, parent: 'leader', desc: '組織を動かす', status: 'locked' },
{ id: 'hidden', name: '？？？', icon: '❔', tier: 3, parent: 'connector', desc: '未知の進化', status: 'hidden' }];


const TIER_LABELS = ['はじまり', 'Lv.1 萌芽', 'Lv.2 開花', 'Lv.3 完成形'];

const CHALLENGES_DATA = [
{ text: '授業で1回、自分の意見を発言してみる', done: true, tag: '表現力' },
{ text: '新しいアイデアを3つメモに書き出す', done: true, tag: '創造力' },
{ text: 'クラスメイトを誘って共同プロジェクトを始める', done: false, tag: '個人的実行力' },
{ text: '1日の振り返りを5分間書いてみる', done: false, tag: '内省' }];


// ── Character Avatar ──────────────────────────────────────
// 素体（ブロブ＋台座）と持ち物を別管理。item を差し替えると持ち物が変わる。
const CHAR_ITEMS = {
  // 電球：想像者（アイデア・ひらめき）のモチーフ
  bulb: (
    <g>
      <circle cx="84" cy="52" r="10" fill="#ffd633" stroke="#1f2b4d" strokeWidth="3.5" />
      <path d="M80.5 64h7" stroke="#1f2b4d" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M81.5 68.5h5" stroke="#1f2b4d" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M84 36v-4M96 40l3-3M99 52h4" stroke="#1f2b4d" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M80 49q1.5-2.5 4.5-3" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
  ),
  magnifier: (
    <g>
      <line x1="81" y1="64" x2="75" y2="73" stroke="#1f2b4d" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="84" cy="57" r="9" fill="#eef3fb" stroke="#1f2b4d" strokeWidth="4" />
      <path d="M80 53q2-2.5 5-2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
  ),
  pencil: (
    <g transform="rotate(35 82 60)">
      <rect x="79" y="46" width="7" height="22" rx="1" fill="#ffd633" stroke="#1f2b4d" strokeWidth="2.2" />
      <path d="M79 68l3.5 7l3.5-7Z" fill="#ffe9c4" stroke="#1f2b4d" strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="79" y="46" width="7" height="5" fill="#ff6b5e" stroke="#1f2b4d" strokeWidth="2.2" />
    </g>
  ),
  flag: (
    <g>
      <line x1="82" y1="44" x2="82" y2="72" stroke="#1f2b4d" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M82 46h16l-4.5 5l4.5 5H82Z" fill="#ff6b5e" stroke="#1f2b4d" strokeWidth="2.2" strokeLinejoin="round" />
    </g>
  ),
  megaphone: (
    <g transform="rotate(-15 82 60)">
      <path d="M76 56l12-7v18l-12-7Z" fill="#ffd633" stroke="#1f2b4d" strokeWidth="2.4" strokeLinejoin="round" />
      <rect x="71" y="55" width="6" height="8" rx="2" fill="#ff6b5e" stroke="#1f2b4d" strokeWidth="2.4" />
      <path d="M91 52.5l4-2M92 58h4.5M91 63.5l4 2" stroke="#1f2b4d" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
};

function Character({ size = 60, item = 'bulb' }) {
  return (
    <div style={{ position: 'relative', width: size, height: size * 1.2, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', flexShrink: 0 }}>
      <svg viewBox="0 0 96 96" style={{ position: 'relative', width: size * 1.15, height: size * 1.15, overflow: 'visible', animation: 'floaty 2.6s ease-in-out infinite' }}>
        <defs>
          <linearGradient id="charBody" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#f9a05c" />
            <stop offset="1" stopColor="#e56a1f" />
          </linearGradient>
        </defs>
        <path d="M14 8l1.8 5.2L21 15l-5.2 1.8L14 22l-1.8-5.2L7 15l5.2-1.8Z" fill="#ffd633" />
        <path d="M23 2l1.1 3.2L27.3 6.3l-3.2 1.1L23 10.6l-1.1-3.2L18.7 6.3l3.2-1.1Z" fill="#c9b8f5" />
        <ellipse cx="48" cy="88" rx="26" ry="6.5" fill="#e56a1f" opacity=".85" />
        <ellipse cx="48" cy="84.5" rx="19" ry="5" fill="#f9a05c" />
        <circle cx="48" cy="50" r="29" fill="url(#charBody)" />
        <ellipse cx="38" cy="32" rx="9" ry="4.5" fill="#ffffff" opacity=".35" transform="rotate(-18 38 32)" />
        <ellipse cx="40" cy="50" rx="4.6" ry="8" fill="#ffffff" />
        <ellipse cx="56" cy="50" rx="4.6" ry="8" fill="#ffffff" />
        {CHAR_ITEMS[item] || null}
      </svg>
      <style>{`@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`}</style>
    </div>);

}

// ── Shell Components ──────────────────────────────────────
function StickyHero({ collapsed }) {
  return (
    <div style={{ background: TC.blueGrad, borderBottom: '2px solid #1f1b16', padding: collapsed ? '9px 18px' : '14px 18px 16px', flexShrink: 0, transition: 'padding .25s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {!collapsed &&
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.7)', fontWeight: 700, letterSpacing: .8, marginBottom: 3 }}>キミのトリセツ　総合タイプ</div>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <div style={{ fontFamily: TC.fontRound, fontSize: collapsed ? 15 : 20, fontWeight: 900, color: '#fff', lineHeight: 1.2, transition: 'font-size .25s ease', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>「{TORI.typeTitle}」</div>
            {collapsed &&
            <div style={{ background: TC.gold, color: '#1f1b16', border: '1.5px solid #1f1b16', borderRadius: 6, padding: '2px 9px', fontSize: 10, fontWeight: 800, fontFamily: TC.fontRound, flexShrink: 0, transform: 'rotate(3deg)' }}>Lv.3</div>}
          </div>
        </div>
        {!collapsed &&
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          <Character size={58} />
          <div style={{ background: TC.gold, color: '#1f1b16', border: '1.5px solid #1f1b16', borderRadius: 6, padding: '2px 9px', fontSize: 10, fontWeight: 800, fontFamily: TC.fontRound, marginTop: -2, transform: 'rotate(3deg)' }}>Lv.3</div>
        </div>}
        <HeaderMenu dark />
      </div>
    </div>);

}

function TabBar({ tab, setTab }) {
  const tabs = [['📖', 'トリセツ'], ['🌿', '進化ツリー']];
  return (
    <div style={{ background: TC.surface, borderBottom: `1px solid ${TC.border}`, display: 'flex', flexShrink: 0 }}>
      {tabs.map(([icon, label], i) =>
      <button key={label} onClick={() => setTab(i)} style={{ flex: 1, padding: '9px 4px 8px', background: 'none', border: 'none', cursor: 'pointer', boxShadow: tab === i ? `inset 0 -2.5px 0 ${TC.orange}` : 'none' }}>
          <div style={{ fontSize: 15 }}>{icon}</div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: tab === i ? TC.orange : TC.textSub, marginTop: 2, fontFamily: TC.font }}>{label}</div>
        </button>
      )}
    </div>);

}

// ── 共通UIパーツ ─────────────────────────────────────────
function Card({ children, style = {} }) {
  return <div style={{ background: TC.surface, borderRadius: 14, padding: '16px 20px', border: '1.5px solid #e3d9c4', ...style }}>{children}</div>;
}
function SecHead({ title }) {
  return <h3 style={{ fontSize: 14.5, fontWeight: 900, color: TC.text, marginBottom: 10, fontFamily: TC.fontRound }}>{title}</h3>;
}
function BodyText({ children }) {
  return <p style={{ fontSize: 12.5, color: TC.textSub, lineHeight: 1.85, fontWeight: 500, fontFamily: TC.font }}>{children}</p>;
}
function OrangeChip({ label, small }) {
  return <span style={{ background: TC.gold, color: '#1f1b16', border: '1.5px solid #1f1b16', fontFamily: TC.fontRound, fontWeight: 800, fontSize: small ? 11 : 12, padding: small ? '4px 10px' : '6px 13px', borderRadius: 8, whiteSpace: 'nowrap' }}>{label}</span>;
}
function Accordion({ icon, label, children }) {
  const [open, setOpen] = useTc(false);
  return (
    <div style={{ background: TC.surface, borderRadius: 14, overflow: 'hidden', boxShadow: TC.shadow }}>
      <button onClick={() => setOpen((o) => !o)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 18px', fontFamily: TC.font, fontWeight: 700, fontSize: 13, color: TC.text }}>
        <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span>{icon}</span>{label}</span>
        <span style={{ fontSize: 17, color: TC.textSub, display: 'inline-block', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }}>›</span>
      </button>
      {open && <div style={{ padding: '0 18px 14px', borderTop: `1px solid ${TC.border}` }}><div style={{ height: 12 }}></div>{children || <div style={{ background: TC.bg, borderRadius: 10, padding: 14, textAlign: 'center' }}><div style={{ fontSize: 11, color: TC.textSub, fontWeight: 600, fontFamily: TC.font }}>コンテンツを準備中</div><div style={{ fontSize: 10.5, color: '#bbb', marginTop: 4 }}>関係者と内容を確定次第差し替え</div></div>}</div>}
    </div>);

}

// ── Tab 1: トリセツ ───────────────────────────────────────
function TorisetsuTab({ nav, goChallenge }) {
  const StepHead = window.JStepHead;
  return (
    <>
      {StepHead && <StepHead n={1} title="今のキミのトリセツ" sub="まずはじっくり読んでみよう" />}
      <Card>
        <SecHead title="強み" />
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 10 }}>
          {TORI.strengths.map((s) => <OrangeChip key={s} label={s} />)}
        </div>
        <BodyText>{TORI.strengthDesc}</BodyText>
      </Card>

      <Card>
        <SecHead title="キミの基本パターン" />
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TORI.patterns.map((p, i) =>
          <li key={i} style={{ display: 'flex', gap: 9, fontSize: 12.5, color: TC.text, lineHeight: 1.6, fontWeight: 500, fontFamily: TC.font }}>
              <span style={{ color: TC.orange, fontWeight: 900, flexShrink: 0 }}>›</span>{p}
            </li>
          )}
        </ul>
      </Card>

      <Card>
        <SecHead title="うまくいくキミの使い方" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TORI.usage.map(([e, t], i) =>
          <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'center', background: '#f8f9fb', borderRadius: 12, padding: '10px 12px' }}>
              <span style={{ flexShrink: 0, color: TC.orange, display: 'flex' }}><Emo e={e} size={18} /></span>
              <span style={{ fontSize: 12.5, color: TC.text, fontWeight: 600, lineHeight: 1.5, fontFamily: TC.font }}>{t}</span>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <SecHead title="落とし穴に注意" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TORI.pitfalls.map((p, i) =>
          <div key={i} style={{ display: 'flex', gap: 9, fontSize: 12.5, color: TC.text, lineHeight: 1.6, fontWeight: 500, fontFamily: TC.font }}>
              <span style={{ flexShrink: 0, color: TC.orange, display: 'flex', marginTop: 1 }}><FIcon name="warning" size={15} /></span>{p}
            </div>
          )}
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: '#9a6a2e', background: '#fff6e9', borderRadius: 10, padding: '9px 11px', lineHeight: 1.6, display: 'flex', gap: 7, fontWeight: 600, fontFamily: TC.font }}>
          <span style={{ flexShrink: 0, color: '#d98a2b', display: 'flex', marginTop: 1 }}><FIcon name="bulb" size={14} /></span>落とし穴は「弱点」じゃなく、知っておけば対処できるポイントだよ。
        </div>
      </Card>

      <StepReaction nav={nav} step={1} />

    </>);

}

// ── Step Reaction (steps 1-3 の軽いリアクション) ──────────
const STEP_REACTIONS = [
{ key: 'me', label: 'これ自分っぽい', icon: 'check', color: '#18b271', soft: 'rgba(24,178,113,.12)' },
{ key: 'wow', label: '意外だった', icon: 'sparkle', color: '#315cfa', soft: 'rgba(49,92,250,.12)' },
{ key: 'grow', label: '伸ばしてみたい', icon: 'fire', color: '#ff6b5e', soft: 'rgba(255,107,94,.14)' }];

const REACT_THANKS = {
  me: 'いいね！キミらしさ、しっかり伝わってるね。',
  wow: '新しい発見だね。意外な一面もキミの魅力だよ。',
  grow: 'その意気！「マイチャレンジ」で伸ばしていこう。'
};
function StepReaction({ nav, step }) {
  const saved = nav.state && nav.state.toriReactions || {};
  const picked = saved[step];
  const set = (key) => nav.update && nav.update((s) => ({ toriReactions: { ...(s.toriReactions || {}), [step]: key } }));
  const sel = STEP_REACTIONS.find((r) => r.key === picked);
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', border: '1.5px solid #e3d9c4' }}>
      {!picked ?
      <>
          <div style={{ fontFamily: TC.fontRound, fontWeight: 800, fontSize: 12.5, color: TC.text, marginBottom: 9, display: 'flex', alignItems: 'center', gap: 6 }}>
            読んでみて、どう感じた？
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            {STEP_REACTIONS.map((r) =>
          <button key={r.key} onClick={() => set(r.key)} style={{ flex: 1, cursor: 'pointer', border: '1.5px solid #1f1b16', background: '#fff', borderRadius: 10, padding: '7px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, WebkitTapHighlightColor: 'transparent' }}>
                <FIcon name={r.icon} size={13} color={r.color} />
                <span style={{ fontSize: 10.5, fontWeight: 800, fontFamily: TC.fontRound, color: TC.text, whiteSpace: 'nowrap' }}>{r.label}</span>
              </button>
          )}
          </div>
        </> :

      <div className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ width: 28, height: 28, borderRadius: '50%', background: sel.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FIcon name={sel.icon} size={14} color="#fff" />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: TC.fontRound, fontWeight: 800, fontSize: 12.5, color: sel.color, lineHeight: 1.2 }}>{sel.label}</div>
            <div style={{ fontSize: 10.5, color: TC.textSub, fontWeight: 600, lineHeight: 1.4, marginTop: 1 }}>{REACT_THANKS[picked]}</div>
          </div>
          <button onClick={() => set(null)} style={{ flexShrink: 0, border: 'none', background: 'none', color: TC.textSub, fontSize: 10.5, fontWeight: 700, fontFamily: TC.fontRound, cursor: 'pointer', padding: '4px 2px' }}>変更</button>
        </div>
      }
    </div>);

}

// ── Tab 2: 進化ツリー ─────────────────────────────────────
function EvolutionTab({ onOpenTree }) {
  const { past, current, branches } = EVOLUTION;
  return (
    <>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={TC.orange} strokeWidth="2" strokeLinecap="round"><path d="M6 3v12M18 9a3 3 0 10-6 0 3 3 0 006 0zM6 21a3 3 0 10-6 0 3 3 0 006 0z" /><path d="M18 9h-6M6 15l6 6" /></svg>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: TC.text }}>進化の分岐</h3>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: TC.textSub }}>伸ばす力で未来が変わる</span>
        </div>
        <p style={{ fontSize: 11.5, color: TC.textSub, marginBottom: 16, lineHeight: 1.6, fontFamily: TC.font }}>
          今のあなたが伸ばす力によって、次に進化するタイプが分岐していきます。
        </p>

        {/* Past → Current */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: .6 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#f1f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{past.icon}</div>
            <span style={{ fontSize: 9.5, color: TC.textSub, marginTop: 3 }}>Lv.{past.level}</span>
            <span style={{ fontSize: 9.5, color: TC.textSub }}>{past.name}</span>
          </div>
          <div style={{ flex: 1, height: 1.5, borderTop: '2px dashed #d6d9de' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 58, height: 58, borderRadius: '50%', background: TC.orangeGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: '0 4px 12px rgba(240,138,60,.3)', outline: `4px solid ${TC.orangeSoft}` }}>{current.icon}</div>
              <span style={{ position: 'absolute', top: -4, right: -4, background: TC.gold, color: '#1f1b16', fontSize: 9, padding: '2px 5px', borderRadius: 999, fontWeight: 700 }}>NOW</span>
            </div>
            <span style={{ fontSize: 9.5, color: TC.orange, fontWeight: 700, marginTop: 3 }}>Lv.{current.level}</span>
            <span style={{ fontSize: 11, color: TC.text, fontWeight: 700 }}>{current.name}</span>
            <div style={{ display: 'flex', gap: 4, marginTop: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
              {current.keys.map((k) => <span key={k} style={{ background: TC.orangeSoft, color: TC.orange, fontSize: 9, padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>{k}</span>)}
            </div>
          </div>
        </div>

        {/* Branch connector */}
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" style={{ width: '85%', height: 20, display: 'block', margin: '0 auto 6px' }}>
          <path d="M100 0 V 8 M100 8 H 28 V 20 M100 8 H 100 V 20 M100 8 H 172 V 20" stroke="#d6d9de" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        </svg>

        {/* Future branches */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 14 }}>
          {branches.map((b) =>
          <div key={b.name} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 6px 10px', borderRadius: 12, border: `1.5px ${b.recommended ? 'solid' : 'dashed'} ${b.recommended ? TC.orange : '#d6d9de'}`, background: b.recommended ? 'linear-gradient(180deg,#fff7ec,#fff)' : '#fff' }}>
              {b.recommended && <span style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)', background: TC.orange, color: '#fff', fontSize: 8.5, padding: '2px 7px', borderRadius: 999, fontWeight: 700, whiteSpace: 'nowrap' }}>✦ おすすめ</span>}
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#f8f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, opacity: b.progress < 50 ? .5 : 1 }}>{b.icon}</div>
              <span style={{ fontSize: 10, color: TC.text, fontWeight: 700, textAlign: 'center', marginTop: 5, lineHeight: 1.3, fontFamily: TC.font }}>{b.name}</span>
              <span style={{ fontSize: 9, color: TC.textSub, textAlign: 'center', marginTop: 2, lineHeight: 1.3 }}>{b.desc}</span>
              <div style={{ width: '100%', marginTop: 6 }}>
                <div style={{ height: 4, background: '#f1f2f5', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: b.recommended ? TC.orangeGrad : '#b0b4bb', width: `${b.progress}%`, borderRadius: 999 }}></div>
                </div>
                <span style={{ fontSize: 8.5, color: TC.textSub, display: 'block', textAlign: 'center', marginTop: 3 }}>{b.need}</span>
              </div>
            </div>
          )}
        </div>

        <button onClick={onOpenTree} style={{ width: '100%', padding: '10px', border: `1.5px solid ${TC.orange}`, borderRadius: 10, background: 'none', color: TC.orange, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontFamily: TC.font }}>
          進化ツリー全体を見る <span>›</span>
        </button>
      </Card>
    </>);

}

// ── Tab 3: 今週のチャレンジ ───────────────────────────────
// preset choices for チャレンジ
const NS_CHOICES_PRESET = [
{ text: '興味のある分野をもっと調べてみる', tag: '探求' },
{ text: '得意なことを友だちにシェアしてみる', tag: '発信' },
{ text: '気になることにチャレンジしてみる', tag: '挑戦' },
{ text: '苦手なことを一つ克服してみる', tag: '成長' },
{ text: '自分の強みを使える場を探してみる', tag: '活用' },
{ text: '毎日少しだけ新しいことに触れてみる', tag: '習慣' }];

const todayStr2 = () => {const d = new Date();return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;};

function FutureHintsTab({ nav, goChallenge }) {
  const Future = window.TorisetsuFuture;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 80 }}>
      {Future && <Future nav={nav} goChallenge={goChallenge} />}
    </div>);

}

function ChallengeTab({ nav }) {
  const userTasks = nav && nav.state && nav.state.tasks || [];
  const [selected, setSelected] = useTc(null);
  const [custom, setCustom] = useTc('');

  const pending = userTasks.filter((t) => !t.done);

  const completeTask = (idx) => {
    if (!nav) return;
    const list = userTasks.map((t, i) => i === idx ? { ...t, done: true, completedDate: todayStr2() } : t);
    nav.update((s) => ({ tasks: list, exp: (s.exp || 0) + 1 }));
  };

  const addTask = (text, tag) => {
    if (!nav || !text.trim()) return;
    nav.update((s) => ({ tasks: [...(s.tasks || []), { text: text.trim(), tag: tag || 'チャレンジ', date: todayStr2(), done: false }] }));
    setSelected(null);setCustom('');
  };

  return (
    <>
      {/* ヘッダー */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 4 }}>
        <h2 style={{ fontSize: 17, fontWeight: 900, color: TC.text, fontFamily: TC.fontRound }}>チャレンジを決めよう</h2>
        <p style={{ fontSize: 12, color: TC.textSub, fontWeight: 500, lineHeight: 1.7, fontFamily: TC.font }}>小さな一歩でも大丈夫。選んでみよう！🌱</p>
      </div>

      {/* 選択肢 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {NS_CHOICES_PRESET.map((c, i) => {
          const on = selected === i;
          return (
            <button key={i} onClick={() => setSelected(on ? null : i)}
            style={{ textAlign: 'left', cursor: 'pointer', borderRadius: 10, padding: '13px 15px', fontSize: 13, fontWeight: 600,
              color: on ? TC.blueDark : TC.text, fontFamily: TC.font,
              border: `2px solid ${on ? TC.blue : TC.border}`,
              background: on ? TC.blueSoft : TC.surface, transition: 'all .15s',
              WebkitTapHighlightColor: 'transparent' }}>
              {c.text}
            </button>);

        })}
      </div>

      {/* 登録ボタン */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => selected !== null && addTask(NS_CHOICES_PRESET[selected].text, NS_CHOICES_PRESET[selected].tag)}
        disabled={selected === null}
        style={{ flex: 1, background: selected === null ? TC.border : TC.blueGrad, color: '#fff', border: 'none', borderRadius: 30, padding: '13px', fontFamily: TC.fontRound, fontWeight: 800, fontSize: 14, cursor: selected === null ? 'default' : 'pointer', boxShadow: selected === null ? 'none' : '0 6px 16px rgba(49,92,250,.3)' }}>
          チャレンジを登録する
        </button>
      </div>

      {/* 自由入力 */}
      <Card style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: TC.textSub, marginBottom: 8 }}>✏️ 自分で入力する</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <textarea value={custom} onChange={(e) => setCustom(e.target.value)} rows={2}
          placeholder="例：毎朝5分、読書する"
          style={{ flex: 1, border: `2px solid ${TC.border}`, borderRadius: 10, padding: '10px 12px', fontSize: 13, fontFamily: TC.font, resize: 'none', lineHeight: 1.5, outline: 'none' }}
          onFocus={(e) => e.target.style.borderColor = TC.blue}
          onBlur={(e) => e.target.style.borderColor = TC.border} />
          <button onClick={() => custom.trim() && addTask(custom, 'カスタム')}
          style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: TC.blue, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </button>
        </div>
      </Card>

      {/* チャレンジ中 */}
      {pending.length > 0 &&
      <Card>
          <div style={{ fontSize: 12, fontWeight: 800, color: TC.text, marginBottom: 10 }}>🔥 チャレンジ中</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {userTasks.map((t, i) => t.done ? null :
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 4px', borderBottom: `1px solid ${TC.border}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: TC.text, fontFamily: TC.font }}>{t.text}</div>
                  <div style={{ fontSize: 10, color: TC.textSub, marginTop: 2 }}>登録日: {t.date}</div>
                </div>
                <button onClick={() => completeTask(i)}
            style={{ flexShrink: 0, background: '#18b271', border: 'none', borderRadius: 20, padding: '7px 14px', fontFamily: TC.fontRound, fontWeight: 800, fontSize: 12, color: '#fff', cursor: 'pointer', boxShadow: '0 4px 12px rgba(24,178,113,.3)' }}>
                  できた！
                </button>
              </div>
          )}
          </div>
        </Card>
      }

      {pending.length === 0 && userTasks.length > 0 &&
      <div style={{ background: '#e8f7ee', borderRadius: 12, padding: '14px 16px', textAlign: 'center', fontSize: 12, color: '#2E7D32', fontWeight: 700, lineHeight: 1.7 }}>
          🎉 すべてのチャレンジが完了！<br />新しいチャレンジを登録しよう
        </div>
      }

      {/* 完了履歴リンク */}
      <button onClick={() => nav && nav.go('tree')}
      style={{ background: TC.blueGrad, border: 'none', borderRadius: 30, padding: '13px', fontFamily: TC.fontRound, fontWeight: 800, fontSize: 14, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 16px rgba(49,92,250,.28)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M12 21v-6" /><path d="M12 15c-4 0-6-2.5-6-5.5C6 6 8.7 3 12 3s6 3 6 6.5c0 3-2 5.5-6 5.5z" /></svg>
        完了したチャレンジを見る
      </button>


    </>);

}
// ── 進化ツリー全体ページ ──────────────────────────────────
function nodeStyle(status) {
  switch (status) {
    case 'current':return { bg: TC.orangeGrad, shadow: '0 6px 16px rgba(240,138,60,.38)', outline: `4px solid ${TC.orangeSoft}` };
    case 'past':
    case 'unlocked':return { bg: '#fff0e0', border: `1.5px solid #f8c89a` };
    case 'candidate':return { bg: '#fff', border: `2px dashed ${TC.orange}`, shadow: `0 2px 8px rgba(240,138,60,.15)` };
    case 'hidden':return { bg: '#3a2a5e', border: 'none' };
    default:return { bg: '#f1f2f5', border: `1px solid ${TC.border}` };
  }
}

function EvolutionTreePage({ onBack }) {
  const [sel, setSel] = useTc(null);
  const tiers = [0, 1, 2, 3].map((t) => TREE_NODES.filter((n) => n.tier === t));
  const unlocked = TREE_NODES.filter((n) => n.status !== 'locked' && n.status !== 'hidden').length;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: TC.bg, overflow: 'hidden' }}>

      {/* Header — AiGROW スタイル */}
      <div style={{ height: 49, background: TC.surface, borderBottom: `1px solid ${TC.border}`, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 6, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: TC.blue, fontSize: 24, fontWeight: 700, padding: '0 8px 0 0', lineHeight: 1 }}>‹</button>
        <span style={{ fontWeight: 700, fontSize: 16, color: TC.text, fontFamily: TC.font }}>進化ツリー</span>
      </div>

      {/* コンテキストバー — 現在地を常に表示 */}
      <div style={{ background: TC.blueGrad, padding: '10px 18px 12px', flexShrink: 0 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,.72)', fontWeight: 700, marginBottom: 2 }}>キミの現在地</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: TC.orangeGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🔍</div>
          <div>
            <span style={{ fontFamily: TC.fontRound, fontWeight: 900, fontSize: 15, color: '#fff' }}>分析タイプ</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,.7)', marginLeft: 8 }}>Lv.3 — 次の進化先を選ぼう</span>
          </div>
          <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,.15)', borderRadius: 999, padding: '4px 10px', fontSize: 10, color: '#fff', fontWeight: 700, whiteSpace: 'nowrap' }}>
            {unlocked}/{TREE_NODES.length} 解放
          </div>
        </div>
      </div>

      {/* ツリー本体 */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '16px 14px 40px' }}>

        {/* 凡例 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
          {[
          [TC.orangeGrad, '現在', false],
          ['#fff0e0', '獲得済', false],
          ['#fff', '候補', true],
          ['#f1f2f5', '未開放', false]].
          map(([bg, label, dashed]) =>
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10.5, color: TC.textSub, fontFamily: TC.font }}>
              <span style={{ display: 'inline-block', width: 13, height: 13, borderRadius: '50%', background: bg, border: dashed ? `1.5px dashed ${TC.orange}` : bg === '#f1f2f5' ? `1px solid ${TC.border}` : `1.5px solid rgba(0,0,0,.06)`, flexShrink: 0 }}></span>
              {label}
            </div>
          )}
        </div>

        {/* 各Tier */}
        {tiers.map((nodes, tierIdx) =>
        <div key={tierIdx} style={{ position: 'relative', marginBottom: 6 }}>

            {/* Tier ラベル */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 10, color: TC.orange, fontWeight: 700, fontFamily: TC.font, whiteSpace: 'nowrap' }}>{TIER_LABELS[tierIdx]}</span>
              <div style={{ flex: 1, height: 1, background: TC.border }}></div>
            </div>

            {/* 上tier との接続線 */}
            {tierIdx > 0 &&
          <svg viewBox="0 0 100 22" preserveAspectRatio="none" style={{ width: '100%', height: 22, display: 'block', marginBottom: 6 }}>
                {nodes.map((n, i) => {
              const pNodes = tiers[tierIdx - 1];
              const pi = pNodes.findIndex((p) => p.id === n.parent);
              if (pi < 0) return null;
              const x1 = (pi + .5) / pNodes.length * 100;
              const x2 = (i + .5) / nodes.length * 100;
              const live = ['current', 'past', 'unlocked'].includes(n.status);
              return (
                <path key={n.id}
                d={`M ${x1} 0 Q ${x1} 11,${(x1 + x2) / 2} 11 T ${x2} 22`}
                stroke={live ? TC.orange : '#d6d9de'}
                strokeWidth={live ? 1.8 : 1.2}
                strokeDasharray={live ? '' : '3 3'}
                fill="none" />);


            })}
              </svg>
          }

            {/* ノードグリッド */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${nodes.length},1fr)`, gap: 8, marginBottom: 14 }}>
              {nodes.map((n) => {
              const s = nodeStyle(n.status);
              const isCur = n.status === 'current';
              const isCand = n.status === 'candidate';
              const isLock = n.status === 'locked';
              const isHide = n.status === 'hidden';
              const size = isCur ? 54 : 46;
              return (
                <button key={n.id} onClick={() => setSel(n)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', gap: 4 }}>
                    <div style={{ position: 'relative', width: size, height: size, borderRadius: '50%', background: s.bg, border: s.border || 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isCur ? 22 : 18, boxShadow: s.shadow || TC.shadowSm, outline: s.outline || 'none' }}>
                      <span style={{ opacity: isLock ? .35 : 1, filter: isLock ? 'grayscale(1)' : 'none' }}>{n.icon}</span>
                      {isCur && <span style={{ position: 'absolute', top: -7, right: -5, background: TC.gold, color: '#1f1b16', fontSize: 8, padding: '2px 5px', borderRadius: 999, fontWeight: 700 }}>NOW</span>}
                      {isCand && <span style={{ position: 'absolute', top: -5, right: -5, fontSize: 11, color: TC.orange }}>✦</span>}
                    </div>
                    <span style={{ fontSize: 9.5, fontWeight: isCur ? 700 : 500, color: isCur ? TC.orange : isLock ? TC.textSub : isHide ? '#7c6aaa' : TC.text, textAlign: 'center', lineHeight: 1.3, fontFamily: TC.font }}>{n.name}</span>
                    {n.keyComp && <span style={{ fontSize: 8.5, color: TC.textSub, fontFamily: TC.font }}>+{n.keyComp}</span>}
                  </button>);

            })}
            </div>
          </div>
        )}

        {/* 解放状況カード */}
        <div style={{ background: TC.surface, borderRadius: 14, padding: '14px 16px', boxShadow: TC.shadow, marginTop: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: TC.text, fontFamily: TC.font }}>解放状況</span>
            <span style={{ fontSize: 12, color: TC.orange, fontWeight: 700 }}>{unlocked} / {TREE_NODES.length} タイプ</span>
          </div>
          <div style={{ height: 6, background: '#f1f2f5', borderRadius: 999, overflow: 'hidden', marginBottom: 10 }}>
            <div style={{ height: '100%', background: TC.orangeGrad, borderRadius: 999, width: `${unlocked / TREE_NODES.length * 100}%`, transition: 'width .4s' }}></div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: TC.orangeSoft, borderRadius: 10, padding: '9px 12px' }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 11.5, color: '#7a4a10', lineHeight: 1.6, fontFamily: TC.font }}>隠し進化「？？？」もどこかに眠っています。チャレンジを続けて全タイプを解放しよう。</p>
          </div>
        </div>
      </div>

      {/* ノード詳細シート */}
      {sel &&
      <div onClick={() => setSel(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.45)', display: 'flex', alignItems: 'flex-end', zIndex: 50 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', background: '#fff', borderRadius: '24px 24px 0 0', padding: '20px 20px 40px' }}>
            <div style={{ width: 40, height: 4, background: TC.border, borderRadius: 999, margin: '0 auto 16px' }}></div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: nodeStyle(sel.status).bg, border: nodeStyle(sel.status).border || 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: TC.shadow }}>
                {sel.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10.5, color: TC.textSub, fontFamily: TC.font }}>{TIER_LABELS[sel.tier]}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: TC.text, fontFamily: TC.font }}>{sel.name}</div>
                <div style={{ fontSize: 12, color: TC.textSub, fontFamily: TC.font }}>{sel.desc}</div>
              </div>
              <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 999, fontWeight: 700, fontFamily: TC.font,
              background: sel.status === 'current' ? TC.orangeSoft : sel.status === 'candidate' ? '#fff7ec' : sel.status === 'locked' ? TC.bg : TC.orangeSoft,
              color: sel.status === 'locked' ? TC.textSub : TC.orange }}>
                {sel.status === 'current' ? '現在' : sel.status === 'past' || sel.status === 'unlocked' ? '獲得済' : sel.status === 'candidate' ? '候補' : sel.status === 'hidden' ? '？？？' : '未開放'}
              </span>
            </div>
            {sel.keyComp &&
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 13px', background: TC.orangeSoft, borderRadius: 10, fontSize: 12.5, marginBottom: 8, fontFamily: TC.font }}>
                <span style={{ color: TC.textSub }}>伸ばすコンピテンシー</span>
                <span style={{ color: TC.orange, fontWeight: 700 }}>{sel.keyComp}</span>
              </div>
          }
            {sel.status === 'candidate' &&
          <button style={{ width: '100%', marginTop: 8, background: TC.orangeGrad, border: 'none', borderRadius: 14, padding: 14, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: TC.font, boxShadow: '0 4px 14px rgba(240,138,60,.35)' }}>
                このタイプを目指す ›
              </button>
          }
            {sel.status === 'locked' &&
          <div style={{ textAlign: 'center', padding: '10px 0 2px', fontSize: 12, color: TC.textSub, fontFamily: TC.font }}>
                前段階のタイプを解放するとアンロックされます
              </div>
          }
            <button onClick={() => setSel(null)} style={{ width: '100%', marginTop: 8, background: 'none', border: 'none', color: TC.textSub, fontSize: 12, cursor: 'pointer', padding: 8, fontFamily: TC.font }}>
              閉じる
            </button>
          </div>
        </div>
      }
    </div>);

}

// ── Main（シェル統合版）─────────────────────────────────
// ── シェアモーダル ───────────────────────────────────────────────
function ShareModal({ onClose }) {
  const strengths = TORI.strengths.slice(0, 4);
  const radarData = [
  { label: '外向性', v: 0.86 }, { label: '開放性', v: 0.78 },
  { label: '繊細性', v: 0.42 }, { label: '協調性', v: 0.64 }, { label: '自律性', v: 0.7 }];

  const W = 180,cxR = 90,cyR = 96,R = 58,n = radarData.length;
  const ptR = (i, r) => {const a = -Math.PI / 2 + i * 2 * Math.PI / n;return [cxR + Math.cos(a) * r, cyR + Math.sin(a) * r];};
  const gridPts = [0.4, 0.7, 1].map((g) => radarData.map((_, i) => ptR(i, R * g).join(',')).join(' '));
  const polyPts = radarData.map((d, i) => ptR(i, R * d.v).join(',')).join(' ');

  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 200, background: 'rgba(0,0,0,.55)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', backdropFilter: 'blur(2px)' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#f2f4f6', borderRadius: '22px 22px 0 0', padding: '16px 18px 28px', maxHeight: '88%', overflowY: 'auto' }}>
        <div style={{ width: 36, height: 4, background: '#ced2d6', borderRadius: 2, margin: '0 auto 14px' }}></div>
        <div style={{ fontSize: 14, fontWeight: 800, color: TC.text, fontFamily: TC.fontRound, marginBottom: 14, textAlign: 'center' }}>トリセツをシェアする</div>

        {/* ─── シェアカードプレビュー ─── */}
        <div style={{ background: TC.blueGrad, borderRadius: 16, padding: '18px 16px 14px', marginBottom: 18, position: 'relative', overflow: 'hidden', boxShadow: '0 10px 28px rgba(49,92,250,.32)' }}>
          <div style={{ position: 'absolute', top: -24, right: -24, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,.09)' }}></div>
          <div style={{ position: 'absolute', bottom: -18, left: -18, width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }}></div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontFamily: TC.fontRound, fontWeight: 900, fontSize: 14, color: '#fff' }}>
              <span style={{ color: '#ff6b5e' }}>Ai</span>GROW
            </div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,.65)', fontWeight: 700, letterSpacing: 1 }}>MY TORISETSU</div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,.7)', fontWeight: 700, marginBottom: 3 }}>総合タイプ</div>
            <div style={{ fontFamily: TC.fontRound, fontSize: 18, fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 10 }}>「{TORI.typeTitle}」</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', position: 'relative' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,.7)', fontWeight: 700, marginBottom: 6 }}>強み</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
                {strengths.map((s) =>
                <span key={s} style={{ background: 'rgba(255,255,255,.2)', color: '#fff', fontSize: 9.5, fontWeight: 700, padding: '3px 9px', borderRadius: 999 }}>{s}</span>
                )}
              </div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,.78)', lineHeight: 1.65 }}>
                アイデアを生み出し、自分の力で形にしながら人を巻き込んで実現していく力があります。
              </div>
            </div>
            <svg width="96" height="103" viewBox={`0 0 ${W} ${W * 1.067}`} style={{ flexShrink: 0 }}>
              {gridPts.map((g, i) => <polygon key={i} points={g} fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1" />)}
              {radarData.map((_, i) => {const [x, y] = ptR(i, R);return <line key={i} x1={cxR} y1={cyR} x2={x} y2={y} stroke="rgba(255,255,255,.2)" strokeWidth="1" />;})}
              <polygon points={polyPts} fill="rgba(255,255,255,.28)" stroke="rgba(255,255,255,.8)" strokeWidth="1.5" strokeLinejoin="round" />
              {radarData.map((d, i) => {const [lx, ly] = ptR(i, R + 14);return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontFamily={TC.font} fontWeight="600" fontSize="8" fill="rgba(255,255,255,.8)">{d.label}</text>;})}
            </svg>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.16)', marginTop: 10, paddingTop: 8, display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,.55)' }}>aigrow.jp</div>
            <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,.55)' }}>2026年6月作成</div>
          </div>
        </div>

        {/* ─── シェア先ボタン ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 10 }}>
          {[
          { icon: 'chat', label: 'LINEで送る', color: '#06C755', bg: '#e8faf0' },
          { icon: 'link', label: 'リンクをコピー', color: TC.blue, bg: TC.blueSoft },
          { icon: 'camera', label: '画像を保存', color: '#8a6cf0', bg: '#EDE7F6' },
          { icon: 'mail', label: 'メールで送る', color: TC.orange, bg: TC.orangeSoft }].
          map((item) =>
          <button key={item.label} style={{ background: item.bg, border: 'none', borderRadius: 13, padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <span style={{ display: 'flex', color: item.color }}><FIcon name={item.icon} size={20} /></span>
              <span style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: TC.font }}>{item.label}</span>
            </button>
          )}
        </div>
        <button onClick={onClose} style={{ width: '100%', background: '#e2e5e8', border: 'none', borderRadius: 12, padding: '12px', fontFamily: TC.fontRound, fontWeight: 700, fontSize: 13, color: TC.textSub, cursor: 'pointer' }}>キャンセル</button>
      </div>
    </div>);

}

function TorisetsuCombined({ initialTab = 0 }) {
  const nav = useNav();
  const [tab, setTab] = useTc(initialTab);
  const [showTree, setShowTree] = useTc(false);
  const [showShare, setShowShare] = useTc(false);
  const savedStep = Math.min(4, nav.state && nav.state.torisetsuStep || 1);
  const [step, setStep] = useTc(savedStep);
  const [collapsed, setCollapsed] = useTc(false);
  const scrollRef = React.useRef(null);
  const goStep = (n) => {
    const next = Math.min(4, Math.max(1, n));
    setStep(next);
    nav.update && nav.update((s) => ({ torisetsuStep: next, torisetsuDone: s.torisetsuDone || next >= 4 }));
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setCollapsed(false);
  };
  const StepInd = window.ToriStepIndicator,StepNav = window.ToriStepNav,StepHead = window.JStepHead;
  const Top3 = window.Top3Section,TypeHero = window.TypeHeroSection,Voices = window.VoicesSection,Future = window.TorisetsuFuture;

  return (
    <div className="screen" style={{ background: TC.bg, fontFamily: TC.font, position: 'relative' }}>
      <StatusBar />
      <StickyHero collapsed={collapsed} />
      {StepInd && <StepInd step={step} onJump={goStep} freeJump={!!(nav.state && nav.state.torisetsuDone)} />}
      <div ref={scrollRef} onScroll={(e) => {const t = e.target.scrollTop;setCollapsed((c) => c ? t > 12 : t > 40);}} style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 24 }}>
          <div key={step} className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {step === 1 && <TorisetsuTab nav={nav} goChallenge={() => goStep(4)} />}
              {step === 2 && StepHead && <><StepHead n={2} title="今のキミ" sub="診断とみんなの評価からうまれた、キミの一枚" />{TypeHero && <TypeHero />}<StepReaction nav={nav} step={2} /></>}
              {step === 3 && StepHead && <><StepHead n={3} title="みんなの発見" sub="まわりの人が見つけたキミの良さ" /><Voices /><StepReaction nav={nav} step={3} /></>}
              {step === 4 && Future && <Future nav={nav} step={step} goBack={() => goStep(4)} goChallenge={() => nav && nav.go('challenge', { tab: 'challenge' })} />}
              {StepNav && <StepNav step={step} goStep={goStep} />}
            </div>
        </div>
      </div>
    </div>);

}


Object.assign(window, { TorisetsuCombined, ChallengeTab, EvolutionTreePage, Character });