// screens-tendency.jsx — 傾向チェック（IAT / 潜在連合テスト）
// 相互評価の“次のステップ”として独立させた画面。メインフローには組み込まない。
// フロー: 開始 ＞ 使用ワードの確認 ＞ 診断（仕分け・気質診断と同じUI） ＞ 完了（結果は伝えず固定表示）
const { useState: useSt, useEffect: useEt, useRef: useRt } = React;

/* ─────────── カラー（添付準拠） ─────────── */
const T_RED    = '#E0574F';   // 上段カテゴリ（概念）
const T_ORANGE = '#F5A93F';   // 下段カテゴリ（属性）
const T_GREEN  = '#14A97B';   // 回答カード

/* ─────────── 使用ワード ─────────── */
const TW_CAT  = ['三脚猫', '子猫', '黒猫', 'にゃんこ'];   // 猫
const TW_DOG  = ['子犬', '柴犬', 'わんこ', '番犬'];       // 犬
const TW_BAD  = ['迷惑', 'うるさい', '邪魔', '面倒'];      // 迷惑
const TW_GOOD = ['癒やし', 'かわいい', 'ふわふわ', 'なごむ']; // 癒やし

/* 診断パート：気質診断と同じ二段カード（上=概念 / 下=属性）。属性の対応を入れ替えて連合を測る */
const T_BLOCKS = [
  { idx: 1, top: { L: '猫', R: '犬' }, bot: { L: '迷惑', R: '癒やし' },
    L: [...TW_CAT, ...TW_BAD], R: [...TW_DOG, ...TW_GOOD] },
  { idx: 2, top: { L: '猫', R: '犬' }, bot: { L: '癒やし', R: '迷惑' },
    L: [...TW_CAT, ...TW_GOOD], R: [...TW_DOG, ...TW_BAD] },
];

const shuffle = (a) => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
function buildTrials(B) {
  const all = [...B.L.map(w => ({ word: w, side: 'L' })), ...B.R.map(w => ({ word: w, side: 'R' }))];
  return shuffle(all).slice(0, 10);
}

/* ─────────── 開始画面 ─────────── */
function StartTendencyScreen() {
  const nav = useNav();
  return (
    <div className="screen screen--white" style={{ position: 'relative' }}>
      <StatusBar />
      <AppHeader sub="傾向チェック" noMenu />
      <div className="scroll" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, minHeight: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '12px 30px 24px', gap: 6 }}>
          <Pill style={{ background: 'var(--green-soft)', color: '#2E7D32' }}>相互評価のあとに</Pill>
          <div style={{ margin: '18px 0 6px', display: 'flex', justifyContent: 'center', color: 'var(--green)' }}><FIcon name="bolt" size={62} sw={1.6} /></div>
          <h1 style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.5 }}>傾向チェック<br />「犬猫」</h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-sub)', fontWeight: 600, marginTop: 8, lineHeight: 1.8 }}>
            画面の上に出る２つのカードに、まん中のことばをできるだけ早く仕分けるチェックだよ。<br />直感でサクサク答えてね。
          </p>
        </div>
        <div style={{ flexShrink: 0, padding: '0 24px 26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#fff4ef', border: '1px solid #ffd3c9', borderRadius: 10, padding: '9px 12px', marginBottom: 12, fontSize: 12, fontWeight: 700, color: 'var(--orange-dark)' }}>
            一度回答した質問には戻れません
          </div>
          <button className="btn btn--cta btn--lg" style={{ background: 'var(--green)' }} onClick={() => nav.go('tendency-words')}>はじめる</button>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-sub)', marginTop: 12 }}>所要時間 約 3 分</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────── 使用ワードの確認画面 ─────────── */
function WordCard({ title, words }) {
  return (
    <div style={{ border: `2px solid ${T_GREEN}`, borderRadius: 12, overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: T_RED, color: '#fff', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15, textAlign: 'center', padding: '11px 6px' }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 10 }}>
        {words.map(w => (
          <div key={w} style={{ border: `1.5px solid ${T_GREEN}`, borderRadius: 8, color: 'var(--text)', fontWeight: 600, fontSize: 13, textAlign: 'center', padding: '9px 4px', background: '#fff' }}>{w}</div>
        ))}
      </div>
    </div>
  );
}
function TendencyWordsScreen() {
  const nav = useNav();
  return (
    <div className="screen screen--white">
      <StatusBar />
      <AppHeader sub="傾向チェック" noMenu />
      <div className="scroll pad stack" style={{ paddingBottom: 8 }}>
        <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border-soft)', borderRadius: 'var(--r-md)', padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 8, fontFamily: 'var(--font-round)' }}>注意</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, margin: 0, padding: 0 }}>
            {[
              '上に表示される2つのカードのどちらかに分類されることばが、まん中に表示されます。各ことばには正しい分類があります。',
              '反応が遅かった場合には、正しく計測できません。できるだけ早く反応するようにしてください。',
              '集中できる環境で実施してください。',
            ].map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text-sub)', lineHeight: 1.7, fontWeight: 500 }}>
                <span style={{ color: T_GREEN, flexShrink: 0, fontWeight: 900 }}>・</span><span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <WordCard title="猫" words={TW_CAT} />
          <WordCard title="犬" words={TW_DOG} />
          <WordCard title="迷惑" words={TW_BAD} />
          <WordCard title="癒やし" words={TW_GOOD} />
        </div>
      </div>

      <div style={{ flexShrink: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '12px 16px 18px', borderTop: '1px solid var(--border-soft)', background: '#fff' }}>
        <button className="btn btn--outline btn--lg" onClick={() => nav.go('start-tendency')}>取消</button>
        <button className="btn btn--cta btn--lg" onClick={() => nav.go('tendency-game', { block: 0 })}>理解した</button>
      </div>
    </div>
  );
}

