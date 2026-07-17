// screens-diag.jsx — 診断開始 / 気質診断ゲーム(カード仕分け・全5フェーズ) / 軸別結果
const { useState: useSd, useEffect: useEd, useRef: useRd } = React;

/* 5フェーズ（Big Five）— カラーは仕様準拠：color=上段 / label=ラベル / ans=回答 */
const DIAG_AXES = [
  { idx: 1, axis: '外向性', result: 'エネルギッシュな挑戦者', emoji: 'fire',
    color: '#C24634', label: '#F3CABF', ans: '#D98B45',
    attrL: '活発', attrR: '静か',
    wordsL: ['社交的', 'おしゃべり', '行動派', 'ノリがいい', '明るい'],
    wordsR: ['慎重', '聞き役', '控えめ', '落ち着き', 'ひとり時間'] },
  { idx: 2, axis: '協調性', result: '調和を重んじるサポーター', emoji: 'handshake',
    color: '#2E8560', label: '#C0E2D2', ans: '#5FA98B',
    attrL: '協力', attrR: 'わが道',
    wordsL: ['思いやり', 'やさしい', '世話好き', 'チームワーク', '気配り'],
    wordsR: ['単独行動', '自分優先', 'ドライ', '競争心', 'マイペース'] },
  { idx: 3, axis: '誠実性', result: '意志の強い努力家', emoji: 'target',
    color: '#4A3E9E', label: '#CFC9EE', ans: '#7C6EC8',
    attrL: '計画的', attrR: '気分屋',
    wordsL: ['コツコツ', '几帳面', '責任感', '準備万端', 'きっちり'],
    wordsR: ['気まぐれ', '後回し', '思いつき', '飽きっぽい', 'ゆるい'] },
  { idx: 4, axis: '情緒安定性', result: 'リスクを察知する慎重な守り手', emoji: 'compass',
    color: '#3457A0', label: '#C3D2EC', ans: '#4F86A8',
    attrL: 'どっしり', attrR: '敏感',
    wordsL: ['冷静', '平常心', '楽観的', '切り替え上手', 'リラックス'],
    wordsR: ['心配性', 'ドキドキ', '繊細', '緊張しやすい', '気にしがち'] },
  { idx: 5, axis: '開放性', result: '知的好奇心旺盛な探求者', emoji: 'search',
    color: '#8A5A2E', label: '#EDD8BE', ans: '#C08A42',
    attrL: '挑戦', attrR: 'いつも通り',
    wordsL: ['好奇心', 'アイデア', '冒険', '新しいもの', '想像力'],
    wordsR: ['定番', '現実的', 'ルーティン', '慣れた道', '安定'] },
];

/* 上段カテゴリ（全フェーズ共通）：左=自分 / 右=他人 */
const SELF_WORDS = ['わたし', 'ぼく', '自分', 'じぶんらしさ'];
const OTHER_WORDS = ['他人', 'あの人', '友だち', 'みんな'];

