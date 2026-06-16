// screens-journal.jsx — 成長ジャーナル（ふり返り日記）
// 診断 → チャレンジ → ふり返り → トリセツが育つ、の「ふり返り」を担う新機能。
const { useState: useSj, useEffect: useEj, useRef: useRj } = React;

/* ─────────── 日付ユーティリティ ─────────── */
const J_DOW = ['日', '月', '火', '水', '木', '金', '土'];
const jPad = (n) => String(n).padStart(2, '0');
const jKey = (d) => `${d.getFullYear()}.${jPad(d.getMonth() + 1)}.${jPad(d.getDate())}`;
const jDayOffset = (off) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + off); return d; };
const jLabel = (key) => { const [y, m, d] = key.split('.'); return `${Number(m)}月${Number(d)}日`; };

/* ─────────── 気分（5段階） ─────────── */
const MOODS = [
  { key: 'great', label: 'さいこう', color: '#FC8524', mouth: 'M9 13.5 Q14 20 19 13.5', open: true },
  { key: 'good',  label: 'いい感じ', color: '#00c853', mouth: 'M9.5 14 Q14 18.5 18.5 14' },
  { key: 'ok',    label: 'ふつう',   color: '#0096fa', mouth: 'M10 15.5 H18' },
  { key: 'meh',   label: 'モヤモヤ', color: '#8a6cf0', mouth: 'M10 16.5 Q14 13.5 18 16.5' },
  { key: 'down',  label: 'つらい',   color: '#8c8c8c', mouth: 'M10 17 Q14 13 18 17' },
];
const MOOD_BY = Object.fromEntries(MOODS.map((m) => [m.key, m]));