/* ─────────── 診断画面（気質診断と同じ仕分けUI） ─────────── */
const T_TIME_Q = 6000; // 1問の制限時間 (ms)

function TendencyGameScreen() {
  const nav = useNav();
  const initial = (nav.params && nav.params.block) || 0;
  const [round, setRound] = useSt(initial);
  useEt(() => {
    if (nav.params && nav.params.block != null && nav.params.block !== round) setRound(nav.params.block);
  }, [nav.params && nav.params.block]);
  const B = T_BLOCKS[round];

  const [questions, setQuestions] = useSt(() => buildTrials(B));
  const [qi, setQi] = useSt(0);
  const [fb, setFb] = useSt(null);       // { side, ok, timeout }
  const [elapsed, setElapsed] = useSt(0);
  const fbRef = useRt(null);
  const qStart = useRt(Date.now());

  useEt(() => {
    setQuestions(buildTrials(T_BLOCKS[round]));
    setQi(0); setFb(null); fbRef.current = null;
  }, [round]);

  const q = questions[qi];

  const finish = () => {
    if (round + 1 >= T_BLOCKS.length) { nav.update(s => ({ tendency: { done: true } })); nav.go('tendency-complete'); }
    else setRound(round + 1);
  };

  const answer = (side) => {
    if (fbRef.current || !q) return;
    const ok = side === q.side;
    const f = { side, ok, timeout: side === null };
    fbRef.current = f;
    setFb(f);
  };

  useEt(() => {
    if (!fb) return;
    const t = setTimeout(() => {
      fbRef.current = null; setFb(null);
      if (qi + 1 >= questions.length) finish();
      else setQi(v => v + 1);
    }, fb.ok ? 320 : 700);
    return () => clearTimeout(t);
  }, [fb]);

  useEt(() => {
    qStart.current = Date.now(); setElapsed(0);
    const t = setInterval(() => {
      if (fbRef.current) return;
      const e = Date.now() - qStart.current;
      setElapsed(Math.min(e, T_TIME_Q));
      if (e >= T_TIME_Q) answer(null);
    }, 100);
    return () => clearInterval(t);
  }, [qi, round]);

  const remaining = 1 - elapsed / T_TIME_Q;

  /* ドラッグ振り分け */
  const [drag, setDrag] = useSt({ x: 0, y: 0, active: false });
  const [hover, setHover] = useSt(null);
  const cardRefL = useRt(null), cardRefR = useRt(null), ansRef = useRt(null);
  const dragData = useRt({ active: false, startX: 0, startY: 0, scale: 1, moved: false });
  useEt(() => { setDrag({ x: 0, y: 0, active: false }); setHover(null); dragData.current.active = false; }, [qi, round]);

  const zoneAt = (cx, cy) => {
    for (const [k, ref] of [['L', cardRefL], ['R', cardRefR]]) {
      const r = ref.current && ref.current.getBoundingClientRect();
      if (r && cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom) return k;
    }
    return null;
  };
  const onDown = (e) => {
    if (fbRef.current || !q) return;
    const el = ansRef.current, rect = el.getBoundingClientRect();
    const scale = el.offsetWidth ? rect.width / el.offsetWidth : 1;
    dragData.current = { active: true, startX: e.clientX, startY: e.clientY, scale, moved: false };
    setDrag({ x: 0, y: 0, active: true });
    try { el.setPointerCapture(e.pointerId); } catch (_) {}
  };
  const onMove = (e) => {
    const d = dragData.current; if (!d.active) return;
    const x = (e.clientX - d.startX) / d.scale, y = (e.clientY - d.startY) / d.scale;
    if (Math.abs(x) + Math.abs(y) > 4) d.moved = true;
    setDrag({ x, y, active: true }); setHover(zoneAt(e.clientX, e.clientY));
  };
  const onUp = (e) => {
    const d = dragData.current; if (!d.active) return;
    d.active = false;
    const z = zoneAt(e.clientX, e.clientY);
    setHover(null); setDrag({ x: 0, y: 0, active: false });
    if (z && d.moved) answer(z);
  };

  const cardBtn = (side, top, bot) => {
    const hit = (fb && fb.side === side) || hover === side;
    const ring = fb && fb.side === side ? (fb.ok ? T_GREEN : '#D33B2F') : hover === side ? T_GREEN : null;
    return (
      <button key={side} ref={side === 'L' ? cardRefL : cardRefR} onClick={() => answer(side)} disabled={!!fb}
        style={{ width: '42%', maxWidth: 176, border: 'none', padding: 0, background: 'none', cursor: 'pointer',
          borderRadius: 10, overflow: 'hidden', WebkitTapHighlightColor: 'transparent',
          boxShadow: ring ? `0 0 0 3px ${ring}, 0 8px 18px rgba(0,0,0,.16)` : '0 2px 8px rgba(0,0,0,.12)',
          transform: hit ? 'scale(1.05)' : 'scale(1)', transition: 'transform .15s, box-shadow .15s' }}>
        <div style={{ background: T_RED, color: '#fff', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 17, padding: '15px 6px', textAlign: 'center' }}>{top}</div>
        <div style={{ background: T_ORANGE, color: '#fff', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 16, padding: '14px 6px', textAlign: 'center' }}>{bot}</div>
      </button>
    );
  };

  return (
    <div className="screen screen--white">
      <StatusBar />
      <div style={{ flexShrink: 0, background: T_RED, color: '#fff', display: 'flex', alignItems: 'center', padding: '0 16px 0 8px', height: 48 }}>
        <button onClick={() => round === 0 ? nav.go('tendency-words') : setRound(round - 1)}
          style={{ border: 'none', background: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', width: 34, height: 48, padding: 0 }}>
          <Icon name="back" size={19} />
        </button>
        <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15.5 }}>パート{B.idx} - 傾向チェック</div>
        <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15 }}>{qi + 1} / {questions.length}</div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '20px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {cardBtn('L', B.top.L, B.bot.L)}
          {cardBtn('R', B.top.R, B.bot.R)}
        </div>

        <div style={{ flex: 1.5 }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 18, fontSize: 12.5, fontWeight: 800, color: '#D33B2F', fontFamily: 'var(--font-round)' }}>
            {fb && fb.timeout ? '時間切れ！つぎへ' : fb && !fb.ok ? '✕ はんたいのカード！' : ''}
          </div>
          {q && (
            <div key={round + '-' + qi} ref={ansRef} className="fade-in"
              onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
              style={{ background: T_GREEN, color: '#fff', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 18,
                padding: '17px 34px', minWidth: 150, textAlign: 'center', borderRadius: 8,
                boxShadow: drag.active ? `0 14px 30px ${T_GREEN}55` : '0 4px 10px rgba(0,0,0,.20)',
                userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'none',
                cursor: drag.active ? 'grabbing' : 'grab', position: 'relative', zIndex: 5,
                opacity: fb && fb.ok ? 0 : 1,
                transform: fb && fb.ok ? 'scale(.6)'
                  : `translate(${drag.x}px,${drag.y}px) rotate(${drag.active ? drag.x * 0.03 : 0}deg) scale(${drag.active ? 1.06 : 1})`,
                transition: drag.active ? 'box-shadow .15s' : 'opacity .25s, transform .25s' }}>
              {q.word}
            </div>
          )}
          <div style={{ fontSize: 11.5, color: 'var(--text-sub)', fontWeight: 600, opacity: drag.active ? 0 : 1, transition: 'opacity .15s' }}>ドラッグするか、カードをタップして振り分け</div>
        </div>

        <div style={{ flex: 1 }}></div>
      </div>

      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#f2f0ea', borderTop: '1px solid var(--border-soft)' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1f1b16" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="13.5" r="7.5"></circle><path d="M12 13.5V10"></path><path d="M10 2.5h4"></path><path d="M12 2.5V6"></path>
        </svg>
        <div style={{ flex: 1, height: 8, borderRadius: 4, position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(90deg, #D0442F 0%, #DE8A38 30%, #CDBA3E 55%, #4E9A47 85%, #2E7D32 100%)' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: `${(1 - remaining) * 100}%`, background: '#333B33', transition: 'width .1s linear' }}></div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── 完了画面（結果は伝えず固定表示） ─────────── */
function TendencyCompleteScreen() {
  const nav = useNav();
  return (
    <div className="screen">
      <StatusBar />
      <AppHeader noMenu />
      <div className="scroll pad" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, minHeight: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 4 }}>
          <div className="fade-in" style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--green)', border: '2px solid #1f1b16', boxShadow: '4px 4px 0 #1f1b16', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 20 }}>
            <FIcon name="check" size={58} sw={2} />
          </div>
          <h1 style={{ fontSize: 23, fontWeight: 900, lineHeight: 1.45 }}>傾向チェック<br />おつかれさま！</h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-sub)', fontWeight: 600, marginTop: 10, lineHeight: 1.85, maxWidth: 280 }}>
            回答を受け付けました。ご協力ありがとう！<br />結果は先生の分析にいかされるよ。
          </p>
          <div style={{ marginTop: 18, background: 'var(--green-soft)', color: '#2E7D32', borderRadius: 999, padding: '7px 16px', fontSize: 12, fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <FIcon name="check" size={14} color="#2E7D32" /> すべてのパートが完了しました
          </div>
        </div>
        <div style={{ flexShrink: 0, paddingBottom: 10 }}>
          <button className="btn btn--cta btn--lg" onClick={() => nav.go('home')}>ホームにもどる</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── フェーズ進捗付き完了画面（複数フェーズの場合） ─────────── */
const T_PHASES = [
  { l1: '犬', l2: '猫' },
  { l1: '文系', l2: '理系' },
  { l1: 'デジタル', l2: 'アナログ' },
  { l1: '海', l2: '山' },
  { l1: '朝型', l2: '夜型' },
];

function TendencyPhaseCompleteScreen() {
  const nav = useNav();
  const done = Math.min(T_PHASES.length, Math.max(1, (nav.params && nav.params.phase) || 1));
  const remaining = T_PHASES.length - done;
  return (
    <div className="screen">
      <StatusBar />
      <AppHeader noMenu />
      <div className="scroll pad" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, minHeight: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 4 }}>
          <div className="fade-in" style={{ width: 108, height: 108, borderRadius: '50%', background: 'var(--green)', border: '2px solid #1f1b16', boxShadow: '4px 4px 0 #1f1b16', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 18 }}>
            <FIcon name="check" size={52} sw={2} />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.45 }}>フェーズ {done} が<br />完了したよ！</h1>
          <p style={{ fontSize: 13, color: 'var(--text-sub)', fontWeight: 600, marginTop: 10, lineHeight: 1.85, maxWidth: 280 }}>
            {remaining > 0
              ? <>のこりはあと {remaining} フェーズ。<br />続けてサクサク答えよう！</>
              : <>すべてのフェーズが完了したよ。<br />ご協力ありがとう！</>}
          </p>
        </div>

        {/* フェーズ進捗 */}
        <div style={{ flexShrink: 0, background: 'var(--blue-soft, #e8edff)', borderRadius: 'var(--r-lg)', padding: '16px 16px 18px', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 12.5, fontWeight: 900, color: 'var(--blue-dark, #2447c9)', fontFamily: 'var(--font-round)' }}>{done} / {T_PHASES.length} フェーズ 完了</span>
            {remaining > 0 && <span style={{ fontSize: 12.5, fontWeight: 900, color: 'var(--blue-dark, #2447c9)', fontFamily: 'var(--font-round)' }}>あと {remaining} フェーズ</span>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${T_PHASES.length}, 1fr)`, gap: 8 }}>
            {T_PHASES.map((p, i) => {
              const isDone = i < done;
              const isNext = i === done;
              const active = isDone || isNext;
              return (
                <div key={p.l1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    background: active ? '#315cfa' : '#e6ded0',
                    color: active ? '#fff' : '#b8ac99',
                    fontFamily: 'var(--font-round)', fontSize: 16, fontWeight: 900 }}>
                    {isDone ? <FIcon name="check" size={20} color="#fff" sw={2.6} /> : (i + 1)}
                  </div>
                  <div style={{ width: '100%', height: 5, borderRadius: 3, background: active ? '#315cfa' : '#e6ded0' }}></div>
                  <div style={{ fontSize: 10.5, fontWeight: 800, lineHeight: 1.5, textAlign: 'center', color: active ? 'var(--blue-dark, #2447c9)' : '#b8ac99' }}>
                    {p.l1}<br />{p.l2}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ flexShrink: 0, paddingBottom: 10 }}>
          {remaining > 0
            ? <button className="btn btn--cta btn--lg" onClick={() => nav.go('start-tendency')}>次へすすむ</button>
            : <button className="btn btn--cta btn--lg" onClick={() => nav.go('tendency-complete')}>結果を確認する</button>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { StartTendencyScreen, TendencyWordsScreen, TendencyGameScreen, TendencyCompleteScreen, TendencyPhaseCompleteScreen, T_BLOCKS, T_PHASES });