const seededShuffle = (arr, seed) => {
  const a = [...arr];
  let s = (seed * 2654435761) % 2147483648;
  const rnd = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* 各フェーズ 20問分のプールから先頭 QUESTIONS_PER_PHASE 問を出題（プロトタイプは 5 問） */
const QUESTIONS_PER_PHASE = 5;
const buildQuestions = (ax) => seededShuffle([
  ...ax.wordsL.map(w => ({ word: w, side: 'L' })),
  ...ax.wordsR.map(w => ({ word: w, side: 'R' })),
  ...SELF_WORDS.map(w => ({ word: w, side: 'L' })),
  ...OTHER_WORDS.map(w => ({ word: w, side: 'R' })),
  { word: ax.wordsL[0], side: 'L' }, { word: ax.wordsR[0], side: 'R' },
], ax.idx * 17 + 7).slice(0, QUESTIONS_PER_PHASE);

/* ─────────── 診断開始モーダル ─────────── */
function StartDiagModal({ onStart }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 20px', background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(2px)' }}>
      <div style={{ width: '100%', maxWidth: 440, borderRadius: 18, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.35)' }}>
        {/* ヘッダー */}
        <div style={{ background: 'var(--blue)', padding: '22px 22px 20px' }}>
          <div style={{ fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 21, color: '#fff', lineHeight: 1.35 }}>キミの強みと可能性を見つけよう！</div>
          <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,.9)', marginTop: 6, fontWeight: 600 }}>3ステップ完了で「トリセツ」が完成するよ</div>
        </div>
        {/* 本文 */}
        <div style={{ background: '#fff', padding: '22px 22px 6px' }}>
          {/* 3ステップ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 20 }}>
            {[
              ['1', '気質診断', 'ゲーム感覚で潜在的な性格を発見'],
              ['2', '自己評価', '行動を振り返り強みを再確認'],
              ['3', '相互評価', 'お互いの強みを送り合って客観視'],
            ].map(([n, title, desc]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--blue)', color: '#fff', fontFamily: 'var(--font-round)', fontWeight: 900, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{n}</div>
                <div>
                  <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15, color: 'var(--text)' }}>{title}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-sub)', fontWeight: 500, marginLeft: 8 }}>{desc}</span>
                </div>
              </div>
            ))}
          </div>
          {/* 完成すると */}
          <div style={{ background: 'var(--blue-softer)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 13, color: 'var(--blue)', marginBottom: 10 }}><span style={{display:'inline-flex',alignItems:'center',gap:5}}><FIcon name="sparkle" size={13} color="var(--blue)" /> 完成すると...</span></div>
            {[
              ['chat', '強みを言語化して自己PRに活用'],
              ['chart', '成長の変化をグラフで確認'],
              ['crystal', '自分に合った行動・学びスタイルがわかる'],
            ].map(([e, t]) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>
                <span style={{ display:'flex', color:'var(--blue)', flexShrink:0 }}><FIcon name={e} size={16} /></span>{t}
              </div>
            ))}
          </div>
          {/* CTA */}
          <button className="btn btn--primary btn--lg" onClick={onStart} style={{ marginBottom: 20, fontSize: 17, letterSpacing: .3 }}>
            Ai GROW をはじめる
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── 診断開始 ─────────── */
function StartDiagScreen() {
  const nav = useNav();
  const [showModal, setShowModal] = useSd(true);

  const startDiag = () => {
    // 気質診断のみリセット（自己評価・相互評価の進捗は消さない）
    nav.update(s => ({ diag: { answers: {}, done: false, type: null } }));
    nav.go('diag-game', { round: 0 });
  };

  return (
    <div className="screen screen--white" style={{ position: 'relative' }}>
      <StatusBar />
      <AppHeader sub="気質診断" noMenu />
      <div className="scroll" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, minHeight: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '12px 30px 24px', gap: 6 }}>
          <Pill style={{ background: 'var(--blue-soft)', color: 'var(--blue-dark)' }}>STEP 1 / 3</Pill>
          <div style={{ margin: '18px 0 6px', display:'flex', justifyContent:'center', color:'var(--blue)' }}><FIcon name="search" size={64} sw={1.6} /></div>
          <h1 style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.5 }}>まずは、キミのタイプを<br/>サクッとチェック！</h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-sub)', fontWeight: 600, marginTop: 8, lineHeight: 1.7 }}>
            ことばを左右のカードに仕分けるゲーム。<br/>5つのフェーズでキミの気質がわかるよ。
          </p>
        </div>
        <div style={{ flexShrink: 0, padding: '0 24px 26px' }}>
          <button className="btn btn--cta btn--lg" onClick={startDiag}>診断をはじめる</button>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-sub)', marginTop: 12 }}>1 フェーズ 約 5 分</p>
        </div>
      </div>
      {showModal && <StartDiagModal onStart={() => setShowModal(false)} />}
    </div>
  );
}

/* ─────────── 気質診断ゲーム（カード仕分け・タップ回答） ─────────── */
const TIME_Q = 6000; // 1問の制限時間 (ms)