function MoodFace({ mood, size = 44, active = false }) {
  const m = MOOD_BY[mood] || MOODS[2];
  const stroke = active ? '#fff' : m.color;
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" style={{ display: 'block' }}>
      <circle cx="14" cy="14" r="13" fill={active ? m.color : '#fff'} stroke={m.color} strokeWidth={active ? 0 : 2} />
      {m.key === 'great'
        ? <><path d="M8 11.5 L12 11.5 M8 10 L12 13" stroke={stroke} strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M20 11.5 L16 11.5 M20 10 L16 13" stroke={stroke} strokeWidth="2" strokeLinecap="round" fill="none" /></>
        : <><circle cx="10" cy="11.5" r="1.7" fill={stroke} /><circle cx="18" cy="11.5" r="1.7" fill={stroke} /></>}
      <path d={m.mouth} stroke={stroke} strokeWidth="2" fill={m.open && active ? 'rgba(255,255,255,.25)' : 'none'} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─────────── ふり返りの問い（ローテーション） ─────────── */
const J_PROMPTS = [
  { icon: 'sparkle', q: '今日、自分の強みを使えた瞬間は？', hint: '「行動する創造者」のキミらしさが出た場面を思い出そう' },
  { icon: 'bulb',    q: 'うれしかったこと・うまくいったことは？', hint: 'どんな小さなことでもOK' },
  { icon: 'footsteps', q: '難しかったこと、どう乗りこえた？', hint: '工夫したこと・がんばったことを書いてみよう' },
  { icon: 'sprout',  q: '明日ためしてみたい小さな一歩は？', hint: '次の自分へのひとことメモ' },
  { icon: 'handshake', q: '今日「ありがとう」と思ったことは？', hint: '誰かのいいところに気づけた日かも' },
];

/* ─────────── シード（過去の記録の例） ─────────── */
function journalSeed() {
  return [
    { id: 's3', date: jKey(jDayOffset(-1)), mood: 'good',  prompt: J_PROMPTS[0].q, text: '係の仕事で「こうしたら早いよ」ってアイデアを出したら、みんなが乗ってくれた。言ってみてよかった。', tag: '創造力', task: '新しいアイデアを3つメモに書き出す' },
    { id: 's2', date: jKey(jDayOffset(-2)), mood: 'ok',    prompt: J_PROMPTS[2].q, text: '発表の準備がうまく進まなくて少しあせった。けど友だちに相談したら整理できた。', tag: '表現力', task: '' },
    { id: 's1', date: jKey(jDayOffset(-4)), mood: 'great', prompt: J_PROMPTS[1].q, text: 'はじめてクラスで手を挙げて意見が言えた！ドキドキしたけど、やってみたら気持ちよかった。', tag: '表現力', task: '授業で1回、自分の意見を発言してみる' },
  ];
}

/* ─────────── 連続記録・週ストリップ ─────────── */
function weekStrip(entries) {
  const has = new Set(entries.map((e) => e.date));
  const moodFor = {}; entries.forEach((e) => { if (!moodFor[e.date]) moodFor[e.date] = e.mood; });
  return [...Array(7)].map((_, i) => {
    const d = jDayOffset(i - 6); const key = jKey(d);
    return { key, dow: J_DOW[d.getDay()], dd: d.getDate(), has: has.has(key), mood: moodFor[key], today: i === 6 };
  });
}
function calcStreak(entries) {
  const has = new Set(entries.map((e) => e.date));
  let streak = 0; let i = 0;
  // 今日 or 昨日 から連続を数える
  if (!has.has(jKey(jDayOffset(0)))) { if (has.has(jKey(jDayOffset(-1)))) i = -1; else return 0; }
  while (has.has(jKey(jDayOffset(i)))) { streak++; i--; }
  return streak;
}

/* ════════════ 成長ジャーナル ホーム ════════════ */
function JournalScreen() {
  const nav = useNav();
  const entries = (nav.state.journal && nav.state.journal.length) ? nav.state.journal : journalSeed();
  const todayKey = jKey(jDayOffset(0));
  const wroteToday = entries.some((e) => e.date === todayKey);
  const week = weekStrip(entries);
  const streak = calcStreak(entries);

  return (
    <div className="screen">
      <StatusBar />
      {/* 戻る付きヘッダー（占い/今月の診断と同じ作法） */}
      <div className="appbar">
        <button onClick={() => nav.go('contents')} style={{ border: 'none', background: 'var(--bg)', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)' }}>
          <Icon name="back" size={20} />
        </button>
        <div className="logo"><span className="ai">Ai</span><span className="grow">GROW</span><span className="sub">ジャーナル</span></div>
        <div style={{ width: 38 }}></div>
      </div>

      <div className="scroll pad stack">
        {/* 連続記録ヒーロー */}
        <div style={{ background: 'linear-gradient(135deg,#ff9d3f,#ef6f0a)', borderRadius: 'var(--r-lg)', padding: '18px 20px 16px', color: '#fff', boxShadow: 'var(--shadow-orange)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -26, right: -20, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,.10)' }}></div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FIcon name="fire" size={26} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: .85 }}>連続記録</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 30, lineHeight: 1 }}>{streak}</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>日</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: .85 }}>これまで</div>
              <div style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 18 }}>{entries.length}<span style={{ fontSize: 11, fontWeight: 700 }}> 記録</span></div>
            </div>
          </div>
          {/* 週ストリップ */}
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
            {week.map((d) => (
              <div key={d.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 10, fontWeight: 700, opacity: d.today ? 1 : .7 }}>{d.dow}</span>
                <div style={{ width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: d.has ? '#fff' : 'rgba(255,255,255,.18)', border: d.today ? '2px solid #fff' : 'none' }}>
                  {d.has
                    ? <MoodFace mood={d.mood} size={26} />
                    : <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,.85)' }}>{d.dd}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 今日のふり返り CTA */}
        {wroteToday ? (
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--green-soft)', boxShadow: 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green)', flexShrink: 0 }}><FIcon name="check" size={22} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 14, color: '#1b7a3e' }}>今日のふり返りは記録ずみ！</div>
              <div style={{ fontSize: 11, color: '#3a8f5a', fontWeight: 600, marginTop: 1 }}>えらい！明日もこの調子で続けよう</div>
            </div>
            <button onClick={() => nav.go('journal-write')} style={{ flexShrink: 0, border: 'none', background: '#fff', color: 'var(--green)', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 12, padding: '8px 14px', borderRadius: 999, cursor: 'pointer' }}>追記する</button>
          </div>
        ) : (
          <button className="btn btn--cta btn--lg" onClick={() => nav.go('journal-write')}>
            <FIcon name="pencil" size={20} color="#fff" /> 今日のふり返りを書く
          </button>
        )}

        {/* タイムライン */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 7 }}><FIcon name="book" size={17} color="var(--blue)" /> これまでの記録</h3>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-sub)' }}>新しい順</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {entries.map((e, i) => {
            const m = MOOD_BY[e.mood] || MOODS[2];
            const last = i === entries.length - 1;
            return (
              <div key={e.id || i} style={{ display: 'flex', gap: 12 }}>
                {/* タイムライン軸 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fff', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MoodFace mood={e.mood} size={30} />
                  </div>
                  {!last && <div style={{ flex: 1, width: 2, background: 'var(--border-soft)', minHeight: 14 }}></div>}
                </div>
                {/* カード */}
                <div className="card card--flat" style={{ flex: 1, marginBottom: 12, padding: '13px 15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                    <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13, color: 'var(--text)' }}>{jLabel(e.date)}</span>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: m.color }}>{m.label}</span>
                    {e.tag && <span className="pill" style={{ background: 'var(--blue-soft)', color: 'var(--blue-dark)', fontSize: 9.5, padding: '3px 9px', marginLeft: 'auto' }}>{e.tag}</span>}
                  </div>
                  <p style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.75, fontWeight: 500 }}>{e.text}</p>
                  {e.task && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 9, padding: '7px 10px', background: 'var(--bg)', borderRadius: 10 }}>
                      <FIcon name="flag" size={13} color="var(--orange)" />
                      <span style={{ fontSize: 10.5, color: 'var(--text-sub)', fontWeight: 600, lineHeight: 1.4 }}>{e.task}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* フッターのひとこと */}
        <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', background: 'var(--blue-softer)', borderRadius: 'var(--r-md)', padding: '12px 14px' }}>
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, marginTop: 1 }}><FIcon name="chat" size={13} /></span>
          <p style={{ fontSize: 11.5, color: 'var(--text-sub)', lineHeight: 1.7, fontWeight: 500 }}>毎日のふり返りが、キミのトリセツを少しずつ育てていくよ。3行でもOK！</p>
        </div>
      </div>
    </div>
  );
}

