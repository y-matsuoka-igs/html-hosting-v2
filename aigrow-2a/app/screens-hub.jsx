// screens-hub.jsx — 受検ハブ(exam) / コンテンツ(contents)
const { useState: useShub } = React;

/* ════ 共通：タブ画面ヘッダー（ホーム/チャレンジと統一） ════ */
function TabHeader({ icon, title }) {
  return (
    <div style={{ background:'#315cfa', padding:'12px 16px 14px', flexShrink:0, borderBottom:'2px solid #1f1b16' }}>
      <div style={{ display:'flex', alignItems:'center', gap:9 }}>
        <div style={{ color:'#fff', display:'flex', alignItems:'center', flexShrink:0 }}><FIcon name={icon} size={20} /></div>
        <div style={{ fontFamily:'var(--font-round)', fontWeight:900, fontSize:17, color:'#fff' }}>{title}</div>
        <div style={{ marginLeft:'auto' }}><HeaderMenu dark /></div>
      </div>
    </div>
  );
}

/* ════ 受検ハブ ════ */
function ExamHubScreen() {
  const nav = useNav();
  const s = nav.state;
  const items = [
    { key: 'diag',  title: '気質診断',  emoji: 'search', desc: 'ゲームでキミのタイプを診断', done: s.diag.done,  go: 'start-diag', color: 'var(--blue)' },
    { key: 'self',  title: '自己評価',  emoji: 'pencil', desc: '5つの質問で自分を評価', done: s.self.done,  go: 'self-eval', locked: !s.diag.done, color: '#8a6cf0' },
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

/* ── レア度（獲得済み／未獲得の配色） ── */
const RARITY = {
  N:  { label: 'N',  name: 'ノーマル',
        chipBg: '#9AA1AC', chipFg: '#FFFFFF', tileBg: '#F2F3F5', tileBd: '#E3E5E9', color: '#9AA1AC', glyph: '#2A2F37',
        lockChipBg: '#DCDEE2', lockChipFg: '#6E757F', lockTileBg: '#F7F8F8', lockTileBd: '#EBECEE', lockIcon: '#C9CDD3' },
  R:  { label: 'R',  name: 'レア',
        chipBg: '#3B5BDB', chipFg: '#FFFFFF', tileBg: '#EDF1FE', tileBd: '#4C6EF5', color: '#3B5BDB', glyph: '#3B5BDB',
        lockChipBg: '#C8D2F0', lockChipFg: '#4B5C9C', lockTileBg: '#F6F8FD', lockTileBd: '#E2E8F7', lockIcon: '#B4C0E4' },
  SR: { label: 'SR', name: 'スーパーレア',
        chipBg: '#7C5CE0', chipFg: '#FFFFFF', tileBg: '#F4EFFE', tileBd: '#8B6FE8', color: '#7C5CE0', glyph: '#7C5CE0',
        lockChipBg: '#D3C6F0', lockChipFg: '#63509C', lockTileBg: '#F8F5FE', lockTileBd: '#EBE4F8', lockIcon: '#C2B2E6' },
  UR: { label: 'UR', name: 'ウルトラレア',
        chipBg: '#D99A1F', chipFg: '#FFFFFF', tileBg: '#FDF6E6', tileBd: '#E8B33C', color: '#D99A1F', glyph: '#D99A1F',
        lockChipBg: '#EBD9A6', lockChipFg: '#8A6817', lockTileBg: '#FDF9EC', lockTileBd: '#F2E6C2', lockIcon: '#DCC68C' },
};

/* ── 成長バッジ（カテゴリ分け＋レア度） ── */
const BADGE_GROUPS = [
  {
    key: 'comp', label: 'コンピテンシーの証', icon: '💎',
    desc: '強みや能力に関するバッジ',
    badges: [
      { e: '🧭', l: '自己発見',     g: 'eye-discover', rar: 'N',  got: true,  cond: '気質診断をさいごまで終える', hint: '2025.04.12 に獲得' },
      { e: '💡', l: '創造の芽',     g: 'core-crystal', rar: 'R',  got: true,  cond: '「創造力」の評価が3回つづけて上がる', hint: '2025.06.18 に獲得' },
      { e: '🤝', l: '共感マスター', g: 'pair', rar: 'SR', got: true,  cond: '相互評価で「共感力」が学年トップ10％に入る', hint: '2025.11.20 に獲得' },
      { e: '🔥', l: '実行力の鬼',   g: 'ridge-peak', rar: 'SR', got: false, cond: '「実行力」のスコアを1年で+5のばす', hint: 'あと +2 でゲット' },
      { e: '👑', l: '五冠達成',     g: 'triad', rar: 'UR', got: false, cond: '5つのコンピテンシーすべてでレベル4以上になる', hint: '達成は 2 / 5' },
    ],
  },
  {
    key: 'challenge', label: '挑戦の記録', icon: '🚩',
    desc: 'チャレンジの達成に関するバッジ',
    badges: [
      { e: '👣', l: '初めの一歩', g: 'footsteps', rar: 'N',  got: true,  cond: 'チャレンジを1つ達成する', hint: '2025.04.20 に獲得' },
      { e: '✅', l: '3つ達成',    g: 'stairs', rar: 'R',  got: true,  cond: 'チャレンジを3つ達成する', hint: '2025.09.02 に獲得' },
      { e: '🏅', l: '10コンプ',   g: 'broaden', rar: 'SR', got: false, cond: 'チャレンジを10こ達成する', hint: 'いまは 4 / 10' },
      { e: '🌟', l: '挑戦王',     g: 'change-arrow', rar: 'UR', got: false, cond: '3か月つづけて毎月チャレンジを達成する', hint: '達成は 1 / 3 か月' },
    ],
  },
  {
    key: 'action', label: '継続の習慣', icon: '🔥',
    desc: '毎日のアクセスなど行動に関するバッジ',
    badges: [
      { e: '🌅', l: '初ログイン', g: 'door', rar: 'N',  got: true,  cond: 'はじめてAi GROWにログインする', hint: '2025.04.12 に獲得' },
      { e: '📅', l: '7日連続',    g: 'hourglass', rar: 'R',  got: true,  cond: '7日つづけてアプリをひらく', hint: '2025.05.03 に獲得' },
      { e: '⚡', l: '30日連続',   g: 'season-cycle', rar: 'SR', got: false, cond: '30日つづけてアプリをひらく', hint: 'いまは 12日連続' },
      { e: '💯', l: '皆勤の証',   g: 'overlap-1', rar: 'UR', got: false, cond: '1学期のあいだ、毎週ログインする', hint: 'いまは 9 / 16 週' },
    ],
  },
  {
    key: 'special', label: 'スペシャル', icon: '🎁',
    desc: 'イベントや特別な行動でもらえるバッジ',
    badges: [
      { e: '🎉', l: 'はじめまして', g: 'season-spring', rar: 'N',  got: true,  cond: 'プロフィールを登録する', hint: '2025.04.12 に獲得' },
      { e: '🔮', l: '占い好き',     g: 'deepen', rar: 'R',  got: false, cond: '今日の占いを10回ひらく', hint: 'いまは 6 / 10 回' },
      { e: '🦄', l: '隠しバッジ',   g: 'season-newyear', rar: 'UR', got: false, cond: '???', hint: 'じょうけんはひみつ。つづけていれば、いつか出会えるかも。' },
    ],
  },
];

/* ── グリフ（単色マスク／トークン仕様 24pxビュー・タイルの75%） ── */
const __glyphCache = {};
let __glyphSeq = 0;
function Glyph({ name, size, color }) {
  const [svg, setSvg] = React.useState(__glyphCache[name] || null);
  React.useEffect(() => {
    let live = true;
    if (__glyphCache[name]) { setSvg(__glyphCache[name]); return; }
    fetch(`assets/glyphs/${name}.svg`).then(r => r.text()).then(t => {
      __glyphCache[name] = t;
      if (live) setSvg(t);
    }).catch(() => {});
    return () => { live = false; };
  }, [name]);
  // mask の id はインスタンスごとに一意化する（インライン展開時の衝突対策）
  const html = React.useMemo(() => {
    if (!svg) return '';
    const uid = `_i${++__glyphSeq}`;
    return svg.replace(/id="([^"]+)"/g, `id="$1${uid}"`).replace(/url\(#([^)]+)\)/g, `url(#$1${uid})`);
  }, [svg]);
  return (
    <span aria-hidden="true" style={{ width: size, height: size, display: 'block', color, lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: html.replace('<svg ', `<svg style="width:100%;height:100%;display:block" `) }}></span>
  );
}

/* ── バッジタイル（96:20:1 の比率で縮尺・獲得済みのみソリッドシャドウ） ── */
function BadgeTile({ b, size = 68 }) {
  const r = RARITY[b.rar];
  const k = size / 96;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <div style={{ width: '100%', height: '100%', borderRadius: 20 * k,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: b.got ? r.tileBg : r.lockTileBg,
        border: `${b.got && b.rar === 'UR' ? 1.5 : 1}px solid ${b.got ? r.tileBd : r.lockTileBd}`,
        boxShadow: b.got ? `${4 * k}px ${4 * k}px 0 #1A1A2E` : 'none' }}>
        {b.got
          ? <Glyph name={b.g} size={72 * k} color={r.glyph} />
          : <FIcon name="lock" size={40 * k} color={r.lockIcon} />}
      </div>
      <span style={{ position: 'absolute', top: -8 * k, right: -8 * k, width: 28 * k, height: 28 * k, borderRadius: 999,
        background: b.got ? r.chipBg : r.lockChipBg, color: b.got ? r.chipFg : r.lockChipFg,
        fontSize: Math.max(9, 11 * k), fontWeight: 700, fontFamily: 'var(--font-round)',
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.label}</span>
    </div>
  );
}

function GrowthBadge({ b, onTap }) {
  return (
    <div role="button" tabIndex={0} onClick={() => onTap && onTap(b)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>
      <BadgeTile b={b} size={64} />
      <span style={{ fontSize: 10.5, fontWeight: 700, color: b.got ? '#1A1A2E' : '#A8ADB5', textAlign: 'center', lineHeight: 1.25 }}>{b.l}</span>
    </div>
  );
}

function FortuneBody() {
  const items = [
    { e: 'palette', title: 'ラッキーカラー：イエロー', body: '明るい色を身に着けて気分をあげよう！' },
    { e: 'gift', title: 'ラッキーフード：ドーナツ', body: '丸い形で人とのつながり運アップ！' },
    { e: 'book', title: 'ラッキー教科：国語', body: '自分の考えを言葉にするといいことあるかも！' },
    { e: 'chat', title: '今日のひとこと：「それいいね！」', body: '誰かの、何かのいい所を見つけて言葉にしてみよう' },
    { e: '✨', title: '今日のおすすめ行動', body: 'あまり話したことがない友だちに話しかけてみよう。新しい視点が得られるかも！' },
  ];
  return (
    <>
      <div style={{ background: '#1f1b16', borderRadius: 'var(--r-lg)', padding: '22px 20px', color: '#fff', textAlign: 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: 2, opacity: .75, fontWeight: 700, marginBottom: 8 }}>今日の占い</div>
        <div style={{ fontSize: 13.5, opacity: .9, marginBottom: 10, lineHeight: 1.6 }}>周りを明るくするアイデアメーカータイプの<br/>キミの今日の運勢は…</div>
        <div style={{ fontSize: 28, letterSpacing: 4, marginBottom: 8, color: '#ffd633' }}>★★★★☆</div>
        <div style={{ fontSize: 14, fontFamily: 'var(--font-round)', fontWeight: 800, lineHeight: 1.55 }}>アイデアがポンポン出てくる日。<br/>ちょっとしたひとことで、場の空気を変えられそう！</div>
      </div>
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
    </>
  );
}

function MonthlyBody() {
  const others = ['🎸', '🥁', '🎹', '🎷', '🎻'];
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#2447c9', marginBottom: 4 }}>今月の診断</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 2 }}>あなたはどの楽器？楽器診断</div>
        <div style={{ fontSize: 13, color: 'var(--text-sub)' }}>あなたは…</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 110, height: 110, borderRadius: '50%', background: '#e8edff', border: '2px solid #1f1b16', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, boxShadow: '0 8px 24px rgba(0,131,143,.2)' }}>🎺</div>
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
      <div>
        <div style={{ fontSize: 12, color: 'var(--text-sub)', marginBottom: 8, textAlign: 'center' }}>他のタイプを見る</div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          {others.map((e, i) => (
            <div key={i} style={{ width: 48, height: 48, borderRadius: '50%', background: '#f5f6f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '1.5px solid var(--border)', cursor: 'pointer' }}>{e}</div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-sub)', textAlign: 'center', marginTop: 8, lineHeight: 1.6 }}>毎月替わる：お弁当のおかず・動物・スイーツ・RPGキャラ・偉人 など</div>
      </div>
    </>
  );
}

function ReportScreen() {
  const nav = useNav();
  const REPORT_URL = 'https://feedback-report.aigrow.jp/?token=e27f3f4b-d070-4c53-8452-5858046bd994_b7d01567-7c11-4c03-add1-16cac2041791';
  const PAST_REPORTS = [
    { term: '2025年度 後期', date: '2025.11.20', type: '気質診断 + 自己/相互評価', highlight: '行動する創造者', latest: true },
    { term: '2025年度 前期', date: '2025.06.18', type: '気質診断 + 自己/相互評価', highlight: 'ひらめきの探究者', latest: false },
  ];
  return (
    <div className="screen">
      <StatusBar />
      <TabHeader icon="chart" title="レポート" />
      <div className="scroll pad stack">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 7 }}><FIcon name="book" size={17} color="var(--blue)" /> 過去の受検レポート</h3>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-sub)' }}>{PAST_REPORTS.length}件</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PAST_REPORTS.map((r) => (
            <button key={r.term} onClick={() => r.latest && window.open(REPORT_URL, '_blank', 'noopener')} disabled={!r.latest} style={{ width: '100%', textAlign: 'left', cursor: r.latest ? 'pointer' : 'default', opacity: r.latest ? 1 : .6, border: '1px solid var(--border-soft)', background: '#fff', borderRadius: 'var(--r-md)', padding: '14px 15px', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: 13 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: r.latest ? 'var(--blue)' : 'var(--blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: r.latest ? '#fff' : 'var(--blue)' }}><FIcon name="chart" size={20} color={r.latest ? '#fff' : 'var(--blue)'} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
                  <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13.5, color: 'var(--text)' }}>{r.term}</span>
                  {r.latest && <span className="pill" style={{ background: 'var(--green-soft)', color: '#1b7a3e', fontSize: 9, padding: '2px 8px' }}>最新</span>}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 600 }}>{r.date}・{r.type}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                  <span style={{ background: 'var(--blue-soft)', color: 'var(--blue-dark)', fontSize: 10.5, fontWeight: 800, padding: '3px 10px', borderRadius: 999 }}>{r.highlight}</span>
                </div>
              </div>
              {r.latest && <span style={{ flexShrink: 0, color: 'var(--text-sub)', display: 'flex' }}><Icon name="chevR" size={18} /></span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════ 受検コース登録あり ════ */
const EXAM_COURSES = [
  { status: '進行中', name: 'IAT', period: '2026-04-27 11:05 〜 2026-07-04 00:00' },
  { status: '進行中', name: '自己・相互の全問題', period: '2026-05-01 13:15 〜 2026-07-04 00:00', active: true },
];
const EXAM_REQUESTS = [
  { course: '自己・相互の全問題', name: '入江 あおい', period: '2026-05-01 13:15 〜 2026-07-04 00:00' },
  { course: '自己・相互の全問題', name: '青田 徳彦', period: '2026-05-01 13:15 〜 2026-07-04 00:00' },
];
const EXAM_MY_REQUESTS = [
  { course: '自己・相互の全問題', done: 0, total: 3, period: '2026-05-01 13:15 〜 2026-07-04 00:00' },
  { course: 'IAT', done: 1, total: 3, period: '2026-04-27 11:05 〜 2026-07-04 00:00' },
];
function ChevR() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c3bba9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M9 5l7 7-7 7"/></svg>;
}
function SectionHead({ children }) {
  return <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text-sub)', fontFamily: 'var(--font-round)', padding: '2px 2px 0' }}>{children}</div>;
}
function ExamCoursesScreen() {
  const nav = useNav();
  return (
    <div className="screen">
      <StatusBar />
      <TabHeader icon="clip" title="受検" />
      <div className="scroll pad stack">
        {/* 受検の案内 */}
        <div style={{ background: '#315cfa', borderRadius: 'var(--r-lg)', padding: '15px 16px', color: '#fff', border: '2px solid #1f1b16', boxShadow: '4px 4px 0 #1f1b16', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 15 }}>受検できるコースがあるよ</div>
            <div style={{ fontSize: 11, opacity: .88, fontWeight: 600, marginTop: 2 }}>期間内に、下のコースと評価依頼にこたえよう</div>
          </div>
        </div>

        {/* 受検コース一覧 */}
        <SectionHead>受検コース一覧</SectionHead>
        <div className="card" style={{ padding: '4px 16px' }}>
          {EXAM_COURSES.map((c, i) => (
            <div key={i} onClick={() => nav.go('start-diag')}
              style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '15px 0', cursor: 'pointer', borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none' }}>
              {c.active && <span style={{ background: '#ffe4e4', color: '#d94a3d', fontSize: 10.5, fontWeight: 800, fontFamily: 'var(--font-round)', padding: '4px 9px', borderRadius: 7, flexShrink: 0 }}>未回答</span>}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-round)' }}>{c.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 500, marginTop: 3 }}>期間: {c.period}</div>
              </div>
              <ChevR />
            </div>
          ))}
        </div>

        {/* お友達からの評価依頼一覧 */}
        <SectionHead>お友達からの評価依頼一覧</SectionHead>
        <div className="card" style={{ padding: '4px 16px' }}>
          {EXAM_REQUESTS.map((r, i) => (
            <div key={i} onClick={() => nav.go('other-eval')}
              style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '15px 0', cursor: 'pointer', borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', lineHeight: 1.4 }}>{r.course}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-round)', marginTop: 1 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 500, marginTop: 3 }}>期間: {r.period}</div>
              </div>
              <ChevR />
            </div>
          ))}
        </div>

        {/* お友達への評価リクエスト一覧 */}
        <SectionHead>お友達への評価リクエスト一覧</SectionHead>
        <div className="card" style={{ padding: '4px 16px' }}>
          {EXAM_MY_REQUESTS.map((r, i) => (
            <div key={i} onClick={() => nav.go('ask-eval')}
              style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '15px 0', cursor: 'pointer', borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-round)' }}>{r.course}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 5 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 700 }}>現在の評価完了者数</span>
                  <span style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 14, color: r.done > 0 ? 'var(--green)' : 'var(--text-sub)' }}>{r.done} / {r.total} 名</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 500, marginTop: 4 }}>期間: {r.period}</div>
              </div>
              <ChevR />
            </div>
          ))}
        </div>
        {/* 届いたリクエスト */}
        <SectionHead>届いたリクエスト</SectionHead>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-sub)', lineHeight: 1.7, padding: '0 2px' }}>一度断ったリクエストも、あとから承諾すれば相互評価できるよ</p>
        <div className="card" style={{ padding: '4px 16px' }}>
          {[
            { id: 'r1', name: '入江 あおい', grade: '2年 B組', course: '自己・相互の全問題', sent: '2026-05-02 18:40', st: 'declined' },
            { id: 'r2', name: '青田 徳彦', grade: '2年 A組', course: 'IAT', sent: '2026-05-02 12:05', st: null },
          ].map((r, i) => (
            <div key={i} onClick={() => !r.st && nav.go('eval-request', { reqId: r.id, reqStatus: { r1: 'declined' } })}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', cursor: r.st ? 'default' : 'pointer', borderTop: i > 0 ? '1px solid var(--border-soft)' : 'none', opacity: r.st ? .62 : 1 }}>
              <Avatar name={r.name} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-round)', fontSize: 15.5, fontWeight: 900, color: 'var(--text)' }}>{r.name}</div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-sub)', marginTop: 2 }}>{r.grade}・{r.course}</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-sub)', marginTop: 3 }}>受信: {r.sent}</div>
              </div>
              {r.st
                ? <span style={{ flexShrink: 0, fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 11, padding: '5px 10px', borderRadius: 999, background: '#efece6', color: 'var(--text-sub)' }}>辞退した</span>
                : <span style={{ flexShrink: 0, fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 12.5, padding: '9px 16px', borderRadius: 999, background: 'var(--green)', color: '#fff', border: '2px solid #1f1b16', boxShadow: '2px 2px 0 #1f1b16' }}>確認する</span>}
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
      <TabHeader icon="clip" title="受検" />
      <div className="scroll pad stack">
        {/* 準備中ヒーロー */}
        <div style={{ background: '#315cfa', borderRadius: 'var(--r-lg)', padding: '22px 22px 24px', textAlign: 'center', color: '#fff', border: '2px solid #1f1b16', boxShadow: '4px 4px 0 #1f1b16' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <svg width="60" height="60" viewBox="0 0 72 72" fill="none">
              <rect x="12" y="8" width="48" height="56" rx="8" fill="none" stroke="white" strokeWidth="3.5"/>
              <path d="M24 8v-2a4 4 0 0 1 8 0v2M40 8v-2a4 4 0 0 1 8 0v2" stroke="white" strokeWidth="3"/>
              <rect x="20" y="6" width="32" height="8" rx="4" fill="white" opacity=".25"/>
              <line x1="24" y1="30" x2="48" y2="30" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <line x1="24" y1="40" x2="40" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="54" cy="54" r="14" fill="#2447c9" stroke="white" strokeWidth="3"/>
              <path d="M54 48v7l4 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, opacity: .8, marginBottom: 8 }}>NEXT SESSION</div>
          <h1 style={{ fontFamily: 'var(--font-round)', fontSize: 22, fontWeight: 900, lineHeight: 1.4, marginBottom: 10 }}>
            次のAi GROW受検は<br/>準備中です
          </h1>
          <p style={{ fontSize: 13, opacity: .85, lineHeight: 1.7, fontWeight: 500 }}>
            次回の受検案内が届くまで、<br/>今の強みを活かして前へ進もう！
          </p>
        </div>

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
              ['過去の受検レポートを見返して成長を確かめる', () => nav.tab('report')],
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

/* ════ 成長きろく ════ */
function BadgeSheet({ b, onClose }) {
  if (!b) return null;
  const r = RARITY[b.rar];
  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(24,20,16,.45)', display: 'flex', alignItems: 'flex-end', animation: 'bsFade .18s ease-out' }}>
      <style>{`
        @keyframes bsFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bsUp { from { transform: translateY(28px); opacity: .4; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', background: '#fff', borderRadius: '22px 22px 0 0', border: '2px solid #1f1b16', borderBottom: 'none', padding: '16px 20px 26px', animation: 'bsUp .26s cubic-bezier(.2,.9,.3,1.1)' }}>
        <div style={{ width: 40, height: 4, borderRadius: 999, background: 'var(--border)', margin: '0 auto 16px' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <BadgeTile b={b} size={72} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontFamily: 'var(--font-round)', fontSize: 17, fontWeight: 900, color: 'var(--text)' }}>{b.l}</span>
              <span style={{ background: b.got ? r.chipBg : r.lockChipBg, color: b.got ? r.chipFg : r.lockChipFg, fontSize: 9.5, fontWeight: 900, fontFamily: 'var(--font-round)', padding: '2px 7px', borderRadius: 999 }}>{r.label}</span>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: b.got ? 'var(--green)' : 'var(--text-sub)', marginTop: 3 }}>
              {b.got ? '獲得ずみ' : 'みかくとく'}・{r.name}
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--bg)', borderRadius: 14, padding: '13px 15px', marginTop: 16 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--text-sub)', letterSpacing: '.04em' }}>{b.got ? 'このバッジをもらった条件' : 'もらえる条件'}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginTop: 6, lineHeight: 1.6 }}>{b.cond}</div>
        </div>

        {b.hint && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 11, color: b.got ? 'var(--text-sub)' : 'var(--blue-dark)', fontSize: 11.5, fontWeight: 700, lineHeight: 1.5 }}>
            <FIcon name={b.got ? 'check' : 'target'} size={15} /> {b.hint}
          </div>
        )}

        <button className="btn btn--lg" style={{ marginTop: 18 }} onClick={onClose}>とじる</button>
      </div>
    </div>
  );
}

function RecordScreen() {
  const nav = useNav();
  const [openBadge, setOpenBadge] = React.useState(null);
  const totalGot = BADGE_GROUPS.reduce((s, g) => s + g.badges.filter(b => b.got).length, 0);
  const totalAll = BADGE_GROUPS.reduce((s, g) => s + g.badges.length, 0);

  return (
    <div className="screen" style={{ position: 'relative' }}>
      <StatusBar />
      <TabHeader icon="book" title="成長きろく" />
      <div className="scroll pad stack">
        {/* 成長バッジ */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 2 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 7 }}><FIcon name="leaf" size={18} color="var(--green)" /> 成長バッジ</h3>
          <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--blue)' }}>{totalGot} / {totalAll} 獲得</span>
        </div>
        <div style={{ fontSize: 10.5, color: 'var(--text-sub)', fontWeight: 600, marginTop: -6 }}>バッジをタップすると、もらえる条件が見られるよ</div>

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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px 10px', marginTop: 14, justifyItems: 'center' }}>
                {g.badges.map((b, i) => <GrowthBadge key={i} b={b} onTap={setOpenBadge} />)}
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
      </div>
      <BadgeSheet b={openBadge} onClose={() => setOpenBadge(null)} />
    </div>
  );
}

/* ════ 受検準備中（トリセツなしパターン） ════ */
function ExamWaitingNoToriScreen() {
  return (
    <div className="screen">
      <StatusBar />
      <TabHeader icon="clip" title="受検" />
      <div className="scroll pad stack">
        {/* 準備中ヒーロー */}
        <div style={{ background: '#315cfa', borderRadius: 'var(--r-lg)', padding: '22px 22px 24px', textAlign: 'center', color: '#fff', border: '2px solid #1f1b16', boxShadow: '4px 4px 0 #1f1b16' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <svg width="60" height="60" viewBox="0 0 72 72" fill="none">
              <rect x="12" y="8" width="48" height="56" rx="8" fill="none" stroke="white" strokeWidth="3.5"/>
              <path d="M24 8v-2a4 4 0 0 1 8 0v2M40 8v-2a4 4 0 0 1 8 0v2" stroke="white" strokeWidth="3"/>
              <rect x="20" y="6" width="32" height="8" rx="4" fill="white" opacity=".25"/>
              <line x1="24" y1="30" x2="48" y2="30" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <line x1="24" y1="40" x2="40" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="54" cy="54" r="14" fill="#2447c9" stroke="white" strokeWidth="3"/>
              <path d="M54 48v7l4 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, opacity: .8, marginBottom: 8 }}>NEXT SESSION</div>
          <h1 style={{ fontFamily: 'var(--font-round)', fontSize: 22, fontWeight: 900, lineHeight: 1.4, marginBottom: 10 }}>
            次のAi GROW受検は<br/>準備中です
          </h1>
          <p style={{ fontSize: 13, opacity: .85, lineHeight: 1.7, fontWeight: 500 }}>
            次回の受検案内が届くまで、<br/>今の強みを活かして前へ進もう！
          </p>
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

Object.assign(window, { ExamHubScreen, ReportScreen, ExamCoursesScreen, ExamWaitingScreen, ExamWaitingNoToriScreen, RecordScreen });