function DiagGameScreen() {
  const nav = useNav();
  const answers = nav.state.diag.answers || {};
  const firstUnanswered = DIAG_AXES.findIndex(a => answers[a.idx] === undefined);
  const initialRound = nav.params && nav.params.round != null
    ? nav.params.round
    : (firstUnanswered < 0 ? 0 : firstUnanswered);
  const [round, setRound] = useSd(initialRound);
  useEd(() => {
    if (nav.params && nav.params.round != null && nav.params.round !== round) {
      setRound(nav.params.round);
    }
  }, [nav.params && nav.params.round]);
  const ax = DIAG_AXES[round];

  const [questions, setQuestions] = useSd(() => buildQuestions(ax));
  const [qi, setQi] = useSd(0);
  const [fb, setFb] = useSd(null);      // { side, ok, timeout }
  const [elapsed, setElapsed] = useSd(0);
  const fbRef = useRd(null);            // fb の同期ミラー（二重回答ガード）
  const correctRef = useRd(0);
  const qStart = useRd(Date.now());

  useEd(() => {
    setQuestions(buildQuestions(DIAG_AXES[round]));
    setQi(0); setFb(null); fbRef.current = null; correctRef.current = 0;
  }, [round]);

  const q = questions[qi];

  const finish = () => {
    const isLast = round === DIAG_AXES.length - 1;
    nav.update(s => ({ diag: { ...s.diag,
      answers: { ...s.diag.answers, [ax.idx]: { correct: correctRef.current, total: questions.length } },
      done: isLast || s.diag.done, type: isLast ? 'done' : s.diag.type } }));
    nav.go('diag-result', { round });
  };

  const answer = (side) => {
    if (fbRef.current || !q) return false;
    const ok = side === q.side;
    if (ok) correctRef.current += 1;
    const f = { side, ok, timeout: side === null };
    fbRef.current = f;
    setFb(f);
    return true;
  };

  // 回答確定→次問への進行は fb エフェクトが一元管理（コールバックの取りこぼしなし）
  useEd(() => {
    if (!fb) return;
    const t = setTimeout(() => {
      fbRef.current = null;
      setFb(null);
      if (qi + 1 >= questions.length) finish();
      else setQi(v => v + 1);
    }, fb.ok ? 340 : 700);
    return () => clearTimeout(t);
  }, [fb]);

  // 制限時間タイマー（回答表示中はスキップ、止めない）
  useEd(() => {
    qStart.current = Date.now();
    setElapsed(0);
    const t = setInterval(() => {
      if (fbRef.current) return;
      const e = Date.now() - qStart.current;
      setElapsed(Math.min(e, TIME_Q));
      if (e >= TIME_Q) answer(null);
    }, 100);
    return () => clearInterval(t);
  }, [qi, round]);

  const remaining = 1 - elapsed / TIME_Q;

  /* ドラッグでの振り分け */
  const [drag, setDrag] = useSd({ x: 0, y: 0, active: false });
  const [hover, setHover] = useSd(null);
  const cardRefL = useRd(null), cardRefR = useRd(null), ansRef = useRd(null);
  const dragData = useRd({ active: false, startX: 0, startY: 0, scale: 1, moved: false });
  useEd(() => { setDrag({ x: 0, y: 0, active: false }); setHover(null); dragData.current.active = false; }, [qi, round]);

  const zoneAt = (cx, cy) => {
    for (const [k, ref] of [['L', cardRefL], ['R', cardRefR]]) {
      const r = ref.current && ref.current.getBoundingClientRect();
      if (r && cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom) return k;
    }
    return null;
  };
  const onDown = (e) => {
    if (fbRef.current || !q) return;
    const el = ansRef.current;
    const rect = el.getBoundingClientRect();
    const scale = el.offsetWidth ? rect.width / el.offsetWidth : 1;
    dragData.current = { active: true, startX: e.clientX, startY: e.clientY, scale, moved: false };
    setDrag({ x: 0, y: 0, active: true });
    try { el.setPointerCapture(e.pointerId); } catch (_) {}
  };
  const onMove = (e) => {
    const d = dragData.current;
    if (!d.active) return;
    const x = (e.clientX - d.startX) / d.scale;
    const y = (e.clientY - d.startY) / d.scale;
    if (Math.abs(x) + Math.abs(y) > 4) d.moved = true;
    setDrag({ x, y, active: true });
    setHover(zoneAt(e.clientX, e.clientY));
  };
  const onUp = (e) => {
    const d = dragData.current;
    if (!d.active) return;
    d.active = false;
    const z = zoneAt(e.clientX, e.clientY);
    setHover(null);
    setDrag({ x: 0, y: 0, active: false });
    if (z && d.moved) answer(z);
  };

  const cardBtn = (side, cat, attr) => {
    const hit = (fb && fb.side === side) || hover === side;
    const ring = fb && fb.side === side ? (fb.ok ? '#2E8560' : '#D33B2F') : hover === side ? ax.color : null;
    return (
      <button key={side} ref={side === 'L' ? cardRefL : cardRefR} onClick={() => answer(side)} disabled={!!fb}
        style={{ width: '40%', maxWidth: 176, border: 'none', padding: 0, background: 'none', cursor: 'pointer',
          borderRadius: 10, overflow: 'hidden', WebkitTapHighlightColor: 'transparent',
          boxShadow: ring ? `0 0 0 3px ${ring}, 0 8px 18px rgba(0,0,0,.16)` : '0 2px 8px rgba(0,0,0,.12)',
          transform: hit ? 'scale(1.05)' : 'scale(1)', transition: 'transform .15s, box-shadow .15s' }}>
        <div style={{ background: ax.color, color: '#fff', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 16, padding: '14px 6px', textAlign: 'center' }}>{cat}</div>
        <div style={{ background: ax.label, color: ax.color, fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15, padding: '13px 6px', textAlign: 'center' }}>{attr}</div>
      </button>
    );
  };

  return (
    <div className="screen screen--white">
      <StatusBar />
      {/* フェーズヘッダー（因子カラー） */}
      <div style={{ flexShrink: 0, background: ax.color, color: '#fff', display: 'flex', alignItems: 'center', padding: '0 16px 0 8px', height: 48 }}>
        <button onClick={() => round === 0 ? nav.go('start-diag') : setRound(round - 1)}
          style={{ border: 'none', background: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', width: 34, height: 48, padding: 0 }}>
          <Icon name="back" size={19} />
        </button>
        <div style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15.5 }}>フェーズ{ax.idx} - 気質診断</div>
        <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15 }}>{qi + 1} / {questions.length}</div>
      </div>

      {/* 本体 */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '20px 16px 0' }}>
        {/* 左右カード（同色・同明度） */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {cardBtn('L', '自分', ax.attrL)}
          {cardBtn('R', '他人', ax.attrR)}
        </div>

        <div style={{ flex: 1.5 }}></div>

        {/* 回答カード */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 18, fontSize: 12.5, fontWeight: 800, color: '#D33B2F', fontFamily: 'var(--font-round)' }}>
            {fb && fb.timeout ? '時間切れ！つぎへ' : fb && !fb.ok ? '✕ はんたいのカード！' : ''}
          </div>
          {q && (
            <div key={round + '-' + qi} ref={ansRef} className="fade-in"
              onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
              style={{ background: ax.ans, color: '#fff', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 17,
                padding: '17px 34px', minWidth: 150, textAlign: 'center', borderRadius: 8,
                boxShadow: drag.active ? `0 14px 30px ${ax.color}55` : '0 4px 10px rgba(0,0,0,.20)',
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

      {/* タイマーバー */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#f2f0ea', borderTop: '1px solid var(--border-soft)' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1f1b16" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="13.5" r="7.5"></circle>
          <path d="M12 13.5V10"></path>
          <path d="M10 2.5h4"></path>
          <path d="M12 2.5V6"></path>
        </svg>
        <div style={{ flex: 1, height: 8, borderRadius: 4, position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(90deg, #D0442F 0%, #DE8A38 30%, #CDBA3E 55%, #4E9A47 85%, #2E7D32 100%)' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: `${(1 - remaining) * 100}%`, background: '#333B33', transition: 'width .1s linear' }}></div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── 軸別 結果 ─────────── */
function DiagResultScreen() {
  const nav = useNav();
  const round = (nav.params && nav.params.round) || 0;
  const ax = DIAG_AXES[round];
  const isLast = round === DIAG_AXES.length - 1;
  const remaining = DIAG_AXES.length - round - 1;

  return (
    <div className="screen screen--white">
      <StatusBar />
      <AppHeader noMenu />
      {/* step indicator */}
      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-soft)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {DIAG_AXES.map((a, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div style={{ flex: 1, height: 2, background: 'var(--border)' }}></div>}
              <div style={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff',
                background: i < round ? 'var(--green)' : i === round ? a.color : 'var(--border)' }}>
                {i < round ? '✓' : i + 1}
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-sub)', textAlign: 'center', marginTop: 6, fontWeight: 700 }}>フェーズ {ax.idx} / 5</div>
      </div>

      <div className="scroll pad stack">
        <div style={{ textAlign: 'center', paddingTop: 6 }}>
          <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 700 }}>フェーズ {ax.idx} / 5　結果</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: ax.color, marginTop: 4 }}>{ax.axis}</div>
        </div>

        <div className="fade-in" style={{ background: ax.label, borderRadius: 16, padding: '26px 20px', textAlign: 'center', color: 'var(--text)', border: '2px solid #1f1b16', boxShadow: '5px 5px 0 #1f1b16', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: ax.color, color: '#fff', fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 11.5, padding: '4px 14px', borderRadius: 999, border: '2px solid #1f1b16', whiteSpace: 'nowrap' }}>キミの結果</div>
          <div style={{ margin: '8px 0 6px', display:'flex', justifyContent:'center', color: ax.color }}><FIcon name={ax.emoji} size={38} /></div>
          <div style={{ fontFamily: 'var(--font-round)', fontSize: 22, fontWeight: 900, lineHeight: 1.35, color: '#1f1b16' }}>{ax.result}</div>
          <div style={{ fontSize: 11, color: '#1f1b16', opacity: .65, marginTop: 8, fontWeight: 600 }}>この傾向をもとに診断を続けます</div>
        </div>

        <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-lg)', padding: 16, border: '2px solid #1f1b16', boxShadow: '4px 4px 0 #1f1b16' }}>
          <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 8, fontFamily: 'var(--font-round)' }}>この結果について</div>
          <p style={{ fontSize: 12.5, color: 'var(--text-sub)', lineHeight: 1.7 }}>スコアは優劣ではなく、キミがどのような場面で力を発揮しやすいかの傾向を示しています。引き続き診断を進めましょう。</p>
        </div>

        {isLast ? (
          <div style={{ background: 'var(--green-soft)', borderRadius: 'var(--r-lg)', padding: 16, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-round)', fontSize: 16, fontWeight: 800, color: '#2E7D32', marginBottom: 4 }}><span style={{display:'inline-flex',alignItems:'center',gap:6}}><FIcon name="party" size={16} color="#2E7D32" /> 気質診断 完了！</span></div>
            <p style={{ fontSize: 12, color: '#388E3C', fontWeight: 600, lineHeight: 1.7 }}>お疲れさま！続けて「自己評価」に進もう。</p>
          </div>
        ) : (
          <div style={{ background: 'var(--blue-soft)', borderRadius: 'var(--r-lg)', padding: '12px 14px' }}>
            <div style={{ fontSize: 11, color: 'var(--blue-dark)', fontWeight: 800, marginBottom: 6 }}>あと {remaining} フェーズ</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {DIAG_AXES.map((a, i) => (
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= round ? a.color : 'var(--border)' }}></div>
              ))}
            </div>
          </div>
        )}

        <button className="btn btn--cta btn--lg"
          onClick={() => isLast ? nav.go('diag-complete', { kind: 'diag' }) : nav.go('diag-game', { round: round + 1 })}>
          {isLast ? '気質診断を完了する' : '次へすすむ'}
        </button>
        <p style={{ fontSize: 11, color: 'var(--text-sub)', textAlign: 'center' }}>1 フェーズ 約 5 分</p>
      </div>
    </div>
  );
}

Object.assign(window, { StartDiagScreen, DiagGameScreen, DiagResultScreen, DIAG_AXES });