/* ════════════ ふり返りを書く ════════════ */
const J_AI_COMMENT = {
  great: '最高の一日だったね！その勢い、「行動する創造者」のキミらしさそのもの。明日もワクワクを大切に。',
  good:  'いい流れだね。うまくいった理由を覚えておくと、次の場面でも同じ強みを使えるよ。',
  ok:   'ふつうの日も、こうして言葉にできたのがえらい。小さな気づきが積み重なって強みになるよ。',
  meh:   'モヤモヤを書き出せたのは大きな一歩。気持ちを整理できるのもキミの力。ゆっくりでいこう。',
  down:  'つらい日もちゃんと記録できたね。無理しないで大丈夫。明日のキミに、ひとこと残せたね。',
};

function JournalWriteScreen() {
  const nav = useNav();
  const todayKey = jKey(jDayOffset(0));
  const tasks = (nav.state.tasks || []).filter((t) => !t.done);

  const [mood, setMood] = useSj(null);
  const [promptIdx, setPromptIdx] = useSj(0);
  const [text, setText] = useSj('');
  const [linkedTask, setLinkedTask] = useSj(null);
  const [saved, setSaved] = useSj(false);
  const prompt = J_PROMPTS[promptIdx];
  const canSave = mood && text.trim().length >= 2;

  const save = () => {
    if (!canSave) return;
    const linkText = linkedTask != null ? tasks[linkedTask].text : '';
    const tag = linkedTask != null ? tasks[linkedTask].tag : (MOOD_BY[mood].key === 'down' ? '内省' : '気づき');
    const entry = { id: 'j' + Date.now(), date: todayKey, mood, prompt: prompt.q, text: text.trim(), tag, task: linkText };
    nav.update((s) => ({
      journal: [entry, ...((s.journal && s.journal.length ? s.journal : journalSeed()))],
      exp: (s.exp || 0) + 1,
    }));
    setSaved(true);
  };

  return (
    <div className="screen">
      <StatusBar />
      <div className="appbar">
        <button onClick={() => nav.go('journal')} style={{ border: 'none', background: 'var(--bg)', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)' }}>
          <Icon name="back" size={20} />
        </button>
        <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15, color: 'var(--text)' }}>今日のふり返り</span>
        <div style={{ width: 38 }}></div>
      </div>

      <div className="scroll pad stack">
        <div style={{ fontSize: 11.5, color: 'var(--text-sub)', fontWeight: 700, textAlign: 'center' }}>{jLabel(todayKey)}（{J_DOW[new Date().getDay()]}）</div>

        {/* 1. 気分 */}
        <div className="card">
          <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 14, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 4, height: 16, borderRadius: 2, background: 'var(--orange)' }}></span>今日の気分は？
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 6 }}>
            {MOODS.map((m) => {
              const on = mood === m.key;
              return (
                <button key={m.key} onClick={() => setMood(m.key)} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '4px 0', WebkitTapHighlightColor: 'transparent' }}>
                  <div style={{ transform: on ? 'scale(1.12)' : 'scale(1)', transition: 'transform .15s', filter: on ? 'none' : 'saturate(.7)', opacity: on || !mood ? 1 : .5 }}>
                    <MoodFace mood={m.key} size={46} active={on} />
                  </div>
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: on ? m.color : 'var(--text-sub)' }}>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. 問い */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 4, height: 16, borderRadius: 2, background: 'var(--orange)' }}></span>今日の問い
            </div>
            <button onClick={() => setPromptIdx((i) => (i + 1) % J_PROMPTS.length)} style={{ border: 'none', background: 'var(--blue-soft)', color: 'var(--blue-dark)', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 11, padding: '6px 12px', borderRadius: 999, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
              <FIcon name="sparkle" size={13} color="var(--blue-dark)" /> 別の問い
            </button>
          </div>
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', background: 'linear-gradient(135deg,#fff8ef,#fff)', border: '1.5px solid #ffe2c2', borderRadius: 14, padding: '13px 14px' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}><FIcon name={prompt.icon} size={18} /></div>
            <div>
              <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 14.5, color: 'var(--text)', lineHeight: 1.5 }}>{prompt.q}</div>
              <div style={{ fontSize: 11, color: 'var(--text-sub)', marginTop: 3, fontWeight: 600, lineHeight: 1.5 }}>{prompt.hint}</div>
            </div>
          </div>

          {/* 入力 */}
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5}
            placeholder="思ったことを自由に書いてみよう…（3行でもOK）"
            style={{ width: '100%', marginTop: 12, border: '2px solid var(--border)', borderRadius: 'var(--r-md)', padding: '13px 14px', fontSize: 14, fontFamily: 'var(--font)', lineHeight: 1.7, resize: 'none', outline: 'none', color: 'var(--text)' }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--blue)'; e.target.style.boxShadow = '0 0 0 4px var(--blue-soft)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }} />
          <div style={{ textAlign: 'right', fontSize: 10.5, color: 'var(--text-sub)', marginTop: 4, fontWeight: 600 }}>{text.length} 文字</div>
        </div>

        {/* 3. チャレンジと結びつける（任意） */}
        {tasks.length > 0 && (
          <div className="card">
            <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 14, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 4, height: 16, borderRadius: 2, background: 'var(--orange)' }}></span>チャレンジと結びつける
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 600, marginBottom: 10 }}>今日のふり返りに関係するチャレンジがあれば選ぼう（任意）</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tasks.map((t, i) => {
                const on = linkedTask === i;
                return (
                  <button key={i} onClick={() => setLinkedTask(on ? null : i)} style={{ textAlign: 'left', cursor: 'pointer', borderRadius: 12, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 10,
                    border: `2px solid ${on ? 'var(--blue)' : 'var(--border)'}`, background: on ? 'var(--blue-soft)' : '#fff', WebkitTapHighlightColor: 'transparent' }}>
                    <FIcon name="flag" size={15} color={on ? 'var(--blue)' : 'var(--text-sub)'} />
                    <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: 'var(--text)' }}>{t.text}</span>
                    {on && <FIcon name="check" size={16} color="var(--blue)" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 保存 */}
        <button className="btn btn--cta btn--lg" disabled={!canSave} onClick={save} style={{ marginTop: 2 }}>
          <FIcon name="sprout" size={20} color={canSave ? '#fff' : '#b3b3b3'} /> 記録する
        </button>
        <div style={{ height: 8 }}></div>
      </div>

      {/* 保存後セレブレーション */}
      {saved && <JournalSaved mood={mood} nav={nav} />}
    </div>
  );
}

/* ─────────── 保存後オーバーレイ ─────────── */
function JournalSaved({ mood, nav }) {
  const [show, setShow] = useSj(false);
  useEj(() => { const t = setTimeout(() => setShow(true), 40); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 200, background: 'rgba(0,0,0,.5)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', backdropFilter: 'blur(2px)' }}>
      <div style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '24px 22px 30px', textAlign: 'center', transform: show ? 'translateY(0)' : 'translateY(100%)', transition: 'transform .4s cubic-bezier(.2,.9,.3,1.1)' }}>
        <div style={{ width: 40, height: 4, background: 'var(--border)', borderRadius: 999, margin: '0 auto 18px' }}></div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6, color: 'var(--orange)', transform: show ? 'scale(1)' : 'scale(0)', transition: 'transform .5s cubic-bezier(.2,1.3,.4,1.3)' }}><FIcon name="party" size={56} sw={1.6} /></div>
        <h2 style={{ fontFamily: 'var(--font-round)', fontSize: 21, fontWeight: 900, color: 'var(--text)', lineHeight: 1.4 }}>記録できたよ！</h2>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--green-soft)', color: '#1b7a3e', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13, padding: '6px 14px', borderRadius: 999, marginTop: 10 }}>
          <FIcon name="bolt" size={15} color="#1b7a3e" /> +1 EXP ゲット
        </div>

        {/* AIコメント */}
        <div style={{ marginTop: 18, textAlign: 'left', background: 'var(--blue-softer)', borderRadius: 'var(--r-md)', padding: '14px 15px', display: 'flex', gap: 11 }}>
          <div style={{ flexShrink: 0 }}><Mascot size={42} /></div>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--blue)', marginBottom: 3 }}>AIコーチから</div>
            <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.75, fontWeight: 500 }}>{J_AI_COMMENT[mood] || J_AI_COMMENT.ok}</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 18 }}>
          <button className="btn btn--primary btn--lg" onClick={() => nav.go('journal')}>ジャーナルを見る</button>
          <button className="btn" style={{ background: 'transparent', color: 'var(--text-sub)' }} onClick={() => nav.go('ai-chat')}>AIにもっと相談する</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { JournalScreen, JournalWriteScreen, journalSeed });
